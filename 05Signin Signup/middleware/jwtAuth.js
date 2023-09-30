const JWT = require('jsonwebtoken');

const jwtAuth = (req,res,next)=>{
    const token = (req.cookies && req.cookies.token) || null
    if(!token){
        return res.status(400).json({
            
            success: false,
            message:"token not exist || not authorised"
        })
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);// verifing token with secrete key and if the token is valid, it decodes the payload contained within the token. If verification failed it means either token is not valid or it is expired and JWT will throw an error
        req.user = {id: payload.id, email: payload.email} // here we added user proprty in req object

    } catch (error) {
        return res.status(400).json({
            message: 'not authorized' + error.message,
            success: false
        }) 
    }

    next();
}

module.exports = jwtAuth;