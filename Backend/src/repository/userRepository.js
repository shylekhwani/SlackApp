import User from '../schema/userSchema.js'

// Function to find a user by their email address
export const findUserEmail = async function (email) {
    try {
        // Searching for a user in the database with the specified email
        const user = await User.findOne({ email });
        
        // Returning the user found, if any
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Function to retrieve all users from the database
export const findAllUser = async function () {
    try {
        // Finding all users in the database
        const users = await User.find();
        
        // Returning the list of users found
        return users;
    } catch (error) {
        console.log(error);
        throw error;    
    }
};

export const createUser = async function (user) {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        console.log(error)
        throw error
    }
};

export const getUserByName = async function (username) {
    try {
        const user = await User.findOne({ username }); // Query by username field
        return user;
      } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
      }
};

export const getUserById = async function (id) {
    try {
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteUserById = async function (id) {
    try {
        const user = await User.findByIdAndDelete(id);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateUser = async function (id, userToUpdate) {
    try {
        const user = await User.findByIdAndUpdate(id, userToUpdate, { new: true });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};