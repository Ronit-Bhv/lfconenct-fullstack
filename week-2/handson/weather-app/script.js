const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const statusEl = document.querySelector("#status");
const weatherResult = document.querySelector("#weather-result");
const weatherIcon = document.querySelector("#weather-icon");
const cityNameEl = document.querySelector("#city-name");
const temperatureEl = document.querySelector("#temperature");
const conditionEl = document.querySelector("#condition");
const humidityEl = document.querySelector("#humidity");

const API_KEY = "5a7bfefd3c15536d834fcbd10d6b5787";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("City not found");
  return response.json();
}

function showLoading() {
  statusEl.textContent = "Loading weather data...";
  statusEl.className = "status loading";
  weatherResult.hidden = true;
}

function showError(message) {
  statusEl.textContent = message;
  statusEl.className = "status error";
  weatherResult.hidden = true;
}

function showSuccess() {
  statusEl.textContent = "";
  statusEl.className = "status";
  weatherResult.hidden = false;
}

function renderWeather(data) {
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = data.weather[0].description;

  cityNameEl.textContent = data.name;
  temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
  conditionEl.textContent =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);
  humidityEl.textContent = `Humidity: ${data.main.humidity}%`;

  showSuccess();
}

async function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  showLoading();

  try {
    const data = await fetchWeather(city);
    renderWeather(data);
  } catch (err) {
    showError(err.message === "City not found" ? "City not found. Please try again." : "Something went wrong. Please try again later.");
  }
}

searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
