import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../Config/db.config.js';
import MongoStore from 'connect-mongo';
import userRouter from './routes/userRoutes.js';
import session from 'express-session';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:8081',
        credentials: true,
    }),
);

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: false,
        },
    }),
);

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
