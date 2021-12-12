const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Model = Sequelize.Model;
class Todo extends Model {}
Todo.init({
    todoId: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.TEXT
    },
    isComplete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

}, {
     sequelize,
     modelName: 'Todo',
     timestamps: true,
     createdAt: true,
     updatedAt: 'updateTimestamp'
});

Todo.sync({ force: true }).then(() => {

    return Todo.create({
      todoId: 1,
      description: 'Wash the Car',
      isComplete: false
    });
});

module.exports = Todo