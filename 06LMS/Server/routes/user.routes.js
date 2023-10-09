import {Router} from 'express';
const router = Router(); // instance of Router created, basically used to define routes and middleware
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js'
import {register, login, logout, getProfile, forgotPassword, resetPassword,changePassword, updateUser} from '../controllers/user.contoller.js' 
router.post('/register', upload.single("avtar"),register) // data key(name) is avtar; if a request of content-type: multipart/form data and name= 'avtar' come, then upload.single middleware of multer package will convert binary to image and do upload logic and after that put image url in req.file 
router.post('/login',login)
router.get('/logout',logout) // used get here because there is benifit that we can simpley type url and logout
router.get('/me',isLoggedIn,getProfile)
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken',resetPassword);
router.post('/change-password', isLoggedIn, changePassword);
router.put('/update', isLoggedIn, upload.single('avatar'), updateUser)
export default router;