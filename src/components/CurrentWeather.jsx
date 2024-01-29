const CurrentWeather = ({ current, currentCondition, forecast, isCelsius }) => {
    return (
        <div className="currentWeatherComponenet">
            <h3>Today - {forecast[0]["date"]}</h3>
            <div className="currentWeatherContainer">
                <div className="currentTempAndIcon">
                    <img src={currentCondition.icon} />
                    <p id="currentTemp">
                        {isCelsius ? 
                            `${current["temp_c"]}°C` :
                            `${current["temp_f"]}°F`
                        }
                    </p>
                </div>
                {isCelsius &&
                    <div>
                        <p>Highest: {forecast[0]["day"]["maxtemp_c"]}°C</p>
                        <p>Lowest: {forecast[0]["day"]["mintemp_c"]}°C</p>
                    </div>
                }
                {!isCelsius &&
                    <div>
                        <p>Highest: {forecast[0]["day"]["maxtemp_f"]}°F</p>
                        <p>Lowest: {forecast[0]["day"]["mintemp_f"]}°F</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default CurrentWeather;