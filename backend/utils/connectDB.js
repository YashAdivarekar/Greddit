import mongoose from "mongoose";
import env from "dotenv";
env.config();

export default async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://admin:admin@cluster0.2owjpge.mongodb.net/?retryWrites=true&w=majority");
        console.log('Connected to DB');
    }
    catch (err) {
        console.error("Could not connect to DB:", err);
    }
}