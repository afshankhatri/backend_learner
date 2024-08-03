// given below is the code for writing the function in different file and calling it here file

//require('dotenv').config({path:'./env'}) //niche sab import wale hai form me hai ....to is ko require wale form me nai likhne ka ...it looks unprofessional...instead use the code given below :

import dotenv from 'dotenv'
dotenv.config({
    path:'./env'
})

import connectDB from "./db/index.js";

connectDB() //calling








/*
    // given below is the code for writing the function in same file
*/
 

//require('dotenv').config({path:'./env'}) //niche sab import wale hai form me hai ....to is ko require wale form me nai likhne ka ...it looks unprofessional...instead use the code given below :

import dotenv from 'dotenv'
dotenv.config({
    path:'./env'
})
import mongoose from "mongoose";
import {DB_NAME} from './constants.js'

import express from 'express'

const app = express()
const port = 3000
const MONGODB_URI =`mongodb+srv://mohdafshankhatri:Akhatri2023@cluster0.qjd4ckm.mongodb.net`  
//aise daal na pada q k .env se nai ho raha hai barabar se 
//it is a good prac to put semicolon before IIFE(immediately invoked function)
;(async ()=>{
    try {
        await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        app.on('error',(error)=>{
            console.log('ERor',error);
            throw error
        })
        
        app.listen(port,()=>{
            console.log(`listenning on port${port}`);
            
        })
    } catch (error) {
        console.log("error",error);
        throw error//
    }
})()