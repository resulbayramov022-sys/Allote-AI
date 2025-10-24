function getAIResponse(message) {
    message = message.toLowerCase();
  
    if (message.includes("merhaba")) return "Merhaba 👋, nasılsın?";
    if (message.includes("nasılsın")) return "Ben harikayım! Sen nasılsın?";
    if (message.includes("saat")) return "Şu an saat: " + new Date().toLocaleTimeString();
    if (message.includes("hava")) return "Benim sensörlerim yok ama umarım hava güzeldir 🌤️";
    return "Hmm... bunu anlamadım ama öğrenmeye açığım 🤖";
  }
  