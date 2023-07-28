const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    passWord : {
        type : String,
        required : true
    }
})

const Users  = model("user", userSchema);
module.exports = Users;