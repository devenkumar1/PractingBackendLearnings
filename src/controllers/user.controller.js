import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from"../models/user.model.js"
import {uploadOnCloud} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async(req,res)=>{
     //get user detail from frontend
     //validation-not empty
     //check if user already exist - email, username
     //check file- avatar, cover image
     //upload them to cloudinary,avatar
     //create userObject-create entry in db
     //remove password and refresh token field from response
     //check for user creation
     //return res
     const{fullname,userName,email,password}= req.body
     console.log(email)
if(fullname==""){

    throw new ApiError(400,"fullname is required")
}
else if(userName=""){
    throw new ApiError(400,"username is required")
}
else if(email=""){
    throw new ApiError(400,"email is required")
}
else if(password=""){
    throw new ApiError(400,"password is required")
}
const existedUser=User.findOne({
    $or:[{ userName },{ email }]
})

if(existedUser){
    throw new ApiError(409,"username or email already registered")

}

const avatarLocalPath=req.files?.avatar[0]?.path
const coverimageLocalPath=req.files?.coverImage[0]?.path

if(!avatarLocalPath){
    throw new ApiError(400,"avatar file is required")
}

const avatar= await uploadOnCloud(avatarLocalPath)
const coverImage= await uploadOnCloud(coverimageLocalPath)
if(!avatar){
    throw new ApiError(400,"avatar file is required")
}
 const user= await  User.create(
    {
fullname,
avatar: avatar.url,
coverImage:coverImage?.url|| "",
email,
password,
userName: userName.toLowerCase()

    }
)
const createdUser=await User.findById(user._id).select(
    "-password -refreshToken" //to remove this field
)

if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)

})

export{registerUser}