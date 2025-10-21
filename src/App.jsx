import { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherChart from './components/WeatherChart';
import SearchBar from './components/SearchBar';
import WeatherBackground from './components/WeatherBackground';
import './App.css';

// Grab the API key from environment variables
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [searchCity, setSearchCity] = useState('Melbourne,AU');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [themeOverride, setThemeOverride] = useState(null);

  useEffect(() => {
    // Make sure the API key is set up before we try anything
    if (!API_KEY) {
      setError('⚠️ API key not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
      setLoading(false);
      return;
    }

    // Try to get the user's location when the app loads
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fall back to Melbourne if they don't share their location
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

  const handleThemeChange = (theme) => {
    setThemeOverride(theme);
  };

  const handleAutoTheme = () => {
    setThemeOverride(null);
  };

  const weatherThemes = [
    { id: 'clear', name: 'Clear', icon: '☀️', color: '#FFD700' },
    { id: 'rain', name: 'Rain', icon: '🌧️', color: '#4a9eff' },
    { id: 'snow', name: 'Snow', icon: '🌨️', color: '#ffffff' },
    { id: 'thunderstorm', name: 'Storm', icon: '⛈️', color: '#1e3a5f' },
    { id: 'clouds', name: 'Clouds', icon: '☁️', color: '#b0bec5' },
    { id: 'drizzle', name: 'Drizzle', icon: '🌦️', color: '#6eb5ff' },
    { id: 'mist', name: 'Mist', icon: '🌫️', color: '#aaaaaa' },
    { id: 'fog', name: 'Fog', icon: '🌁', color: '#999999' },
  ];

  return (
    <div className="app">
      <WeatherBackground 
        weatherCondition={themeOverride || currentWeather?.weather[0]?.main || 'clear'} 
      />
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

        {/* Theme Override Controls */}
        <div className="theme-selector">
          <h3 className="theme-selector-title">Theme</h3>
          <div className="theme-buttons">
            <button
              className={`theme-button ${themeOverride === null ? 'active' : ''}`}
              onClick={handleAutoTheme}
              title="Use current weather"
            >
              <span className="theme-icon">🔄</span>
              <span className="theme-name">Auto</span>
            </button>
            {weatherThemes.map((theme) => (
              <button
                key={theme.id}
                className={`theme-button ${themeOverride === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme.id)}
                style={{ '--theme-color': theme.color }}
                title={`${theme.name} theme`}
              >
                <span className="theme-icon">{theme.icon}</span>
                <span className="theme-name">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        <footer className="footer">
          <p>Developed by Bishal | Powered by OpenWeather API | Data updated every 3 hours</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
