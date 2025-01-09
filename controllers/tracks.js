const Track = require('../models/track');
const express = require('express');
const router = express.Router();
const { searchTrack } = require('../services/spotifyService');

router.post('/', async (req, res) => {
    try {
        const spotifyInfo = await searchTrack(req.body);
        const newTrack = await Track.create(spotifyInfo);
        return res.status(201).json(newTrack);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const tracks = await Track.find();
        return res.status(200).json(tracks);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) return res.status(404).json({ message: 'Track not found' })
        return res.status(200).json(track);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const spotifyInfo = await searchTrack(req.body);
        const updatedTrack = await Track.findByIdAndUpdate(req.params.id, spotifyInfo, { new: true });
        if (!updatedTrack) return res.status(404).json({ message: 'Track not found' });
        return res.status(200).json(updatedTrack);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTrack = await Track.findByIdAndDelete(req.params.id);
        if (!deletedTrack) return res.status(404).json({ message: 'Track not found' });
        return res.status(200).json(deletedTrack);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;