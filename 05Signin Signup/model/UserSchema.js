/* in userschema
The first object defines the fields and their configurations for the documents.
The second object allows you to specify schema-level options, including but not limited to timestamps, which affects how documents behave at a higher level.
*/

const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "username is required"], //this will show as a error if user not fill the name
            /*
                we can give implement errors in 3 places
                1. in client side. ex- if user fill incorrect details then throw the error
                2. in controllers: when request comes in controllers
                3. in when we go to store the data in db, like here we using 
            */
            minLength: [5, "Min. length should be 5"],
            maxLength: [50, "Max length is 50"],
            trim: true // used where we user gives the space in starting
        },
        email: {
            type: String,
            required: [true, "required email"],
            unique: true,
            lowercase: true, //store in lower case
            unique: [true, "Email must be unique"]
        },
        password: {
            type: String,
            select: false //it means that by default, when you retrieve documents from the database, this field will not be included in the results
        },
        forgetParwordToken: {
            type: String
        },
        forgetParwordExpiryDate: {
            type: Date
        }
    },
    {
        timestamps: true  // its purular not singular
    }
)

// use foolowing to encript the passowrd or from collntroller when we signup
userSchema.pre('save',async function(next){ // pre middleware allplied to all instances of userSchema
    if(!this.isModified('password')) return next(); // ager password modify nhi hua tho kuch mat karo return ho jao, this refers to instance of userSchema which is document schema
    this.password = await bcrypt.hash(this.password,10);//encript the password
    return next();
}) 
//defining method
userSchema.methods = {
    jwtToken() {
        return JWT.sign({ id: this._id, email: this.email }, process.env.SECRET, { expiresIn: '24h' })  //JWT (JSON WEB SOCKETs) sign() method returns token and if callback is passed then it have (err, token)
        // return JWT.sign({ id: this._id, email: this.email }, process.env.SECRET, { expiresIn: '24h' },(err, token)=>{
        //     res.json({
        //         token
        //     })
        // })
    }
}
const userModel = mongoose.model("user", userSchema); //jo mongodb mai user collection hai usme jo bhi data ayega vo userShchema ke format mai ayega
module.exports = userModel;
