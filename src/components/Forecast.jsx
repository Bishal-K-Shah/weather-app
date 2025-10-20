import React from 'react';

const Forecast = ({ data }) => {
  // Group forecast by day and get one forecast per day at noon
  const getDailyForecast = () => {
    const daily = {};
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      // Get the forecast closest to noon (12:00)
      if (!daily[dayKey] || Math.abs(date.getHours() - 12) < Math.abs(new Date(daily[dayKey].dt * 1000).getHours() - 12)) {
        daily[dayKey] = item;
      }
    });

    return Object.entries(daily).slice(0, 5);
  };

  const dailyForecasts = getDailyForecast();

  return (
    <div className="forecast">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecasts.map(([day, forecast]) => (
          <div key={day} className="forecast-card">
            <div className="forecast-day">{day}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt={forecast.weather[0].description}
              className="forecast-icon"
            />
            <div className="forecast-temp">
              {Math.round(forecast.main.temp)}°C
            </div>
            <div className="forecast-description">
              {forecast.weather[0].main}
            </div>
            <div className="forecast-details">
              <div className="forecast-detail-small">
                <span>💧 {forecast.main.humidity}%</span>
              </div>
              <div className="forecast-detail-small">
                <span>💨 {forecast.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
