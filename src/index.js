function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector(".weather-app-icon");

  descriptionElement.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = response.data.wind.speed + "km/h";
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);

  getDayTime();
  setInterval(getDayTime, 1000);
}

function searchCity(city) {
  let apiKey = "7t6odb7e1170370e4048f527dba5cdfe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
});

//Get the day and time

function getDayTime() {
  let dayTime = document.querySelector(".day-time");
  let now = new Date();
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + hours;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  dayTime.innerHTML = `${day} ${hours}:${minutes}`;
}

//Get the forecast
function getForecast(city) {
  let apiKey = "7t6odb7e1170370e4048f527dba5cdfe";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let weatherForecast = "";

  days.forEach(function (day) {
    weatherForecast =
      weatherForecast +
      `
      <div class="forecast-day">
        <div class="forecast-date">${day}</div>
        <div class="forecast-icon">🌤️</div>
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = weatherForecast;
}

searchCity("Pretoria");
