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
