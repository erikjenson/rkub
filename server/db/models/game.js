const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {

winTotal: {
  type: Sequelize.INTEGER,
  validate: {min: 0, max: 500}
},
unusedTiles:{
  //set a default value? It will depend on # of players
  type: Sequelize.ARRAY(Sequelize.STRING)
},
board: {
  type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
}
})

module.exports = Game
