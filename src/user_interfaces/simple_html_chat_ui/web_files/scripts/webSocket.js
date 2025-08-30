// Render features on homepage
function renderFeatures(features) {
  // Only use the first 4 features
  const featuresContainer = document.getElementById("startup-features");
  if (!featuresContainer) return;
  featuresContainer.innerHTML = "";
  const limited = features.slice(0, 4);
  for (let i = 0; i < limited.length; i += 2) {
    const group = limited.slice(i, i + 2);
    const containerDiv = document.createElement("div");
    containerDiv.className = "startup-container";
    group.forEach((f) => {
      const featureDiv = document.createElement("div");
      featureDiv.className = "feature-item";
      featureDiv.innerHTML = `
        <div class="feature-text">
          <h3 title="${f.title}">${f.title}</h3>
          <p title="${f.description}">${f.description}</p>
        </div>
      `;
      containerDiv.appendChild(featureDiv);
    });
    featuresContainer.appendChild(containerDiv);
  }
}
const chatMessages = document.getElementById("chatMessages");

function scrollToBottom() {
  chatMessages?.scrollTo({
    top: chatMessages.scrollHeight,
    behavior: "smooth",
  });
}
const chatContainer = document.getElementById("chat-container");

if (chatContainer) chatContainer.style.display = "none";

function hideHomePage() {
  const startupOverlay = document.getElementById("startup-overlay");

  startupOverlay.style.opacity = "0";
  startupOverlay.style.transition = "opacity 0.5s ease-out";

  setTimeout(() => {
    startupOverlay.style.display = "none";
    chatContainer.style.display = "flex";
    chatContainer.style.opacity = "0";

    setTimeout(() => {
      chatContainer.style.opacity = "1";
      chatContainer.style.transition = "opacity 0.5s ease-in";

      setTimeout(() => {
        scrollToBottom();
        document.getElementById("user-input").focus();
      }, 100);
    }, 50);
  }, 500);
}

const userInput = document.getElementById("user-input");
const userQuery = document.getElementById("user-input-home-page");
const connectionStatus = document.getElementById("connection-status");
const clearChatButton = document.getElementById("clear-chat");
const toggleConnectionButton = document.getElementById("connectBtn");

let socket;
let isConnected = false;
let isConnecting = false;
let reconnectAttempts = 0;
let reconnectTimer = null;

const maxReconnectAttempts = 10;

connectWebSocket();

function getWebSocketPort() {
  const params = new URLSearchParams(window.location.search);
  return params.get("port") || "6123"; // default to 6123 if not provided
}

function connectWebSocket() {
  const host = `ws://localhost:${getWebSocketPort()}`;
  if (isConnecting) return;

  isConnecting = true;
  if (!isConnected) reconnectAttempts++;

  try {
    updateConnectionStatus(
      "connecting",
      `Connecting... (Attempt ${reconnectAttempts}/${maxReconnectAttempts})`
    );
    socket = new WebSocket(host);

    socket.addEventListener("open", () => {
      isConnecting = false;
      isConnected = true;
      reconnectAttempts = 0;

      updateConnectionStatus("connected", "Connected");
      updateToggleButton("Disconnect", "connected");
      // appendSystemMessage("Connected to server");
    });

    socket.addEventListener("message", (event) => {
      hideTyping();
      try {
        const data = JSON.parse(event.data);
        // Listen for 'feature' event type
        if (data.event === "feature" && Array.isArray(data.features)) {
          renderFeatures(data.features);
        } else {
          addMessageToChatbox("Assistant", data.message, data.source);
        }
      } catch (e) {
        console.warn("Received non-JSON message:", e);
        addMessageToChatbox("Assistant", event.data);
      }
    });

    socket.addEventListener("close", () => {
      isConnecting = false;
      isConnected = false;

      updateConnectionStatus("disconnected", "Disconnected");
      updateToggleButton("Connect", "disconnected");
      appendSystemMessage("Connection lost. Click 'Connect' to try again.");

      if (reconnectAttempts >= maxReconnectAttempts) {
        appendSystemMessage(
          `You've tried connecting ${maxReconnectAttempts} times. The server might be unavailable.`
        );
      }
    });

    socket.addEventListener("error", (error) => {
      isConnecting = false;
      updateConnectionStatus("error", "Connection Error");
      console.error("WebSocket error:", error);
    });
  } catch (exception) {
    isConnecting = false;
    isConnected = false;

    updateConnectionStatus("disconnected", "Connection Failed");
    updateToggleButton("Connect", "disconnected");

    appendSystemMessage("Error connecting to server: " + exception);
    console.error("WebSocket exception:", exception);
  }
}

function updateConnectionStatus(className, text) {
  connectionStatus.className = className;
  connectionStatus.textContent = text;
}

function updateToggleButton(text, className) {
  if (!toggleConnectionButton) return;
  toggleConnectionButton.textContent = text;
  toggleConnectionButton.className = className;
}

