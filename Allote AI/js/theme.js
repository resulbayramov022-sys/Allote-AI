// theme.js — 21 Tema + Tam Rəng Dəyişikliyi Sistemi

export function applyTheme(theme) {
  const root = document.documentElement;
  let colors = {};

  switch (theme) {
    case "default":
      colors = {bg:"#0f172a", bot:"#3b82f6", user:"#22c55e", dot:"#00ffcc", text:"#f1f5f9"};
      break;
    case "chocolate":
      colors = {bg:"#3e2f2f", bot:"#d4af37", user:"#a0522d", dot:"#ffd700", text:"#fff5e6"};
      break;
    case "pomegranate":
      colors = {bg:"#8b0000", bot:"#ff4d6d", user:"#ff9999", dot:"#ff1a1a", text:"#fff0f0"};
      break;
    case "seaside":
      colors = {bg:"#00bfff", bot:"#0077b6", user:"#00ffc3", dot:"#00ffff", text:"#ffffff"};
      break;
    case "nightSky":
      colors = {bg:"#0c0c52", bot:"#4e4ef1", user:"#00f0ff", dot:"#ff00ff", text:"#e0e0ff"};
      break;
    case "pastelSpring":
      colors = {bg:"#ffd1dc", bot:"#ffb6b9", user:"#a0e7e5", dot:"#ffc0cb", text:"#4a4a4a"};
      break;
    case "neonFuturistic":
      colors = {bg:"#0f0f0f", bot:"#39ff14", user:"#00ffff", dot:"#ff00ff", text:"#ffffff"};
      break;
    case "oceanDepth":
      colors = {bg:"#001f3f", bot:"#00b4d8", user:"#48cae4", dot:"#90e0ef", text:"#cceeff"};
      break;
    case "minimalist":
      colors = {bg:"#ffffff", bot:"#555555", user:"#000000", dot:"#888888", text:"#111111"};
      break;
    case "cactus":
      colors = {bg:"#556b2f", bot:"#3d9970", user:"#2ecc40", dot:"#00ff00", text:"#f0fff0"};
      break;
    case "windyAutumn":
      colors = {bg:"#ffcc66", bot:"#ff9900", user:"#ffcc33", dot:"#ffaa00", text:"#3b1700"};
      break;
    case "chocolateRedBerry":
      colors = {bg:"#3e2f2f", bot:"#ff4d6d", user:"#d2691e", dot:"#ff0000", text:"#fff0f0"};
      break;
    case "cosmic":
      colors = {bg:"#000000", bot:"#ff00ff", user:"#00ffff", dot:"#ffff00", text:"#ffffff"};
      break;
    case "winter":
      colors = {bg:"#aee1f9", bot:"#00bfff", user:"#87cefa", dot:"#e0f7fa", text:"#000033"};
      break;
    case "tropical":
      colors = {bg:"#00ff7f", bot:"#00ff7f", user:"#fff700", dot:"#00ffcc", text:"#003300"};
      break;
    case "easternZen":
      colors = {bg:"#d2b48c", bot:"#deb887", user:"#ffe4c4", dot:"#d2b48c", text:"#3b2f2f"};
      break;
    case "coffeeBook":
      colors = {bg:"#4b3832", bot:"#6f4e37", user:"#c0a080", dot:"#8b4513", text:"#f5f0e1"};
      break;
    case "aiCode":
      colors = {bg:"#000000", bot:"#39ff14", user:"#00ff00", dot:"#0f0", text:"#0f0"};
      break;
    case "sunset":
      colors = {bg:"#ff5e62", bot:"#ff6b6b", user:"#ffdd59", dot:"#ffdd00", text:"#330000"};
      break;
    case "candy":
      colors = {bg:"#ffb6c1", bot:"#ff69b4", user:"#ff1493", dot:"#ff69b4", text:"#330033"};
      break;
    case "retro80s":
      colors = {bg:"#0f0c29", bot:"#ff00ff", user:"#00ffff", dot:"#ff0", text:"#ffffff"};
      break;
    case "granny":
      colors = {
        bg: "#4b3832",      // Kahverengi, nostaljik arka plan
        bot: "#d4a373",     // Sıcak bej, bot mesajları
        user: "#ffb6c1",    // Yumuşak pembe, kullanıcı mesajları
        dot: "#e6b800",     // Sarımsı, typing dots için
        text: "#f5f0e1"     // Krem rengi, genel metin
      };
      break;
    default:
      colors = {bg:"#0f172a", bot:"#3b82f6", user:"#22c55e", dot:"#00ffcc", text:"#f1f5f9"};
  }

  // 🎨 Bütün səhifənin rənglərini dəyiş
  document.body.style.background = colors.bg;
  const allElements = document.querySelectorAll("*");
  allElements.forEach(el => {
    el.style.transition = "all 0.3s ease";
    el.style.color = colors.text;

    if (["INPUT", "TEXTAREA"].includes(el.tagName)) {
      el.style.backgroundColor = colors.user;
      el.style.color = colors.text;
      el.style.border = `1px solid ${colors.bot}`;
    }

    // Butonlar
    if (el.tagName === "BUTTON") {
      el.style.background = colors.bot;
      el.style.color = "#fff";
      el.style.border = "none";
      el.style.borderRadius = "8px";
      el.style.padding = "6px 12px";
    }

    // Paneller və kartlar
    if (el.classList.contains("settings-panel") || el.id === "chat" || el.tagName === "HEADER" || el.tagName === "FOOTER") {
      el.style.background = colors.bg;
    }
  });

  // AI yazma nöqtələri (typing dots)
  document.querySelectorAll(".dot").forEach(dot => {
    dot.style.background = colors.dot;
  });
}