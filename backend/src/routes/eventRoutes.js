const express = require('express');
const router = express.Router();
const { getEvent, getEventStats } = require('../controllers/eventController');

router.get('/', getEvent);
router.get('/stats', getEventStats);

module.exports = router;