import bcrypt from 'bcrypt';
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        minLength: 5,
        match: [ 
             /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
             "please fill valid email address" 
            ]
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    avatar: {
        type: String,
    }
  }, 

{timestamps:true}
);

userSchema.pre('save', function modifyAvatarandPassword(next){
    // incoming user object
    const user = this; // object with plain password

    user.avatar = `https://robohash.org/${user.username}`; // it creates avatar or DP for a new user

    const SALT = bcrypt.genSaltSync(10);

    // hash password

    const hashedPassword = bcrypt.hashSync(user.password, SALT);

    // replace plain password with hashed password
    user.password = hashedPassword

    next();
});

const User = mongoose.model('User', userSchema); // this will create user collection

export default User;