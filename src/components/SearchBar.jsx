import { useState, useEffect } from "react";

const SearchBar = ({ search, setSearch, searchCityById }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [listOfSearch, setListOfSearch] = useState([]);

  useEffect(() => {
    searchCityById(search); // Runs whenever `search` updates
  }, [search]);

  function handleOnFocus() {
    setIsFocused(true);
  }

  function handleOnBlur() {
    setIsFocused(false);
  }

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
        const selectedCityId = `id:${item.id}`;
        setSearch(selectedCityId);
        searchCityById(selectedCityId);
        setIsFocused(() => handleOnBlur());
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
