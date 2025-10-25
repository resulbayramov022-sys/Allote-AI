import { applyTheme } from './theme.js';

const themeSelect = document.getElementById("themeSelect");
const savedThemesDropdown = document.getElementById("savedThemesDropdown");
const themeSearchInput = document.getElementById("themeSearchInput");
const savedThemesList = document.getElementById("savedThemesList");

// LocalStorage-dan temaları yüklə və dropdown-a əlavə et
function loadSavedThemes() {
    const savedThemes = JSON.parse(localStorage.getItem("savedThemes") || "[]");

    // Dropdown-u təmizlə və ilkin seçimi əlavə et
    savedThemesDropdown.innerHTML = '<option value="">— Seç —</option>';

    savedThemes.forEach(theme => {
        const opt = document.createElement("option");
        opt.value = theme.value;
        opt.text = theme.text;
        savedThemesDropdown.appendChild(opt);
    });

    renderSavedThemesPanel(savedThemes);
}

// Paneli render et və axtarışa uyğun filtr et
function renderSavedThemesPanel(themes) {
    savedThemesList.innerHTML = "";

    const filterText = themeSearchInput.value.toLowerCase();

    themes
        .filter(t => t.text.toLowerCase().includes(filterText))
        .forEach(theme => {
            const li = document.createElement("li");
            li.style.cursor = "pointer";
            li.style.padding = "5px";
            li.style.border = "1px solid #ccc";
            li.style.marginBottom = "5px";
            li.textContent = theme.text;
            li.addEventListener("click", () => {
                applyTheme(theme.value);
                document.getElementById("themePreview").innerText = "Nümunə: " + theme.text;
            });
            savedThemesList.appendChild(li);
        });
}

// Temayı preview-də göstər
function previewTheme(themeName) {
    applyTheme(themeName);
    const text = Array.from(themeSelect.options).find(o => o.value === themeName)?.text || themeName;
    document.getElementById("themePreview").innerText = "Nümunə: " + text;
}

// Rastgele tema yarat
function generateRandomTheme() {
    const themes = Array.from(themeSelect.options).map(o => o.value);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    previewTheme(randomTheme);
}

// Temayı seçib uygula
document.getElementById("applyThemeBtn").addEventListener("click", () => {
    const theme = themeSelect.value;
    previewTheme(theme);
});

// Temayı əlavə et və LocalStorage-a saxla
document.getElementById("addThemeBtn").addEventListener("click", () => {
    const selectedTheme = themeSelect.value;
    const selectedText = themeSelect.options[themeSelect.selectedIndex].text;

    if (!selectedTheme) return alert("Əvvəlcə bir tema seçin ⚠️");

    let savedThemes = JSON.parse(localStorage.getItem("savedThemes") || "[]");

    if (!savedThemes.some(t => t.value === selectedTheme)) {
        savedThemes.push({ value: selectedTheme, text: selectedText });
        localStorage.setItem("savedThemes", JSON.stringify(savedThemes));

        // Dropdown-u yenilə
        const opt = document.createElement("option");
        opt.value = selectedTheme;
        opt.text = selectedText;
        savedThemesDropdown.appendChild(opt);

        alert("Tema əlavə edildi ✅");

        renderSavedThemesPanel(savedThemes);
    } else {
        alert("Bu tema artıq mövcuddur ⚠️");
    }
});

// Saxlanmış temadan seçib tətbiq et
savedThemesDropdown.addEventListener("change", () => {
    const theme = savedThemesDropdown.value;
    if (theme) previewTheme(theme);
});

// Input search funksiyası
themeSearchInput.addEventListener("input", () => {
    const savedThemes = JSON.parse(localStorage.getItem("savedThemes") || "[]");
    renderSavedThemesPanel(savedThemes);
});

// /themegen düyməsi ilə rastgele tema
document.getElementById("generateThemeBtn").addEventListener("click", () => {
    generateRandomTheme();
});

// Səhifə açıldıqda saxlanmış temaları yüklə
window.addEventListener("load", loadSavedThemes);
// Özel loadSavedThemes eventi için dinleyici
document.addEventListener("loadSavedThemes", loadSavedThemes);