const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiter configuration
const rateLimiter = new RateLimiterMemory({
    points: 5, // 5 requests
    duration: 1, // per second
});

// Middleware for security
app.use(helmet());
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || '*', // Add your allowed origin here
}));
app.use(express.json());

// Proxy endpoint
app.get('/proxy', async (req, res) => {
    const url = req.query.url;

    if (!url || !isValidUrl(url)) {
        return res.status(400).send('A valid URL is required.');
    }

    try {
        // Rate Limiting
        await rateLimiter.consume(req.ip);

        const response = await axios.get(url, { timeout: 5000 }); // Add timeout to avoid hanging requests
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching the URL: ' + error.message);
    }
});

// Simple URL validation function
function isValidUrl(urlString) {
    try {
        new URL(urlString);
        return true;
    } catch (_) {
        return false;
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
