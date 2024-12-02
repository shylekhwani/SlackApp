import { getUserById } from "../repository/userRepository.js";
import { verifyJwt } from "../utils/authUtils.js";

export const isAuthenticated = async function (req, res, next) {
    // Check if JWT is passed in the header
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Token is required'
        });
    }

    // Verify the token
    try {
        const response = await verifyJwt(token);

        console.log("Decoded JWT response:", response);

        if (!response) {
            return res.status(400).json({
                success: false,
                message: 'invalid auth token'
            });
        }

        const user = await getUserById(response.id);
        // console.log("Decoded response.id:", response.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        req.user = user.id; // user and response ID are same eg: "67499aa448b9f40d1bed1c84"
        
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

export const isAdmin = async function (req, res, next) {
  if(req.user.role !== "admin"){
    return res.status(403).json({
        success: false,
        message: 'Unautorized'
    });
  }  
  next();
};