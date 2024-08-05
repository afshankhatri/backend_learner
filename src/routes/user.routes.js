import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; //middleware

const router = Router()


router.route('/register').post(
    upload.fields([ //this is to upload the image and avatar and store it in local storage ...upload will act as a middleware 
        {
            name:'avtar',
            maxCount:1
        },
        {
            name:'coverimage',
            maxCount:1
        }
    ]),
    registerUser)//now it will show the function which is written in the user controller on the /register   route


export default router