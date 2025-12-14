const Event = require('./Event');
const Artist = require('./Artist');
const Booking = require('./Booking');

const models = { Event, Artist, Booking };

// Initialiser les associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Exporter les modèles
module.exports = {Event, Artist,  Booking};