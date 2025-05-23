import mongoose from "mongoose";
export const DBConnection= async ()=>{
try {
    await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');

} catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
}

};

