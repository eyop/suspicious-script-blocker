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
  