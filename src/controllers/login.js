const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const { getToken } = require('../util/auth')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    throw { status: 401, message: 'invalid username or password'}
  }

  const token = getToken(user)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router