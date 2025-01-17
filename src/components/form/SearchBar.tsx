import { useState, useEffect } from "react";

const SearchBar = ({ setLoading, setLocation, setCurrentWeather, setForecast, setChartData }) => {
  const [search, setSearch] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [listOfSearch, setListOfSearch] = useState<object[]>([]);

  const apiKey = import.meta.env.VITE_WEATHERAPI_API_KEY;
  const baseUrl = "https://api.weatherapi.com/v1/";

  useEffect(() => {
    searchCityById(search);
  }, [search, location]);

  const searchCityById = async (cityId: string) => {
    try {
      const response = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${cityId}&days=3&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);

      setLocation({
        name: data["location"]["name"],
        region: data["location"]["region"] ?? undefined,
        country: data["location"]["country"],
      });

      setCurrentWeather({
        temp_c: data["current"]["temp_c"],
        temp_f: data["current"]["temp_f"],
        condition: {
          text: data["current"]["condition"]["text"],
          icon: data["current"]["condition"]["icon"]
        }
      });

      setForecast(data["forecast"]["forecastday"]);

      setChartData(() => {
        const labels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        const label = `${data["location"]}`;
        const hourlyPrecipitation: number[] = data["forecast"]["forecastday"][0]["hour"].map((data) => data["chance_of_rain"]);

        return {
          labels: labels,
          datasets: [
            {
              label: label,
              data: hourlyPrecipitation
            }
          ]
        }
      })

      setLoading(true);
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  function handleOnFocus(): void {
    setIsFocused(true);
  }

  function handleOnBlur(): void {
    setIsFocused(false);
  }

  async function searching(citySearched: string) {
    try {
      const response = await fetch(
        `${baseUrl}search.json?key=${apiKey}&q=${citySearched}`
      );
      const data = await response.json();

      const locationData = data.map((item) => ({
        id: item.id,
        city: item.name,
        region: item.region,
        country: item.country,
      }));

      setListOfSearch(locationData);

      console.log(listOfSearch);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  const listOfCities = listOfSearch.map((item) => (
    <li
      key={item.id}
      onClick={() => {
        const selectedCityId = `id:${item.id}`;
        setSearch(selectedCityId);
        searchCityById(selectedCityId);
        setIsFocused(handleOnBlur);
      }}
      className="autocompleteSearchResults"
    >
      {item.city}, {item.region}, {item.country}
    </li>
  ));

  return (
    <div className="searchBarContainer">
      <form className="searchBarComponent" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder={`🔍 Search City`}
          id="search"
          onChange={(e) => {
            setSearchText(e.target.value);
            searching(e.target.value);
          }}
          onFocus={handleOnFocus}
          autoComplete="off"
          required
        />
        <button
          id="searchButton"
          type="submit"
          onClick={() => {
            setSearch(searchText);
            searchCityById(search);
            handleOnBlur();
          }}
        ></button>
      </form>
      <ul
        className="autocompleteSearchResultsContainer"
        style={{
          display: isFocused ? "block" : "none",
        }}
      >
        {listOfCities}
      </ul>
    </div>
  );
};

export default SearchBar;
