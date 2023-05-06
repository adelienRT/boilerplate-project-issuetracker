const errorHandler = (error, req, res, next) => {
  const status = error.status || 400

    res.json({error:'required field(s) missing'})
}

module.exports = errorHandler