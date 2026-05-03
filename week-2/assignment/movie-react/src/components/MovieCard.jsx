import { getImageUrl } from '../services/tmdb';
import StarRating from './StarRating';

function MovieCard({ movie, onClick }) {
  const posterUrl = getImageUrl(movie.poster_path);
  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'TBA';

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      {posterUrl ? (
        <img src={posterUrl} alt={movie.title} className="movie-poster" loading="lazy" />
      ) : (
        <div className="movie-poster-placeholder">
          <span>No Image</span>
        </div>
      )}
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-date">{releaseDate}</span>
          {movie.vote_average > 0 && (
            <StarRating rating={movie.vote_average} />
          )}
        </div>
        <p className="movie-overview">{movie.overview || 'No overview available.'}</p>
      </div>
    </div>
  );
}

export default MovieCard;
