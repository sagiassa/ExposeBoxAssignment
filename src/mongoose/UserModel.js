const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    FullName: String,
    Email: String,
    UserName: String,
    Password: String,
})

const User = mongoose.model("user", UserSchema)
module.exports = User
