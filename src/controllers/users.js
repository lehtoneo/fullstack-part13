const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include:[{
      model: Blog,
      attributes: { exclude: ['userId']},
    },
    {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId', 'reading_lists']},
      through: {
        attributes: []
      },
    }
  ]
  })
  if (!user) {
    throw { status: 404, message: "User not found" }
  }
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