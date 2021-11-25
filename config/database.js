const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('calentask', 'postgres', 'jD37ghBR69k!', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
})

module.exports = sequelize
