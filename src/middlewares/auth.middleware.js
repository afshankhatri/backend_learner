import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiERROR.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";


export const verifyJWT = asynchandler(async(req,res,next)=>{//we need to verufy that the user is loggedin or no
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    
        if(!token){
            throw new ApiError(401,'Unauthorized')
        }

        
console.log('Token:', token);//just for reference{debugging statement}
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log('Decoded Token:', decodedToken);

        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) { //if user does not exist
            throw new ApiError(401,'invalid access token')
        }

        req.user = user
        next() //is k baad (ye tak complete hone k baad) middleware apne aage k kaam contineu karega...
    } catch (error) {
            throw new ApiError(401, error?.message || "Invalid access token");
    }
    
}) 