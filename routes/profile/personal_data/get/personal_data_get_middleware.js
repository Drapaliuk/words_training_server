const User = require('../../../../db/models/user/user_model');

const middleware = (req, res) => {
    const userId = req.query.userid;
    
    User.findById(userId, {"bio": true} , { __v: 0, _id: 0, login: 0, password: 0, wordKits: 0, trainingResults: 0 })
          .then((data) => res.send({ responseCode: 1, personalData: data.bio }));
};

module.exports = middleware;