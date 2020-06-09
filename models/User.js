const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

const UserSchema=new Schema({
    email:{
        type: String,
        // index: { unique: true },
        // lowercase: true,
        //match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: "email is not valid"
    },
    password:{
        type: String,
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, "Please enter a valid password"],
        required: "password is Required"
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    phone:{
        type:String
    }
});
UserSchema.plugin(findOrCreate);
const User = mongoose.model('User', UserSchema);
module.exports=User;