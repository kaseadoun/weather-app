const CurrentWeather = ({ current, currentCondition, forecast, isCelsius }) => {
    return (
        <div className="currentWeatherComponenet">
            <h3>Today</h3>
            <h4>{forecast[0]["date"]}</h4>
            <div className="currentWeatherContainer">
                <div>
                    <img src={currentCondition.icon} />
                    {isCelsius && <p>{current["temp_c"]}°C</p>}
                    {!isCelsius && <p>{current["temp_f"]}°F</p>}
                </div>
                <div>
                    {isCelsius &&
                        <>
                            <p>Highest: {forecast[0]["day"]["maxtemp_c"]}°C</p>
                            <p>Lowest: {forecast[0]["day"]["mintemp_c"]}°C</p>
                        </>
                    }
                    {!isCelsius &&
                        <>
                            <p>Highest: {forecast[0]["day"]["maxtemp_f"]}°F</p>
                            <p>Lowest: {forecast[0]["day"]["mintemp_f"]}°F</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;