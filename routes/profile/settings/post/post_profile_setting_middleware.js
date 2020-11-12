const User = require('../../../../db/models/user/user_model');

const middleware = (req, res) => {
    const userId = req.body.userId
    const postData = req.body.data;
    User.findByIdAndUpdate(userId, {"profileSettings": postData}, {new: true}, (err, data) => {
        if(err) res.send(err);
        res.send({responseCode: 1})
    })
};

module.exports = middleware;