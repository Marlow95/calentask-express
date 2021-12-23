const { Sequelize } = require('sequelize')
const config = require('../config.js')

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
})

module.exports = sequelize
