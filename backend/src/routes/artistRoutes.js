const express = require('express');
const router = express.Router();
const { getAllArtists, getArtistById, createArtist, updateArtist, deleteArtist} = require('../controllers/artistController');

// Public routes
router.get('/', getAllArtists);
router.get('/:id', getArtistById);

// Admin routes (optional - add auth middleware later)
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

module.exports = router;