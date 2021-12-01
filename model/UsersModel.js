const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const crypto = require('crypto')

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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            isAlphanumeric: true
        }, get(){
            return () => this.getDataValue('password')
        }
    },
    salt: {
        type: Sequelize.STRING,
        get(){
            return () => this.getDataValue('salt')
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


Users.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64')
}

Users.encryptPassword = (plainText, salt) => {
    return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex')
}

const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = Users.generateSalt()
        user.password = Users.encryptPassword(user.password(), user.salt())
    }
}

Users.beforeCreate(setSaltAndPassword)
Users.beforeUpdate(setSaltAndPassword)

exports.module = Users.prototype.correctPassword = function(enteredPassword) {
    return Users.encryptPassword(enteredPassword, this.salt()) === this.password()
}

Users.sync({ force: true }).then(() => {

    return Users.create({
      firstname: 'Marlow',
      lastname: 'Collins',
      username: 'MarlowC',
      email: 'test@gmail.com',
      password: 'test',
      about: 'I\'m working, hello world',
      lastLogin: Date(),
      status: 'active',
      role: 'admin'
    });
});

module.exports = Users