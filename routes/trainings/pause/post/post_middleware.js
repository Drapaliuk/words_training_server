const User = require('../../../../db/models/user/user_model');

const middleware = (req, res) => { 
    const {userId, pausedTrainingData} = req.body;
    User.findByIdAndUpdate(userId, {$push: {'pausedTrainings': pausedTrainingData}}, {new: true}, (err, data) => {
         const responseObject = {
             responseCode: 1,
             message: 'training had paused'
         }
         res.send(responseObject)
    })
};

module.exports = middleware;