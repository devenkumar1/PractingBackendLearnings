import mongoose from "mongoose";
import { DB_Name } from "../constants.js";


const connectDB= async ()=>{
    try {
      const connectionInstance=  mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
      console.log("mongodb connected sucesssfully !! DB Host")
    } catch (error) {
        console.log("database connection failed",error);
        process.exit(1);
    }
}

export default connectDB