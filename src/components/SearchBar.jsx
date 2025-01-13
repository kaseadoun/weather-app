import { useState } from "react";

const SearchBar = ({ search, setSearch, searchCityById }) => {
  const [searchText, setSearchText] = useState("");
  const [listOfSearch, setListOfSearch] = useState([]);

  const api_key = import.meta.env.VITE_WEATHERAPI_API_KEY;
  const base_url = "https://api.weatherapi.com/v1/";

  async function searching(citySearched) {
    try {
      const response = await fetch(
        `${base_url}search.json?key=${api_key}&q=${citySearched}`
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
        setSearch(`id:${item.id}`);
        searchCityById(search)
      }}
    >
      {item.city}, {item.region}, {item.country}
    </li>
  ));

  return (
    <>
      <form className="searchBarComponent" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder={`🔍 Search City`}
          id="search"
          onChange={(e) => {
            setSearch(e.target.value);
            searching(e.target.value);
          }}
          autoComplete="off"
          required
        />
        <button
          id="searchButton"
          type="submit"
          onClick={() => searchCityById(search)}
        ></button>
      </form>
      <ul>{listOfCities}</ul>
    </>
  );
};

export default SearchBar;
