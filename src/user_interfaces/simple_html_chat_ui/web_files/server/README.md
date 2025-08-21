# LabVIEW LLM Libraries Mock WebSocket Server

This mock WebSocket server is designed to simulate backend responses for the LabVIEW LLM Libraries test client.

## Features

- WebSocket server on port 6123
- JSON-formatted responses including:
  - Message content
  - Source links
  - Session details
- Simulated response delay
- Session tracking

## Setup and Usage

### Prerequisites

- Node.js (v14 or newer recommended)

### Installation

1. Navigate to the server directory:
```
cd "src\user_interfaces\simple_html_chat_ui\Test Client\server"
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm start
```

The server will start and listen on port 6123 (ws://localhost:6123).

### JSON Response Format

The server sends responses in the following JSON format:

```json
{
  "message": "The response text content",
  "source": "https://example.com/source-link",
  "session": {
    "id": "unique-session-id",
    "messageCount": 1,
    "lastActivity": "2025-07-08T10:30:00.000Z"
  }
}
```

## Customization

- You can modify the mock knowledge base in `server.js` to add more predefined responses
- Adjust `MOCK_DELAY_MS` in `server.js` to change the simulated thinking time

## Troubleshooting

- If the server fails to start, check if port 6123 is already in use
- Ensure WebSocket connection is properly configured in the client
