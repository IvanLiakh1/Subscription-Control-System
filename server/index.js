import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../Config/db.config.js';
import MongoStore from 'connect-mongo';
import userRouter from './routes/userRoutes.js';
import session from 'express-session';
import subscriptionRouter from './routes/subscriptionRoutes.js';
import historyRouter from './routes/historyRoutes.js';
import passport from 'passport';
import './Jobs/Payments.js';
import '../Config/passport.js';

import path from 'path';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
//app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:8080',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
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
            sameSite: 'lax',
        },
    }),
);

app.use('/api/user', userRouter);
app.use('/api/subscription', subscriptionRouter);
app.use('/api/history', historyRouter);

app.use(passport.initialize());
app.use(passport.session());

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log('✅ Server is started on port:', PORT));
    } catch (err) {
        console.error('❌ Server starting error', err);
    }
};

start();
