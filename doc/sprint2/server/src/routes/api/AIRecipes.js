import axios from "axios";
import { Router } from "express";
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const openai = new OpenAI();

router.post('/ask', async (req, res) => {
    const userQuery = req.body.query; // FIXED: Use req.body.query

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4', // or 'gpt-3.5-turbo'
            messages: [{ role: 'user', content: userQuery }],
        });

        const botResponse = response.choices[0].message.content;
        res.json({ response: botResponse });
    } catch (error) {
        console.error("OpenAI API Error:", error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch response from AI.' });
    }
});

export default router;
