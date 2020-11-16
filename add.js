const VocabularyTestModel = require('./db/models/knowledge_tests/vocabulary_test_model');
const WordModel = require('./')

const obj = {
    serviceInfo: {
        name: 'vocabulary_test'
    },
    words: ["5f8dfd9774838c3fa8377330",
    "5f8dfd9774838c3fa8377331",
    "5f8dfd9774838c3fa8377332",
    "5f8dfd9774838c3fa837733f",
    "5f8dfd9774838c3fa8377340",
    "5f8dfd9774838c3fa8377341",
    "5f8dfd9774838c3fa837734c",
    "5f8dfd9774838c3fa837734d",
    "5f8dfd9774838c3fa837734e",
    "5f8dfd9774838c3fa837734b",
    "5f8dfd9774838c3fa837734c",
    "5f8dfd9774838c3fa837734d",
    "5f8dfd9774838c3fa8377333",
    "5f8dfd9774838c3fa8377334",
    "5f8dfd9774838c3fa8377335",
]
}


VocabularyTestModel.create(obj, {new: true}).then(created => console.log(created))
console.log('Hello worlds')