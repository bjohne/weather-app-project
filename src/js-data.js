let currentTime = new Date();

function showDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDay = days[currentTime.getDay()];
  let currentDate = currentTime.getDate();
  let currentMonth = months[currentTime.getMonth()];

  return `${currentDay}, ${currentDate} ${currentMonth}`;
}
let updateDate = document.querySelector("#current-date");
updateDate.innerHTML = showDate(currentTime);

function showTime(time) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let updateTime = document.querySelector("#current-time");
updateTime.innerHTML = showTime(currentTime);

function showWeather(response) {
  document.querySelector("#cityChosen1").innerHTML = response.data.name;
  document.querySelector("#cityChosen2").innerHTML = response.data.name;

  document.querySelector("#currentTempDegrees").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#currentTempUnit").innerHTML = "°C";

  document.querySelector("#currentDescription").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "85504bf7b1be17a8a141d12a004a2570";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function showCurrentTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "85504bf7b1be17a8a141d12a004a2570";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentTemp);
}

let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#form-currentLocation");
currentLocation.addEventListener("submit", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTempDegrees = document.querySelector("#currentTempDegrees");
  let tempCelsius = 17;
  let tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32);
  let currentTempUnit = document.querySelector("#currentTempUnit");
  currentTempUnit.innerHTML = "°F";
  currentTempDegrees.innerHTML = `${tempFahrenheit}`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTempDegrees = document.querySelector("#currentTempDegrees");
  let tempCelsius = 17;
  let currentTempUnit = document.querySelector("#currentTempUnit");
  currentTempUnit.innerHTML = "°C";
  currentTempDegrees.innerHTML = `${tempCelsius}`;
}

let fahrenheitBtn = document.querySelector("#fahrenheit");
fahrenheitBtn.addEventListener("click", convertToFahrenheit);

let celsiusBtn = document.querySelector("#celsius");
celsiusBtn.addEventListener("click", convertToCelsius);

searchCity("Amsterdam");
