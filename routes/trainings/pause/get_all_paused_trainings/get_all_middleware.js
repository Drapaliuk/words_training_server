const User = require('../../../../db/models/user/user_model');

const middleware = (req, res) => {
    const userId = req.query.userid;
    User.findById(userId, {__v: 0})
         .then((userObject) => {
             const { pausedTrainings } = userObject;
             const pausedTrainingMainServiceInfo = pausedTrainings.map(el => {
                 const {_id, serviceInfo } = el
                 return {_id, serviceInfo}
             })
             const responseObject = {
                 responseCode: 1,
                 serverPayload: pausedTrainingMainServiceInfo
             }
             res.send(responseObject)
         })
}

module.exports = middleware;