document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("log-container");
    const clearButton = document.getElementById("clear-log");
  
    function loadLogs() {
      chrome.storage.local.get("suspiciousScripts", (result) => {
        const logs = result.suspiciousScripts || [];
  
        if (logs.length === 0) {
          container.textContent = "No suspicious scripts detected yet.";
          return;
        }
  
        container.innerHTML = logs.map((log) => `
          <div class="log-entry">
            <div class="log-url"><strong>${log.location}</strong></div>
            <div class="log-snippet">${log.content}</div>
            <div class="log-time">${new Date(log.timestamp).toLocaleString()}</div>
          </div>
        `).join("");
      });
    }
  
    clearButton.addEventListener("click", () => {
      chrome.storage.local.set({ suspiciousScripts: [] }, () => {
        container.textContent = "Log cleared.";
      });
    });
  
    loadLogs();
  });
  