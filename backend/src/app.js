const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const sequelize = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

// Import models
const Event = require('./models/Event');
const Artist = require('./models/Artist');
const Booking = require('./models/Booking');

// Initialize associations
const models = { Event, Artist, Booking };
Object.keys(models).forEach(modelName => {
   if (models[modelName].associate) {
      models[modelName].associate(models);
   }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/event', require('./routes/eventRoutes'));
app.use('/api/artists', require('./routes/artistRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Health check
app.get('/health', (req, res) => {
   res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handler
app.use(errorHandler);

// Database connection
sequelize.authenticate()
   .then(() => console.log('Database connected'))
   .catch(err => console.error('Database error:', err));

// Sync database (development only)
if (process.env.NODE_ENV !== 'production') {
   sequelize.sync({ alter: true })
      .then(() => console.log('Models synchronized'))
      .catch(err => console.error('Sync error:', err));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

module.exports = app;