'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Story extends Model {}
  Story.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {sequelize, modelName: 'Story'});
  Story.associate = function(models) {
    // associations can be defined here
    Story.belongsToMany(models.Tag, {through : models.StoryTag})
    Story.belongsTo(models.User)
  };
  return Story;
};