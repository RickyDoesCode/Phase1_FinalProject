'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {sequelize, modelName: 'User'});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Story)
  };
  return User;
};