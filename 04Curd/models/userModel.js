const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        trim: true, // if extra space present  at last then remove it
        maxLength: [50, "Name must be less than 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    }
})

module.exports = mongoose.model("User", userSchema)

