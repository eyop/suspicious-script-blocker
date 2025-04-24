let warningInjected = false;

function isSuspicious(scriptContent) {
    const suspiciousPatterns = [
      /eval\(/,
      /Function\(/,
      /atob\(/,
      /btoa\(/,
      /setTimeout\s*\(\s*['"`]/,
      /document\.write/,
      /innerHTML\s*=/,
      /unescape\(/,
      /[\W](fromCharCode|charCodeAt)\(/,
    ];
  
    return suspiciousPatterns.some((pattern) => pattern.test(scriptContent));
  }
  function getDomain(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
    } 
    
    function injectWarningBanner() {
        if (warningInjected) return;
        warningInjected = true;
      
        const banner = document.createElement("div");
        banner.innerHTML = "⚠️ Suspicious inline scripts were blocked on this page.";
        banner.style.position = "fixed";
        banner.style.top = "0";
        banner.style.left = "0";
        banner.style.right = "0";
        banner.style.backgroundColor = "#e74c3c";
        banner.style.color = "white";
        banner.style.padding = "10px";
        banner.style.zIndex = "9999";
        banner.style.fontSize = "14px";
        banner.style.textAlign = "center";
        banner.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        banner.style.fontFamily = "sans-serif";
      
        document.body.appendChild(banner);
      
        // Optional: auto-hide after 5 seconds
        setTimeout(() => banner.remove(), 5000);
      }
      
  function scanScripts() {

    chrome.storage.local.get("whitelist", (data) => {
        const whitelist = data.whitelist || [];
        const currentDomain = getDomain(window.location.href);
    
        if (whitelist.includes(currentDomain)) {
          console.log(`✅ Whitelisted: ${currentDomain}`);
          return;
        }
    const scripts = document.querySelectorAll("script:not([src])");
  
    scripts.forEach((script) => {
      const content = script.textContent || "";
  
      if (isSuspicious(content)) {
        script.type = "javascript/blocked"; // prevent execution
        script.textContent = ""; // clear content
        console.warn("⚠️ Blocked suspicious inline script");
  
        chrome.runtime.sendMessage({
          action: "logSuspiciousScript",
          data: {
            content: content.slice(0, 200) + "...",
            location: window.location.href,
          }
        });
      }
    });

  });
    }
    chrome.storage.local.get("disableBlocking", (data) => {
        const disableBlocking = data.disableBlocking || false;
      
        if (disableBlocking) return; // Skip blocking if disabled
      
        // Existing script-blocking logic here...
      });
    
// Allow users to toggle blocking on/off
chrome.storage.local.get("disableBlocking", (data) => {
    document.getElementById("disableBlockingToggle").checked = data.disableBlocking || false;
  });
  
  document.getElementById("disableBlockingToggle").addEventListener("change", (event) => {
    const disableBlocking = event.target.checked;
    chrome.storage.local.set({ disableBlocking });
  });  
  window.addEventListener("DOMContentLoaded", scanScripts);
