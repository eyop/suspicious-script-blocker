const input = document.getElementById("domainInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("whitelist");

function loadWhitelist() {
  chrome.storage.local.get("whitelist", (data) => {
    const domains = data.whitelist || [];
    list.innerHTML = "";
    domains.forEach((domain) => {
      const li = document.createElement("li");
      li.textContent = domain;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.className = "remove-btn";
      removeBtn.onclick = () => removeDomain(domain);

      li.appendChild(removeBtn);
      list.appendChild(li);
    });
  });
}

function addDomain() {
  const domain = input.value.trim().toLowerCase().replace(/^www\./, "");
  if (!domain) return;

  chrome.storage.local.get("whitelist", (data) => {
    const whitelist = data.whitelist || [];
    if (!whitelist.includes(domain)) {
      whitelist.push(domain);
      chrome.storage.local.set({ whitelist }, loadWhitelist);
      input.value = "";
    }
  });
}

function removeDomain(domain) {
  chrome.storage.local.get("whitelist", (data) => {
    const whitelist = data.whitelist || [];
    const updated = whitelist.filter((d) => d !== domain);
    chrome.storage.local.set({ whitelist: updated }, loadWhitelist);
  });
}

addBtn.addEventListener("click", addDomain);
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addDomain();
});

loadWhitelist();
document.getElementById("exportBtn").addEventListener("click", () => {
    chrome.storage.local.get(["whitelist", "suspiciousScripts"], (data) => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = "script-blocker-backup.json";
      a.click();
  
      URL.revokeObjectURL(url);
    });
  });
  
  document.getElementById("importInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedData = JSON.parse(reader.result);
        const whitelist = Array.isArray(importedData.whitelist) ? importedData.whitelist : [];
        const suspiciousScripts = Array.isArray(importedData.suspiciousScripts) ? importedData.suspiciousScripts : [];
  
        chrome.storage.local.set({ whitelist, suspiciousScripts }, () => {
          alert("Import successful!");
          loadWhitelist(); // Refresh UI
        });
      } catch (e) {
        alert("Invalid file format.");
      }
    };
    reader.readAsText(file);
  });
  const darkModeToggle = document.getElementById("darkModeToggle");

function toggleDarkMode(isDark) {
  if (isDark) {
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "white";
    document.querySelector("h1").style.color = "white";
    document.querySelectorAll("button").forEach((btn) => {
      btn.style.backgroundColor = "#333";
      btn.style.color = "white";
    });
    document.querySelectorAll("input").forEach((input) => {
      input.style.backgroundColor = "#333";
      input.style.color = "white";
    });
  } else {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
    document.querySelector("h1").style.color = "#000000";
    document.querySelectorAll("button").forEach((btn) => {
      btn.style.backgroundColor = "#e74c3c";
      btn.style.color = "white";
    });
    document.querySelectorAll("input").forEach((input) => {
      input.style.backgroundColor = "#f0f0f0";
      input.style.color = "#000000";
    });
  }
}

darkModeToggle.addEventListener("change", () => {
  const isDark = darkModeToggle.checked;
  chrome.storage.local.set({ darkMode: isDark });
  toggleDarkMode(isDark);
});

// Load dark mode setting
chrome.storage.local.get("darkMode", (data) => {
  const isDark = data.darkMode || false;
  darkModeToggle.checked = isDark;
  toggleDarkMode(isDark);
});
document.getElementById("clearLogsBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all script logs?")) {
      chrome.storage.local.remove("suspiciousScripts", () => {
        alert("All logs cleared.");
      });
    }
  });
  