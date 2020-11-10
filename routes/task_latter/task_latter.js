var express = require('express');
var router = express.Router();
const Word = require('../../db/models/word/word_model');
const educationPlanCreator = require('../../utils/create_education_plan/create_education_plan');
const mixingElements = require('../../utils/mixingElements/mixingElements');

router.post('/', (req, res) => {
    const selectedWordsIds = req.body;
    // console.log('selectedWordsIds', selectedWordsIds)
    Word.find({'_id': {$in: selectedWordsIds}})
        .then(selectedWords => {
            console.log('selectedWords', selectedWords)
            const scheduleTaskCard = educationPlanCreator(selectedWords);
            const tasks = scheduleTaskCard.map(word => mixingElements([...word[word.answerLang]]));
            const responseObject = {
                scheduleTaskCard,
                tasks
            }

            res.json(responseObject)
        })
})

module.exports = router;
