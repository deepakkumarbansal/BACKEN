import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new Schema({
    fullName:{
        type: 'String',
        required:[true, "Name is required"],
        minLength:[5, "Name must be at least 5 letters"],
        maxLength:[50, "Name must be have atmost 50 letters"],
        lowercase:true,
        trim: true //space from start and end will remove
    },
    email:{
        type:'String',
        required:[true, "Email is required"],
        lowercase:true,
        trim:true,
        unique:true,
        // email validation
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, 'Please enter correct format of email'],
    },
    password:{
        type: 'String',
        required: true,
        minLength: 8,
        select: false, // jab query kare tho by default password mat bhejna, explicitly mil skta hai
    },
    avtar:{
        public_id:{
            type: 'String'
        },
        secure_url:{
            type:'String'
        }
    },
    role:{
        type:'String',
        enum:['USER','ADMIN'], // means role can have only two values either USER or ADMIN other than these causes an error
        default: 'USER',
    },
    forgetPasswordToken:{
        type:'String'
    },
    forgetPasswordExpiry:{
        type:'String'
    }

},
{
    timestamps:true
});

userSchema.pre('save', async (next)=>{
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods={
    generateJWTToken: async function(){
        return await jwt.sign({id: this._id, email: this.email, subscription:this.subscription, role: this.role},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRY})
    },
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password);
    }
}

const User = model('User', userSchema);

export default User;