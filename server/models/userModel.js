import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    creditBalance: { type: Number, default: 0 }
});

export default mongoose.model('client', userSchema);