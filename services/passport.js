const passport = require('passport');
const User = require('../models/user');
const config  = require('../config');
const { compileFile } = require('jade/lib');
const JwtStrategy= require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions,(email,password,done)=>{
    User.findOne({email:email},(err,user)=>{
        if(err)return done(err,false);

        if(user){
            user.comparePassword(password,(err,isMatch)=>{
                if(err) return done(err);

                if(!isMatch) return done(null,false);

                done(null,user);
            })
        }else{
            done(null,false);
        }
    });
})

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions,(payload,done)=>{
    User.findOne({email:payload.sub},(err,user)=>{ 
        if(err)return done(err,false);

        if(user){
            
            done(null,user);
        }else{
            done(null,false);
        }
    });
})

passport.use(jwtLogin);
passport.use(localLogin);

//module.exports = jwtLogin;