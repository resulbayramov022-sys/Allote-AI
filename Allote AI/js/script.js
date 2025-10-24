import { getWeather } from "./weather.js";
import responses from "./responses.js";
import privateCommands from "./privatecommands.js";
import { applyTheme } from "./theme.js";

const chat = document.getElementById("chat");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const aiTyping = document.getElementById("aiTyping");
const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");
const closeSettingsBtn = document.getElementById("close-settings");
const themeSelect = document.getElementById("themeSelect");
const commandsBtn = document.getElementById("commands-btn");

// Şehir butonları
const cities = ["Baku", "Istanbul", "New York", "London", "Paris", "Tokyo"];

// Özel komutlar paneli
let commandsPanel = null;

// Event Listeners
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => { if(e.key==="Enter") sendMessage(); });
settingsBtn.addEventListener("click", () => settingsPanel.classList.add("open"));
closeSettingsBtn.addEventListener("click", () => settingsPanel.classList.remove("open"));
themeSelect.addEventListener("change", () => applyTheme(themeSelect.value));
commandsBtn.addEventListener("click", toggleCommandsPanel);

// Input değişikliklerini dinle (özel komutlar için)
input.addEventListener("input", handleInputChange);

// =========================
// Input değişikliği kontrolü
// =========================
function handleInputChange() {
  const value = input.value.trim();
  
  if (value.startsWith("/")) {
    showCommandsPanel();
  } else {
    hideCommandsPanel();
  }
}

// =========================
// Komutlar panelini aç/kapat
// =========================
function toggleCommandsPanel() {
  if (commandsPanel) {
    hideCommandsPanel();
  } else {
    showCommandsPanel();
  }
}

// =========================
// Komutlar panelini göster
// =========================
function showCommandsPanel() {
  // Eğer panel zaten varsa, kaldır
  if (commandsPanel) {
    commandsPanel.remove();
  }

  // Yeni panel oluştur
  commandsPanel = document.createElement("div");
  commandsPanel.className = "commands-panel open";

  // Başlık ve kapatma butonu ekle
  const header = document.createElement("div");
  header.className = "commands-header";
  header.innerHTML = "<h2>Özel Komutlar</h2><button id='close-panel-btn'>✕</button>";
  commandsPanel.appendChild(header);

  // Kapatma butonuna event ekle
  header.querySelector("#close-panel-btn").addEventListener("click", hideCommandsPanel);

  // Arama çubuğu ekle
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Komut ara...";
  searchInput.style.padding = "8px";
  searchInput.style.margin = "10px";
  searchInput.style.width = "calc(100% - 20px)";
  searchInput.style.borderRadius = "8px";
  searchInput.style.border = "1px solid rgba(255,255,255,0.2)";
  searchInput.style.background = "rgba(255,255,255,0.05)";
  searchInput.style.color = "var(--text)";
  commandsPanel.appendChild(searchInput);

  // Komutları kategorilere göre gruplamak için bir container
  const commandsContainer = document.createElement("div");
  commandsContainer.className = "commands-list";
  commandsPanel.appendChild(commandsContainer);

  // Arama fonksiyonu
  function filterCommands() {
    const filterText = searchInput.value.toLowerCase();
    commandsContainer.innerHTML = "";

    // Kategorilere göre komutları grupla
    const categories = [...new Set(privateCommands.map(cmd => cmd.category))];
    categories.forEach(category => {
      const filteredCommands = privateCommands.filter(
        cmd => cmd.category === category && cmd.command.toLowerCase().includes(filterText)
      );

      if (filteredCommands.length > 0) {
        // Kategori başlığı ekle
        const categoryHeader = document.createElement("div");
        categoryHeader.style.padding = "10px";
        categoryHeader.style.fontWeight = "bold";
        categoryHeader.style.color = "var(--text)";
        categoryHeader.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
        categoryHeader.textContent = category;
        commandsContainer.appendChild(categoryHeader);

        // Komutları ekle
        filteredCommands.forEach(cmd => {
          const item = document.createElement("div");
          item.className = "command-item";
          item.textContent = cmd.command;
          
          item.addEventListener("click", () => {
            input.value = cmd.command;
            hideCommandsPanel();
            sendMessage();
          });
          
          commandsContainer.appendChild(item);
        });
      }
    });
  }

  // Arama çubuğuna input eventi ekle
  searchInput.addEventListener("input", filterCommands);

  // İlk yüklemede tüm komutları göster
  filterCommands();

  // Paneli konumlandır
  const inputRect = input.getBoundingClientRect();
  commandsPanel.style.bottom = (window.innerHeight - inputRect.top + 10) + "px";
  commandsPanel.style.left = inputRect.left + "px";

  document.body.appendChild(commandsPanel);
}

