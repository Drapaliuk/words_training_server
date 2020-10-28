const http = require('http');
var cookieSession = require('cookie-session')
const express = require('express');
const fs = require('fs');
let cors = require('cors');
let bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
// const { type } = require('os');
// const e = require('express');
const { on } = require('process');
const educationPlanCreator = require('./logic/create_education_plan')
const bcrypt = require('bcrypt');
const DBname = 'wordtrainer';
const getRandomElementsById = require('./logic/getRandomElementsById');
const taskCardCreator = require('./logic/taskCardCreator');
const mixingElements = require('./logic/mixingElements');
const session = require('express-session');


const port = 8888;

const words2 = [
    
]

const a = 1;

mongoose.connect('mongodb://localhost:27017', {
        useNewUrlParser: true, 
        dbName: DBname,
        useCreateIndex: true,
        useUnifiedTopology: true,
        keepAlive: true,
        keepAliveInitialDelay: 3000

    })
    .catch((error) => {
        console.log('fuck some problem with connecting, you are not connected to db')
    })

const db = mongoose.connection

db.once('open', () => {
    console.log(`connected to ${DBname}`)
})

db.on('error', () => {
    console.log('you are connected to db? but you have some problem with current connection')
})

const wordSchema  = new mongoose.Schema({
    eng: String,
    ukr: String,
})


const Word = mongoose.model('words', wordSchema)

const WordsKitSchema = new mongoose.Schema({
    serviceInfo: {
        type: Object,
        name: String,
    },
    words: Array
})

const WordKit = mongoose.model('word_kits', WordsKitSchema)


const wordsSetsSchema = new mongoose.Schema({
    serviceInfo: {
        type: Object,
        setName: String,
        wordsAmmount: Number,
    },

    words: {
        type: Array,
    }
})

const wordsSchema = new mongoose.Schema({
        serviceInfo: {
            setName: String,
            wordAmount: Number
        },

        words: [wordSchema]
})



const Wordsset = mongoose.model('wordssets', wordsSchema) // its colection

WordKit.find({'serviceInfo.name': 'city'}, (err, data) => { //!повертає слова певного набору
    const wordsId = data[0].words
    Word.find({'_id': {$in: wordsId}}, {__v: 0}, (err, words) => {
        // console.log(words)
    })
})

WordKit.find({}, {__v: 0, words: 0}, (err, data) => { //! повертає колекцію службових даних про всі набори слів
    // console.log(data)
})

const pausedTrainingSchema = new mongoose.Schema({
    timestamp: Date,
    data: Object
})

const userSchema = new mongoose.Schema({
    login: String,
    password: String,

    profileSettings: {
        language: String,
        theme: String
    },

    bio: {
        firstName: String,
        lastName: String,
        age: String,
        birthDay: String,
        national: String,
        sex: String,
        country: String,
        town: String,
    },
    vocabulary: [],
    pausedTrainings: [pausedTrainingSchema]
})

