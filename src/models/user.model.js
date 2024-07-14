import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from'jsonwebtoken'

const userSchema= new Schema({
userName:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true 
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,

},
fullName:{
    type:String,
    trim:true,
    required:true,
    index:true
},
avatar:{
type:String,
required:true

},
coverImage:{

    type:String,
},
watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:'Video'

    }
],
password:{
    type:String,
    required:[true,'password is required'],

},

refreshToke:{
    type:String
}




},{
    timestamps:true
}
)

userSchema.pre("save",async function(){

    if(!this.isModified("pasword")) return next()

    this.password= await bcrypt(this.password,10)
    next()

})

userSchema.methods.isPasswordCorrect= async function(password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function(){
   return jwt.sign(
{
    _id: this._id,
    email: this.email,
    userName:this.userName,
    fullName: this.fullName
},
process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
}


    )
    
}
userSchema.methods.generateRefreshToken= function(){

    return jwt.sign(
        {
            _id: this._id,
      
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        } 
        
        
            )
    
}


export const User = mongoose.model("User",userSchema)