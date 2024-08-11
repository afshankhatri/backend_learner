import { verify } from "jsonwebtoken";
import { asynchandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiERROR";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model";


export const verifyJWT = asynchandler(async(req, _ /*res(aise bhi likh sakete hai khali "_"...agar 'res'use nai ho raha to ) */,next)=>{//we need to verufy that the user is loggedin or no
    try {
        const token =  req.cookies?.accessToken  ||req.header('Authorization')?.replace('Bearer','')
    
        if(!token){
            throw new ApiError(401,'Unauthorized')
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select('-password -refreshToken')
    
        if (!user) { //if user does not exist
            throw new ApiError(401,'invalid access token')
        }
    
        req.user = user
        next() //is k baad (ye tak complete hone k baad) middleware apne aage k kaam contineu karega...
    } catch (error) {
        throw new ApiError(401,error?.message || 'invalid access token')
    }



}) 