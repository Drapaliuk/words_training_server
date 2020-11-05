var express = require('express');
var router = express.Router();
const Word = require('../../db/models/word/word_model');

const getRandomElementsById = require('../../utils/getRandomElementsById/getRandomElementsById');
const taskCardCreator = require('../../utils/taskCardCreator/taskCardCreator');
const educationPlanCreator = require('../../utils/create_education_plan/create_education_plan');

router.post('/', (req, res) => {
    const selectedWordsIds = req.body;
    const selectedWordsAmount = selectedWordsIds.length;
    const needWordsForMixing = selectedWordsAmount * 6; // зробити, щоб налаштовувати величину карток


    Word.find({}, {__v: 0}, (err, allWords) => {
        const randomWordsForMixing = getRandomElementsById(allWords, needWordsForMixing, selectedWordsIds);

        Word.find({'_id': {$in: randomWordsForMixing}}, (err, wordsForMixing) => {
            Word.find({'_id': {$in: selectedWordsIds}}, {__v: 0}, (err, selectedWords) => {
                const scheduleTaskCard = educationPlanCreator(selectedWords); //тут не треба дублювати переклади просто айдішніки і особливості завдання
                const variantList = taskCardCreator(scheduleTaskCard, wordsForMixing);
                const responseObject = {
                    variantList,
                    scheduleTaskCard
                }
                res.send(responseObject)
            })
        })
    })
})

module.exports = router;