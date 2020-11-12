const User = require('../../../../db/models/user/user_model');

const middleware = (req, res) => {
    const { userId, pausedTrainingId } = req.body;
    User.findByIdAndUpdate(userId, {$pull: {'pausedTrainings': {_id: pausedTrainingId}}}, {new: true})
         .then(data => {
             const responseObject = {
                 responseCode: 1,
                 message: 'paused training had deleted!',
                 deletedPausedTrainingId: pausedTrainingId
             }
             res.send(responseObject)

         })
}

module.exports = middleware;