const router = require('express').Router()

const { removeToken } = require('../util/auth')

router.post('/', async (request, response) => {
  const { token } = request;

  if (token) {
    await removeToken(token)
  }

  response
    .status(200)
    .send("ok")
})

module.exports = router