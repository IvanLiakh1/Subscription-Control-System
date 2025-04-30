import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    logo: { type: String, required: true },
});

export default mongoose.model('popular_services', serviceSchema);
