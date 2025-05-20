

 

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




document.addEventListener('DOMContentLoaded', () => {
  // Acum toate elementele sunt disponibile, deci putem face selecții

  // Variabile pentru modal
  const modal = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalLocation = document.getElementById('modal-location');
  const modalGoal = document.getElementById('modal-goal');
  const modalSlides = document.getElementById('modal-slides');
  const modalQuotes = document.getElementById('modal-quotes');
  const closeBtn = document.querySelector('.close-btn');

  // =====================
  // Slider Modal
  let currentSlideModal = 0;

  function changeSlideModal(direction) {
    const slides = modalSlides.querySelectorAll('img');
    if (slides.length === 0) return;

    slides[currentSlideModal].classList.remove('active');
    currentSlideModal = (currentSlideModal + direction + slides.length) % slides.length;
    slides[currentSlideModal].classList.add('active');
  }

  document.querySelector('.modal .prev').addEventListener('click', () => changeSlideModal(-1));
  document.querySelector('.modal .next').addEventListener('click', () => changeSlideModal(1));

  // =====================
  // Deschidere Modal
  document.querySelectorAll('.event').forEach(event => {
    event.addEventListener('click', () => {
      modalTitle.textContent = event.querySelector('.event-title')?.textContent || '';
      modalDate.textContent = event.querySelector('.event-date')?.textContent.replace("Data:", "").trim() || '';
      modalLocation.textContent = event.querySelector('.event-location')?.textContent.replace("Locația:", "").trim() || '';
      modalGoal.textContent = event.querySelector('.event-goal')?.textContent.replace("Obiectiv:", "").trim() || '';

      // Slider imagini
      const images = event.querySelectorAll('.event-media img');
      modalSlides.innerHTML = '';
      images.forEach((img, index) => {
        const slideImg = document.createElement('img');
        slideImg.src = img.src;
        slideImg.alt = img.alt || '';
        if (index === 0) slideImg.classList.add('active');
        modalSlides.appendChild(slideImg);
      });
      currentSlideModal = 0;

      // Feedback
      modalQuotes.innerHTML = '';
      event.querySelectorAll('.event-feedback blockquote').forEach(q => {
        const bq = document.createElement('blockquote');
        bq.textContent = q.textContent;
        modalQuotes.appendChild(bq);
      });

      modal.style.display = 'block';
    });
  });

  // =====================
  // Închidere Modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

});


let currentMainSlide = 0;
const mainSlides = document.querySelectorAll('.main-slide');
const totalMainSlides = mainSlides.length;
const mainSlider = document.querySelector('.welcome-slider');
const mainPrevButton = document.querySelector('.main-prev');
const mainNextButton = document.querySelector('.main-next');

// Culori/gradienți pentru fiecare slide
const slideBackgrounds = [
  "linear-gradient(90deg, rgb(10, 59, 78) 0%, rgba(0, 107, 143, 1) 50%, rgba(24, 123, 148, 1) 100%)",
  "linear-gradient(90deg, #6a0572 0%, #ab83a1 50%, #f3d9fa 100%)",
  "linear-gradient(90deg, #004e92 0%,rgb(159, 165, 221) 100%)",
  "linear-gradient(90deg, #1d976c 0%, #93f9b9 100%)",
  "linear-gradient(90deg, #6a0572 0%, #ab83a1 50%, #f3d9fa 100%)",
  "linear-gradient(90deg, #004e92 0%,rgb(159, 165, 221) 100%)",
  "linear-gradient(90deg, #1d976c 0%, #93f9b9 100%)"
];


// Funcția care schimbă slide-ul și culoarea
function goToMainSlide(index) {
  if (index < 0) {
    currentMainSlide = totalMainSlides - 1;
  } else if (index >= totalMainSlides) {
    currentMainSlide = 0;
  } else {
    currentMainSlide = index;
  }

  const offset = -currentMainSlide * 100;
  document.querySelector('.main-slides').style.transform = `translateX(${offset}%)`;

  // Schimbăm fundalul secțiunii welcome-slider
  mainSlider.style.background = slideBackgrounds[currentMainSlide];
}

// Navigare manuală
mainPrevButton.addEventListener('click', () => goToMainSlide(currentMainSlide - 1));
mainNextButton.addEventListener('click', () => goToMainSlide(currentMainSlide + 1));

// Navigare automată
setInterval(() => {
  goToMainSlide(currentMainSlide + 1);
}, 10000); // La fiecare 10 secunde

// Inițializare
goToMainSlide(currentMainSlide);
