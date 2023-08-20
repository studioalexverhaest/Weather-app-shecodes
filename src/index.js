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
function handleSearch(response) {
  console.log(response.data);
  let returnTemp = document.querySelector(`#degrees`);
  //  let celciusTemperature = response.data.main.temp;
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

// SEARCH-BAR
function liveSearch(response) {
  let searchInput = document.querySelector(`#searchBar`);
  let cityName = document.querySelector(`#yourCity`);
  cityName = `${searchInput.value}`;

  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(url).then(handleSearch);
  console.log(cityName);
}
form.addEventListener("submit", liveSearch);

// LOCAL-BUTTON
function handleLocalSearch(response) {
  console.log(response.data.sys.name);
  let returnCity = document.querySelector(`#yourCity`);
  returnCity.innerHTML = `here`;
  let returnTemp = document.querySelector(`#degrees`);
  let temperature = Math.round(response.data.main.temp);
  returnTemp.innerHTML = `${temperature}`;
  let returnMood = document.querySelector(`#mood`);
  returnMood.innerHTML = `${response.data.weather[0].description}`;
  let returnWind = document.querySelector(`#wind`);
  returnWind.innerHTML = `wind : ${response.data.wind.speed} km/h`;
  let returnPrcp = document.querySelector(`#prcp`);
  returnPrcp.innerHTML = `Prcp : ${response.data.main.humidity} %`;
  let bigIcon = document.querySelector(`#bigIcon`);
  bigIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function handleButton(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
  console.log("click");
}

let localButton = document.querySelector(`#locality`);
localButton.addEventListener("click", handleButton);

function retrievePosition(position) {
  console.log(position);
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(handleLocalSearch);
}

//CONVERSION TO FAHRENHEIT
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector(`#degrees`);
  temperature.innerHTML = `${Math.round(fahrenheitTemperature)}`;
}

let fahrenheitIcon = document.querySelector(`#fahrenheit-icon`);
fahrenheitIcon.addEventListener("click", displayFahrenheitTemperature);

// back to celcius does not work
// function displayCelciusTemperature(event) {
//   event.preventDefault();
//   let celciusTemperature = celciusTemperature;
//   let temperature = document.querySelector(`#degrees`);
//   temperature.innerHTML = `${Math.round(celciusTemperature)}`;
// }

// let celciusIcon = document.querySelector(`#celcius-icon`);
// fahrenheitIcon.addEventListener("click", displayCelciusTemperature);

//SEARCH ON LOAD
// function searchOnLoad(response) {
//   alert("doesthiswork?");
//   let returnCity = document.querySelector(`#yourCity`);
//   returnCity.innerHTML = `Seoul`;
//   let returnTemp = document.querySelector(`#degrees`);
//   let temperature = Math.round(response.data.main.temp);
//   returnTemp.innerHTML = `${temperature}`;
//   let returnMood = document.querySelector(`#mood`);
//   returnMood.innerHTML = `${response.data.weather[0].description}`;
//   let returnWind = document.querySelector(`#wind`);
//   returnWind.innerHTML = `wind : ${response.data.wind.speed} km/h`;
//   let returnPrcp = document.querySelector(`#prcp`);
//   returnPrcp.innerHTML = `Prcp : ${response.data.main.humidity} %`;
//   let bigIcon = document.querySelector(`#bigIcon`);
//   bigIcon.setAttribute(
//     "src",
//     `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
//   );
// }

// search("Seoul");
// function search(loadCity) {
//   let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${loadCity}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(searchOnLoad);
// }

// let celciusTemperature = null;
