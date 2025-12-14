const express = require('express');
const router = express.Router();
const { getEvent, getEventStats } = require('../controllers/eventController');

router.get('/', getEvent);

module.exports = router;