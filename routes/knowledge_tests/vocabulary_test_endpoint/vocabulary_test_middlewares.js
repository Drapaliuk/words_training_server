const WordsKit = require('../../../db/models/words_kit/words_kit_model');


const middlewares = {
    get: (req, res) => {
        return res.end()
        // WordsKit.find((err, data) => {
        //      const oneSet = data.find((el) => el.serviceInfo.setName === 'travel');
        //      res.send(oneSet.words)
        // })
    }
}
  

module.exports = middlewares;