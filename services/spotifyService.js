require('dotenv').config();

const getSpotifyToken = async () => {
    try {
        const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${auth}`,
            },
            body: 'grant_type=client_credentials',
        });
        if (!response.ok) throw new Error('Could not get Spotify token');

        const data = await response.json();

        return data.access_token;
    } catch (error) {
        console.error('Error getting Spotify token', error.message);
        throw new Error('Could not get Spotify token');
    }
};

const searchTrack = async ({ title, artist }) => {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(`${title} artist:${artist}`)}&type=track&limit=1`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok || !data.tracks.items.length) throw new Error('Track not found');

        const track = data.tracks.items[0];
        return {
            title: track.name,
            artist: track.artists.reduce((artists, currentArtist, currentIndex) => currentIndex === 0 ? currentArtist.name : `${artists}, ${currentArtist.name}`, ''),
            coverArtUrl: track.album.images[0]?.url || null,
            soundClipUrl: track.preview_url || null
        };
    } catch (error) {
        console.error('Error searching track:', error.message);
        throw new Error('Could not retrieve track data');
    }
};

module.exports = { searchTrack };