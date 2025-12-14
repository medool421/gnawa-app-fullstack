const express = require('express');
const router = express.Router();
const {createBooking, getBookingByCode, getBookingsByEmail, getAllBookings, deleteBooking } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/email/:email', getBookingsByEmail);
router.get('/:code', getBookingByCode);
router.delete('/:code', deleteBooking);

module.exports = router;