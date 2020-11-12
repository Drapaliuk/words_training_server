const User = require('../../../../db/models/user/user_model');

const middleware = (req, res) => {
    const userId = req.query.userId;
    const pausedTrainingId = req.query.pausedTrainingId;

    User.findById(userId, {__v: 0})
         .then((userObject) => {
             const { pausedTrainings } = userObject;
             const pausedTraining = pausedTrainings.find(el => el._id.toString() === pausedTrainingId);
             res.send(pausedTraining)
         });
}

module.exports = middleware;