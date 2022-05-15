const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

//Define model

const userSchema = new Schema({
    email: {type:String, unique:true,lowercase:true},
    password: String
});

userSchema.pre('save',function(next){
    const user = this;
   
    bcrypt.genSalt(10,function(err,salt){
        
        if(err)return next(err);
        console.log(salt);
        bcrypt.hash(user.password,salt , function(err, hash){
            if(err) return next(err);
            console.log('pre');
            user.password  =  hash;
            next();
        });
    });
});



//Create model class



const ModelClass = mongoose.model('user', userSchema);

//Export the model

module.exports = ModelClass;