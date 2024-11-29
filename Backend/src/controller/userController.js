import { createUserService, deleteUserByIdService, getAllUserService, signinUserService } from "../service/userService.js";

export async function getAllProfile(req,res){
    try {
        const users = await getAllUserService();

        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (error) {
        console.error('Error in getAllProfile:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
        });
    }
};

export async function signup(req,res) {
    try {
        const user = await createUserService(req.body);

        return res.status(201).json({
            success: true,
            message:'User created successfully',
            data: user
        });
    } catch (error) {
        console.log('Error in signup:', error); // Debug log

        if (error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export async function signin(req,res) {
    try {

        const response = await signinUserService(req.body);
        return res.status(200).json({
            success: true,
            message:'User signed in successfully',
            data: response
        })

    } catch (error) {
        console.log('Error in signin:', error); // Debug log

        if (error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const deleteUser = async function (req, res) {
    try {
        // Extract the ID from URL parameters
        const user = await deleteUserByIdService(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user, 
        });
    } catch (error) {
        console.error('Error in deleteUser:', error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
};
