import express from 'express';
import auth from '../middleware/auth.js';
import Transaction from '../models/Transaction.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// @route   GET api/insights/summary
// @desc    Get dashboard data: summary, health score, and chart data
router.get('/summary', auth, async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const transactions = await Transaction.find({ user: req.user.id, date: { $gte: thirtyDaysAgo } });

        let totalIncome = 0;
        let totalExpense = 0;
        const expenseByCategory = {};

        transactions.forEach(t => {
            if (t.type === 'income') {
                totalIncome += t.amount;
            } else {
                totalExpense += t.amount;
                expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
            }
        });

        const netBalance = totalIncome - totalExpense;
        
        // Calculate Financial Health Score (0-100)
        // Score is 50 if income equals expense. Increases if income > expense, decreases otherwise.
        // Capped at 0 and 100.
        let healthScore = 50;
        if (totalIncome > 0) {
            const ratio = totalExpense / totalIncome;
            healthScore = Math.max(0, Math.min(100, Math.round(50 * (2 - ratio))));
        } else if (totalExpense > 0) {
            healthScore = 0; // No income but expenses
        }

        // Generate AI Insight
        const transactionList = transactions.filter(t => t.type === 'expense').map(t => `${t.description}: ₹${t.amount}`).join(', ');
        const prompt = `I am a user of a finance app. My total income in the last 30 days was ₹${totalIncome} and total expenses were ₹${totalExpense}. My recent expenses include: ${transactionList}. Based on this, provide a short, actionable financial insight or tip for me in 1-2 sentences. Address me directly as "you". The currency is Indian Rupees (₹).`;
        
        let aiInsight = "Track your spending to get personalized insights.";
        try {
            const result = await model.generateContent(prompt);
            aiInsight = result.response.text().trim();
        } catch (aiError) {
            console.error("Error generating AI insight:", aiError);
        }

        res.json({
            totalIncome,
            totalExpense,
            netBalance,
            healthScore,
            expenseByCategory,
            aiInsight
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;