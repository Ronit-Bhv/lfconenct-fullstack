import { useState } from "react";
import SearchForm from "./components/SearchForm";
import StatusMessage from "./components/StatusMessage";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "City not found. Please try again.");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeather(city);
  };

  const getStatus = () => {
    if (loading) return "loading";
    if (error) return "error";
    if (weather) return "success";
    return "idle";
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather App</h1>
        <p>Search for a city to check the weather</p>
      </header>
      <SearchForm city={city} setCity={setCity} handleSubmit={handleSubmit} loading={loading} />
      <StatusMessage status={getStatus()} error={error} />
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
