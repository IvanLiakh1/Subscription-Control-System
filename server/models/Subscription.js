import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        logo: { type: String },
        price: { type: Number, required: true },
        currency: { type: String, default: 'UAH' },
        billingCycle: {
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'yearly'],
            required: true,
        },
        nextPaymentDate: { type: Date, required: true },
        startDate: { type: Date, required: true },
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
        methods: {
            calculateNextPayment() {
                const date = new Date(this.nextPaymentDate || this.startDate);
                switch (this.billingCycle) {
                    case 'daily':
                        date.setDate(date.getDate() + 1);
                        break;
                    case 'weekly':
                        date.setDate(date.getDate() + 7);
                        break;
                    case 'monthly':
                        date.setMonth(date.getMonth() + 1);
                        break;
                    case 'yearly':
                        date.setFullYear(date.getFullYear() + 1);
                        break;
                }
                return date;
            },
        },
    },
);

subscriptionSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('billingCycle')) {
        this.nextPaymentDate = this.calculateNextPayment();
    }
    next();
});

export default mongoose.model('Subscription', subscriptionSchema);
