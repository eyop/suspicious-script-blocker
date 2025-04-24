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
  
      chrome.storage.local.get({ suspiciousScripts: [] }, (result) => {
        const updatedLogs = [logEntry, ...result.suspiciousScripts].slice(0, 50); // limit to 50
        chrome.storage.local.set({ suspiciousScripts: updatedLogs });
      });
    }
  });
  