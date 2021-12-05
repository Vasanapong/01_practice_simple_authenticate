require('dotenv').config()
const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String
})
mongoose.connect(process.env.MONGO_LINK)
module.exports = mongoose.model('users',UserSchema)