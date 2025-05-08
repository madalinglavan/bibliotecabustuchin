

 

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

    forecastList.forEach((item) => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString("ro-RO", { weekday: "long" });
      const hour = date.getHours();

      // Selectăm doar orele: dimineață (9), amiază (15), seară (21)
      if ([9, 15, 21].includes(hour)) {
        if (!daysMap[day]) {
          daysMap[day] = [];
        }

        daysMap[day].push({
          hour,
          temp: Math.round(item.main.temp),
          desc: item.weather[0].description,
          icon: item.weather[0].icon,
        });
      }
    });

    const forecastContainer = document.getElementById("weather-forecast");
    forecastContainer.innerHTML = "";

    const days = Object.keys(daysMap).slice(0, 3); // doar 3 zile

    days.forEach((day) => {
      const forecasts = daysMap[day];
      let forecastHTML = `<div class="forecast-day"><h4>${day.charAt(0).toUpperCase() + day.slice(1)}</h4>`;

      forecasts.forEach((entry) => {
        const iconUrl = `https://openweathermap.org/img/wn/${entry.icon}@2x.png`;
        forecastHTML += `
          <div class="hour-block">
            <p><strong>${entry.hour}:00</strong></p>
            <img src="${iconUrl}" alt="${entry.desc}" />
            <p>${entry.temp}°C</p>
            <p>${entry.desc}</p>
          </div>
        `;
      });

      forecastHTML += `</div>`;
      forecastContainer.innerHTML += forecastHTML;
    });
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






function enableHorizontalScroll(containerSelector) {
  const slider = document.querySelector(containerSelector);
  if (!slider) return;

  let isDragging = false;
  let startX;
  let scrollLeft;

  // Mouse Events
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // viteza
    slider.scrollLeft = scrollLeft - walk;
  });

  // Touch Events (pentru mobil)
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchend', () => {
    isDragging = false;
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// Activezi scrollul pentru ambele containere
enableHorizontalScroll('.book-grid');
enableHorizontalScroll('.events-container');






let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Funcția pentru a schimba slide-ul
function goToSlide(index) {
  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }
  
  const offset = -currentSlide * 100;
  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

// Navigare manuală
prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));

// Navigare automată
setInterval(() => {
  goToSlide(currentSlide + 1);
}, 7000); // Schimbă slide-ul la fiecare 5 secunde

// La început, să arătăm primul slide
goToSlide(currentSlide);



document.querySelectorAll('.event').forEach(eventCard => {
  eventCard.addEventListener('click', () => {
    const modal = document.getElementById('event-modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = eventCard.innerHTML;
    modal.style.display = 'block';
  });
});

document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('event-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
  const modal = document.getElementById('event-modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
