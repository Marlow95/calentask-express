const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Model = Sequelize.Model;
class Users extends Model {}
Users.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    myPassword: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize,
     modelName: 'Users',
     targetKey: 'user_id',
     timestamps: true,
     createdAt: true,
     updatedAt: 'updateTimestamp'
});

Users.sync({ force: true }).then(() => {

    return Users.create({
      firstName: 'Marlow',
      lastName: 'Collins',
      userName: 'MarlowC',
      myPassword: 'password'
    });
});

module.exports = Users