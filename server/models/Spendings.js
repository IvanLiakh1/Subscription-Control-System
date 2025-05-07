import mongoose from 'mongoose';

const spendingsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: true,
    },
    category: { type: String },
    date: {
        type: Date,
        required: true,
        set: (date) => {
            const d = new Date(date);
            d.setUTCHours(0, 0, 0, 0);
            return d;
        },
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export default mongoose.model('Spendings', spendingsSchema);
