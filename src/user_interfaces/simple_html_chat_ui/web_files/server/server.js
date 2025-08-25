const WebSocket = require("ws");
const crypto = require("crypto");

// Configuration
const PORT = process.env.PORT || 6123;
const MOCK_DELAY_MS = 1500; // Simulate thinking time

// Create a WebSocket server
const wss = new WebSocket.Server({ port: PORT });

// Track active sessions
const activeSessions = new Map();

// Mock knowledge base for responses
const knowledgeBase = [
  {
    message:
      "LabVIEW is a system-design platform and development environment for a visual programming language from National Instruments.",
    source: "https://www.ni.com/en/shop/labview.html",
  },
  {
    message:
      "Large Language Models (LLMs) are advanced AI models trained on vast amounts of text data that can generate human-like text responses.",
    source: "https://openai.com/research/language-models",
  },
  {
    message:
      "Vector databases are specialized databases designed to store and search high-dimensional vectors, commonly used for semantic search and AI applications.",
    source: "https://qdrant.tech/documentation/",
  },
  {
    message:
      "Embedding models convert text or other data types into numerical vector representations that capture semantic meaning.",
    source: "https://www.sbert.net/",
  },
];

// Generate a random session ID
function generateSessionId() {
  return crypto.randomBytes(16).toString("hex");
}

// Generate a mock response based on user input
function generateMockResponse(message) {
  // Very simple keyword matching for demo purposes
  const lowercaseMessage = message.toLowerCase();

  // Find relevant responses
  const matches = knowledgeBase.filter(
    (item) =>
      item.message.toLowerCase().includes(lowercaseMessage) ||
      lowercaseMessage
        .split(" ")
        .some(
          (word) => word.length > 3 && item.message.toLowerCase().includes(word)
        )
  );

  // Return a matching response or a default response
  if (matches.length > 0) {
    // Select a random match
    const response = matches[Math.floor(Math.random() * matches.length)];
    return response;
  }

  return {
    message: `I received your message: "${message}". This is a mock response from the server.`,
    source: "https://example.com/mock-data",
  };
}

// Features array to send on connection
const features = [
  {
    title: "Multiple AI Models",
    description:
      "Connect to various LLM models including Open AI, Gemini, Anthropic, and more",
  },
  {
    title: "Source Citations",
    description:
      "Get detailed references and clickable sources with AI responses",
  },
  {
    title: "LabVIEW Integration",
    description: "Seamlessly connects with LabVIEW applications and workflows",
  },
  {
    title: "Session Management",
    description:
      "Create and manage conversation sessions with persistent history",
  },
];

wss.on("connection", (ws) => {
  // Send features event on connection
  ws.send(
    JSON.stringify({
      event: "feature",
      features: features.map((f) => ({ title: f.title, desc: f.description })),
    })
  );
  // Create a new session for this connection
  const sessionId = generateSessionId();
  const sessionStartTime = new Date().toISOString();

  const sessionInfo = {
    id: sessionId,
    startTime: sessionStartTime,
    messageCount: 0,
    lastActivity: sessionStartTime,
  };

  activeSessions.set(sessionId, sessionInfo);

  console.log(`New connection established: ${sessionId}`);

  // Handle incoming messages
  ws.on("message", (message) => {
    try {
      const messageStr = message.toString();
      console.log(`Received: ${messageStr}`);

      // Update session info
      const session = activeSessions.get(sessionId);
      session.messageCount++;
      session.lastActivity = new Date().toISOString();

      // Generate response after a small delay to simulate thinking
      setTimeout(() => {
        const responseData = generateMockResponse(messageStr);

        const response = {
          message: responseData.message,
          source: responseData.source,
          session: {
            id: sessionId,
            messageCount: session.messageCount,
            lastActivity: session.lastActivity,
          },
        };

        ws.send(JSON.stringify(response));
      }, MOCK_DELAY_MS);
    } catch (error) {
      console.error("Error processing message:", error);
      ws.send(
        JSON.stringify({
          message: "Sorry, there was an error processing your request.",
          source: null,
          session: { id: sessionId },
        })
      );
    }
  });

  // Handle connection close
  ws.on("close", () => {
    console.log(`Connection closed: ${sessionId}`);
    // Keep session info in map for potential reconnection
    const session = activeSessions.get(sessionId);
    session.connected = false;
    session.disconnectTime = new Date().toISOString();
  });
});

console.log(`WebSocket server started on port ${PORT}`);
