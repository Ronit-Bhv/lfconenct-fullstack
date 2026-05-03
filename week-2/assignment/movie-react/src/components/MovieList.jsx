import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';

function MovieList({ movies, loading, error, onMovieClick }) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="no-results">
        <span className="no-results-icon">🎬</span>
        <p>No movies found. Try searching for something!</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
}

export default MovieList;
