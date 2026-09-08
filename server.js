const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// PASTE YOUR EXACT GOOGLE WEB APP URL HERE
const GOOGLE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxt-8q7pnURZtKoEG0BtCYYMu05mCX-yqFPdstbDoF8QJrHnUyV63KkSd_3BkTblt0v/exec";

// 1. ROUTE FOR USER INTERFACE (e.g., https://onrender.com)
app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'user.html'));
});

// 2. ROUTE FOR ADMIN INTERFACE (e.g., https://onrender.com)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// DEFAULT FALLBACK: Redirect the main root link "/" to the user view automatically
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'user.html'));
});

// API endpoint that securely handles your form submissions in the background
app.post('/submit-job', async (req, res) => {
    try {
        const response = await axios.post(GOOGLE_WEB_APP_URL, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error forwarding to Google:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
