function showDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let userCity = document.querySelector("#location-search-box");
  cityName.innerHTML = userCity.value;
}
let searchBox = document.querySelector("#location");
searchBox.addEventListener("submit", searchCity);

let date = document.querySelector("#time-date");
let nowTime = new Date();
date.innerHTML = showDate(nowTime);

// collects current temp and displays
let apiKey = "291898a720d9114bc4e6b079cf895e54";
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location-search-box");
  let cityValue = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);

  let todaysTemp = document.querySelector("#currentTemp");
  todaysTemp.innerHTML = `${Math.round(response.data.main.temp)}°c`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
}
let searchForm = document.querySelector("#location");
searchForm.addEventListener("submit", search);

function coordinates(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(coordinates);
}

//
