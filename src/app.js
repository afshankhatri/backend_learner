// postman connec nai ho raha 


import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()
app.use(cors({ //cors tells us ...k... kis kis ko access dena hai ...apni website pe 
    origin:process.env.Proces_origin,
    credentials:true
}))
app.use(express.json({limit:'16kb'}))//this tells us k max kitni bada input lena hai..zayada bada lenge to server crash ho jaiga
app.use(express.urlencoded({extended:true,limit:'16kb'}))//this will help us to encode the the url string's
app.use(express.static('public')) //this is the name of the folder...where we will stre general data...like logo image etc.
app.use(cookieParser()) //to get the cookie and use cookie from user


// to check the app in b/w ...like when we visti a site we view the web after some time when we try to get the thing from the site...it 1st tells us to registered ...if have'nt did so ...that checking of the registration is called is middleware
// there can be multiple middlewares 
// we have seen previously that ... req and resp. are taken like this:
/*app.get("/",(req,res)=>{
    res.send("syntax...")
})*/
// if we want middleware ...it will look like this: ..(err,req,res,next)  ..same as above .next will point to the other middleware...if there is no further middleware ...it will stop at the task and will start executing from there





// now taking routes  {importing routes}

import userRouter from './routes/user.routes.js'
//now routes declaration

//in the inital day's we used to declare routes like this: app.get('/',(req,res)) ...but here we are exporting our routes ..we will use( app.use)*

app.use('/api/v1/users',userRouter) //userRouter ... this param act as the middleware....it is pointing /user to go in userRouter file and run the function mentioned over there

/*http://localhost:3000/api/v1/users/register*/ //this is how ...it will flow

export {app}



