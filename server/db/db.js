const mongoose  = require('mongoose');//faircent
require("dotenv").config()
module.exports = mongoose.connect(process.env.MONGO_URL);