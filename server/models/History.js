import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('History', HistorySchema);
