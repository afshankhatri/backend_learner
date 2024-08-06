import { asynchandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiERROR.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asynchandler(async (req,res)=>{
// the below comments tells us that ... these work need to be done to set up a registration form
    
    //1> get user details from frontend
    ///2> validation ...to verify that ...sab kuch baarabar se bhara hua hai k nai
    // 3> check if user already exists with username and email
    // 4> check images and avtar exist or no
    //5> upload the images and avtar to cloudinary
    // 6> crete user object ... since mongoDB is noSQL it takes object and updates on object..with this create entry in DB
    // 7> remove password and refresh token field ...and submit the response to the frontend
    //8> check if user is created  or no ...if no show error
    //9> last return response of the form to the frontend

    // step1...
    const {username,email,password,fullname}=req.body  //destructuring
    // req.body will put request on frontend(as we did here with postman) the input form the front end will come here and it'll be visible in console if we put console.log (as written below)
    console.log('email:',email);

    //if request was accepted ... as a response we will send a res.send(as shown below)... we need to send this as a response other wise it will just wait for res. untill not recieved
    // res.send('maa ki jai ho gai lala')

    // to upload image we need a middlware and for that we have did setup in user.routes.js...by importing the uplod file from multer.middleware

    // with this details are filled
    //error handling while registration...



    // step2....


    // if (fullname === '') { //we have to do this if statement for all the other fields of the form or therwise you can use the method shown below
    //     throw new ApiError(400,'fullname is required')
    // }//similarly we can do the same thing for all the fields of regi. form

    //"some will hlep us to chek all the elements of array"
    if ([fullname,email,username,password].some((field)=>field?.trim() === ''))
    {
        throw new ApiError(400,'all fields are required')
    }



    // step3 (with the help of User.models.js {imported at the top})



    const ExistedUser = await User.findOne({//$or this syntax will alow us to  compare multiple fields of form ...so that we can check if the user exist's or no
        $or:[{email},{username}]
    })
    if (ExistedUser) {
        throw new ApiError(409,"user already exists")   
    }

 
    //     step4     ...(req.body gives us the access to data .....req.files gives us the access to the files {avatar and images are stored in files using multer as middleware}



    const avatarLocalPath = req.files?.avtar[0]?.path 
    // here multer will req for file ...then it will check for 1st index postn for avatar exists or no then it gets the path

    // const coverimageLocalPath = req.files?.coverimage[0]?.path
    // since it is not compulsory to put coverimage ..but when coverimage is not uploaded it gives error......sol>it is due to above syntax it should be manipulated in the way given below:
    let coverimageLocalPath;
    if (req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length>0){
        coverimageLocalPath = req.files.coverimage[0].path
    }//similarly we can do this for  avtar as well...(another way)



    console.log(req.files); //jus to know wht's the output
    

    //to check if images exist or no 
    if(!avatarLocalPath){
        throw new ApiError(400,'avatar does not exist')
    }
    //we have not taken the coverimage as it is not required



    // step 5 



    const avtar = await uploadOnCloudinary(avatarLocalPath) //we have put await localpath since it will take time to serch in cloudinary
    const coverimage = await uploadOnCloudinary(coverimageLocalPath)
    
    //check again if avtar is inserted properly or no
    if (!avtar) {
        throw new ApiError(400,'avtar files required')
    }
    //we have not taken the coverimage as it is not required






    //     step6      (entry in DB)





    const user = await User.create({
        fullname,
        avtar:avtar.url,
        coverimage:coverimage?.url ||'', //we have used this syntax over here because ... this tells us that if coverimage exits take it's url otherwise get an empty string
        email,
        password,
        username:username.toLowerCase()
    })





    // step 7





    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    //with this method we can get to know if the user if proprly inserted in DB or no and with ._id it will assign automatically a number which will be triversed by findById...and whenever called it will serch for that id 
    //now we dont want to include the refresh token in this so we can remove it with the select() method ...by passing a string in it ...an mentioning the element with minus(-)sign 






    // step 8






    if (!createdUser) {
        throw new ApiError(500,'something went while regestering user')
    }







    // step9    (we can do this by importing apiRespons file)



    //return res.status(201).json({userCreated})//given below is the better syntax

    return res.status(201).json(
        new ApiResponse(200,createdUser , 'user registered successfully')
    )




    
})

export {registerUser}