chrome.runtime.onInstalled.addListener(() => {
    console.log("Suspicious Script Blocker installed.");
  });
  
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "logSuspiciousScript") {
      const logEntry = {
        content: msg.data.content,
        location: msg.data.location,
        timestamp: new Date().toISOString()
      };
  
      // Save to local storage
      chrome.storage.local.get({ suspiciousScripts: [] }, (result) => {
        const updatedLogs = [logEntry, ...result.suspiciousScripts].slice(0, 50);
        chrome.storage.local.set({ suspiciousScripts: updatedLogs });
      });
  
      // Update badge count per tab
      if (sender.tab && sender.tab.id !== undefined) {
        chrome.action.getBadgeText({ tabId: sender.tab.id }, (text) => {
          const currentCount = parseInt(text) || 0;
          chrome.action.setBadgeText({ text: String(currentCount + 1), tabId: sender.tab.id });
          chrome.action.setBadgeBackgroundColor({ color: "#e74c3c", tabId: sender.tab.id });
        });
      }
    }
  });
  
  // Clear badge on tab switch / navigation
  chrome.tabs.onActivated.addListener(({ tabId }) => {
    chrome.action.setBadgeText({ text: "", tabId });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "loading") {
      chrome.action.setBadgeText({ text: "", tabId });
    }
  });
  