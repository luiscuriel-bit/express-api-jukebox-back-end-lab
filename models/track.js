const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, minlength: 0 },
    artist: { type: String, required: true, trim: true, minlength: 0 },
    coverArtUrl: { type: String, trim: true },
    soundClipUrl: { type: String, trim: true, },
});

trackSchema.index({title: 1, artist: 1, coverArtUrl: 1}, {unique: true});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;