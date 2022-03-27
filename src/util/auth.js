const jwt = require('jsonwebtoken')

const { Op } = require('sequelize')
const { SECRET } = require('../util/config')
const { Token, User } = require('../models')

const removeToken = async (token) => {

  const tokenInDb = await Token.findOne({ 
    where: {
      value: token
    }
  })

  if (tokenInDb) {
    await tokenInDb.destroy()
  }
}

const getToken = async (user) => {
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)
  await Token.create({
    value: token,
    userId: user.id
  })
  return token;
}

const userFromToken = async (token) => {
  try {
    const user = await jwt.verify(token, SECRET)
    
    const tokenInDb = await Token.findOne({
      where: {[Op.and]: [{ userId: user.id }, { value: token }]}
    })
    console.log({ tokenInDb })
    if (!tokenInDb) {
      return undefined
    }
    return await User.scope('include_disabled').findByPk(user.id);
  } catch (e) {
    return undefined
  }
}

module.exports = { getToken, userFromToken, removeToken }