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
  
  function scanScripts() {
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
  }
  
  window.addEventListener("DOMContentLoaded", scanScripts);