// =========================
// Komutlar panelini gizle
// =========================
function hideCommandsPanel() {
  if (commandsPanel) {
    commandsPanel.remove();
    commandsPanel = null;
  }
}

// Dışarı tıklamayı dinle
document.addEventListener("click", (e) => {
  if (commandsPanel && !commandsPanel.contains(e.target) && e.target !== input && e.target !== commandsBtn) {
    hideCommandsPanel();
  }
});

// =========================
// Mesaj gönderme
// =========================
async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";
  hideCommandsPanel();
  aiTyping.style.display = "flex";

  setTimeout(async () => {
    let response = "";
    const cmd = privateCommands.find(c => c.command === message);
    if (cmd) {
      response = cmd.execute();
    } else if (message.toLowerCase().includes("hava")) {
      const city = cities.find(c => message.toLowerCase().includes(c.toLowerCase())) || "Baku";
      response = await getWeather(city);
      const div = addMessage("bot", response);
      const cityButtons = document.createElement("div");
      cityButtons.className = "city-buttons";
      cities.forEach(city => {
        const btn = document.createElement("button");
        btn.className = "city-btn";
        btn.textContent = city;
        cityButtons.appendChild(btn);
      });
      div.appendChild(cityButtons);
      attachCityButtons(div);
    } else {
      response = responses[message.toLowerCase()] || getFallbackReply();
    }

    addMessage("bot", response);
    aiTyping.style.display = "none";
  }, 1000);
}

// =========================
// Mesaj ekleme
// =========================
function addMessage(sender, message) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerHTML = message;
  chat.appendChild(div);
  setTimeout(() => div.classList.add("show"), 100);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

// =========================
// Fallback cevapları
// =========================
function getFallbackReply() {
  const fallbackReplies = [
    "Hmm... bunu tam anlamadım, başka bir şekilde sorabilir misin? 💬",
    "İlginç, bu konuda emin değilim ama deneyeyim 🤓",
    "Bir saniye... bunu analiz ediyorum 🧠",
  ];
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

// =========================
// City button eventleri
// =========================
function attachCityButtons(parentDiv) {
  const buttons = parentDiv.querySelectorAll(".city-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const city = btn.textContent;
      const weather = await getWeather(city);
      addMessage("bot", weather);
      buttons.forEach(b => b.remove());
    });
  });
  updateCityButtonStyle();
}

// =========================
// City button stili ve hover efekti
// =========================
function updateCityButtonStyle(botColor) {
  const btns = document.querySelectorAll(".city-btn");
  const color = botColor || getComputedStyle(document.documentElement).getPropertyValue('--bot');
  btns.forEach(btn => {
    btn.style.background = color;
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '12px';
    btn.style.padding = '10px 20px';
    btn.style.fontWeight = '500';
    btn.style.cursor = 'pointer';
    btn.style.margin = '5px';
    btn.style.transition = 'all 0.3s ease';
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px) scale(1.05)';
      btn.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
      btn.style.boxShadow = 'none';
    });
  });
}

// =========================
// İlk tema uygulaması
// =========================
applyTheme("default");