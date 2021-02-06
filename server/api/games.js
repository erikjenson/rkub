const router = require('express').Router()
const {Game} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})
