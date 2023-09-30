import {Router} from 'express';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
const router = Router(); // instance of Router created
import upload from '../middlewares/multer.middleware.js'
import {register, login, logout, getProfile} from '../controllers/user.contoller.js' 
router.post('/register', upload.single("avtar"),register) // data key is avtar
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',isLoggedIn,getProfile)


export default router;