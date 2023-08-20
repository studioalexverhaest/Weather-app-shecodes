# Weather app

shecodes weather app
this whole piece of code does not work and for some reason makes everything die
//search on load
// function search(cityLoad) {
// let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
// let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityLoad}&units=metric&appid=${apiKey}`;
// axios.get(url).then(displayTemperature);
// }

// function displayTemperature(response) {
// let temperatureElement = document.querySelector("#degrees");
// let cityElement = document.querySelector("#yourCity");
// let descriptionElement = document.querySelector("#mood");
// let humidityElement = document.querySelector("#prcp");
// let windElement = document.querySelector("#wind");
// let dateElement = document.querySelector("#day");
// let iconElement = document.querySelector("#bigIcon");

// let celsiusTemperature = response.data.main.temp;

// temperatureElement.innerHTML = Math.round(celsiusTemperature);
// cityElement.innerHTML = response.data.name;
// descriptionElement.innerHTML = response.data.weather[0].description;
// humidityElement.innerHTML = `Prcp: ${response.data.main.humidity} %`;
// windElement.innerHTML = `Wnd: ${Math.round(
//     response.data.wind.speed * 3.6
//   )} km/h`;
// dateElement.innerHTML = formatDate(response.data.dt \* 1000);
// iconElement.setAttribute(
// "src",
// `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
// );
// iconElement.setAttribute("alt", response.data.weather[0].description);
// }

// // search-bar
// function liveSearch(position) {
// let searchInput = document.querySelector(`#searchBar`);
// let cityName = document.querySelector(`#yourCity`);
// cityName = `${searchInput.value}`;

// let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
// let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

// axios.get(url).then(handleSearch);
// console.log(cityName);
// }

// form.addEventListener("submit", liveSearch);

// search("New York");
