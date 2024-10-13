const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Allow JSON parsing
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Proxy endpoint
app.get('/proxy', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        // Fetch data from the provided URL
        const response = await axios.get(url);
        res.set(response.headers);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching the URL:', error.message);
        res.status(500).json({ error: 'Error fetching the URL' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
