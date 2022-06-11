var express = require('express');

router = express.Router();

var Auth = require('./controllers/authentication.controller');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignIn = passport.authenticate('local',{session:false});

router.get('/',requireAuth,(req,res)=>{
    res.send({hi:'there'});
});

router.post('signin',requireSignIn,(req,res)=>{
    res.send({hi:'signin'});
})

router.post('/signup',Auth.signup);


module.exports = router;