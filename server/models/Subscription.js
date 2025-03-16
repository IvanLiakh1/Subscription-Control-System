import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        currency: { type: String, default: 'UAH' },
        billingCycle: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'], required: true },
        nextPaymentDate: { type: Date, required: true },
        startDate: { type: Date, required: true },
        status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' },
        category: { type: String },
        notes: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true },
);

export default mongoose.model('Subscription', subscriptionSchema);
