function getWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city + "," + response.data.country;
  temperature = document.querySelector("#value");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let description = document.querySelector("#details");
  description.innerHTML = response.data.condition.description;
}
function searchCities(event) {
  event.preventDefault();
  let apiKey = "fb05o0ab323256cef37t4ba2f5c3a9ed";
  let city = document.querySelector("#city").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}
function fahrenheit() {
  let temp = document.querySelector("#value");
  let temp1 = (temp.innerText * 9) / 5 + 32;
  temp.innerHTML = Math.round(temp1);
  let symbol = document.querySelector(".degree");
  symbol.innerHTML = "°F";
  let button = document.querySelector("button");
  button.innerHTML = "°C";
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

let date = document.querySelector("#current-date");
date.innerHTML = formatDate(today);
let button = document.querySelector("button");
button.addEventListener("click", fahrenheit);
