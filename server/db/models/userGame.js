const Sequelize = require('sequelize')
const db = require('../db')

const UserGame = db.define('userGame', {
  score: {type: Sequelize.INTEGER},
  tiles: {type: Sequelize.ARRAY(Sequelize.STRING)}
})

module.exports = {
  UserGame
}
