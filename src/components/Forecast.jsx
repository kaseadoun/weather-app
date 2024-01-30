const Forecast = ({ forecast, isCelsius }) => {
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
        <h5>{forecast[1]["date"]}</h5>
        <img className="weatherIcon" src={forecast[1]["day"]["condition"]["icon"]} />
        {isCelsius ?
          <div className="forecastTemps">
            <p>{nextDayLowestC}°C</p>
            <p>{nextDayHighestC}°C</p>
          </div> :
          <div className="forecastTemps">
            <p>{nextDayLowestF}°F</p>
            <p>{nextDayHighestF}°F</p>
          </div>
        }
      </div>
      <div className="forecast">
        <h4>In 2 Days</h4>
        <h5>{forecast[2]["date"]}</h5>
        <img className="weatherIcon" src={forecast[2]["day"]["condition"]["icon"]} />
        {isCelsius ?
          <div className="forecastTemps">
            <p>{dayAfterLowestC}°C</p>
            <p>{dayAfterHighestC}°C</p>
          </div> :
          <div className="forecastTemps">
            <p>{dayAfterLowestF}°F</p>
            <p>{dayAfterHighestF}°F</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Forecast