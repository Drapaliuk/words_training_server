var express = require('express');
var router = express.Router();
const User = require('../../db/models/user/user_model');

router.post('/', (req, res) => { 
       const {userId, pausedTrainingData} = req.body;
       User.findByIdAndUpdate(userId, {$push: {'pausedTrainings': pausedTrainingData}}, {new: true}, (err, data) => {
            const responseObject = {
                responseCode: 1,
                message: 'training had paused'
            }
            res.send(responseObject)
       })
   })

   .get('/', (req, res) => {
    const userId = req.query.userId;
    const pausedTrainingId = req.query.pausedTrainingId

    User.findById(userId, {__v: 0})
         .then((userObject) => {
             const { pausedTrainings } = userObject;
             const pausedTraining = pausedTrainings.find(el => el._id.toString() === pausedTrainingId);
             res.send(pausedTraining)
         });
   })

   .delete('/', (req, res) => {
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
    })
   
   .get('/all', (req, res) => {
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
   })

module.exports = router;
