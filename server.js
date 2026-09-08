const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios'); // Upgraded to Axios to handle Google Redirect bugs

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname)); 
app.use(express.static(path.join(__dirname, 'public')));

// PASTE YOUR EXACT GOOGLE WEB APP URL HERE
const GOOGLE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxt-8q7pnURZtKoEG0BtCYYMu05mCX-yqFPdstbDoF8QJrHnUyV63KkSd_3BkTblt0v/exec";

app.post('/submit-job', async (req, res) => {
    try {
        // Axios natively and safely handles Google Script 302 redirects automatically
        const response = await axios.post(GOOGLE_WEB_APP_URL, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        // Return success back to your frontend HTML
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error forwarding to Google:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
