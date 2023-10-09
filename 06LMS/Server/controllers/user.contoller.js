import User from '../models/user.models.js'
import AppError from "../utils/error.utils.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import sendEmail from '../utils/sendEmail.js'; 
const cookieOption = {
    maxAge: 1000 * 60 * 60 * 24 * 7, // means that the cookie will expire and be deleted from the user's browser after 7 days.
    httpOnly: true, //the cookie should only be accessible via HTTP requests and not through JavaScript. This is a security measure to help protect cookies from certain types of attacks, such as cross-site scripting (XSS).
    secure: true //cookie should only be sent over secure HTTPS connections. This enhances the security of the cookie by ensuring that it's not transmitted over unencrypted HTTP connections.
}

const register = async (req, res, next) => {
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

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: 'hollk'
        }
    })


    if (!user) {
        return next(new AppError('USer registration falied'));
    }

    // Todo file upload; we are not writing code here to upload file instead we create a seperate file i.e. multer.middleware 
    if (req.file) {
        try {
            const result =await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms', // folder name were we store the file on cloudinary
                width:250,  
                height:250,
                gravity:'faces',
                crop: 'fill'
            });
            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }
            // cloudinary.v2.uploader.upload(req.file.path,
            //     { public_id: "olympic_flag" },
            //     function (error, result) { console.log(result); });
        }
        catch (error) {
            return next(new AppError('File not upladed, please try again', 500))
        }
    }
    await user.save(); // we resaved user document due to we have update it by uploading a file
    user.password = undefined; // we undefined user.password so that when we send user details it will not send its password
    // we created token and put set in cookie because we dont want that user needs to login after inidiate signin
    const token = await user.generateJWTToken(); 
    res.cookie('token', token, cookieOption);
    res.status(201).json({
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
        return next(new AppError('Failed to fetch details', 500))
    }
};


const resetPassword = async (req,res)=>{
    const {resetToken} = req.params;
    //or const resetToken = req.params.resetToken;
    const {password} = req.body;
    if(!password){
        return next(new AppError('Password required',400));
    }
    const forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    const user = await User.findOne({
        forgetPasswordToken,
        forgetPasswordExpiry: {$gt: Date.now()}
    });
    if(!user){
        return next(new AppError('Token is invalid or expired, please try again'));
    }
    user.password = password;
    user.forgetPasswordExpiry = undefined;
    user.forgetPasswordToken = undefined;

    user.save();

    res.status(200).json({
        success: true,
        message:'Password changed Successfully'
    })
}

const forgotPassword = async (req, res, next)=>{
    const {email} = req.body;
    if(!email){
        return next(new AppError('Email is required',400));
    }
    const user = await User.findOne({email});
    if(!user){
        return next(new AppError('Given email not found',400));
    }
    const resetToken = await user.generatePasswordResetToken();
    await user.save(); // saved to db after token generation

    const  resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject = `Reset Password`;
    const message = `You can reset your password by clicking <a href= ${resetPasswordURL} target='_blank'> Reset your password </a>\n If the above link does not work for some reson then copy paste this link in new tab ${resetPasswordURL}`;
    
    // function to send email
    try {
        await sendEmail(email,subject, message);
        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`
        });
    } catch (e) {
        user.forgetPasswordExpiry = undefined;
        user.forgetPasswordToken = undefined;
        await user.save();
        return next(new AppError(e.message,400));  
    }
}

const changePassword = async (req, res)=>{
    const {oldPassword, newPassword} = req.body;
    const {id} = req.user;
    if(!oldPassword || !newPassword){
        return next(new AppError('All fields are mandatory', 400));
    }
    const user = await User.findOne({id}).select(+password);
    if(!user){
        return next(new AppError('No user exist', 400));
    }
    const isPasswordValid = await user.comparePassword(oldPassword);
    if(!isPasswordValid){
        return next(new AppError('Old password not martched', 400));
    }
    user.password = newPassword;
    await user.save();
    user.password = undefined;
    res.status(200).json({
        success: true,
        message: "Password changed Successfully",
        user
    })
}

const updateUser = async (req, res)=>{
    const {fullName} = req.body;
    const {id} = req.user.id;

    const user = await user.findById(id);
    if(!user){
        return next(new AppError('No user exist', 400));
    }
    if(req.fullName){
        user.fullName = fullName;
    }
    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id); // delete already uploaded profile
        try {
            const result =await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'lms', // folder name were we store the file on cloudinary
                width:250,  
                height:250,
                gravity:'faces',
                crop: 'fill'
            });
            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }
        }
        catch (error) {
            return next(new AppError('File not upladed, please try again', 500))
        }  
    }
    await user.save();
    res.status(200).json({
        success: true,
        message: "Profile updated Successfully!"
    })
}

export {
    register,
    login,
    logout,
    getProfile,
    resetPassword,
    forgotPassword,
    changePassword,
    updateUser
}