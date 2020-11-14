const express = require('express');
const router = express.Router();
const personalDataMiddlewares = require('./personal_data/personal_data_middlewares');

router.post('/personaldata', personalDataMiddlewares.post)
      .get('/personaldata', personalDataMiddlewares.get)

module.exports = router;