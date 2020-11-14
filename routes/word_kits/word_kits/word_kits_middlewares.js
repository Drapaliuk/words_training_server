const WordsKit = require('../../../db/models/words_kit/words_kit_model');

const middlewares = {
    get: (req, res) => { //! переробити
        WordsKit.find({}, {__v: 0, words: 0}, (err, data) => { 
            res.json(data)
        })
    }
}

module.exports = middlewares;