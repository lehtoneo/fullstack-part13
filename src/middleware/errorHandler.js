const errorHandler = (error, request, response, next) => {
  
  console.log(error)
  if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
    const { errors } = error
    const errorsFormatted = errors.map(e => e.message)
    return response.status(400).send({ error: { errors: errorsFormatted } })
  } else {
    const e = error 
    return response.status(e.status || 500).send({ error: { errors: [e.message || ""]} })
  }
  

}

module.exports = errorHandler