const mongoose = require('mongoose');
const pausedTrainingSchema = require('../paused_trainings/paused_trainings_schema');

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

module.exports = userSchema;