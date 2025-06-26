import { connect } from 'mongoose';
import { MONGO_DB_URI } from '../config.js';

const connectDB = async () => {
    try {
        await connect(MONGO_DB_URI)
        console.log("MonogoDB connected successfully");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;