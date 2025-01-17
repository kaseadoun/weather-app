import { useState, useEffect } from "react";

const SearchBar = ({ setLoading, setLocation, setCurrentWeather, setForecast }) => {
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

      setForecast(
        data["forecast"]["forecastday"].map((day: any) => ({
          data: day["date"],
          day: {
            maxtemp_c: day["day"]["maxtemp_c"],
            maxtemp_f: day["day"]["maxtemp_f"],
            mintemp_c: day["day"]["mintemp_c"],
            mintemp_f: day["day"]["mintemp_f"],
          },
          hour: day["hour"].map((hour: any) => ({
            temp_c: hour["temp_c"],
            temp_f: hour["temp_f"],
            chance_of_rain: hour["chance_of_rain"]
          }))
        }))
      );

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
