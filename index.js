const http = require('http');
var cookieSession = require('cookie-session')
const express = require('express');
const fs = require('fs');
let cors = require('cors');
let bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const { type } = require('os');
const e = require('express');
const { on } = require('process');
const educationPlanCreator = require('./logic/create_education_plan')
const bcrypt = require('bcrypt');
const DBname = 'wordtrainer';


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
    }

    
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
       console.log(postData)
       Users.findByIdAndUpdate(userId, {"profileSettings": postData}, {new: true}, (err, data) => {
           if(err) res.send(err);
           console.log('data', data)
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
                            console.log(createdObject)
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
        let kitName = req.query.setname
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

app.route('/taskCards')
   .post((req, res) => {
        console.log('REQUEST BODY!!!', req.body)
   })

app.route('/trainingResult')
   .post((req, res) => {
       console.log(req.body[0])
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

       res.send(result)

   })


app.route('/userVocabulary')
    .get((req, res) => {
        Wordsset.find({'serviceInfo.setName':'city'}, {_id:0}, (err, data) => { //!от як шукати в підпапках
            res.json(data[0].words)
        })
    })

    .post((req, res) => {
        if(req.body) {
            res.send({responseCode: 1})
        }

        res.send({responseCode: 0})
    })
    
    .delete((req, res) => {
        if(req.body) {
            res.send({responseCode: 1})
        }
        res.send({responseCode: 0})
    })



app.route('/userWordSet')
   .post((req, res) => {
       console.log(req.body)
       if(req.body) {
           const payload = [
               {
                  serviceInfo: {setName: req.body.wordSetName},
                  words: [...req.body.words]
                }
           ]
           console.log(payload)
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