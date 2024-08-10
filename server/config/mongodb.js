import mongoose from "mongoose";

async function connectDb(){
    mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default connectDb