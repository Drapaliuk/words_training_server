const mongoose = require('mongoose');

const pausedTrainingSchema = new mongoose.Schema({
    timestamp: Date,
    data: Object,
    serviceInfo: Object
})

module.exports = pausedTrainingSchema;