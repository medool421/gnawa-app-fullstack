const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define('Event', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: { msg: "Title is required" } }
   },
   date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { isDate: { msg: "Valid date is required" } }
   },
   location: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: { msg: "Location is required" } }
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { msg: "Description is required" } }
   },
   banner_url: {
      type: DataTypes.STRING(500),
      allowNull: true
   }
}, {
   tableName: 'event_info',
   timestamps: true,
   underscored: true
});

Event.associate = (models) => {
   Event.hasMany(models.Artist, {
      foreignKey: 'event_id',
      as: 'artists',
      onDelete: 'CASCADE'
   });
   Event.hasMany(models.Booking, {
      foreignKey: 'event_id',
      as: 'bookings',
      onDelete: 'CASCADE'
   });
};

module.exports = Event;