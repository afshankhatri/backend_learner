/*
    // given below is the code for writing the function in same file
*/
 

//require('dotenv').config({path:'./env'}) //niche sab import wale hai form me hai ....to is ko require wale form me nai likhne ka ...it looks unprofessional...instead use the code given below :

import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
import mongoose from "mongoose";
import {DB_NAME} from './constants.js'
import connectDB from "./db/index.js";
import { app } from './app.js';
// import express from 'express'
// const app = express()
const port = 3000
const MONGODB_URI =`mongodb+srv://mohdafshankhatri:Akhatri2023@cluster0.qjd4ckm.mongodb.net`  
// aise daal na pada q k .env se nai ho raha hai barabar se 
// it is a good prac to put semicolon before IIFE(immediately invoked function)
;( async () => {
connectDB() //calling
.then(()=>{
    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on('error',(error)=>{
        console.log('erroRR',error);
        throw error
    })//not sure if this...app.on is correct or no


    app.listen(process.env.PORT||3000 ,()=>{
        console.log(`server is running at ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log('connection failed',err);
    
})
})()









// given below is the code for writing the function in different file and calling it here file

//require('dotenv').config({path:'./env'}) //niche sab import wale hai form me hai ....to is ko require wale form me nai likhne ka ...it looks unprofessional...instead use the code given below :

// import dotenv from 'dotenv'
// dotenv.config({
//     path:'./env'
// })

// import {DB_NAME} from '../constants.js'
// import connectDB from "./db/index.js";
// import mongoose from 'mongoose';
// import { app } from './app.js';

// connectDB() //calling
// .then(()=>{
//     mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on('error',(error)=>{
//         console.log('erroRR',error);
//         throw error
//     })//not sure if this...app.on is correct or no


//     app.listen(process.env.PORT||3000 ,()=>{
//         console.log(`server is running at ${process.env.PORT}`);
//     })
// })
// .catch((err)=>{
//     console.log('connection failed',err);
    
// })




// same using try and catch
