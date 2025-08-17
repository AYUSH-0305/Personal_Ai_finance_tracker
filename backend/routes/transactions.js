import express from 'express';
import auth from '../middleware/auth.js';
import Transaction from '../models/Transaction.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// @route   GET api/transactions
// @desc    Get all transactions for a user
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/transactions
// @desc    Add a new transaction
router.post('/', auth, async (req, res) => {
    const { description, amount, type, category, date } = req.body;
    try {
        const newTransaction = new Transaction({
            user: req.user.id,
            description,
            amount,
            type,
            category,
            date,
        });
        const transaction = await newTransaction.save();
        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/transactions/:id
// @desc    Delete a transaction
router.delete('/:id', auth, async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/transactions/categorize
// @desc    AI-powered auto-categorization
router.post('/categorize', auth, async (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ msg: 'Description is required' });
    }
    try {
        const categories = "Food & Drink, Shopping, Housing, Transportation, Entertainment, Groceries, Utilities, Health & Wellness, Travel, Education, Personal Care, Gifts & Donations, Kids, Pets, Business, Investments, Miscellaneous";
        const prompt = `Based on the following transaction description, pick the single most appropriate category from this list: [${categories}]. The description is: "${description}". Only return the category name and nothing else.`;
        
        const result = await model.generateContent(prompt);
        const category = result.response.text().trim();
        
        res.json({ category });
    } catch (error) {
        console.error("Error categorizing transaction:", error);
        res.status(500).json({ error: "Failed to categorize transaction", category: "Miscellaneous" });
    }
});

export default router;
