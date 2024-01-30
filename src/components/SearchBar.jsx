const SearchBar = ({ setSearch, searchCity }) => {
    return (
        <form className="searchBarComponent" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text" 
                placeholder={`🔍 Search City`}
                id="search"
                onChange={(e) => setSearch(e.target.value)} 
                required 
            />
            <button id="searchButton" type="submit" onClick={() => searchCity()}></button>
        </form>
    )
}

export default SearchBar;