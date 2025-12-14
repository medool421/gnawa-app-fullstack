const express = require('express');
const router = express.Router();
const { getAllArtists, getArtistById} = require('../controllers/artistController');

router.get('/', getAllArtists);
router.get('/:id', getArtistById);


module.exports = router;