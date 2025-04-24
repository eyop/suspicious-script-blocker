chrome.runtime.onInstalled.addListener(() => {
    console.log("Suspicious Script Blocker installed.");
  });
  
  // Optional future logic for messaging or whitelisting
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "logSuspiciousScript") {
      console.warn("Suspicious script detected:", msg.data);
    }
  });
  