import SearchBar from './components/form/SearchBar';
import WeatherCard from './components/weather_card/WeatherCard';
import PrecipitationChart from './components/weather_card/PrecipitationChart';
import { useState, useEffect } from 'react'
import { WeatherData, Location, CurrentWeather, CurrentWeatherCondition, ForecastDay } from './types/interfaces';
import './index.css'


function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | undefined>(undefined);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | undefined>(undefined);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [chartData, setChartData] = useState<Object>({});

  return (
    <div className="mainContainer">
      <header>
        <h1>Weather App</h1>
        <SearchBar
          setLocation={setLocation}
          setCurrentWeather={setCurrentWeather}
          setForecast={setForecast}
          setChartData={setChartData}
          setLoading={setLoading}
        />
      </header>
      {loading && <h2>Looking at the sky. Please wait.</h2>}
      {(!loading && location !== undefined) ?
        (<div className="weatherCardContainer">
          <WeatherCard
            location={location}
            currentWeather={currentWeather}
            forecast={forecast}
          />
          <PrecipitationChart chartData={chartData} location={location} />
        </div>) : (
          <div>Please search for an existing city.</div>
        )
      }
    </div>
  )
}

export default App
