function getWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city + "," + response.data.country;
  temperature = document.querySelector("#value");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let description = document.querySelector("#details");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon-img"/>`;
  getForecast(response.data.city);
}
function searchCities(event) {
  event.preventDefault();
  let apiKey = "fb05o0ab323256cef37t4ba2f5c3a9ed";
  let city = document.querySelector("#city").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
axios
  .get(
    "https://api.shecodes.io/weather/v1/current?query=Tokyo&key=fb05o0ab323256cef37t4ba2f5c3a9ed"
  )
  .then(getWeather);

let isCelsius = true; // Track the current temperature unit

function fahrenheit() {
  let temp = document.querySelector("#value");
  let symbol = document.querySelector(".degree");
  let button = document.querySelector("button");
  if (isCelsius) {
    let tempF = (temp.innerText * 9) / 5 + 32;
    temp.innerHTML = Math.round(tempF);
    symbol.innerHTML = "°F";
    button.innerHTML = "°C";
  } else {
    let tempC = (temp.innerText - 32) * (5 / 9);
    temp.innerHTML = Math.round(tempC);
    symbol.innerHTML = "°C";
    button.innerHTML = "°F";
  }

  isCelsius = !isCelsius;
}
let search = document.querySelector("form");
search.addEventListener("submit", searchCities);
let today = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let minute = date.getMinutes();
  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return `${day} ${hour}:${minute}`;
}
function getForecast(city) {
  let apiKey = "fb05o0ab323256cef37t4ba2f5c3a9ed";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function forecastDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let date = new Date(timestamp * 1000);
  return days[date.getDay()];
}
function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastElements = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastElements =
        forecastElements +
        `<div class="forecast-day">
  <div class="forecast-date">${forecastDay(day.time)}</div>
  <div class="forecast-icon"><img src="${day.condition.icon_url} "/></div>
  <div class="forecast-values">
    <strong>${Math.round(day.temperature.maximum)}°</strong> ${Math.round(
          day.temperature.minimum
        )}°
  </div>
</div>`;
    }
  });

  forecast.innerHTML = forecastElements;
}

let date = document.querySelector("#current-date");
date.innerHTML = formatDate(today);
let button = document.querySelector("button");
button.addEventListener("click", fahrenheit);
