const handlerError401 = function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      if(err.code === 'invalid_refresh_token') {
        return res.status(401).json({
          message: 'Your refresh token is invalid',
          responseCode: 4,
          errCode: err.code
        })
      }
  
      if(err.message === 'jwt expired') {
         return res.status(401).json({
           message: `Your access token has been expired, please send refresh token for restoration your access`,
           errorCode: 'expired_token',
           responseCode: 0
         })
      }
  
      if(err.code === 'credentials_bad_format') {
        return res.status(401).json({
          message: 'Your access token has invalid format',
          errorCode: err.code,
          responseCode: 2
        })
      }
  
      return res.status(401).json({
        message: 'Your access token is invalid',
        errorCode: err.code,
        responseCode: 3
      })
    }
}

module.exports = handlerError401;