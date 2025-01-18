import { formatDate } from "../../utils/formateDate";

const Forecast = ({ forecast, isCelsius, tempHighIcon, tempLowIcon  }) => {
  const nextDayHighestC = Math.round(forecast[1]["day"]["maxtemp_c"]);
  const nextDayHighestF = Math.round(forecast[1]["day"]["maxtemp_f"]);
  const nextDayLowestC = Math.round(forecast[1]["day"]["mintemp_c"]);
  const nextDayLowestF = Math.round(forecast[1]["day"]["mintemp_f"]);
  const dayAfterHighestC = Math.round(forecast[2]["day"]["maxtemp_c"]);
  const dayAfterHighestF = Math.round(forecast[2]["day"]["maxtemp_f"]);
  const dayAfterLowestC = Math.round(forecast[2]["day"]["mintemp_c"]);
  const dayAfterLowestF = Math.round(forecast[2]["day"]["mintemp_f"]);

  return (
    <div className="forecastContainer">
      <div className="forecast">
        <h4>Next Day</h4>
        <h5>{formatDate(forecast[1]["date"])}</h5>
        <img className="forecastWeatherIcon" src={forecast[1]["day"]["condition"]["icon"]} />
        {isCelsius ?
          <div className="forecastTemps">
            <p>{tempLowIcon} {nextDayLowestC}°C</p>
            <p>{tempHighIcon} {nextDayHighestC}°C</p>
          </div> :
          <div className="forecastTemps">
            <p>{tempLowIcon} {nextDayLowestF}°F</p>
            <p>{tempHighIcon} {nextDayHighestF}°F</p>
          </div>
        }
      </div>
      <div className="forecast">
        <h4>In 2 Days</h4>
        <h5>{formatDate(forecast[2]["date"])}</h5>
        <img className="forecastWeatherIcon" src={forecast[2]["day"]["condition"]["icon"]} />
        {isCelsius ?
          <div className="forecastTemps">
            <p>{tempLowIcon} {dayAfterLowestC}°C</p>
            <p>{tempHighIcon} {dayAfterHighestC}°C</p>
          </div> :
          <div className="forecastTemps">
            <p>{tempLowIcon} {dayAfterLowestF}°F</p>
            <p>{tempHighIcon} {dayAfterHighestF}°F</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Forecast