import { useNavigate } from 'react-router-dom';
import { Video, LogIn, CalendarPlus, Clock, Trash2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useMeetingStore, useUpcomingCount, meetingActions } from '../store/meetingStore';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  // Context API: greeting uses the current user's name from session context.
  const { user } = useUser();

  // Global store: meetings list + derived upcoming count.
  const { meetings } = useMeetingStore();
  const upcomingCount = useUpcomingCount();

  return (
    <div>
      <h1 className="dashboard-title">Good Morning, {user.name} 👋</h1>
      <p className="dashboard-subtitle">
        You have <strong>{upcomingCount}</strong> upcoming{' '}
        {upcomingCount === 1 ? 'meeting' : 'meetings'} today.
      </p>

      {/* Quick action cards */}
      <div className="quick-cards-grid">
        <QuickCard
          icon={<Video size={28} color="#fff" />}
          title="Start New Meeting"
          subtitle="Start an instant meeting"
          btnText="Start Now →"
          btnColor="#6366f1"
          bgColor="#e0e7ff"
          onClick={() => navigate('/new-meeting')}
        />
        <QuickCard
          icon={<LogIn size={28} color="#fff" />}
          title="Join with Code"
          subtitle="Join a meeting with code"
          btnText="Join Meeting →"
          btnColor="#22c55e"
          bgColor="#dcfce7"
          onClick={() => navigate('/join-meeting')}
        />
        <QuickCard
          icon={<CalendarPlus size={28} color="#fff" />}
          title="Schedule Meeting"
          subtitle="Plan your meeting"
          btnText="Schedule Now →"
          btnColor="#f97316"
          bgColor="#ffedd5"
          onClick={() => navigate('/schedule-meeting')}
        />
      </div>

      {/* Upcoming meetings — rendered from global store */}
      <div>
        <div className="upcoming-header">
          <h2 className="upcoming-title">Upcoming Meetings ({upcomingCount})</h2>
          <button className="upcoming-view-all" onClick={() => navigate('/calendar')}>
            View All
          </button>
        </div>

        {meetings.length === 0 ? (
          <p className="dashboard-empty">No meetings scheduled yet.</p>
        ) : (
          <div className="meetings-list">
            {meetings.map((m) => (
              <div
                key={m.id}
                onClick={() => navigate(`/meetings/${m.id}`)}
                className="meeting-item"
              >
                <div className="meeting-info">
                  <div className="meeting-avatar" style={{ background: m.color }}>
                    {m.title.charAt(0)}
                  </div>
                  <div>
                    <div className="meeting-title">{m.title}</div>
                    <div className="meeting-host">Host: {m.host}</div>
                  </div>
                </div>
                <div className="meeting-meta">
                  <div className="meeting-time">
                    <Clock size={14} />
                    {m.time}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/meetings/${m.id}`);
                    }}
                    className="meeting-join-btn"
                  >
                    Join
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      meetingActions.removeMeeting(m.id);
                    }}
                    className="meeting-remove-btn"
                    title="Remove meeting"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickCard({ icon, title, subtitle, btnText, btnColor, bgColor, onClick }) {
  return (
    <div className="quick-card">
      <div className="quick-card-icon-wrapper" style={{ background: bgColor }}>
        <div className="quick-card-icon-bg" style={{ background: btnColor }}>
          {icon}
        </div>
      </div>
      <div className="quick-card-title">{title}</div>
      <div className="quick-card-subtitle">{subtitle}</div>
      <button onClick={onClick} className="quick-card-btn" style={{ background: btnColor }}>
        {btnText}
      </button>
    </div>
  );
}

export default Dashboard;
