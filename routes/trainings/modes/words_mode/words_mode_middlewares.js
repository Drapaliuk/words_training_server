const Word = require('../../../../db/models/word/word_model');
const getRandomElementsById = require('../../../../utils/getRandomElementsById/getRandomElementsById');
const taskCardCreator = require('../../../../utils/taskCardCreator/taskCardCreator');
const educationPlanCreator = require('../../../../utils/create_education_plan/create_education_plan');

const middlewares = {
    post: (req, res) => {
        const { selectedWordsIds, applicationLanguage, selectedLanguagePair} = req.body
        const selectedWordsAmount = selectedWordsIds.length;
        const needWordsForMixing = selectedWordsAmount * 6; // зробити, щоб налаштовувати величину карток
    
        Word.find({}, {__v: 0}, (err, allWords) => {
            const randomWordsForMixing = getRandomElementsById(allWords, needWordsForMixing, selectedWordsIds);
    
            Word.find({'_id': {$in: randomWordsForMixing}}, (err, wordsForMixing) => {
                Word.find({'_id': {$in: selectedWordsIds}}, {__v: 0}, (err, selectedWords) => {
                    const scheduleTaskCard = educationPlanCreator(selectedWords, applicationLanguage, selectedLanguagePair);
                    const variantList = taskCardCreator(scheduleTaskCard, wordsForMixing);
                    const responseObject = {
                        variantList,
                        scheduleTaskCard
                    }
                    res.send(responseObject)
                })
            })
        })
    }
}

module.exports = middlewares;