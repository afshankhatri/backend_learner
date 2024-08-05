import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,   //unwanted spaces ko trim kar dega
        index:true // it makes thing searchable
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avtar:{
        type:String,  //cloudinary url
        required:true,
    },
    coverimage:{
        type:String, //cloudinary url
        required:true
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:'video'
        }
    ],
    password:{
        type : String,
        required:[true,'password is required']
    },
    refreshToken:{
        type: String
    }
},{timestamps:true})

// below we have used pre ... it is used as a middleware ..we have didi save as the operation ....i.e.> when form is save (with the help of pre) just before saving certain operation is performed (operation which is mentioned in .pre).....
// make sure that while writing function in .pre use normal function and not arrow function as it does not allow it and put async/await since it takes time to complete a task
UserSchema.pre('save',async function(next){
    // this.password will come from above model which we have made 
    if (this.isModified('password')){
            this.password = await bcrypt.hash(this.password,10) //this tells that whenever the password is updated hash it with 10 rounds(some type of encryption)
            next() 
        }
    else{//we have written if else because ...considering  avtar ..if user changes its avtar from profile and then saves it the whole thing will be changed along with the password(the password wont change but the ...url generated after encryption which change continously )this is not a good thing and might trouble us in long run 
        // now if else will help us to restrict action on password with this.isModified() sateMent the password's(encryption) will only be changed when it is Modified
        next()
    }

})


// now since the password is encrypted we dont know the password of the user ....for verificatioin purpose we need to create a customised methods(we can create any customized method with the format given below)
UserSchema.methods.isPasswordCoreect = async function (password) {
    return bcrypt.compare(password,this.password) //ans will be true or false
    //password == password which will be inserted during verification
    //this.password == password which is kept encrypted in DB 
    // with bcrypt.compare both will be compared and if correct ..access will be given
}

// similary creating methods for accessToken...refreshToken...etc
UserSchema.methods.generateAccessToken = function(){ //contain's more info...expiry is less
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
            process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY 
        }
    )
}
// both are similar but used in different way
UserSchema.methods.generateRefreshToken = function(){ //contains less info...expiry is more 
    return jwt.sign( 
        {
            _id:this._id
        },
            process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User',UserSchema)