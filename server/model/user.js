const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    phoneNo : {
        type : Number,
        required : true
    },
    passWord : {
        type : String,
        required : true
    }
})

const Users  = model("user", userSchema);
module.exports = Users;