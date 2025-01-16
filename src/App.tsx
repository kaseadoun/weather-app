import SearchBar from './components/form/SearchBar';
import WeatherCard from './components/weather_card/WeatherCard';
import PrecipitationChart from './components/weather_card/PrecipitationChart';
import { useState, useEffect } from 'react'
import './index.css'

// npm run dev - to run server

function App() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [location, setLocation] = useState(null);
  const [current, setCurrent] = useState(null);
  const [currentCondition, setCurrentCondition] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [chartData, setChartData] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHERAPI_API_KEY;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}`;

  useEffect(() => {
    return () => {
      setLoading(false);
    }
  }, [forecast, location, current, currentCondition, isCelsius])

  const searchCityById = async (cityId) => {
    try {
      const response = await fetch(`${url}&q=${search}&days=3&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);
      setForecast(data["forecast"]["forecastday"]);
      setLocation({ ...data["location"] });
      setCurrent({ ...data["current"] });
      setCurrentCondition({ ...data["current"]["condition"] });

      setChartData(() => {
        const labels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
        const label = `${data["location"]}`;
        const hourlyPrecipitation = data["forecast"]["forecastday"][0]["hour"].map(data => data["chance_of_rain"]);

        return {
          labels: labels,
          datasets: [
            {
              label: label,
              data: hourlyPrecipitation
            }
          ]
        }
      })

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
    <div className="mainContainer">
      <header>
        <h1>Weather App</h1>
        <SearchBar
          search={search}
          setSearch={setSearch}
          searchCityById={searchCityById}
        />
      </header>
      {loading && <h2>Looking at the sky. Please wait.</h2>}
      {(!loading && forecast.length !== 0) &&
        <div className="weatherCardContainer">
          <button id="metricChange" onClick={changeMetric}>
            {isCelsius ? '°C' : '°F'}
          </button>
          <WeatherCard
            location={location}
            current={current}
            currentCondition={currentCondition}
            forecast={forecast}
            isCelsius={isCelsius}
          />
          <PrecipitationChart chartData={chartData} location={location} />
        </div>
      }
    </div>
  )
}

export default App
