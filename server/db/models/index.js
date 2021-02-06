const User = require('./user')
const Game = require('./game')
const UserGame = require('./userGame')

User.belongsToMany(Game, {through: 'userGame'})
Game.belongsToMany(User, {through: 'userGame'})

module.exports = {
  User,
  Game,
  UserGame
}
