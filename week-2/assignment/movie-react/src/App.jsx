import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Footer from './components/Footer';
import { searchMovies, getPopularMovies, getMovieDetails } from './services/tmdb';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    setError(null);
    setSearchQuery('');
    try {
      const results = await getPopularMovies();
      setMovies(results);
    } catch (err) {
      setError('Failed to load popular movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    if (!query.trim()) {
      await loadPopularMovies();
      return;
    }
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError('Failed to search movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    try {
      const details = await getMovieDetails(movie.id);
      setMovieDetails(details);
    } catch (err) {
      setMovieDetails(movie);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
  };

  return (
    <div className="app">
      <Header />
      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
        {searchQuery && (
          <p className="search-results-info">
            Showing results for "{searchQuery}"
            <button className="back-to-popular" onClick={loadPopularMovies}>
              Back to Popular
            </button>
          </p>
        )}
      </div>
      <main className="app-main">
        <MovieList 
          movies={movies} 
          loading={loading} 
          error={error} 
          onMovieClick={handleMovieClick}
        />
      </main>
      <Footer />
      
      {selectedMovie && (
        <MovieDetail movie={movieDetails || selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
