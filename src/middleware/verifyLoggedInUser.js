const verifyLoggedInUser = async (req, _res, next) => {
  
  const { currentUser } = req;
  
  if (!currentUser) {
    throw { status: 401, message: "unauthorized"}
  }

  if (currentUser.disabled) {
    throw { status: 401, message: "you are disabled"}
  }

  next()

}

module.exports = verifyLoggedInUser