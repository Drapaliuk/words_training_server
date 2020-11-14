const jsonwebtoken = require('jsonwebtoken');
const authTokenManipulator = require('../../../utils/auth_token_manipulator/auth_token_manipulator');
const {jwt: jwtKey} = require('../../../config/keys');




const middlewares = {
    get: function(req, res) {
         const authToken = authTokenManipulator.deleteBearer(req.headers.authorization);
         const { id: userId } = jsonwebtoken.decode(authToken, jwtKey);
         console.log('asdasdas', userId)
         res.status(200).json({
                 message: 'Your are authorization',
                 responseCode: 1,
                 userId
         })
        }
}

module.exports = middlewares;

