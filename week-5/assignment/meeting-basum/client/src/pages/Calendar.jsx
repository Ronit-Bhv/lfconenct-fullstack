import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMeetingStore } from '../store/meetingStore';
import '../styles/Calendar.css';

function Calendar() {
  // Local UI state: view toggle (month/week) lives in the URL via useSearchParams.
  // This is deliberately NOT in the global store — it's transient UI preference.
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') || 'month';

  // Global store: meetings list displayed in the sidebar summary.
  const { meetings } = useMeetingStore();

  useEffect(() => {
    if (!searchParams.get('view')) {
      setSearchParams({ view: 'month' });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div>
      <div className="calendar-header">
        <h1 className="calendar-title">Calendar</h1>
        <div className="calendar-view-toggle">
          <button
            onClick={() => setSearchParams({ view: 'month' })}
            className={view === 'month' ? 'calendar-view-btn active' : 'calendar-view-btn'}
          >
            Month
          </button>
          <button
            onClick={() => setSearchParams({ view: 'week' })}
            className={view === 'week' ? 'calendar-view-btn active' : 'calendar-view-btn'}
          >
            Week
          </button>
        </div>
      </div>

      <p className="calendar-status">
        Currently viewing calendar in <strong>{view}</strong> mode —{' '}
        <strong>{meetings.length}</strong> meeting{meetings.length !== 1 ? 's' : ''} scheduled.
      </p>

      <div className="calendar-meetings-list">
        {meetings.map((m) => (
          <div key={m.id} className="calendar-meeting-chip" style={{ borderLeftColor: m.color }}>
            <span className="calendar-chip-dot" style={{ background: m.color }} />
            <span className="calendar-chip-title">{m.title}</span>
            <span className="calendar-chip-time">{m.time}</span>
          </div>
        ))}
      </div>

      <div className="calendar-placeholder">
        {view === 'month' ? 'Month view calendar' : 'Week view calendar'}
      </div>
    </div>
  );
}

export default Calendar;
