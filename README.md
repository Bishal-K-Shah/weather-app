# 🌤️ Weather Dashboard

A beautiful, responsive weather application built with React, Vite, Three.js, Chart.js, and OpenWeather API. Features a stunning 3D weather-based background that changes dynamically based on current conditions, real-time weather data, 5-day forecasts, and interactive temperature charts for any location worldwide.

![Weather Dashboard](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![Three.js](https://img.shields.io/badge/Three.js-Latest-black)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.0-orange)

## ✨ Features

- **� 3D Weather Backgrounds**: Immersive Three.js animations that change with weather conditions
  - ☀️ Sunny days with golden sparkles
  - 🌧️ Animated rain droplets
  - 🌨️ Gentle falling snowflakes
  - ⛈️ Dramatic thunderstorm effects
  - ☁️ Floating cloud particles
  - 🌫️ Atmospheric mist and fog
- **🎭 Theme Override Control**: Manually switch between different weather themes or let it auto-match
- **🔍 Smart City Search**: Autocomplete search with location suggestions as you type
- **🌍 Location Detection**: Automatically finds weather for your current location
- **📊 Interactive Charts**: Beautiful visualizations of temperature, feels-like, and humidity trends over 24 hours
- **🔮 5-Day Forecast**: Detailed weather predictions with daily breakdown
- **� Glassmorphism UI**: Modern frosted glass design with backdrop blur effects
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎨 Real-time Data**: Live weather updates from OpenWeather API

## 🛠️ Technologies Used

- **React 18.2** - Modern UI library
- **Vite 5.0** - Next-generation frontend build tool
- **Three.js** - 3D graphics library for immersive weather backgrounds
- **Chart.js 4.4** - Flexible JavaScript charting library
- **React-ChartJS-2** - React wrapper for Chart.js
- **Axios** - HTTP client for API requests
- **OpenWeather API** - Real-time weather data and geocoding

## 📁 Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx    # Current weather display
│   │   ├── Forecast.jsx          # 5-day forecast cards
│   │   ├── SearchBar.jsx         # City search with autocomplete
│   │   ├── WeatherChart.jsx      # Interactive temperature chart
│   │   └── WeatherBackground.jsx # 3D animated weather backgrounds
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Global styles with glassmorphism
│   └── main.jsx                  # Application entry point
├── .env                          # Environment variables (API key)
├── index.html                    # HTML template
├── package.json                  # Project dependencies
├── vite.config.js               # Vite configuration
└── README.md                     # Project documentation
```

## 🌟 Features in Detail

### 3D Weather-Based Backgrounds
The app features stunning Three.js particle systems that react to weather conditions:
- Each weather type has unique particle behavior (speed, color, density)
- Smooth transitions between weather states
- Automatic background gradients matching the weather
- Manual theme override controls for exploring different effects

### Smart City Search
- Real-time autocomplete suggestions from OpenWeather Geocoding API
- Shows city name, state, and country for precise selection
- Keyboard navigation support (arrow keys, enter, escape)
- Debounced API calls to prevent rate limiting

### Current Weather Display
- Real-time temperature with "feels like" metric
- Detailed weather information (humidity, wind speed, pressure, visibility)
- Sunrise and sunset times
- Min/Max temperature range
- Weather condition icons

### Interactive Chart
- 24-hour temperature forecast with dual-axis display
- Shows temperature, feels-like, and humidity trends
- Smooth line animations with gradient fills
- White text and grid lines for visibility on any background
- Responsive tooltips with detailed information

### 5-Day Forecast
- Daily weather predictions with interactive cards
- Temperature and weather condition icons
- Humidity and wind speed details
- Hover effects with glassmorphism styling

### Theme Override Panel
- 9 different weather themes to choose from
- Auto mode that matches current weather
- Visual feedback with glowing active state
- Weather-specific icons for each theme

## 🎨 Customization

### Weather Theme Colors
Each weather theme has customized particle colors and backgrounds in `WeatherBackground.jsx`:
- Clear: Golden yellow sparkles with sky blue gradient
- Rain: Blue droplets with stormy gray tones
- Snow: White particles with light blue atmosphere
- And more...

### UI Glassmorphism
The frosted glass effect can be adjusted in `src/App.css`:
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Troubleshooting

**Issue**: Weather data not loading
- Check your internet connection
- Verify the API key is correct in `.env` file
- Make sure the OpenWeather API is accessible

**Issue**: Location not detected
- Enable location permissions in your browser settings
- Try searching for a city manually using the search bar
- Check browser console for any errors

**Issue**: 3D background not rendering
- Ensure your browser supports WebGL
- Try a different browser (Chrome, Firefox, Edge recommended)
- Check if hardware acceleration is enabled

**Issue**: Autocomplete not working
- Make sure you're typing at least 2 characters
- Check your API key includes geocoding access
- Wait a moment for the suggestions to load

## 🚀 Performance Tips

- The 3D background uses hardware acceleration for smooth animations
- Particle counts are optimized per weather type
- Chart.js data is limited to relevant time ranges
- API calls are debounced to prevent excessive requests

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeather API](https://openweathermap.org/)
- Icons and graphics from OpenWeather
- Built with love using modern web technologies



## 👨‍💻 Author

Built with ❤️ using React, Vite, and OpenWeather API

## 🙏 Acknowledgments

- [OpenWeather](https://openweathermap.org/) for providing the weather API
- [Chart.js](https://www.chartjs.org/) for the charting library
- [Vite](https://vitejs.dev/) for the amazing build tool
- [React](https://react.dev/) for the UI framework

---

**Enjoy tracking the weather! ☀️🌧️⛈️🌈**
