const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')

const getToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  return token;
}

const userFromToken = async (token) => {
  try {
    const user = jwt.verify(token, SECRET)
    return user;
  } catch (e) {
    return undefined
  }
}

module.exports = { getToken, userFromToken }