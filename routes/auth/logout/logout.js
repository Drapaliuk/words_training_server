const RefreshTokenModel = require('../../../db/models/refresh_token/refresh_token');

const middlewares = {
    post: async function(req, res) {
        const {refreshToken} = req.body;
        
        RefreshTokenModel.findOneAndDelete({token: refreshToken})
                         .then(result => {
                             if(result) return res.status(200).send({responseCode: 1, message: 'user had logout'})
                             return {responseCode: 0, message: 'Something going wrong'}
                         })
    }
}

module.exports = middlewares;