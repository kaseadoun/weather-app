import { useState, useEffect } from 'react'
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const WeatherCard = ({ location, currentWeather, forecast }) => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  useEffect(() => {

  }, [isCelsius])

  const changeMetric = () => {
    if (isCelsius) {
      setIsCelsius(false);
      return;
    }
    setIsCelsius(true);
  }

  return (
    <>
      <div className="weatherCardHeader">
        <div>
          <h2>{location["name"].toUpperCase()}</h2>
          <h3>{location["region"] ? `${location["region"]}, ${location["country"]}` : location["country"]}</h3>
        </div>
        <button id="metricChange" onClick={changeMetric}>
          {isCelsius ? '°C' : '°F'}
        </button>
      </div>

      <div className="currentAndForecast">
        {location !== undefined &&
          <>
            <CurrentWeather
              currentWeather={currentWeather}
              forecast={forecast}
              isCelsius={isCelsius}
            />
            <Forecast
              forecast={forecast}
              isCelsius={isCelsius}
            />
          </>
        }
      </div>
    </>
  )
}

export default WeatherCard