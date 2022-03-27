const router = require('express').Router()
const sequelize = require('sequelize')
const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
  const newItem = await ReadingList.create(req.body);
  res.json(newItem)
})


module.exports = router