import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const WeatherCard = ({ location, current, currentCondition, forecast, isCelsius }) => {
  return (
    <>
      <h2>{location["name"]}, {location["region"] ? `${location["region"]} ${location["country"]}` : location["country"]}</h2>
      <div className="currentAndForecast">
        <CurrentWeather
          current={current}
          currentCondition={currentCondition}
          forecast={forecast}
          isCelsius={isCelsius}
        />
        <Forecast
          forecast={forecast}
          isCelsius={isCelsius}
        />
      </div>
    </>
  )
}

export default WeatherCard