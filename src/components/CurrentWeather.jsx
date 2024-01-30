const CurrentWeather = ({ current, currentCondition, forecast, isCelsius }) => {
    const currentC = Math.round(current["temp_c"]);
    const currentF = Math.round(current["temp_f"]);
    const currentHighestC = Math.round(forecast[0]["day"]["maxtemp_c"]);
    const currentHighestF = Math.round(forecast[0]["day"]["maxtemp_f"]);
    const currentLowestC = Math.round(forecast[0]["day"]["mintemp_c"]);
    const currentLowestF = Math.round(forecast[0]["day"]["mintemp_f"]);

    return (
        <div className="currentWeatherComponent">
            <h3>Today - {forecast[0]["date"]}</h3>
            <div className="currentWeatherContainer">
                <div className="currentTempAndIcon">
                    <img className="weatherIcon" src={currentCondition.icon} />
                    <p id="currentTemp">
                        {isCelsius ? (
                            <>
                                {currentC}
                                <span className="currentMetric">°C</span>
                            </>
                        ) : (
                            <>
                                {currentF}
                                <span className="currentMetric">°F</span>
                            </>
                        )}
                    </p>
                </div>
                {isCelsius &&
                    <div>
                        <p>Highest: {currentHighestC}°C</p>
                        <p>Lowest: {currentLowestC}°C</p>
                    </div>
                }
                {!isCelsius &&
                    <div>
                        <p>Highest: {currentHighestF}°F</p>
                        <p>Lowest: {currentLowestF}°F</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default CurrentWeather;