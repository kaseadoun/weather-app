import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const WeatherCard = ({ location, current, currentCondition, forecast, isCelsius }) => {
  return (
    <>
      <h2>{location["name"]},</h2>
      <h3>{location["region"] ? `${location["region"]}, ${location["country"]}` : location["country"]}</h3>
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