import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { useState, useEffect } from 'react'
import './App.css'

// npm run dev - to run server

function App() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [location, setLocation] = useState(null);
  const [current, setCurrent] = useState(null);
  const [currentCondition, setCurrentCondition] = useState(null);
  const [forecast, setForecast] = useState([]);

  const apiKey = import.meta.env.VITE_WEATHERAPI_API_KEY;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;

  useEffect(() => {
    return () => {
      setLoading(false);
    }
  }, [forecast, location, current, currentCondition, isCelsius])

  const searchCity = async () => {
    try {
      const response = await fetch(`${url}&q=${search}&days=3&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);
      setForecast(data["forecast"]["forecastday"]);
      setLocation({ ...data["location"] });
      setCurrent({ ...data["current"] });
      setCurrentCondition({ ...data["current"]["condition"] });
      setLoading(true);
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  const changeMetric = () => {
    if (isCelsius) {
      setIsCelsius(false);
      return;
    }
    setIsCelsius(true);
  }

  return (
    <>
      <header>
        <h1>Weather App</h1>
        <button onClick={changeMetric}>Change Metric</button>
      </header>
      <SearchBar
        search={search}
        setSearch={setSearch}
        searchCity={searchCity}
      />
      {loading && <h2>Looking at the sky. Please wait.</h2>}
      {(!loading && forecast.length !== 0) && 
        <WeatherCard
          location={location}
          current={current}
          currentCondition={currentCondition}
          forecast={forecast}
          isCelsius={isCelsius}
        />
      }
    </>
  )
}

export default App
