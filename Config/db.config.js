import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ DB is working');
    } catch (err) {
        console.error('❌DB connection error: ', err);
        process.exit(1);
    }
};
export default connectDB;
