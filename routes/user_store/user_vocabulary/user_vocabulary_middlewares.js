const User = require('../../../db/models/user/user_model');
const Word = require('../../../db/models/word/word_model');

const middlewares = {
    get: (req, res) => {
            const userId = req.query.userid;
            User.findById({'_id': userId}, (err, user) => {
                const userVocabularyIds = user.vocabulary;
                console.log('userVocabularyIds', userVocabularyIds)
                Word.find({'_id': {$in: userVocabularyIds}}, (err, vocabularyWords) => {
                    res.send(vocabularyWords)
                })
            })
    },

    post: (req, res) => {
            const userId = req.body.userId;
            const wordId = req.body.wordId;

            if(userId && wordId) {
                User.findByIdAndUpdate({'_id': userId}, {$push: {'vocabulary': wordId} }, {new: true}, (err, data) => {
                    console.log('POST', data)
                return res.send({
                                  responseCode: 1,
                                  message: `${wordId} had saved`,
                                  savedWordId: wordId
                                })
                })
                return
            }

            res.send({responseCode: 0})
    },
    
    delete: (req, res) => {
                const userId = '5f8a3ab15c690828c0778a43';
                const wordId = req.body.wordId;
                User.findByIdAndUpdate({'_id': userId}, {$pull: {'vocabulary': wordId}}, {new: true}, (err, data, q) => {
                    return res.send({
                                responseCode: 1,
                                message: `${wordId} had deleted`,
                                deletedWordId: wordId
                            })
                        
                })
            }   
}

module.exports = middlewares;