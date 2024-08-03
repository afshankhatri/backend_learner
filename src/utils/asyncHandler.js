// using promises
const asynchandler =(requesthandler)=>{
    (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err))
    }
}

export{asynchandler}







//using try and catch 


const asyncHandler = (fn)=>{async(req,res,next)=>{//higher order function ...function k andar function
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(err.code || 500).json({
            success:false,
            message:err.message
        })
    }
}} 