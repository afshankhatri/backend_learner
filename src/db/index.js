import mongoose from "mongoose";

import {DB_NAME} from '../constants.js'//make sure that you put 2 dots at start 

import express from 'express'

const app = express()

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`connected BC !! ${connectionInstance.connection.host }`);
        console.log(`connected BcC !! ${connectionInstance.connection }`);
        console.log(`connected BCc!! ${connectionInstance }`);

        
    } catch (error) {
        console.log('ERRRROR',error);
        process.exit(1) //this is also help for handling error
    }
}

export default connectDB //is ko without bracket k hi export karege

