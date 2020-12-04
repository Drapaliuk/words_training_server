const Word = require('../../../../db/models/word/word_model');
const educationPlanCreator = require('../../../../utils/create_education_plan/create_education_plan');
const mixingElements = require('../../../../utils/mixingElements/mixingElements');

const middlewares = {
    post: (req, res) => {
        const { selectedWordsIds, applicationLanguage, selectedLanguagePair} = req.body


        Word.find({'_id': {$in: selectedWordsIds}})
            .then(selectedWords => {
                
                const scheduleTaskCard = educationPlanCreator(selectedWords, applicationLanguage, selectedLanguagePair);

                console.log('scheduleTaskCard', scheduleTaskCard)
                const tasks = scheduleTaskCard.map(word => mixingElements([...word[word.answerLang]]));
                const responseObject = {
                    scheduleTaskCard,
                    tasks
                }
    
                res.json(responseObject)
            })
    }
}

module.exports = middlewares;