const jsonwebtoken = require('jsonwebtoken');
const authTokenModifier = require('../../../utils/auth_token_manipulator/auth_token_manipulator');
const {jwt: jwtKey} = require('../../../config/keys');
const User = require('../../../db/models/user/user_model');



const middlewares = {
    post: (req, res) => {
        const userWordsKit = req.body
        const authToken = authTokenModifier.deleteBearer(req.headers.authorization);
        const { id: userId } = jsonwebtoken.decode(authToken, jwtKey);

        User.findByIdAndUpdate(userId, {'savedWordsKits': userWordsKit}, {new: true}, (err, data) => {
            if(err) {
                res.json({responseCode: 0, message: err.message})
            }
            res.json({responseCode: 1, wordsKitId: data._id, message: 'Words kit saved'})
        })
   },


   get: (req, res) => {
        const authToken = authTokenModifier.deleteBearer(req.headers.authorization);
        const { id: userId } = jsonwebtoken.decode(authToken, jwtKey);

        User.findById(userId, (err, data) => {
            res.json(data.savedWordsKits)
        })
   }
}

module.exports = middlewares;