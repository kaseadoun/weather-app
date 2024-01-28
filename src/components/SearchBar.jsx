const SearchBar = ({ setSearch, searchCity }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                type="text" 
                placeholder="Enter a City"
                onChange={(e) => setSearch(e.target.value)} 
                required 
            />
            <button type="submit" onClick={() => searchCity()}>Submit</button>
        </form>
    )
}

export default SearchBar;