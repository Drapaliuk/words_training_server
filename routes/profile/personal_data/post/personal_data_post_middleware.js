const User = require('../../../../db/models/user/user_model');

const middleware = (req, res) => {
    const userId = req.body.userId;
    const postData = req.body.data;

    User.findByIdAndUpdate(userId, {'bio': postData}, {new: true}, (err, data) => {
        if(err) return res.send(err)
        return res.send({responseCode: 1})
            })
};

module.exports = middleware;