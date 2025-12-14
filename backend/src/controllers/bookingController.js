const { Booking, Event } = require('../models');
const { Op } = require('sequelize');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
   try {
      const { name, email, phone, tickets_count, event_id } = req.body;

      // Validation
      if (!name || !email || !phone || !tickets_count || !event_id) {
         return res.status(400).json({ 
            success: false, 
            message: 'Please provide all required fields' 
         });
      }

      // Check if event exists
      const event = await Event.findByPk(event_id);
      if (!event) {
         return res.status(404).json({ 
            success: false, 
            message: 'Event not found' 
         });
      }

      const booking = await Booking.create({
         name,
         email,
         phone,
         tickets_count,
         event_id
      });

      res.status(201).json({
         success: true,
         data: booking,
         message: `Booking confirmed! Your code: ${booking.confirmation_code}`
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};

// @desc    Get booking by confirmation code
// @route   GET /api/bookings/:code
// @access  Public
exports.getBookingByCode = async (req, res) => {
   try {
      const booking = await Booking.findOne({
         where: { confirmation_code: req.params.code },
         include: [
            { 
               model: Event, 
               as: 'event',
               attributes: ['id', 'title', 'date', 'location']
            }
         ]
      });

      if (!booking) {
         return res.status(404).json({ 
            success: false, 
            message: 'Booking not found with this confirmation code' 
         });
      }

      res.status(200).json({
         success: true,
         data: booking
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};

// @desc    Get all bookings by email with pagination
// @route   GET /api/bookings/email/:email?page=1&limit=10
// @access  Public
exports.getBookingsByEmail = async (req, res) => {
   try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Booking.findAndCountAll({
         where: { email: req.params.email },
         limit,
         offset,
         order: [['created_at', 'DESC']],
         include: [
            { 
               model: Event, 
               as: 'event',
               attributes: ['id', 'title', 'date', 'location']
            }
         ]
      });

      if (count === 0) {
         return res.status(404).json({ 
            success: false, 
            message: 'No bookings found for this email' 
         });
      }

      res.status(200).json({
         success: true,
         data: rows,
         pagination: {
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalItems: count,
            itemsPerPage: limit
         }
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};

// @desc    Get all bookings with pagination and search
// @route   GET /api/bookings?page=1&limit=10&search=ahmed
// @access  Public (or Private for admin)
exports.getAllBookings = async (req, res) => {
   try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const whereClause = search ? {
         [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
            { confirmation_code: { [Op.iLike]: `%${search}%` } }
         ]
      } : {};

      const { count, rows } = await Booking.findAndCountAll({
         where: whereClause,
         limit,
         offset,
         order: [['created_at', 'DESC']],
         include: [
            { 
               model: Event, 
               as: 'event',
               attributes: ['id', 'title', 'date']
            }
         ]
      });

      res.status(200).json({
         success: true,
         data: rows,
         pagination: {
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalItems: count,
            itemsPerPage: limit
         }
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};

// @desc    Delete booking (for user or admin)
// @route   DELETE /api/bookings/:code
// @access  Public
exports.deleteBooking = async (req, res) => {
   try {
      const booking = await Booking.findOne({
         where: { confirmation_code: req.params.code }
      });

      if (!booking) {
         return res.status(404).json({ 
            success: false, 
            message: 'Booking not found' 
         });
      }

      await booking.destroy();

      res.status(200).json({
         success: true,
         message: 'Booking cancelled successfully'
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};