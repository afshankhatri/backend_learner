import { Router } from "express";
import { logoutUser,registerLogin,registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; //middleware
import { verifyJWT } from "../middlewares/auth.middleware.js";

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


router.route('/login').post(registerLogin)

// secured routes
router.route('/logout').post(verifyJWT,logoutUser) //with the help of next ...after completing 'verifyJWT' it will directly start working on 'logoutUser' this continous working done due to the presence of next() agar wo nai hota to 'verifyJWT' kar k chod deta aage ka nai karta

export default router