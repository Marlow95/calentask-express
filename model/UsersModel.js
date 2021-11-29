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
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            notNull: true,
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
            notNull: true,
            isAlphanumeric: true
        }
    },
    confirmPassword: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
            notNull: true,
            isAlphanumeric: true
        }
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
      firstname: 'Marlow',
      lastname: 'Collins',
      username: 'MarlowC',
      email: 'marlowcollins95@gmail.com',
      password: 'password',
      confirmPassword: 'password',
      about: 'I am the founder of CalenTask',
      lastLogin: Date(),
      status: 'active',
      role: 'admin'
    });
});

module.exports = Users