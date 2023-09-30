import User from '../models/user.models.js'
import AppError from "../utils/error.utils.js";
import cloudinary from 'cloudinary'; 
import fs from 'fs/promises'
const cookieOption = {
    maxAge: 1000 * 60 * 60 * 24 * 7, // means that the cookie will expire and be deleted from the user's browser after 7 days.
    httpOnly: true, //the cookie should only be accessible via HTTP requests and not through JavaScript. This is a security measure to help protect cookies from certain types of attacks, such as cross-site scripting (XSS).
    secure: true //cookie should only be sent over secure HTTPS connections. This enhances the security of the cookie by ensuring that it's not transmitted over unencrypted HTTP connections.
}

const register = async (req, res) => {
    const { fullName, email, password } = req.body; // jab post request karte hain tho info body mai ati hai
    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new AppError('Email already Exists', 400))
    }
    // when user upload the image/avtar then you can see in payload inside networks that data is of form type and the request from the client is of content-type: multipart/form-data inside headers 
    // client sends the image as binary data to server and we have to process the binary image data to actual image  on server with the help of multer package, after conversion to image we store the image on third party service i.e. cloudnary

    const user = await User.insertOne({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'hollk'
        }
    })

    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop:"fill"
            });
            if(result){
                user.avtar.public_id = result.public_id;
                user.avtar.secure_url = result.secure_url;
                // remove file from server;
                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (e) {
            return next( new AppError(error || 'File not uploaded, please try again',400))
        }
    }

    if (!user) {
        return next(new AppError('USer registration falied'));
    }
    // Todo file upload
    await user.save();
    user.password = undefined;
    // we created token and put set in cookie because we dont want that user needs to login after inidiate signin
    const token = await user.gerenrateJWTToken();
    res.cookie('token', token, cookieOption);
    res.satus(201).json({
        success: true,
        message: 'User registerd successfully',
        user,
    })
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new AppError('All fields required', 400));
        }
        const userInfo = await User.findOne({ email }).select('+password');
        if (!userInfo || !userInfo.comparePassword(password)) {
            return next(new AppError('Authentication failed', 400))
        }

        const token = await userInfo.gerenrateJWTToken();
        userInfo.password = undefined
        res.cookie('token', token, cookieOption);
        return res.status(400).json({
            success: true,
            message: "Login Successfully",
            userInfo
        })
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

const logout = (req, res) => {
    res.cookie = ('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
};
// as you already loggedin, you can access to profile
const getProfile = async (req, res) => {
    try {
        const userId = req.userDetails.id;
        const userInfo = await User.findById(userId);
        return res.status(200).json({
            success: true,
            message: "User details",
            userInfo
        })
    } catch (error) {
        return next(new AppError('Failed to fetch details',500))
    }
};

export {
    register,
    login,
    logout,
    getProfile
}