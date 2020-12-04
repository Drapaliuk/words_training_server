const WordsKit = require('../../../db/models/words_kit/words_kit_model');
const Word = require('../../../db/models/word/word_model');

const middlewares = {
    get: (req, res) => {
        let kitId = req.query.kitId;
        WordsKit.findById(kitId, (err, data) => {
            const wordsIds = data.words
            Word.find({'_id': {$in: wordsIds}}, {__v: 0}, (err, data) => {
                res.json(data)
            })
        })
    }
}

module.exports = middlewares;