import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const WeatherCard = ({ location, current, currentCondition, forecast, isCelsius }) => {
  return (
    <div className="weatherCardContainer">
        <h2>{ location["name"] }</h2>
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
  )
}

export default WeatherCard