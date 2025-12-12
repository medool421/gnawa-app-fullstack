const { Event, Artist, Booking } = require('../models/Event');

// @desc    Get event info
// @route   GET /api/event
// @access  Public
exports.getEvent = async (req, res) => {
   try {
      const event = await Event.findOne({
         include: [
            { 
               model: Artist, 
               as: 'artists',
               attributes: ['id', 'name', 'image_url', 'performance_time']
            }
         ]
      });

      if (!event) {
         return res.status(404).json({ 
            success: false, 
            message: 'Event not found' 
         });
      }

      res.status(200).json({
         success: true,
         data: event
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};

// @desc    Get event with statistics
// @route   GET /api/event/stats
// @access  Public
exports.getEventStats = async (req, res) => {
   try {
      const event = await Event.findOne({
         include: [
            { model: Artist, as: 'artists' },
            { model: Booking, as: 'bookings' }
         ]
      });

      if (!event) {
         return res.status(404).json({ 
            success: false, 
            message: 'Event not found' 
         });
      }

      // Calculate stats
      const totalArtists = event.artists.length;
      const totalBookings = event.bookings.length;
      const totalTickets = event.bookings.reduce((sum, booking) => sum + booking.tickets_count, 0);

      res.status(200).json({
         success: true,
         data: {
            event: {
               id: event.id,
               title: event.title,
               date: event.date,
               location: event.location,
               description: event.description,
               banner_url: event.banner_url
            },
            stats: {
               totalArtists,
               totalBookings,
               totalTickets
            }
         }
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};