import { createUserService, signinUserService } from "../service/userService.js";

export async function getProfile(req,res){
    return res.json({
        success: true,
        message:'Profile Fetched successfully',
    })
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