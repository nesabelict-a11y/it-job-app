const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // This serves your HTML form

// THE GOOGLE URL IS SECURELY HIDDEN HERE ON THE SERVER
const GOOGLE_WEB_APP_URL = "https://google.com";

app.post('/submit-job', async (req, res) => {
    try {
        const response = await fetch(GOOGLE_WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error forwarding to Google:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
