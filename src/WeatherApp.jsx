import React, { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const API_KEY = "10dbe688ab9a312f747d25b890fee7de";

  const getWeather = async () => {
    if (!city.trim()) {
      setErrorMsg("Please enter a city name.");
      setWeather(null);
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
        setErrorMsg("");
      } else {
        setWeather(null);
        setErrorMsg("City not found.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Something went wrong.");
    }

    setIsLoading(false);
  };

  return (
    <div className="app-wrapper">
      <div className="weather-container">
        <h1 className="title">WeatherNow</h1>
        <p className="subtitle">Get live weather of any city instantly.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
          />
          <button onClick={getWeather} disabled={isLoading}>
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>

        {errorMsg && <p className="error">{errorMsg}</p>}

        {weather && (
          <div className="weather-card">
            <h2 className="city">{weather.name}</h2>
            <p className="desc">{weather.weather[0].description}</p>
            <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>

            <div className="details">
              <div>
                <span>Humidity</span>
                <p>{weather.main.humidity}%</p>
              </div>
              <div>
                <span>Wind</span>
                <p>{weather.wind.speed} m/s</p>
              </div>
              <div>
                <span>Pressure</span>
                <p>{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;