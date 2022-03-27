const router = require('express').Router()
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const verifyLoggedInUser = require('../middleware/verifyLoggedInUser')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.query.search + '%'),
        sequelize.where(sequelize.fn('LOWER', sequelize.col('author')), 'LIKE', '%' + req.query.search + '%')
      ]
    }
  }
  const blogs = await Blog.findAll({
    include: {
      model: User,
    },
    attributes: { exclude: ['userId'] },
    where,
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

router.post('/', verifyLoggedInUser, async (req, res) => {
  const { currentUser } = req;
  const newBlog = {
    ...req.body,
    userId: currentUser.id
  }
  const blog = await Blog.create(newBlog)

  res.json(blog)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', verifyLoggedInUser, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  const { currentUser } = req;
  if (blog) {
    if (blog.userId === currentUser.id) {
      await blog.destroy()
    } else {
      throw { status: 401, message: "unauthorized" }
    }
    
  }
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    throw { status: 404, message: "not found "}
  }
  const { likes } = req.body
  if (!isNaN(likes)) {
    blog.likes = likes;
    await blog.save();
  } else {
    throw { status: 400, message: "likes has to be a number"}
  }
  res.status(204).end()
})



module.exports = router