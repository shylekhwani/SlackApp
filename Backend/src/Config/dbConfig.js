import mongoose from "mongoose";

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from "./serverConfig.js";

export const connectDB = async function () {
    try {

    if(NODE_ENV === 'development') {

        await mongoose.connect(DEV_DB_URL)

    } else if(NODE_ENV === 'production') {
        
        await mongoose.connect(PROD_DB_URL)
    }   
    console.log(`connected to mongoDb database from ${NODE_ENV} enviroment`)
    } catch (error) {
        console.log(error,'went wrong something')
    }
};