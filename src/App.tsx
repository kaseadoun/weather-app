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

  // const searchCityById = async (cityId: string) => {
  //   try {
  //     const response = await fetch(`${url}&q=${search}&days=3&aqi=no&alerts=no`);
  //     const data = await response.json();
  //     console.log(data);
  //     setForecast(data["forecast"]["forecastday"]);
  //     setLocation({ ...data["location"] });
  //     setCurrent({ ...data["current"] });
  //     setCurrentCondition({ ...data["current"]["condition"] });

  //     setChartData(() => {
  //       const labels: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  //       const label = `${data["location"]}`;
  //       const hourlyPrecipitation: number[] = data["forecast"]["forecastday"][0]["hour"].map((data) => data["chance_of_rain"]);

  //       return {
  //         labels: labels,
  //         datasets: [
  //           {
  //             label: label,
  //             data: hourlyPrecipitation
  //           }
  //         ]
  //       }
  //     })

  //     setLoading(true);
  //   } catch (err) {
  //     console.error(`Error: ${err}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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
          <div>Empty</div>
        )
      }
    </div>
  )
}

export default App
