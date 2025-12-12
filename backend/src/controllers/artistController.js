const { Artist, Event } = require('../models/Event');
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

// @desc    Create new artist (ADMIN - Optional)
// @route   POST /api/artists
// @access  Private
exports.createArtist = async (req, res) => {
   try {
      const { name, bio, image_url, performance_time, event_id } = req.body;

      // Validation
      if (!name || !bio || !performance_time || !event_id) {
         return res.status(400).json({ 
            success: false, 
            message: 'Please provide all required fields' 
         });
      }

      const artist = await Artist.create({
         name,
         bio,
         image_url,
         performance_time,
         event_id
      });

      res.status(201).json({
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

// @desc    Update artist (ADMIN - Optional)
// @route   PUT /api/artists/:id
// @access  Private
exports.updateArtist = async (req, res) => {
   try {
      const artist = await Artist.findByPk(req.params.id);

      if (!artist) {
         return res.status(404).json({ 
            success: false, 
            message: 'Artist not found' 
         });
      }

      const updated = await artist.update(req.body);

      res.status(200).json({
         success: true,
         data: updated
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};

// @desc    Delete artist (ADMIN - Optional)
// @route   DELETE /api/artists/:id
// @access  Private
exports.deleteArtist = async (req, res) => {
   try {
      const artist = await Artist.findByPk(req.params.id);

      if (!artist) {
         return res.status(404).json({ 
            success: false, 
            message: 'Artist not found' 
         });
      }

      await artist.destroy();

      res.status(200).json({
         success: true,
         message: 'Artist deleted successfully'
      });
   } catch (error) {
      res.status(500).json({ 
         success: false, 
         message: error.message 
      });
   }
};