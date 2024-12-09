import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../Config/serverConfig.js';

export const createJWT = function (payload) {
    return jwt.sign(payload, JWT_SECRET,{expiresIn: "10d"});
};

export const verifyJwt = async function (token) {
    return jwt.verify(token, JWT_SECRET)
};