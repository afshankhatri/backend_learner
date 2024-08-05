class ApiResponse{
    constructor(statusCode,data,message = 'success'){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode<400 
        //the above <400 is a type of error ... if the code does not falls under proper condth ... it will give erroor...based on the error it is define some number range for error  
    }
}

export {ApiResponse}