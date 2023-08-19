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

// switch temp between Farenheit and Celcius
function switchTemp(event) {
  let degreeNumber = document.querySelector(`#degrees`);
  let farenheitSymbol = document.querySelector(`#farenheitSymbol`);
  degreeNumber.innerHTML = `56`;
  farenheitSymbol.innerHTML = `C`;
  // let celciusSymbol = document.querySelector(`#celciusSymbol`);
  // celciusSymbok.innerHTML = `F`;
}

// let weirdTemp = document.querySelector(`#farenheitLink`);
// weirdTemp.addEventListener("click", switchTemp);

// function showWeather(response) {
//   console.log(response);
// }

////// IMPLEMENT SEARCH ENGINE

function handleSearch(response) {
  console.log(response.data);
  let returnTemp = document.querySelector(`#degrees`);
  let temperature = Math.round(response.data.main.temp);
  returnTemp.innerHTML = `${temperature}°C`;
  let returnMood = document.querySelector(`#mood`);
  returnMood.innerHTML = `${response.data.weather[0].description}`;
  let returnWind = document.querySelector(`#wind`);
  returnWind.innerHTML = `${response.data.wind.speed} km/h`;
  let returnPrcp = document.querySelector(`#prcp`);
  returnPrcp.innerHTML = `Prcp : ${response.data.main.humidity} %`;
}

// search-bar
function liveSearch(position) {
  let searchInput = document.querySelector(`#searchBar`);

  let cityName = document.querySelector(`#yourCity`);
  cityName = `${searchInput.value}`;

  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  axios.get(url).then(handleSearch);
  console.log(cityName);
}

form.addEventListener("submit", liveSearch);

// // local-button

let localButton = document.querySelector(`#locality`);
localButton.addEventListener("click", handleButton);

function handleButton(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
  console.log("click");
}

function retrievePosition(position) {
  console.log(position);
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(handleLocalSearch);
}

function handleLocalSearch(response) {
  console.log(response.data.sys.name);
  let returnCity = document.querySelector(`#yourCity`);
  returnCity.innerHTML = `here`;
  let returnTemp = document.querySelector(`#degrees`);
  let temperature = Math.round(response.data.main.temp);
  returnTemp.innerHTML = `${temperature}°C`;
  let returnMood = document.querySelector(`#mood`);
  returnMood.innerHTML = `${response.data.weather[0].description}`;
  let returnWind = document.querySelector(`#wind`);
  returnWind.innerHTML = `${response.data.wind.speed} km/h`;
  let returnPrcp = document.querySelector(`#prcp`);
  returnPrcp.innerHTML = `Prcp : ${response.data.main.humidity} %`;
}