function appendSystemMessage(text) {
  const systemDiv = Object.assign(document.createElement("div"), {
    className: "system-message",
    textContent: text,
  });

  chatMessages.appendChild(systemDiv);
  scrollToBottom();
}

function showTyping() {
  hideTyping(); // Ensure no duplicate indicators

  const typingDiv = Object.assign(document.createElement("div"), {
    id: "typingIndicator",
    className: "typing",
    textContent: "Assistant is typing...",
  });

  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}

function hideTyping() {
  document.getElementById("typingIndicator")?.remove();
}

document.getElementById("user-input")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

document
  .getElementById("user-input-home-page")
  ?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUserPrompt();
    }
  });

function handleUserPrompt() {
  const userPrompt = userQuery.value.trim();

  if (!userPrompt) return;
  hideHomePage();
  sendMessage(userPrompt);
}

function handleSampleQuestionClick(sampelQuestion) {
  if (!sampelQuestion) return;

  hideHomePage();
  sendMessage(sampelQuestion);
}

function sendMessage(question = "") {
  let text = "";

  if (!question) text = userInput.value.trim();
  else text = question.trim();

  if (!text) return;

  addMessageToChatbox("user", text);
  userInput.value = "";

  if (socket?.readyState === WebSocket.OPEN) {
    try {
      console.log("Sending message:", text);
      socket.send(JSON.stringify({ key: "User Prompt", data: text }));
      showTyping();
    } catch (error) {
      console.error("Send error:", error);
      appendSystemMessage(`Failed to send message: ${error.message}`);
    }
  } else {
    // appendSystemMessage("Not connected to server. Reconnecting...");
    connectionStatus.className = "reconnecting";
    connectionStatus.textContent = "Reconnecting...";
    connectWebSocket();
  }
}

function disconnectWebSocket() {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  if (socket?.readyState === WebSocket.OPEN) {
    socket.close();
    appendSystemMessage("Disconnected from server");

    connectionStatus.className = "disconnected";
    connectionStatus.textContent = "Disconnected";
    isConnected = false;

    if (toggleConnectionButton) {
      toggleConnectionButton.textContent = "Connect";
      toggleConnectionButton.className = "disconnected";
    }
  }
}

function toggleConnection() {
  const shouldDisconnect = isConnected || socket?.readyState === WebSocket.OPEN;

  if (shouldDisconnect) {
    disconnectWebSocket();
    return;
  }

  if (reconnectAttempts >= maxReconnectAttempts) {
    appendSystemMessage(
      `Maximum connection attempts (${maxReconnectAttempts}) reached. Resetting counter.`
    );
    reconnectAttempts = 0;
  }

  connectWebSocket();
}

Object.assign(window, {
  connectWebSocket,
  disconnectWebSocket,
  toggleConnection,
  sendMessage,
});

if (clearChatButton) {
  clearChatButton.addEventListener("click", () => {
    chatMessages.innerHTML = "";
    appendSystemMessage("Chat history cleared");
    socket.send(JSON.stringify({ key: "Clear History", data: "" }));
  });
}

if (toggleConnectionButton) {
  toggleConnectionButton.addEventListener("click", toggleConnection);

  const label = isConnected ? "Disconnect" : "Connect";
  const statusClass = isConnected ? "connected" : "disconnected";

  toggleConnectionButton.textContent = label;
  toggleConnectionButton.className = statusClass;
}

function addMessageToChatbox(sender, message, source) {
  const isUser = sender.toLowerCase() === "user";
  const containerClass = isUser ? "user-container" : "assistant-container";
  const timestampClass = isUser
    ? "userMessagetimestamp"
    : "botMessagetimestamp";
  const senderName = isUser ? "You" : "Assistant";

  const nameDiv = document.createElement("div");
  nameDiv.id = "bot-name";
  nameDiv.textContent = senderName;

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.innerHTML = message;

  const messageContainer = document.createElement("div");
  messageContainer.className = containerClass;
  messageContainer.appendChild(nameDiv);
  messageContainer.appendChild(messageDiv);

  if (!isUser && source) {
    const sourceDiv = document.createElement("div");
    sourceDiv.className = "source-citation";

    const label = document.createElement("span");
    label.textContent = "Source: ";
    sourceDiv.appendChild(label);

    const link = document.createElement("a");
    link.className = "source-link";
    link.target = "_blank";

    if (source.startsWith("http://") || source.startsWith("https://")) {
      link.href = source;
      link.textContent = new URL(source).hostname;
      link.title = source;
    } else {
      link.href = `https://www.google.com/search?q=${encodeURIComponent(
        source
      )}`;
      link.textContent = source;
      link.title = `Search for: ${source}`;
    }

    sourceDiv.appendChild(link);
    messageContainer.appendChild(sourceDiv);
  }

  const timestamp = document.createElement("div");
  timestamp.className = timestampClass;
  timestamp.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  chatMessages.appendChild(messageContainer);
  chatMessages.appendChild(timestamp);
  scrollToBottom();
}
