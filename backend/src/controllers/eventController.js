const { Event, Artist, Booking } = require('../models');


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
