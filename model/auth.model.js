const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    fullName: {type: String},
    email: {type: String},
    phone: {type: Number},
    password: {type: String},
    confirmPassword: {type: String},
})

const AuthModel = mongoose.model("auth",authSchema);


module.exports={
    AuthModel
}