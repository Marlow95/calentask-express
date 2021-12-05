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
        //validate: {
            //isEmail: true
        //}
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        //validate: {
            //notNull: true,
            //isAlphanumeric: true
        //}
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

}, {/*
    hooks:{
        beforeCreate: async function(users) {
            const salt = await bcrypt.genSalt(10); 
            users.password = await bcrypt.hash(users.password, salt);
        },
        beforeUpdate:async (users) => {
            if(users.password) {
             const salt = await bcrypt.genSaltSync(10, 'a');
             users.password = bcrypt.hashSync(users.password, salt);
            }
        }
    },
    validPassword: function(inputedPass, password){
        return bcrypt.compareSync(inputedPass, password);
    },*/
    sequelize,
     modelName: 'Users',
     timestamps: true,
     createdAt: true,
     updatedAt: 'updateTimestamp'
});


Users.validPassword =  async function(inputedPass, password){
    return await bcrypt.compare(inputedPass, password);
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