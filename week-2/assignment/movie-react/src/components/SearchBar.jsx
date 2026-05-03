import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <button type="submit" className="search-button">Search</button>
      {query && (
        <button 
          type="button" 
          className="clear-button"
          onClick={() => { setQuery(''); onSearch(''); }}
        >
          Clear
        </button>
      )}
    </form>
  );
}

export default SearchBar;
