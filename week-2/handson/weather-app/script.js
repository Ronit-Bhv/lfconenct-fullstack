const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const statusEl = document.querySelector("#status");
const weatherResult = document.querySelector("#weather-result");

const API_KEY = "5a7bfefd3c15536d834fcbd10d6b5787";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("City not found");
  return response.json();
}

function renderWeather(data) {
  weatherResult.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temperature: ${data.main.temp} C</p>
    <p>Condition: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();  
    if (!city) return;
    const data = await fetchWeather(city);
    renderWeather(data);
});