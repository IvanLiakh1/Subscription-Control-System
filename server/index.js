import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../Config/db.config.js';
import userRouter from './routes/userRoutes.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/api/', userRouter);
const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log('✅ Server is started on port:', PORT));
    } catch (err) {
        console.error('❌ Server starting error', err);
    }
};

start();
