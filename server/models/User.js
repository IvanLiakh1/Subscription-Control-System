import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    history: {
        type: [
            {
                action: { type: String, required: true },
                serviceName: { type: String, required: true },
                date: { type: Date, default: Date.now, required: true },
            },
        ],
        default: [],
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model('User', UserSchema);
