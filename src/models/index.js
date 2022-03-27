const Blog = require('./blog')
const User = require('./user')
const Token = require('./token')

const ReadingList = require('./readingList')
User.hasMany(Blog)
User.hasMany(Token)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'blog_readings' })

module.exports = {
  Blog, User, ReadingList, Token
}