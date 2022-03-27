const router = require('express').Router()
const sequelize = require('sequelize')
const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const result = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('sum', sequelize.col('likes')), 'likes'],
      [sequelize.fn('count', sequelize.col('likes')), 'articles'],
    ],
    group: ['author'],
  });
  res.json(result)
})


module.exports = router