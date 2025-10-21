import React, { useState, useEffect } from 'react';

const CurrentWeather = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Determine if it's day or night based on sunrise/sunset
  const isDayTime = () => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp >= data.sys.sunrise && currentTimestamp < data.sys.sunset;
  };

  // Get the appropriate icon (day or night version)
  const getWeatherIcon = () => {
    let iconCode = data.weather[0].icon;
    // Replace 'n' with 'd' for day icons, or 'd' with 'n' for night icons
    if (isDayTime()) {
      iconCode = iconCode.replace('n', 'd');
    } else {
      iconCode = iconCode.replace('d', 'n');
    }
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const iconUrl = getWeatherIcon();
  
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLocalTime = () => {
    // Calculate local time using timezone offset
    const timezoneOffset = data.timezone; // in seconds
    const localTime = new Date(currentTime.getTime() + timezoneOffset * 1000);
    
    return localTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    });
  };

  const getLocalDate = () => {
    const timezoneOffset = data.timezone;
    const localTime = new Date(currentTime.getTime() + timezoneOffset * 1000);
    
    return localTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  return (
    <div className="current-weather">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="location-name">
            {data.name}, {data.sys.country}
          </h2>
          <p className="local-time">
            <span className="time-icon">🕐</span> {getLocalTime()}
          </p>
          <p className="local-date">{getLocalDate()}</p>
          <p className="weather-description">
            {data.weather[0].description}
          </p>
        </div>
        <img 
          src={iconUrl} 
          alt={data.weather[0].description}
          className="weather-icon-large"
        />
      </div>

      <div className="temperature-display">
        <span className="temperature">{Math.round(data.main.temp)}°</span>
        <span className="temp-unit">C</span>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <div className="detail-content">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{Math.round(data.main.feels_like)}°C</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div className="detail-content">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{data.main.humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <div className="detail-content">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{data.wind.speed} m/s</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🔽</span>
          <div className="detail-content">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{data.main.pressure} hPa</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">👁️</span>
          <div className="detail-content">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{(data.visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">☁️</span>
          <div className="detail-content">
            <span className="detail-label">Cloudiness</span>
            <span className="detail-value">{data.clouds.all}%</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🌅</span>
          <div className="detail-content">
            <span className="detail-label">Sunrise</span>
            <span className="detail-value">{formatTime(data.sys.sunrise)}</span>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">🌇</span>
          <div className="detail-content">
            <span className="detail-label">Sunset</span>
            <span className="detail-value">{formatTime(data.sys.sunset)}</span>
          </div>
        </div>
      </div>

      <div className="temp-range">
        <div className="temp-range-item">
          <span className="range-label">Min</span>
          <span className="range-value">{Math.round(data.main.temp_min)}°C</span>
        </div>
        <div className="temp-divider">|</div>
        <div className="temp-range-item">
          <span className="range-label">Max</span>
          <span className="range-value">{Math.round(data.main.temp_max)}°C</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
