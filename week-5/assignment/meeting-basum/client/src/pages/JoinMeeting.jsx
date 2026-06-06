import { useState } from 'react';
import '../styles/PageCommon.css';
import '../styles/Form.css';

function JoinMeeting() {
  // Local state only — meeting code is UI-only input, never stored globally.
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function handleJoin(e) {
    e.preventDefault();
    if (code.trim().length < 4) {
      setError('Please enter a valid meeting code (min 4 characters).');
      return;
    }
    setError('');
    alert(`Joining meeting: ${code.trim()}`);
  }

  return (
    <div>
      <h1 className="page-title">Join Meeting</h1>
      <p className="page-description">
        Enter a meeting code to join. The code field uses local state — it is never stored in the global store.
      </p>

      <form className="meeting-form" onSubmit={handleJoin}>
        <div className="form-group">
          <label className="form-label">Meeting Code</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. abc-1234"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
          />
          {error && <p className="form-error">{error}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Join Meeting
          </button>
        </div>
      </form>
    </div>
  );
}

export default JoinMeeting;
