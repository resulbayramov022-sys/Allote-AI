// weather.js
export async function getWeather(city = "Baku") {
    const apiKey = "1d64e8ae6ad191df10bb2f41c935ce76"; // sənin API açarın
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=az&appid=${apiKey}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      if (data.cod !== 200) {
        return "Şəhər tapılmadı ❌";
      }
  
      const temp = data.main.temp.toFixed(1);
      const desc = data.weather[0].description;
      const wind = data.wind.speed;
      const feels = data.main.feels_like.toFixed(1);
  
      return `🌍 ${city} üçün hava məlumatı:
  🌡️ Temperatur: ${temp}°C
  💨 Rüzgar: ${wind} m/s
  🌥️ Hava: ${desc}
  🤔 Hissedilen: ${feels}°C`;
    } catch (err) {
      return "Hava məlumatını gətirmək mümkün olmadı ⚠️";
    }
  }
  