import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true, default: 'Uncategorized' },
    date: { type: Date, required: true, default: Date.now },
});

export default mongoose.model('Transaction', TransactionSchema);
