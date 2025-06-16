import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})

const MongoDB_URI = process.env.MONGODB_URI

const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(MongoDB_URI + "paytm_data")
        console.log("Connect to DB Instance: " + connectionInstance.connection.port)
    }
    catch(error){
        console.log("Failed to connect to MongoDB" + error.message)
        process.exit(1)
    }
}

export default connectDB