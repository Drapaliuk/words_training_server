const Word = require('../../../../db/models/word/word_model');
const getRandomElementsById = require('../../../../utils/getRandomElementsById/getRandomElementsById');
const taskCardCreator = require('../../../../utils/taskCardCreator/taskCardCreator');
const educationPlanCreator = require('../../../../utils/create_education_plan/create_education_plan');
const mixingElements = require('../../../../utils/mixingElements/mixingElements');



const middlewares = {
    post:(req, res) => {
        const selectedWordsIds = req.body;
        const selectedWordsAmount = selectedWordsIds.length;
        const needWordsForMixing = selectedWordsAmount * 3;
        
        Word.find({'_id': {$in: selectedWordsIds}}, {__v: 0})
            .then(selectedWords => {
                console.log(selectedWords)
                const scheduleTaskCard = educationPlanCreator(selectedWords);
                return scheduleTaskCard
            })
            .then(scheduleTaskCard => {
                Word.find({}, {__v: 0}).then(allWords => {
                    const wordsForMixingIds = getRandomElementsById(allWords, needWordsForMixing, selectedWordsIds)
                    Word.find({'_id': {$in: wordsForMixingIds}})
                        .then(wordsForMixing => {
                            const tasks = scheduleTaskCard.map(taskObject => {
                                if(taskObject.trainingId === '001') {
                                    const tasks = taskCardCreator([taskObject], wordsForMixing)
                                    return tasks[0]
                                }
            
                                if(taskObject.trainingId === '002') {
                                    return mixingElements([...taskObject[taskObject.answerLang]]) 
                                }
                            })
    
                            const responseObject = {
                                tasks,
                                scheduleTaskCard
                            }
    
                            res.send(responseObject)
                            return
                        })
                })
            })
    }
}

module.exports = middlewares;