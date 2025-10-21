# 🌤️ Weather Dashboard

A beautiful, responsive weather application built with React, Vite, Chart.js, and OpenWeather API. Get real-time weather data, 5-day forecasts, and interactive temperature charts for any location worldwide.

![Weather Dashboard](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.0-orange)

## ✨ Features

- **🌍 Location-Based Weather**: Automatically detects your current location or search for any city
- **📊 Interactive Charts**: Visualize temperature, feels-like, and humidity trends over 24 hours
- **🔮 5-Day Forecast**: View detailed weather predictions for the next 5 days
- **💫 Beautiful UI**: Modern gradient design with smooth animations and transitions
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎨 Real-time Data**: Live weather updates from OpenWeather API

## 🛠️ Technologies Used

- **React 18.2** - Modern UI library for building user interfaces
- **Vite 5.0** - Next-generation frontend build tool
- **Chart.js 4.4** - Simple yet flexible JavaScript charting library
- **React-ChartJS-2** - React wrapper for Chart.js
- **Axios** - Promise-based HTTP client for API requests
- **OpenWeather API** - Real-time weather data provider

## 📁 Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx    # Current weather display
│   │   ├── Forecast.jsx          # 5-day forecast cards
│   │   └── WeatherChart.jsx      # Interactive temperature chart
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Global styles
│   └── main.jsx                  # Application entry point
├── .env                          # Environment variables (API key)
├── index.html                    # HTML template
├── package.json                  # Project dependencies
├── vite.config.js               # Vite configuration
└── README.md                     # Project documentation
```

## 🌟 Features in Detail

### Current Weather Display
- Real-time temperature with "feels like" metric
- Detailed weather information (humidity, wind speed, pressure, visibility)
- Sunrise and sunset times
- Min/Max temperature range
- Weather condition icons

### Interactive Chart
- 24-hour temperature forecast
- Dual-axis chart showing temperature and humidity
- Smooth line animations
- Responsive tooltips with detailed information

### 5-Day Forecast
- Daily weather predictions
- Temperature and weather condition icons
- Humidity and wind speed details
- Interactive hover effects

## 🎨 Customization

### Changing Colors
Edit the gradient colors in `src/App.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Troubleshooting

**Issue**: Weather data not loading
- Check your internet connection
- Verify the API key in `.env` file
- Ensure the OpenWeather API is accessible

**Issue**: Location not detected
- Enable location permissions in your browser
- Try searching for a city manually
- The `.env` file is **NOT** committed to Git for security.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using React, Vite, and OpenWeather API

## 🙏 Acknowledgments

- [OpenWeather](https://openweathermap.org/) for providing the weather API
- [Chart.js](https://www.chartjs.org/) for the charting library
- [Vite](https://vitejs.dev/) for the amazing build tool
- [React](https://react.dev/) for the UI framework

---

**Enjoy tracking the weather! ☀️🌧️⛈️🌈**
