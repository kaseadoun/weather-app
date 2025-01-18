import { useState, useEffect } from 'react'
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTemperatureLow, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

library.add(faTemperatureLow, faTemperatureHigh);

const WeatherCard = ({ location, currentWeather, forecast }) => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const tempHighIcon = <FontAwesomeIcon className="fa-icon" icon="temperature-high" />
  const tempLowIcon = <FontAwesomeIcon className="fa-icon" icon="temperature-low" />

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
              tempHighIcon={tempHighIcon}
              tempLowIcon={tempLowIcon}
            />
            <Forecast
              forecast={forecast}
              isCelsius={isCelsius}
              tempHighIcon={tempHighIcon}
              tempLowIcon={tempLowIcon}
            />
          </>
        }
      </div>
    </>
  )
}

export default WeatherCard