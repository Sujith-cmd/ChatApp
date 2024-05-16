import mongoose from 'mongoose'
const connectmongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("mongodb connected");
    } catch (error) {
        console.log(`mongodb not connected. Check${error.message}`);
    }
}

export default connectmongoDB