const Users = mongoose.model('users', userSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.set('trust proxy', 1)
app.use(cookieSession({
    name: 'session',
    keys:['key1', 'key2']
}))


const errors = (req, res) => {
    return res.send('end')
}


app.route('/trainingpause')
   .post((req, res) => {
       const userId = req.body.userId;
       const postData = req.body.pausedTrainingData;
       const data = {data: req.body.pausedTrainingData, timestamp: Date.now()}
       console.log('postData', postData)
       Users.findByIdAndUpdate(userId, {$push: {'pausedTrainings': data}}, {new: true}, (err, data) => {
            console.log(data)
            const responseObject = {
                responseCode: 1,
                message: 'training had paused'
            }
            res.send(responseObject)
       })
   })

   .get((req, res) => {
    const userId = req.query.userId;
    const pausedTrainingId = req.query.pausedTrainingId
    Users.findById(userId, {__v: 0})
         .then((userObject) => {
             const { pausedTrainings } = userObject;
             const pausedTraining = pausedTrainings.find(el => el._id === pausedTrainingId);
             res.send(pausedTraining)
         });
   })

   .delete((req, res) => {
    const userId = '5f8a3ab15c690828c0778a43';
    const pausedTrainingId = req.body.pausedTrainingId;
    Users.findByIdAndUpdate(userId, {$pull: {'pausedTrainings': pausedTrainingId}}, {new: true})
         .then(data => {
             console.log(data)
             const responseObject = {
                 responseCode: 1,
                 message: 'paused training had deleted'
             }
             res.send(responseObject)

         })
})

   

app.route('/trainingpause/all')
   .get((req, res) => {
        const userId = req.query.userId;
        Users.findById(userId, {__v: 0})
             .then((userObject) => {
                 const { pausedTrainings } = userObject;
                 res.send(pausedTrainings)
             })
   })




app.route('/userbiography')
   .post((req, res) => {
        const userId = req.body.userId;
        const postData = req.body.data;
        Users.findByIdAndUpdate(userId, {'bio': postData}, {new: true}, (err, data) => {
            if(err) return res.send(err)
            return res.send({responseCode: 1})
        })
   })


   .get((req, res) => {
       const userId = req.query.userid;
       Users.findById(userId, {"bio": true} , { __v: 0, _id: 0, login: 0, password: 0, wordKits: 0, trainingResults: 0 })
             .then((data) => res.send({ responseCode: 1, personalData: data.bio }));
   })

//!віз креденшеналс зробити, я так можу будь чиї дані потягнути;

app.route('/userprofilesettings')
   .post((req, res) => {
       const userId = req.body.userId
       const postData = req.body.data;
       Users.findByIdAndUpdate(userId, {"profileSettings": postData}, {new: true}, (err, data) => {
           if(err) res.send(err);
           res.send({responseCode: 1})
       })
   })


   .get((req, res) => {
        const userId = req.query.userid;
        Users.findById(userId, {"profileSettings": true}, { __v: 0, _id: 0, login: 0, password: 0, wordKits: 0, trainingResults: 0 })
             .then(data => res.send(data.profileSettings))
   })
   
   

app.route('/login')
   .post((req, res) => {
        const login = req.body.login;
        const password = req.body.password
        Users.find({login: login})
             .then((foundUser, err) => {
                 if(err) throw err;
                 if(foundUser.length === 1) {
                     bcrypt.compare(password, foundUser[0].password, function(err, result) {
                         if(err) throw err;
                         if(result) {
                            const responseObject = {
                                responseCode: 1,
                                message: 'user has found',
                                errMessage: err,
                                userId: foundUser[0]._id
                            }

                             return res.send(responseObject)
                         }
 
                         return  res.send({responseCode: 2})
                     })
                     return
                 }
                 return res.send('Такий користувач не зареєстрований')
             })
   })

app.route('/signin')
   .post((req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    Users.find({login: login})
         .then((data, err) => {
            if(err) throw err
            if(data.length === 0) {
                bcrypt.hash(password, 10)
                      .then(hash => {
                        const userObject = {
                            login: login,
                            password: hash
                        }
                        Users.create(userObject, (err, createdObject ) => {
                           if(err) res.send({responseCode: 3, errMessage: err})
                                const successResponse = {
                                    responseCode: 1,
                                    message: 'user has created',
                                    errMessage: err,
                                    userId: createdObject._id
                                }
                                return res.send(successResponse)
                        } )
                      })
                return
            }
            const mistakeResponse = {
                responseCode: 2,
                message: 'this login has already in use',
                errMessage: err
            }

            return res.send(mistakeResponse)
         })
})


app.route('/words')
    .get((req, res) => {
        let kitName = req.query.setname;

        WordKit.find({'serviceInfo.name': kitName}, (err, data) => { //!повертає слова певного набору
            const wordsId = data[0].words
            Word.find({'_id': {$in: wordsId}}, {__v: 0}, (err, data) => {
                res.json(data)
            })
        })
    })

app.route('/setsNames') //! переробити пошук по _id
   .get((req, res) => {
        WordKit.find({}, {__v: 0, words: 0}, (err, data) => { //! повертає колекцію службових даних про всі набори слів
            res.json(data)
        })
   })


app.route('/vocabularyTest')
   .get((req, res) => {
       Wordsset.find((err, data) => {
            const oneSet = data.find((el) => el.serviceInfo.setName === 'travel');
            res.send(oneSet.words)
       })
   })




app.route('/mixWords/') //!remake to post with ids of selected words
   .post((req, res) => {
        Word.find({}, {__v: 0}, (err, data) => {
            res.send(data)
        })
   })

app.route('/mixTasks')
   .post((req, res) => {
    const selectedWordsIds = req.body;
    const selectedWordsAmount = selectedWordsIds.length;
    const needWordsForMixing = selectedWordsAmount * 3;

    Word.find({'_id': {$in: selectedWordsIds}}, {__v: 0})
        .then(selectedWords => {
            console.log(selectedWords)
            const scheduleTaskCard = educationPlanCreator(selectedWords);
            return scheduleTaskCard
        })
        .then(scheduleTaskCard => {
            Word.find({}, {__v: 0}).then(allWords => {
                const wordsForMixingIds = getRandomElementsById(allWords, needWordsForMixing, selectedWordsIds)
                Word.find({'_id': {$in: wordsForMixingIds}})
                    .then(wordsForMixing => {
                        const tasks = scheduleTaskCard.map(taskObject => {
                            if(taskObject.trainingId === '001') {
                                const tasks = taskCardCreator([taskObject], wordsForMixing)
                                return tasks[0]
                            }
        
                            if(taskObject.trainingId === '002') {
                                return mixingElements([...taskObject[taskObject.answerLang]]) 
                            }
                        })

                        const responseObject = {
                            tasks,
                            scheduleTaskCard
                        }

                        res.send(responseObject)
                        return
                    })
            })
        })
   })   

app.route('/taskCards')
   .post((req, res) => {
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


app.route('/taskLatter')
   .post((req, res) => {
        const selectedWordsIds = req.body;
        console.log('asdasdasdasd', selectedWordsIds);
        
        Word.find({'_id': {$in: selectedWordsIds}})
            .then(selectedWords => {
                const scheduleTaskCard = educationPlanCreator(selectedWords);
                const tasks = scheduleTaskCard.map(word => mixingElements([...word[word.answerLang]]));
                const responseObject = {
                    scheduleTaskCard,
                    tasks
                }


                res.json(responseObject)
            })
   })




// Word.find({}) //! recycle! why???
//     .then(words => {
//         const randomWords = getRandomElementsById(words, 6, ['2dwe']);
//         console.log(randomWords)
//         return randomWords
//     })
//     .then(randomWordsIds => {
//         return Word.find({'_id': {$in: randomWordsIds}}) //!!!!!!
//     })
//     .then(randomWords => {
//         let ids = randomWords.map(el => el._id);

//         // console.log(randomWords)
//         const toJson = JSON.stringify(ids, null, 2)
//         fs.writeFile('words.json', toJson,'utf-8', () => {
//             return
//         })
//         return 
//     })

app.route('/trainingResult')
   .post((req, res) => {
        console.log('trainingResult', req.body)
        const result = req.body.reduce((acc, el, idx, arr) => {
            if(el.trainingId === '001') {
                if(el.isSkipped) {
                    acc.push({...el, amountMistakes: el.answerDetails.length})
                    return acc
                }

                if(!el.isSkipped) {
                    acc.push({...el, amountMistakes: (el.answerDetails.length - 1)})
                    return acc
                }
            }

            if(el.trainingId === '002') {
                let amountMistakes = 0;
                el.answerDetails.forEach(el => {
                    amountMistakes += (el.choosenVariants.length - 1);
                });
                acc.push({...el, amountMistakes})
                return acc
            }

        }, [])
        console.log(result)
    //    res.send(result)
        res.send(req.body)

   })


app.route('/userVocabulary')
    .get((req, res) => {
        const userId = req.query.userid;
        Users.findById({'_id': userId}, (err, user) => {
            const userVocabularyIds = user.vocabulary;
            console.log('userVocabularyIds', userVocabularyIds)
            Word.find({'_id': {$in: userVocabularyIds}}, (err, vocabularyWords) => {
                res.send(vocabularyWords)
            })
        })
    })

    .post((req, res) => {
        const userId = req.body.userId;
        const wordId = req.body.wordId;

        if(userId && wordId) {
            Users.findByIdAndUpdate({'_id': userId}, {$push: {'vocabulary': wordId} }, {new: true}, (err, data) => {
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
    })
    
    .delete((req, res) => {
        const userId = '5f8a3ab15c690828c0778a43';
        const wordId = req.body.wordId;
        Users.findByIdAndUpdate({'_id': userId}, {$pull: {'vocabulary': wordId}}, {new: true}, (err, data, q) => {
            return res.send({
                        responseCode: 1,
                        message: `${wordId} had deleted`,
                        deletedWordId: wordId
                    })

        })
    })



app.route('/userWordSet')
   .post((req, res) => {
       if(req.body) {
           const payload = [
               {
                  serviceInfo: {setName: req.body.wordSetName},
                  words: [...req.body.words]
                }
           ]
           res.send({responseCode: 1, payload})
           res.end()
       }
       res.send({responseCode: 0})
   })

app.route('/educationPlan') //в цей мідлвар мають приходити тільки 
   .post((req, res) => {
        const serverPayload = educationPlanCreator(req.body)
        res.send(serverPayload)

   })




app.listen(port, () => {
    console.log('Server is working!')
})