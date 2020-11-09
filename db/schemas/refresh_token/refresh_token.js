const mongoose = require('mongoose');
const refreshTokenSchema = new mongoose.Schema({
    userId: String,
    token: String
})

module.exports = refreshTokenSchema;