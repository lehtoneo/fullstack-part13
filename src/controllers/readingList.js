const router = require('express').Router()
const sequelize = require('sequelize');
const verifyLoggedInUser = require('../middleware/verifyLoggedInUser');
const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
  const newItem = await ReadingList.create(req.body);
  res.json(newItem)
})

router.put('/:id', verifyLoggedInUser,async (req, res) => {
  const { currentUser } = req;
  const { read } = req.body;
  const readingList = await ReadingList.findByPk(req.params.id);
  if (!readingList) {
    throw { status: 404, message: "Reading list not found"}
  }
  if (currentUser.id !== readingList.userId) {
    throw { status: 401, message: "Unauthorized"}
  }
  readingList.read = read;
  await readingList.save();
  res.json(readingList)
})


module.exports = router