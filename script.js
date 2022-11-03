let now = new Date();
//console.log(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
//console.log(day);

let showDay = document.querySelector("#show-day");
showDay.innerHTML = `${day}`;

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let date = now.getDate();
let month = months[now.getMonth()];
function currentDate() {
  let displayDate = `${date}/${month}`;
}

currentDate();

let showDate = document.querySelector("#show-date");
showDate.innerHTML = `${date}/${month}`;

let hours = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");
function currentTime() {
  let displayTime = `${hours}:${minutes}`;
}

currentTime();

let showTime = document.querySelector("#show-time");
showTime.innerHTML = `${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let h2 = document.querySelector("#city-search-result");
  let cityInput = document.querySelector("#city-input");
  if (cityInput.value !== undefined) {
    h2.innerHTML = `${cityInput.value}`;
  } else {
    h2.innerHTML = "";
    alert("Please, type a city name...");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = `${currentTemp}˚C`;
  let currentCity = document.querySelector("#city-search-result");
  currentCity.innerHTML = response.data.name;
}

function searchLocation(city) {
  let apiKey = "393db4e5c25bdf1bb6b5d70d133f7a67";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function getData(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchLocation(city);
}

let searchingForm = document.querySelector("#search-form");
searchingForm.addEventListener("submit", getData);

function searchCoordinates(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "393db4e5c25bdf1bb6b5d70d133f7a67";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(searchCoordinates);
}

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentPosition);
