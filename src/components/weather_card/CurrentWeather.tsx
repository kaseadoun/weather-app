import { formatDate } from "../../utils/formateDate";

const CurrentWeather = ({ currentWeather, forecast, isCelsius }) => {
    const currentC = Math.round(currentWeather["temp_c"]);
    const currentF = Math.round(currentWeather["temp_f"]);
    const currentHighestC = Math.round(forecast[0]["day"]["maxtemp_c"]);
    const currentHighestF = Math.round(forecast[0]["day"]["maxtemp_f"]);
    const currentLowestC = Math.round(forecast[0]["day"]["mintemp_c"]);
    const currentLowestF = Math.round(forecast[0]["day"]["mintemp_f"]);

    return (
        <div className="currentWeatherComponent">
            <div className="currentWeatherHeader">
                <h3>TODAY</h3>
                <h3>{formatDate(forecast[0]["date"])}</h3>
            </div>
            <div className="currentWeatherContainer">
                <div className="currentTempAndIcon">
                    <img className="currentWeatherIcon" src={currentWeather.condition.icon} />
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
                    <div className="currentWeatherHighAndLow">
                        <p>Highest: {currentHighestC}°C</p>
                        <p>Lowest: {currentLowestC}°C</p>
                    </div>
                }
                {!isCelsius &&
                    <div className="currentWeatherHighAndLow">
                        <p>Highest: {currentHighestF}°F</p>
                        <p>Lowest: {currentLowestF}°F</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default CurrentWeather;