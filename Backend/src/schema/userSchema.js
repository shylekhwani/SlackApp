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
        required: true,
        unique: true,
        minLength: 5,
        validate: { // this property is use for to write custom validation
             validator: function(email_Value){
                return   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_Value) // it will take (email_value) and test on the regex experssion.
             },
             message: "Invalid email format" // if anything goes wrong the we print this message
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
  }, 
{timestamps:true}

);

userSchema.pre('save', function modifyPassword(next){
    // incoming user object
    const user = this; // object with plain password

    const SALT = bcrypt.genSaltSync(10);

    // hash password

    const hashedPassword = bcrypt.hashSync(user.password, SALT);

    // replace plain password with hashed password
    user.password = hashedPassword

    next();
});

const User = mongoose.model('User', userSchema); // this will create user collection

export default User;