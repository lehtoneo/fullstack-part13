const { userFromToken } = require("../util/auth");

const auth = async (req, _res, next) => {
  
  const token = req.headers?.authorization;
  
  const user = await userFromToken(token)

  req.currentUser = user;

  next()

}

module.exports = auth