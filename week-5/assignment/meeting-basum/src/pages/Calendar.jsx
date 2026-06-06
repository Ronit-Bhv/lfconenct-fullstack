import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/Calendar.css';

function Calendar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') || 'month';

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
        Currently viewing calendar in <strong>{view}</strong> mode.
      </p>
      <div className="calendar-placeholder">
        {view === 'month' ? 'Month view calendar placeholder' : 'Week view calendar placeholder'}
      </div>
    </div>
  );
}

export default Calendar;
