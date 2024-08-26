const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Retrieve the port from command-line arguments or set a default
const port = process.argv[2] || 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Object to store chat histories for different sessions
const chatHistories = {};
var sessionName = "";

// Shutdown route (define it before serving static files)
app.post('/shutdown', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Shutting down...' });
    server.close(() => {
        console.log('Server closed.');
        process.exit(0); // Graceful shutdown
    });
});

// Chat message API
app.post('/message', (req, res) => {
    const userMessage = req.body.message;
    const userRole = req.body.role;
    sessionName = req.body.session;

    if (userMessage && sessionName) {
        // Initialize chat history for the session if it doesn't exist
        if (!chatHistories[sessionName]) {
            chatHistories[sessionName] = [];
        }

        // Add user's message to the global chat history
        chatHistories[sessionName].push({ sender: userRole, message: userMessage });

        // Broadcast the updated chat history to all connected clients via WebSockets
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ chatHistory: chatHistories[sessionName] }));
            }
        });

        // Send the bot's response and chat history back to the client
        res.status(200).send({ status: 'Message received', message: chatHistories[sessionName] });
    } else {
        res.status(400).json({ status: 'error', message: 'No message provided' });
    }
});

// Update the active session
app.post('/activeSession', (req, res) => {
    if (sessionName !== req.body.session) {
        if (!chatHistories[req.body.session]) {
            res.status(404).json({ status: 'error', message: 'Session not found' });
            return;
        }
        sessionName = req.body.session;
        // Broadcast the updated chat history to all connected clients via WebSockets
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ chatHistory: chatHistories[sessionName] }));
            }
        });
    }
    res.status(200).json({ status: 'ok', message: 'Session updated' });
});

// Update the active session
app.post('/clearHistory', (req, res) => {
    if (sessionName !== req.body.session) {
        if (!chatHistories[req.body.session]) {
            res.status(404).json({ status: 'error', message: 'Session not found' });
            return;
        }
        sessionName = req.body.session;
        chatHistories[sessionName] = [];

        // Broadcast the updated chat history to all connected clients via WebSockets
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ chatHistory: chatHistories[sessionName] }));
            }
        });
    }
    res.status(200).json({ status: 'ok', message: 'Session updated' });
});

// WebSocket connection setup
wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ chatHistory: chatHistories[sessionName] }));
});

// Start server
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});