function SearchForm({ city, setCity, handleSubmit, loading }) {
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="search-input"
                disabled={loading}
            />
            <button type="submit" className="search-button" disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </button>
        </form>
    );
}

export default SearchForm;