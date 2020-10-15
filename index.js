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
    ua: String,
})

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
console.log(Wordsset)

const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    language: String,
    bio: {
        name: String,
        age: Number,
        birthDay: Number,
        sex: String,
        country: String,
        town: String
    },
    wordKits: [], //make schema for every elements of array
    trainingResults: []

   
})

const Users = mongoose.model('users', userSchema)


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


app.route('/biography')
   .put((req, res) => {
       const userId = req.body.userId;
        console.log(req.body)
        Users.findByIdAndUpdate('5f82ee64f1cb7f345ce05193', {language: 'eng'}, {new: false})
             .then((data) => console.log(data))
             
        res.end()
   })

   .get((req, res) => {
        const userId = req.body.userId;
        Users.findById(userId, {language: true, login: true, password: true},  {__v: 0, _id: 0, login: 0, password: 0})
             .then(data => res.send(data))
   })

   
   

app.route('/login')
   .post((req, res) => {
        const login = req.body.login;
        const password = req.body.password
        // console.log('req.session', req.session)
        Users.find({login: login}, {_id:0})
             .then((data, err) => {
                 if(err) throw err;
                 console.log(data)
                 if(data.length === 1) {
                     console.log('inside')
                     bcrypt.compare(password, data[0].password, function(err, result) {
                         if(err) throw err;
                         console.log('result', result)
                         if(result) {
                             return res.status(200).send({responseCode: 1})
                         }
 
                         return  res.status(403).send({responseCode: 0})
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
    console.log("req.body", req.body)
    Users.find({login: login}, {_id: 0})
         .then((data, err) => {
            if(err) throw err
            if(data.length === 0) {
                bcrypt.hash(password, 10)
                      .then(hash => {
                        const userObject = {
                            login: login,
                            password: hash
                        }
                        console.log('user object', userObject)
                        Users.create(userObject, (err, createdObject ) => {
                           if(err) res.send({responseCode: 3, errMessage: err})
                           
                           
                                const responseObject = {
                                    responseCode: 1,
                                    message: 'user has created',
                                    errMessage: err
                                }
                                return res.send(responseObject)
                            
                        } )
                      })
                return
            }
            const responseObject = {
                responseCode: 1,
                message: 'this login has already in use',
                errMessage: err
            }

            return res.send(responseObject)
         })
})


app.route('/words')
    .get((req, res) => {
        let setname = req.query.setname
        Wordsset.find({'serviceInfo.setName':setname}, {_id:0}, (err, data) => { //!от як шукати в підпапках
            res.json(data[0].words)
        })
    })

app.route('/setsNames') //! переробити пошук по _id
   .get((req, res) => {
        Wordsset.find((err, data) => {
            let arr = data.reduce((acc, el, idx, arr) => {
                acc.push(el.serviceInfo.setName)
                return acc
            }, [])
            res.json(arr)
        })
   })

app.route('/vocabularyTest')
   .get((req, res) => {
       Wordsset.find((err, data) => {
            const oneSet = data.find((el) => el.serviceInfo.setName === 'travel');
            res.send(oneSet.words)
       })
   })




app.route('/mixWords/')
   .get((req, res) => {
        Wordsset.find((err, data) => {
            let mathLogic = Math.ceil(((req.query.wordsAmmount * 5)) / (data.length - 1)) //! переглянути формулу

            let responseArr = data.reduce((acc, el, id, arr) => { //! переробити пошук по _id
                if(el.serviceInfo.setName === req.query.selectedset) { //! в базі даних змінити setName на name
                    return acc
                }

                for(let i = 0; i < mathLogic; i++) {
                    acc.push(el.words[i])
                }

                return acc

            }, [])
            res.send(responseArr)
        })
   })
app.route('/trainingResult')
   .post((req, res) => {
       console.log(req.body)
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