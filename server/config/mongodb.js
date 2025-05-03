/*import mongoose from "mongoose";

const connectDB = async ()=>{

    mongoose.connection.on('connected', ()=>{
        console.log("Database connected")
    })



    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
}

export default connectDB; */


import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database connected');
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'imagify', // Specify database name here instead of in URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit on failure
  }
};

export default connectDB;