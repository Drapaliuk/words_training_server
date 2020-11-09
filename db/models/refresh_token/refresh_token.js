const mongoose = require('mongoose');
const refreshTokenSchema = require('../../schemas/refresh_token/refresh_token');

const RefreshTokenModel = mongoose.model('refresh_tokens', refreshTokenSchema) 

module.exports = RefreshTokenModel;