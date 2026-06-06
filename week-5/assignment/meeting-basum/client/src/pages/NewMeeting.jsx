import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { meetingActions } from '../store/meetingStore';
import '../styles/PageCommon.css';
import '../styles/Form.css';

function NewMeeting() {
  const navigate = useNavigate();
  const { user } = useUser();

  // Local state: input lives here until the user starts the meeting.
  const [title, setTitle] = useState('Instant Meeting');

  function handleStart() {
    if (!title.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const end = new Date(now.getTime() + 60 * 60 * 1000);
    const endStr = end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Write to global store so the meeting appears on Dashboard and Calendar.
    meetingActions.addMeeting({
      title: title.trim(),
      host: user.name,
      time: `Today, ${timeStr} – ${endStr}`,
      color: '#6366f1',
    });

    navigate('/');
  }

  return (
    <div>
      <h1 className="page-title">New Meeting</h1>
      <p className="page-description">
        Start an instant meeting. The title below uses local state until you click Start.
      </p>

      <div className="meeting-form">
        <div className="form-group">
          <label className="form-label">Meeting Title</label>
          <input
            className="form-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Instant Meeting"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Host</label>
          <input className="form-input" type="text" value={user.name} readOnly />
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={handleStart}>
            Start Meeting Now
          </button>
          <button className="btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewMeeting;
