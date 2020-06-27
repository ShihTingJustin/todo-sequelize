'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    name: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    isTrash: DataTypes.BOOLEAN
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Todo;
};