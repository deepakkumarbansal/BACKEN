const express = require("express")

const {home, createUser, getUsers, deleteUser, editUser} = require("../controllers/userControllers.js");
// const { route } = require("../app.js");

const router = express.Router(); //router is allways in capital R and its express method

router.get("/",home)
router.post('/createUser', createUser)
router.get('/getUsers',getUsers)
router.delete('/deleteUser/:id',deleteUser)
router.put('/editUser/:id',editUser)


module.exports = router