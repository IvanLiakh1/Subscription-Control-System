import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        logo: { type: String },
        price: { type: Number, required: true },
        totalSpent: { type: Number, default: 0 },
        currency: { type: String, default: 'UAH' },
        billingCycle: {
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'yearly'],
            required: true,
        },
        startDate: {
            type: Date,
            get: (date) => date.toISOString().split('T')[0] 
          },
          nextPaymentDate: {
            type: Date,
            get: (date) => date.toISOString().split('T')[0]
          },
        status: {
            type: String,
            enum: ['active', 'paused', 'cancelled'],
            default: 'active',
        },
        category: { type: String },
        notes: { type: String },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { getters: true },
    },
);

export default mongoose.model('Subscription', subscriptionSchema);
