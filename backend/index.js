const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { CORS_ORIGIN } = require('./config');  //

console.log("Loaded config:", { CORS_ORIGIN });

const ID = uuidv4();
const PORT = 8080;

const app = express();
app.use(express.json());

// CORS headers setup
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    console.log(`[${new Date().toISOString()}] Request received: ${req.method} ${req.url}`);
    next();
});

// Serve JSON only on `/`
app.get("/", (req, res) => {
    console.log(`[${new Date().toISOString()}] GET / - Returning ID`);
    res.json({ id: ID });
});

app.listen(PORT, () => {
    console.log(`Backend started on port ${PORT}. Press Ctrl+C to exit.`);
});
