import { getImageUrl } from '../services/tmdb';
import StarRating from './StarRating';

function MovieDetail({ movie, onClose }) {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` 
    : null;
  const posterUrl = getImageUrl(movie.poster_path);

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Release date unavailable';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {backdropUrl && (
          <div className="modal-backdrop">
            <img src={backdropUrl} alt={movie.title} />
            <div className="modal-backdrop-overlay"></div>
          </div>
        )}
        
        <div className="modal-body">
          <div className="modal-poster">
            {posterUrl ? (
              <img src={posterUrl} alt={movie.title} />
            ) : (
              <div className="modal-poster-placeholder">No Image</div>
            )}
          </div>
          
          <div className="modal-info">
            <h2>{movie.title}</h2>
            {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
            <p className="modal-date">Released: {releaseDate}</p>
            
            {movie.genres && movie.genres.length > 0 && (
              <div className="genre-tags">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">{genre.name}</span>
                ))}
              </div>
            )}
            
            <p className="modal-overview">{movie.overview || 'No overview available.'}</p>
            
            {movie.runtime > 0 && (
              <p className="modal-meta">Runtime: {movie.runtime} minutes</p>
            )}
            
            {movie.original_language && (
              <p className="modal-meta">
                Language: {movie.original_language.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
