const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// This ensures your static files are loaded safely regardless of folder structure
app.use(express.static(__dirname)); 
app.use(express.static(path.join(__dirname, 'public')));

// PASTE YOUR EXACT GOOGLE WEB APP URL HERE
const GOOGLE_WEB_APP_URL = "https://google.com";

app.post('/submit-job', async (req, res) => {
    try {
        // We add redirect: "follow" to let Node.js jump Google's security checkpoints
        const response = await fetch(GOOGLE_WEB_APP_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body),
            redirect: 'follow' 
        });
        
        // Google Web Apps respond with text/html redirects or JSON strings
        const responseText = await response.text();
        
        // Send a clean success reply back to your HTML page
        res.status(200).json({ success: true, data: responseText });
    } catch (error) {
        console.error("Error forwarding to Google:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
