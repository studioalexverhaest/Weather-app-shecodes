// date and time display local
let now = new Date();
console.log(now.getDay());
const body = document.querySelector("body");
body.onload = setToday;
body.onload = setTime;
function setToday() {
  let day = document.querySelector("#day");
  let today = now.getDay();
  let weekdays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  today = weekdays[now.getDay()];
  day.innerHTML = `${today}`;
}
setToday();
function setTime() {
  let currentTime = document.querySelector("#time");
  let theHour = now.getHours();
  let theMinutes = now.getMinutes();
  currentTime.innerHTML = `${theHour} : ${theMinutes}`;
}
setTime();
// search city reflected in UI + livesearch
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(`#searchBar`);
  let cityName = document.querySelector(`#yourCity`);
  // let cityName = cityName.toUpperCase();
  cityName.innerHTML = `${searchInput.value}`;
  //  cityName = cityName.toUpperCase();
}
let form = document.querySelector("#searchCityBar");
form.addEventListener("submit", search);

////// IMPLEMENT SEARCH ENGINE
function showWeather(response) {
  console.log(response.data);
  let cityName = document.querySelector(`#yourCity`);
  cityName.innerHTML = `${response.data.name}`;
  celciusTemperature = response.data.main.temp;
  let returnTemp = document.querySelector(`#degrees`);
  let temperature = Math.round(response.data.main.temp);
  returnTemp.innerHTML = `${temperature}`;
  let returnMood = document.querySelector(`#mood`);
  returnMood.innerHTML = `${response.data.weather[0].description}`;
  let returnWind = document.querySelector(`#wind`);
  returnWind.innerHTML = `Wnd : ${response.data.wind.speed} km/h`;
  let returnPrcp = document.querySelector(`#prcp`);
  returnPrcp.innerHTML = `Prcp : ${response.data.main.humidity} %`;
  let bigIcon = document.querySelector(`#bigIcon`);
  bigIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

///FORECAST
function displayForecast() {
  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = `<div id=week class="row week">`;
  let days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-1 days">
                    ${day}
                    <div class="smallIcon">
                      <i class="fa-solid fa-cloud-rain"></i>
                    </div>
                    21°C
                  </div>`;
    forecastHTML = forecastHTML + `</div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

// SEARCH-BAR
function liveSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector(`#searchBar`);
  searchCity(searchInput.value);
}
form.addEventListener("submit", liveSearch);

function searchCity(city) {
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function retrievePosition(position) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function handleButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let localButton = document.querySelector(`#locality`);
localButton.addEventListener("click", handleButton);

// CONVERSION TO FAHRENHEIT
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector(`#degrees`);
  temperature.innerHTML = `${Math.round(fahrenheitTemperature)}`;
}

let fahrenheitIcon = document.querySelector(`#fahrenheit-icon`);
fahrenheitIcon.addEventListener("click", displayFahrenheitTemperature);

// back to celcius does not work
function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector(`#degrees`);
  temperature.innerHTML = `${Math.round(celciusTemperature)}`;
}

let celciusIcon = document.querySelector(`#celcius-icon`);
celciusIcon.addEventListener("click", displayCelciusTemperature);

displayForecast();

let celciusTemperature = null;

searchCity("Schellebelle");
