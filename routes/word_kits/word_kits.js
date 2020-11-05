var express = require('express');
var router = express.Router();
const WordsKit = require('../../db/models/words_kit/words_kit_model');

router.get('/', (req, res) => { //! переробити
    
    WordsKit.find({}, {__v: 0, words: 0}, (err, data) => { //! повертає колекцію службових даних про всі набори слів
        res.json(data)
    })

    // WordsKit.find((err, data) => {
    //     console.log(data)
    //     let arr = data.reduce((acc, el, idx, arr) => {
    //         acc.push(el.serviceInfo.setName)
    //         return acc
    //     }, [])
    //     res.json(arr)
    // })
    })

module.exports = router;