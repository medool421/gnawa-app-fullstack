const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define('Booking', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: { msg: "Name is required" } }
   },
   email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { isEmail: { msg: "Valid email is required" } }
   },
   phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: { notEmpty: { msg: "Phone is required" } }
   },
   tickets_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: { args: [1], msg: "At least 1 ticket is required" } }
   },
   confirmation_code: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true
   },
   event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: 'event_info',
         key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
   }
}, {
   tableName: 'bookings',
   timestamps: true,
   underscored: true,
   hooks: {
      beforeCreate: (booking) => {
         if (!booking.confirmation_code) {
            booking.confirmation_code = generateConfirmationCode();
         }
      }
   }
});

Booking.associate = (models) => {
   Booking.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
   });
};

function generateConfirmationCode() {
   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   let code = '';
   for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return code;
}

module.exports = Booking;