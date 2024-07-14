import {v2 as cloudinary} from 'cloudinary'
import fs, { unlink, unlinkSync } from'fs'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:CLOUDINARY_SECRET
});


const uploadOnCloud=async(localfilepath)=>{
try {
    if(!localfilepath) return null;

    //upload to cloudinary

   const respone= await cloudinary.uploader.upload(localfilepath,{
        resource_type:'auto'
    })
    //file has been uploaded succesfully
    console.log("file is uploaded on cloudinary",respone.url);
    return respone;
} catch (error) {
    fs.unlinkSync(localfilepath) //remove the locslly saved temporary file
                     // as the upload operation got failed
}
}


export{uploadOnCloud}