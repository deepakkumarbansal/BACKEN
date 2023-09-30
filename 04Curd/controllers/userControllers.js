const User = require('../models/userModel.js')
exports.home = (req,res)=>{
    res.send('Hello World!');
}
// create/insert data
/*
To receive data from client we have two methods
1. From URL:
    req.params.idOfInput
2. From Body:
    req.body
*/
exports.createUser = async (req,res)=>{ // using async we db always in another contient (takes time to load)
    //extract info
    try{
        const {name,email} = req.body //object destructuring, req.body gives the object which has all info. In html form we set name attribute as name and email
        
        if(!name || !email){
            throw new Error("Name and Email both are required")
        }
        // console.log(email);
        const userExists = await User.findOne({email})  // Its ES6 we can also use email:email. Must use await otherwise always showing user already exists
        // console.log(userExists);
        if(userExists){
            throw new Error("User already exists")
        }

        const  user = await User.create({  // you can also use promises
            name,    // we not using name: name because ES-6 have facility of just using name if both have same speeling word
            email
        })

        res.status(201).json({
            success: true,
            message: "user created Successfully",
            user
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//Recieve/get all data
exports.getUsers = async (req,res)=>{
    try {
        const users = await User.find({});
        if(!users){
            throw new Error("No user present in DB")
        }
        res.status(200).json({
            success: true,
            users
        })
    } catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//delete data
exports.deleteUser = async (req,res)=>{
    try {
        const userId  = req.params.id //you can see in routes file that we give name of user id as 'id'
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            success:true,
            message: "User deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to delete"
        })
    }
}

//edit data
exports.editUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({
            success: true,
            message: "User updated successfully"
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to delete"
        })
    }
}
