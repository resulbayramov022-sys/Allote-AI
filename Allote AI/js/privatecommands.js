import { applyTheme } from "./theme.js";

const privateCommands = [
  {
    command: "/allote",
    category: "Araçlar",
    execute: () => `
🤖 <strong>Allote AI - Bot Bilgileri</strong><br><br>
✨ <strong>Özellikler:</strong><br>
• 8 Tema Generatörü komutu (/temageneratör)<br>
• Hava durumu sorgulama<br>
• Akıllı sohbet sistemi<br>
• Özel komutlar paneli<br>
• Responsive ve modern tasarım<br><br>
📊 <strong>Versiyon:</strong> 1.1.0<br>
💡 "/" yazarak tüm komutları görebilirsin!<br><br>
👨‍💻 <strong>Geliştirici:</strong> Allote AI yapan Rəsul Bayramov
    `
  },
  {
    command: "/help",
    category: "Araçlar",
    execute: () => `
📚 <strong>Yardım Merkezi - Allote AI</strong><br><br>
<strong>Komutlar:</strong><br>
/allote - Bot hakkında bilgi<br>
/help - Yardım menüsü<br>
/temizle - Sohbeti temizle<br>
/saat - Anlık saat bilgisi<br>
/tarih - Günün tarihi<br>
/rastgele - Rastgele sayı üret<br>
/emoji - Rastgele emoji<br>
/renk - Rastgele renk kodu<br>
/şaka - Komik bir şaka<br>
/bilgi - Sistem bilgileri<br>
/temageneratör - Rastgele tema uygular<br>
/themegen - Rastgele tema üretir ve kaydetme seçeneği sunar<br><br>
💬 Sohbet için normal yaz, özel işlemler için "/" ile başla!<br><br>
👨‍💻 <strong>Geliştirici:</strong> Allote AI yapan Rəsul Bayramov
    `
  },
  {
    command: "/temizle",
    category: "Araçlar",
    execute: () => {
      setTimeout(() => (document.getElementById("chat").innerHTML = ""), 100);
      return "🧹 Sohbet temizleniyor...";
    }
  },
  {
    command: "/saat",
    category: "Araçlar",
    execute: () => `🕐 <strong>Anlık Saat:</strong> ${new Date().toLocaleTimeString("tr-TR")}`
  },
  {
    command: "/tarih",
    category: "Araçlar",
    execute: () => {
      const tarih = new Date().toLocaleDateString("tr-TR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return `📅 <strong>Bugünün Tarihi:</strong> ${tarih}`;
    }
  },
  {
    command: "/rastgele",
    category: "Eğlence",
    execute: () => `🎲 <strong>Rastgele Sayı:</strong> ${Math.floor(Math.random() * 100) + 1}`
  },
  {
    command: "/emoji",
    category: "Eğlence",
    execute: () => {
      const emojiler = ["😀", "😃", "😄", "😁", "😆", "🤣", "😂", "😍", "🤩", "😎", "🥳", "🤖"];
      const e = emojiler[Math.floor(Math.random() * emojiler.length)];
      return `${e} <strong>Rastgele Emoji:</strong> ${e}`;
    }
  },
  {
    command: "/renk",
    category: "Eğlence",
    execute: () => {
      const renk = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
      return `🎨 <strong>Rastgele Renk:</strong> <span style="background:${renk}; padding:5px 15px; border-radius:8px; color:#fff;">${renk}</span>`;
    }
  },
  {
    command: "/şaka",
    category: "Eğlence",
    execute: () => {
      const şakalar = [
        "Neden bilgisayar denize giremez? 🌊 Çünkü suyun içinde Java çalışmaz!",
        "Programcı ne zaman evlenir? 💍 while(true) döngüsüne girdiğinde!",
        "HTML ve CSS bara girer... 🍺 JavaScript onları canlandırır!",
        "404 hatası bara girer... 🍻 Barmen: 'Seni burada bulamadım!'",
      ];
      return `😄 <strong>Şaka Zamanı:</strong><br>${şakalar[Math.floor(Math.random() * şakalar.length)]}`;
    }
  },
  {
    command: "/bilgi",
    category: "Araçlar",
    execute: () => `
💻 <strong>Sistem Bilgileri</strong><br><br>
🌐 <strong>Tarayıcı:</strong> ${navigator.userAgent.includes("Chrome") ? "Chrome" : "Diğer"}<br>
🖥️ <strong>Platform:</strong> ${navigator.platform}<br>
🌍 <strong>Dil:</strong> ${navigator.language}<br>
📡 <strong>Bağlantı:</strong> ${navigator.onLine ? "✅ Çevrimiçi" : "❌ Çevrimdışı"}<br>
⏰ <strong>Saat:</strong> ${new Date().toLocaleTimeString("tr-TR")}<br>
📅 <strong>Tarih:</strong> ${new Date().toLocaleDateString("tr-TR")}
    `
  },
  {
    command: "/hava",
    category: "Araçlar",
    execute: () => "☁️ Hava durumunu öğrenmek için şehir ismi yaz veya hava butonlarını kullan!"
  },
  {
    command: "/motivasyon",
    category: "Eğlence",
    execute: () => {
      const m = [
        "💪 Bugün harika bir gün, kendine güven!",
        "🌟 Her zorluk yeni bir fırsattır!",
        "🚀 Başarı, cesur adımlar atanları bulur!",
        "🎯 Hedeflerine odaklan ve ilerle!",
        "🔥 Tutkun varsa, yolunu kendin açarsın!"
      ];
      return m[Math.floor(Math.random() * m.length)];
    }
  },
  {
    command: "/themegen",
    category: "Temalar",
    execute: () => {
      const themes = [
        "chocolate", "pomegranate", "seaside", "nightSky", "pastelSpring",
        "neonFuturistic", "oceanDepth", "minimalist", "cactus", "windyAutumn",
        "chocolateRedBerry", "cosmic", "winter", "tropical", "easternZen",
        "coffeeBook", "aiCode", "sunset", "candy", "retro80s"
      ];
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const themeSelect = document.getElementById("themeSelect");
      const themeText = Array.from(themeSelect.options).find(o => o.value === randomTheme)?.text || randomTheme;
      return `
        🎨 <strong>Tema Generator:</strong><br><br>
        Yeni tema: <strong>${themeText}</strong><br>
        <button onclick="import('/js/theme.js').then(m=>m.applyTheme('${randomTheme}'))" style="margin-top:8px; margin-right:8px; padding:8px 16px; border:none; background:#3b82f6; color:white; border-radius:8px;">Temayı Uygula</button>
        <button onclick="
          const savedThemes = JSON.parse(localStorage.getItem('savedThemes') || '[]');
          if (!savedThemes.some(t => t.value === '${randomTheme}')) {
            savedThemes.push({ value: '${randomTheme}', text: '${themeText}' });
            localStorage.setItem('savedThemes', JSON.stringify(savedThemes));
            const opt = document.createElement('option');
            opt.value = '${randomTheme}';
            opt.text = '${themeText}';
            document.getElementById('savedThemesDropdown').appendChild(opt);
            document.getElementById('settings.js').dispatchEvent(new Event('loadSavedThemes'));
            alert('Tema ayarlar paneline eklendi ✅');
          } else {
            alert('Bu tema zaten mevcut ⚠️');
          }
        " style="margin-top:8px; padding:8px 16px; border:none; background:#22c55e; color:white; border-radius:8px;">Temayı Kaydet</button>
      `;
    }
  },
  {
    command: "/rastgeleemoji",
    category: "Eğlence",
    execute: () => {
      const e = ["😄", "😂", "😍", "🤩", "😎", "🥳", "🤖", "👾", "🐱", "🐶"];
      return `🎉 Rastgele Emoji: ${e[Math.floor(Math.random() * e.length)]}`;
    }
  },
  {
    command: "/say",
    category: "Eğlence",
    execute: () => `🔢 Rastgele Sayı: ${Math.floor(Math.random() * 1000)}`
  },
  {
    command: "/tebrik",
    category: "Eğlence",
    execute: () => "🎊 Tebrikler! Harika bir iş çıkardın!"
  },
  {
    command: "/gizli",
    category: "Eğlence",
    execute: () => "🤫 Bu gizli bir mesaj! Kimseye söyleme..."
  },
  {
    command: "/rastgelerenk",
    category: "Eğlence",
    execute: () => {
      const renk = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
      return `🌈 Rastgele Renk: <span style="background:${renk}; padding:5px 15px; border-radius:8px; color:#fff;">${renk}</span>`;
    }
  },
  {
    command: "/teknoloji",
    category: "Eğlence",
    execute: () => {
      const mesajlar = [
        "💻 Yeni bir yazılım öğrenmek harika bir fikir!",
        "📱 Teknoloji hızla değişiyor, takip et!",
        "🤖 Yapay zekayı keşfetmek çok eğlenceli!",
        "🛰️ Uzay teknolojileri gelişiyor!",
        "🔧 Donanım ve yazılımın uyumu mükemmel!"
      ];
      return mesajlar[Math.floor(Math.random() * mesajlar.length)];
    }
  },
  {
    command: "/bilgelik",
    category: "Eğlence",
    execute: () => {
      const s = [
        "🧠 Bilgi güçtür, bilgeliğe yatırım yap!",
        "🌱 Küçük adımlar büyük fark yaratır.",
        "🕊️ Sabır her zaman ödül getirir。",
        "⚖️ Dengeyi bulmak hayatın anahtarıdır。",
        "🌟 Kendine inan, başarabilirsin!"
      ];
      return s[Math.floor(Math.random() * s.length)];
    }
  },
  {
    command: "/gülümse",
    category: "Eğlence",
    execute: () => "😊 İşte sana bir gülümseme! Gülümsemek bulaşıcıdır!"
  },
  {
    command: "/sürpriz",
    category: "Eğlence",
    execute: () => {
      const s = ["🎁 Küçük bir sürpriz!", "🍫 Çikolata zamanı!", "🎶 Favori şarkını aç!", "🕹️ Kısa bir oyun molası ver!", "🌸 Biraz doğa zamanı!"];
      return s[Math.floor(Math.random() * s.length)];
    }
  },
  {
    command: "/temageneratör",
    category: "Temalar",
    execute: () => {
      const temalar = [
        "default", "chocolate", "pomegranate", "seaside", "nightSky",
        "pastelSpring", "neonFuturistic", "oceanDepth", "minimalist",
        "cactus", "windyAutumn", "chocolateRedBerry", "cosmic",
        "winter", "tropical", "easternZen", "coffeeBook", "aiCode",
        "sunset", "candy", "retro80s"
      ];
      const randomTheme = temalar[Math.floor(Math.random() * temalar.length)];
      applyTheme(randomTheme);
      return `🎨 <strong>Tema Generatörü:</strong> "${randomTheme}" teması aktif edildi!`;
    }
  }
];

export default privateCommands;