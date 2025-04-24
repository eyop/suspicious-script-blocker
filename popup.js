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
  function loadLogs() {
    chrome.storage.local.get("suspiciousScripts", (result) => {
      const logs = result.suspiciousScripts || [];
      const container = document.getElementById("log-container");
  
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
  
  function loadWhitelist() {
    chrome.storage.local.get("whitelist", (data) => {
      const list = data.whitelist || [];
      const ul = document.getElementById("whitelist-list");
      ul.innerHTML = list.map(domain => `
        <li>
          ${domain}
          <span class="remove-whitelist" data-domain="${domain}">✖</span>
        </li>
      `).join("");
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clear-log").addEventListener("click", () => {
      chrome.storage.local.set({ suspiciousScripts: [] }, () => {
        document.getElementById("log-container").textContent = "Log cleared.";
      });
    });
  
    document.getElementById("add-whitelist").addEventListener("click", () => {
      const input = document.getElementById("whitelist-domain");
      const domain = input.value.trim();
      if (!domain) return;
  
      chrome.storage.local.get("whitelist", (data) => {
        const updated = [...new Set([...(data.whitelist || []), domain])];
        chrome.storage.local.set({ whitelist: updated }, () => {
          input.value = "";
          loadWhitelist();
        });
      });
    });
  
    document.getElementById("whitelist-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-whitelist")) {
        const domainToRemove = e.target.dataset.domain;
        chrome.storage.local.get("whitelist", (data) => {
          const updated = (data.whitelist || []).filter(d => d !== domainToRemove);
          chrome.storage.local.set({ whitelist: updated }, loadWhitelist);
        });
      }
    });
  
    loadLogs();
    loadWhitelist();
  });
  document.getElementById("optionsBtn").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });
  // Apply Dark Mode to the Popup
chrome.storage.local.get("darkMode", (data) => {
    const isDark = data.darkMode || false;
    toggleDarkMode(isDark);
  });
  function toggleDarkMode(isDark) {
    const body = document.body;
    
    // Apply the data-theme attribute to switch between dark and light
    if (isDark) {
      body.setAttribute("data-theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
    }
  
    chrome.storage.local.set({ darkMode: isDark });
  }