import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';

function SearchBar({ onSearch, onUseLocation }) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Debounce the search to avoid too many API calls
    const timer = setTimeout(() => {
      if (city.trim().length >= 2) {
        fetchSuggestions(city);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [city]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `${GEO_URL}?q=${query}&limit=5&appid=${API_KEY}`
      );
      setSuggestions(response.data);
      setShowSuggestions(response.data.length > 0);
      setSelectedIndex(-1);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = suggestion.state 
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    setCity(cityName);
    onSearch(suggestion.name);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch} ref={searchRef}>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={`${suggestion.lat}-${suggestion.lon}`}
                className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="suggestion-name">{suggestion.name}</span>
                {suggestion.state && (
                  <span className="suggestion-state">, {suggestion.state}</span>
                )}
                <span className="suggestion-country"> - {suggestion.country}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="search-button">
        <span>🔍</span> Search
      </button>
      <button 
        type="button" 
        className="location-button" 
        onClick={onUseLocation}
        title="Use current location"
      >
        <span>📍</span> My Location
      </button>
    </form>
  );
}

export default SearchBar;
