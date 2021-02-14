const authTokenModifier = require('../utils/auth_token_manipulator/auth_token_manipulator');


const jsonwebtoken = require('jsonwebtoken');
const {jwt: jwtKey} = require('../config/keys');


// const authTokenModifier = { //! authTokenModifier
//     deleteBearer: token => token.split(' ')[1],
//     addBearer: token => `Bearer ${token}`,
//     getAuthHeader: req => req.headers.authorization,
//     decodeToken: function(authToken) {
//         const withoutBearer = this.deleteBearer(authToken)
//         return jsonwebtoken.decode(withoutBearer, jwtKey)
//     },
    
//     verifyToken: function(authToken) {
//         const withoutBearer = this.deleteBearer(authToken);
//         return jsonwebtoken.verify(withoutBearer, jwtKey)
//     }


const isAuthRequest = function(req, res, next) {
    const authToken = req.headers.authorization;
    // if(!authToken) return res.status(401);

    // const isVerify = jsonwebtoken.verify(authToken, jwtKey, {algorithms: ['HS256']})
    // console.log('isVerify', isVerify)


    console.log('IS AUTH REQUEST !!!!!!!!!')

    return next()
}

module.exports = isAuthRequest;