import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()


router.route('/register').post(registerUser)//now it will show the function which is written in the user controller on the /register   route


export default router