const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) {
    throw { status: 404, message: "User not found" }
  }
  const { username } = req.body
  user.username = username;
  await user.save();
  res.status(204).end()
})

module.exports = router