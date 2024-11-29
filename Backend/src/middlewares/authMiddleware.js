import { checkIfUserExist } from "../services/userService.js";
import { verifyJwt } from "../utils/jwt.js";

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

        // console.log("Decoded JWT response:", response);

        if (!response.email) {
            return res.status(400).json({
                success: false,
                message: 'Email is missing in token'
            });
        }

        // console.log("Email passed to checkIfUserExist:", response.email);
        const doesUserExist = await checkIfUserExist(response.email);

        if (!doesUserExist) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
       
        // console.log("Decoded token response:", response);
        req.user = response;
        
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