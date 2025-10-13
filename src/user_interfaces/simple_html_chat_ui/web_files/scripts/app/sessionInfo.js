// Session information handling
document.addEventListener("sessionUpdate", function (event) {
  const sessionInfo = event.detail;
  updateSessionDisplay(sessionInfo);
});

function updateSessionDisplay(sessionInfo) {
  let sessionDisplay = document.getElementById("session-info");

  // Create the session info display element if it doesn't exist
  if (!sessionDisplay) {
    sessionDisplay = document.createElement("div");
    sessionDisplay.id = "session-info";
    sessionDisplay.className = "session-info-container";
    document.getElementById("chat-container").appendChild(sessionDisplay);

    // Add styles to the head
    const style = document.createElement("style");
    style.textContent = `
      .session-info-container {
        position: fixed;
        bottom: 10px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 100;
        display: none;
        max-width: 250px;
      }
      .session-info-container.visible {
        display: block;
      }
      .session-info-toggle {
        position: fixed;
        bottom: 10px;
        right: 10px;
        background-color: #444;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 101;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);

    // Add toggle button
    const toggleBtn = document.createElement("div");
    toggleBtn.className = "session-info-toggle";
    toggleBtn.textContent = "i";
    toggleBtn.title = "Toggle Session Info";
    toggleBtn.onclick = function () {
      sessionDisplay.classList.toggle("visible");
    };
    document.body.appendChild(toggleBtn);
  }

  // Format time
  const formatTime = (isoString) => {
    try {
      return new Date(isoString).toLocaleTimeString();
    } catch (e) {
      return isoString;
    }
  };

  // Update session info content
  sessionDisplay.innerHTML = `
    <div><strong>Session ID:</strong> ${sessionInfo.id}</div>
    ${
      sessionInfo.startTime
        ? `<div><strong>Started:</strong> ${formatTime(
            sessionInfo.startTime
          )}</div>`
        : ""
    }
    ${
      sessionInfo.lastActivity
        ? `<div><strong>Last Activity:</strong> ${formatTime(
            sessionInfo.lastActivity
          )}</div>`
        : ""
    }
  `;
}
