import { v2 as cloudinary } from "cloudinary";
import exp from "constants";
import fs from 'fs' //file system {to read ,write,remove a file}  

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.SECRET_KEY
})


const uploadOnCloudinary = async (localfilepath)=>{
    try {
        if(!localfilepath) return null

        const response = await cloudinary.uploader.upload(localfilepath,{//to upload file on cloudinary
            resource_type:'auto'//yaha pe ye bhi specify kar sakte hai k kaise type ki file leni hai ...i.e>image file video file etc...we have kept it auto           
        })  

        console.log('file uploaded on cloudinary successfully after this',response.url);
        return response

    } catch (error) { //if file not uloaded properly 
        fs.unlink(localfilepath) //this will remove file which is locally uploaded on my server if the connecion failed
        return null
    }
}


cloudinary.v2.uploader.upload('',
    {public_id:'olympicFlag'},
    function(error,result){
        console.log(result);
    }
)

export {uploadOnCloudinary}