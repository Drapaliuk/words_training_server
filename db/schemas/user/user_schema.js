const mongoose = require('mongoose');
const pausedTrainingSchema = require('../paused_trainings/paused_trainings_schema');
const wordsKitSchema = require('../../schemas/words_kit/words_kit_schema');
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../../models/user/user_model');

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
    pausedTrainings: [pausedTrainingSchema],
    savedWordsKits: [wordsKitSchema] 
});

// userSchema.plugin(passportLocalMongoose)

// userSchema.methods.validPassword = function(deliveredPassword) {
//     return bcrypt.compare(deliveredPassword, this.password, (err, result) => {
//         return result
//     })
// }



module.exports = userSchema;