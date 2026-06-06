import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { meetingActions } from '../store/meetingStore';
import '../styles/PageCommon.css';
import '../styles/Form.css';

const COLORS = ['#6366f1', '#22c55e', '#f97316', '#ec4899', '#0ea5e9'];

function ScheduleMeeting() {
  const navigate = useNavigate();
  const { user } = useUser();

  // Local state: form inputs stay local until submitted — they are UI-only state
  // and don't belong in the global store until the meeting is actually created.
  const [title, setTitle] = useState('');
  const [host, setHost] = useState(user.name);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !date || !startTime || !endTime) return;

    const dateLabel = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    // Write to global store only on explicit submission.
    meetingActions.addMeeting({
      title,
      host,
      time: `${dateLabel}, ${startTime} – ${endTime}`,
      color,
    });

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <h1 className="page-title">Meeting Scheduled!</h1>
        <p className="page-description">
          <strong>{title}</strong> has been added to your meetings.
        </p>
        <div className="form-actions">
          <button className="btn-primary" onClick={() => navigate('/')}>
            Go to Dashboard
          </button>
          <button className="btn-secondary" onClick={() => { setSubmitted(false); setTitle(''); setDate(''); setStartTime(''); setEndTime(''); }}>
            Schedule Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Schedule Meeting</h1>
      <p className="page-description">
        Set up a future meeting. Form fields use local state until you submit.
      </p>

      <form className="meeting-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Meeting Title *</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Weekly Standup"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Host</label>
          <input
            className="form-input"
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              className="form-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Start Time *</label>
            <input
              className="form-input"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Time *</label>
            <input
              className="form-input"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Color</label>
          <div className="color-picker">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                className={`color-swatch ${color === c ? 'selected' : ''}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Schedule Meeting
          </button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScheduleMeeting;
