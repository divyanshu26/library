const passport = require('passport');
const User = require('../models/user');
const config  = require('../config');
const passport_Jwt = require('passport-jwt').Strategy; 
const ExtractJwt = require('passport-jwt').ExtractJwt;