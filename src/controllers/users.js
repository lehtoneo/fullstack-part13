const router = require('express').Router()
const { Op } = require('sequelize')
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
  const where = {}

  if (req.query.read !== undefined) {
    const { read } = req.query
    if (read !== 'true' && read !== 'false') {
      throw { status: 400, message: 'Read has to be "true" or "false"'}
    }
    where.read = {
      [Op.eq]: req.query.read === 'true'
    }
  }

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
        attributes: ['read', 'id'],
        as: 'readingList',
        where
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