import bcrypt from 'bcrypt';

import { createUser, deleteUserById, findAllUser, findUserByEmail, getUserById, updateUser } from "../repository/userRepository.js";
import { createJWT } from '../utils/authUtils.js';

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
    try {
         // check if there is valid registred user with the email
         const user = await findUserByEmail(userDetails.email);

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

        //  console.log("Payload for JWT:", { id: user.id, email: user.email, username: user.username });

     return {
         username: user.username,
         avatar: user.avatar,
         email: user.email,
         id: user.id,
         token: createJWT({id: user.id, username: user.username, email: user.email,})
     }

    } catch (error) {
        console.log("SignIn service error",error);
        throw error;
    }
       
};

export const checkIfUserExist = async function (email) {
        const user = await findUserByEmail(email);
        return user;
};

export const getUserByIdService = async function (id) {
    const user = await getUserById(id);

    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    
    return user;
};

export const deleteUserByIdService = async function (id) {
    const user = await deleteUserById(id);

    if (!user) {
        throw { status: 404, message: 'User not found' };
    }
    
    return user;
};

export const updateUserService = async function (id, userToUpdate) {
    const user = await updateUser(id, userToUpdate);
    return user;
};

export const getAllUserService = async function () {
    try {
        const user = await findAllUser();
        return user;
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        throw error; // Pass the error to the controller 
    }
};