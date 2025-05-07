import mongoose from 'mongoose';

const spendingsSchema = new mongoose.Schema({
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
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true,
    },
});

export default mongoose.model('Spendings', spendingsSchema);
