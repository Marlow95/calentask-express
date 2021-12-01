const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const bcrypt = require('bcrypt')

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
}, { 
    hooks:{
        beforeCreate: async function(user) {
            const salt = await bcrypt.genSalt(10); 
            user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate:async (user) => {
            if(user.password) {
             const salt = await bcrypt.genSaltSync(10, 'a');
             user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    },
    instanceMethods:{
        validPassword: async function(password) {
            return bcrypt.compareSync(password, this.password);
        }
    },
    sequelize,
     modelName: 'Users',
     timestamps: true,
     createdAt: true,
     updatedAt: 'updateTimestamp'
});

Users.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
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