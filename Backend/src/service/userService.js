import bcrypt from 'bcrypt';

import { createUser, findUserEmail } from "../repository/userRepository.js";

export const createUserService = async function (user) {
    try {

        const newUser = await createUser(user);

         return newUser;

    } catch (error) {
        console.log('Error in createUserService:', error); // Debug log
        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw {
                status: 400,
                message: 'User with same email or username already exists',
            };
        } else {
            throw error; // Re-throw other errors
        }
       
    }
};

export const signinUserService = async function (userDetails) {
    
        // check if there is valid registred user with the email
        const user = await findUserEmail(userDetails.email);

        if(!user) {
            throw {
                status: 404,
                message: 'User not found'
            }
        }
        // comapre the password
        const isPasswordValid = bcrypt.compareSync(userDetails.password, user.password);

        if(!isPasswordValid) {
            throw {
                status: 401,
                message: "Invalid Password"
            }
        } 
    return user
};

export const checkIfUserExist = async function (email) {
    
        const user = await findUserEmail(email);
        return user;
    
};