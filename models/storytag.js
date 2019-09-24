'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class StoryTag extends Model {}
  StoryTag.init({
    TagsId: DataTypes.INTEGER,
    StoryId: DataTypes.INTEGER
  }, {sequelize, modelName: 'StoryTag'});
  StoryTag.associate = function(models) {
    // associations can be defined here
  };
  return StoryTag;
};