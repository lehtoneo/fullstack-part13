const Blog = require('./blog')
const User = require('./user')

User.sync({ force: true })
Blog.sync()

module.exports = {
  Blog, User
}