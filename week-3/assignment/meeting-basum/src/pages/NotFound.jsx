import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import '../styles/NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page Not Found</h2>
      <p className="not-found-message">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link to="/" className="not-found-link">
        <Home size={18} />
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
