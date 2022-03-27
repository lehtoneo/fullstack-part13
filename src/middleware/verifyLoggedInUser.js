const verifyLoggedInUser = async (req, _res, next) => {
  
  const { currentUser } = req;
  
  if (!currentUser) {
    throw { status: 401, message: "unauthorized"}
  }

  next()

}

module.exports = verifyLoggedInUser