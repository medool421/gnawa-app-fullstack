const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Artist = sequelize.define('Artist', {
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
   bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { msg: "Bio is required" } }
   },
   image_url: {
      type: DataTypes.STRING(500),
      allowNull: true
   },
   performance_time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: { notEmpty: { msg: "Performance time is required" } }
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
   tableName: 'artists',
   timestamps: true,
   underscored: true
});

Artist.associate = (models) => {
   Artist.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
   });
};

module.exports = Artist;