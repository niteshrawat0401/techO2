const {model, Schema} = require('mongoose');

const userDataSchema = new Schema({
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
    userid : {
        type: String
    }
})

const UserData  = model("userData", userDataSchema);
module.exports = UserData;