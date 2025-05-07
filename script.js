

 

  async function get3DayForecast() {
    const apiKey = "311b36e4f26a127c91b6860b88c1c8c0";
    const city = "Bustuchin,RO";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ro`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Eroare la preluarea prognozei.");
  
      const data = await response.json();
      const forecastList = data.list;
  
      const daysMap = {};
      const addedDays = new Set();
  
      for (let i = 0; i < forecastList.length; i++) {
        const item = forecastList[i];
        const date = new Date(item.dt_txt);
        const dayKey = date.toLocaleDateString("ro-RO", { weekday: "long" });
  
        if (!addedDays.has(dayKey)) {
          daysMap[dayKey] = {
            temp: Math.round(item.main.temp),
            desc: item.weather[0].description,
            icon: item.weather[0].icon
          };
          addedDays.add(dayKey);
        }
  
        if (addedDays.size === 3) break; // doar 3 zile
      }
  
      const forecastContainer = document.getElementById("weather-forecast");
      forecastContainer.innerHTML = "";
  
      for (const day in daysMap) {
        const forecast = daysMap[day];
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`;
  
        forecastContainer.innerHTML += `
          <div class="forecast-day">
            <h4>${day.charAt(0).toUpperCase() + day.slice(1)}</h4>
            <img src="${iconUrl}" alt="${forecast.desc}" />
            <p>${forecast.temp}°C</p>
            <p>${forecast.desc}</p>
          </div>
        `;
      }
    } catch (error) {
      document.getElementById("weather-forecast").textContent = "Vremea indisponibilă momentan.";
      console.error("Eroare prognoză:", error);
    }
  }
  
  get3DayForecast();
  



  document.getElementById('catalog-search').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.book-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? 'block' : 'none';
    });
  });








  // Funcționalitate pentru apelare telefonică
document.getElementById('phone-card').addEventListener('click', function() {
  window.location.href = 'tel:+40123456789';
});

// Funcționalitate pentru trimiterea unui email
document.getElementById('email-card').addEventListener('click', function() {
  window.location.href = 'mailto:bibliotecabustuchin@gmail.com';
});

// Funcționalitate pentru deschiderea Google Maps
document.getElementById('address-card').addEventListener('click', function() {
  window.location.href = 'https://www.google.com/maps?q=Str.+Principală+nr.+66,+Bustuchin,+Gorj';
});










let startX;
let scrollLeft;

const slider = document.querySelector('.events-container');

slider.addEventListener('mousedown', (e) => {
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.cursor = 'grabbing';
});

slider.addEventListener('mouseleave', () => {
  slider.style.cursor = 'grab';
});

slider.addEventListener('mouseup', () => {
  slider.style.cursor = 'grab';
});

slider.addEventListener('mousemove', (e) => {
  if (!startX) return;
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; // Viteza de mișcare (3x mai rapid decât mișcarea mouse-ului)
  slider.scrollLeft = scrollLeft - walk;
});
