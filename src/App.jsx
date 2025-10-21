import { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherChart from './components/WeatherChart';
import SearchBar from './components/SearchBar';
import './App.css';

// API Key from environment variable only (secure approach)
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [searchCity, setSearchCity] = useState('London');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if API key is configured
    if (!API_KEY) {
      setError('⚠️ API key not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
      setLoading(false);
      return;
    }

    // Try to get user's location on mount
    // Try to get user's location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // If location access denied, fetch default city
          fetchWeather(searchCity);
        }
      );
    } else {
      fetchWeather(searchCity);
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
        axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      ]);
      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data);
      setSearchCity(currentRes.data.name);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather?q=${cityName}&units=metric&appid=${API_KEY}`),
        axios.get(`${BASE_URL}/forecast?q=${cityName}&units=metric&appid=${API_KEY}`)
      ]);
      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data);
      setSearchCity(cityName);
    } catch (err) {
      setError('City not found. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName) => {
    fetchWeather(cityName);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="icon">🌤️</span>
            Weather Dashboard
          </h1>
          <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} />
        </header>

        {error && (
          <div className="error-message">
            <span>⚠️</span> {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        ) : (
          <>
            {currentWeather && (
              <CurrentWeather data={currentWeather} />
            )}

            {forecast && (
              <>
                <WeatherChart forecast={forecast} />
                <Forecast data={forecast} />
              </>
            )}
          </>
        )}

        <footer className="footer">
          <p>Powered by OpenWeather API | Data updated every 3 hours</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
