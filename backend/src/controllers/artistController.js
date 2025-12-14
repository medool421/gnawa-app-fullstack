const { Artist, Event } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all artists with pagination and search
// @route   GET /api/artists?page=1&limit=10&search=maalem
// @access  Public
exports.getAllArtists = async (req, res) => {
   try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      // Build search condition
      const whereClause = search ? {
         [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { bio: { [Op.iLike]: `%${search}%` } }
         ]
      } : {};

      const { count, rows } = await Artist.findAndCountAll({
         where: whereClause,
         limit,
         offset,
         order: [['performance_time', 'ASC']],
         include: [
            { 
               model: Event, 
               as: 'event',
               attributes: ['id', 'title', 'date', 'location']
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

// @desc    Get single artist by ID
// @route   GET /api/artists/:id
// @access  Public
exports.getArtistById = async (req, res) => {
   try {
      const artist = await Artist.findByPk(req.params.id, {
         include: [
            { 
               model: Event, 
               as: 'event',
               attributes: ['id', 'title', 'date', 'location']
            }
         ]
      });

      if (!artist) {
         return res.status(404).json({ 
            success: false, 
            message: 'Artist not found' 
         });
      }

      res.status(200).json({
         success: true,
         data: artist
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};
