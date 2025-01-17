interface Location {
  name: string,
  region?: string | undefined,
  country: string
}

interface CurrentWeather {
  temp_c: number,
  temp_f: number,
  condition: CurrentWeatherCondition
}
interface CurrentWeatherCondition {
  text: string,
  icon: string
}

interface Forecast {
  forecast_day: ForecastDay[]
}
interface ForecastDay {
  date: string,
  day: {
    maxtemp_c: number,
    maxtemp_f: number,
    mintemp_c: number,
    mintemp_f: number
  },
  hour: Hour[]
}

interface Hour {
  temp_c: number,
  temp_f: number,
  chance_of_rain: number
}

interface WeatherData {
  location: Location,
  currentWeather: CurrentWeather,
  forecast: Forecast
}

export type { WeatherData, Location, CurrentWeather, CurrentWeatherCondition, ForecastDay };