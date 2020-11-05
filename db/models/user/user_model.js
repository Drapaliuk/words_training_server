const mongoose = require('mongoose');
const userSchema = require('../../schemas/user/user_schema');

const User = mongoose.model('users', userSchema);

module.exports = User;

