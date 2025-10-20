import React from 'react';

const CurrentWeather = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="current-weather">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="location-name">
            {data.name}, {data.sys.country}
          </h2>
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
