const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Model = Sequelize.Model;
class Users extends Model {}
Users.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
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
    eMail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    myPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    confirmPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    about: {
        type:Sequelize.TEXT
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    role: {
        type: Sequelize.ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    lastLogin: {
        type: Sequelize.DATE
    }
}, { sequelize,
     modelName: 'Users',
     timestamps: true,
     createdAt: true,
     updatedAt: 'updateTimestamp'
});

Users.sync({ force: true }).then(() => {

    return Users.create({
      firstName: 'Marlow',
      lastName: 'Collins',
      userName: 'MarlowC',
      eMail: 'marlowcollins95@gmail.com',
      myPassword: 'password',
      confirmPassword: 'password',
      about: 'I am the founder of CalenTask',
      lastLogin: Date(),
      status: 'active',
      role: 'admin'
    });
});

module.exports = Users