import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true },
    credits: { type: Number, required: false },
    payment: { type: Boolean, default: false }
});

export default mongoose.model('Transaction', transactionSchema);