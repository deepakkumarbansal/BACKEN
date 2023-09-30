import mongoose from 'mongoose';  // mongoose library used because Mongoose provides a way to define data schemas for your MongoDB collections.

const userSchema = new mongoose.Schema( //userSchema is defined using mongoose.Schema
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [50, "Name Should be less than 50 character"]
        },
        email: {
            type: String,
            unique: true
        },
        username:{
            type: String,
            unique: true
        },
        password: String,
        age: Number,
    }
    );


export default mongoose.model("User",userSchema)

/* mongoose.Schema is used to define the structure and validation rules for data, while mongoose.model is used to create a JavaScript class (a model) that can interact
 with a specific MongoDB collection based on that schema. The schema is like a blueprint, and the model is the tool you use to work with the actual data in the database. */

 