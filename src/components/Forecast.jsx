const Forecast = ({ forecast, isCelsius }) => {
  return (
    <div className="forecastContainer">
      <div>
        <h4>Next Day:</h4>
        <h5>{forecast[1]["date"]}</h5>
        <img src={forecast[1]["day"]["condition"]["icon"]} />
        {isCelsius ?
          <div>
            <p>{forecast[1]["day"]["mintemp_c"]}°C</p>
            <p>{forecast[1]["day"]["maxtemp_c"]}°C</p>
          </div> :
          <div>
            <p>{forecast[1]["day"]["mintemp_f"]}°F</p>
            <p>{forecast[1]["day"]["maxtemp_f"]}°F</p>
          </div>
        }
      </div>
      <div>
        <h4>In 2 Days:</h4>
        <h5>{forecast[2]["date"]}</h5>
        <img src={forecast[2]["day"]["condition"]["icon"]} />
        {isCelsius ?
          <div>
            <p>{forecast[2]["day"]["mintemp_c"]}°C</p>
            <p>{forecast[2]["day"]["maxtemp_c"]}°C</p>
          </div> :
          <div>
            <p>{forecast[2]["day"]["mintemp_f"]}°F</p>
            <p>{forecast[2]["day"]["maxtemp_f"]}°F</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Forecast