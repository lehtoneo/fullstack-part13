const Blog = require('./blog')

Blog.sync({ force: true })

module.exports = {
  Blog
}