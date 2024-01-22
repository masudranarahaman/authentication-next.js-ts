import mongoose from 'mongoose';

export const COnnectDB= async()=>{
    try {
           await mongoose.connect("mongodb://localhost/nextjsauthentication");
           console.log("the db is connect with "+ mongoose.connection.host);
           
    } catch (error) {
        mongoose.disconnect();
        process.exit(1)
    }
}