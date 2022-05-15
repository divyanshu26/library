var express = require('express');

router = express.Router();

var Auth = require('./controllers/authentication.controller');

router.post('/signup',Auth.signup);


module.exports = router;