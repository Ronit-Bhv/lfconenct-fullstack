import { useNavigate } from 'react-router-dom';
import { Video, LogIn, CalendarPlus, Clock } from 'lucide-react';
import { meetings } from '../data/meetings';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="dashboard-title">Good Morning, Ronit Bhujel 👋</h1>
      <p className="dashboard-subtitle">
        Here&apos;s what&apos;s happening with your meetings today.
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

      {/* Upcoming meetings */}
      <div>
        <div className="upcoming-header">
          <h2 className="upcoming-title">Upcoming Meetings</h2>
          <button className="upcoming-view-all">View All</button>
        </div>

        <div className="meetings-list">
          {meetings.map((m) => (
            <div
              key={m.id}
              onClick={() => navigate(`/meetings/${m.id}`)}
              className="meeting-item"
            >
              <div className="meeting-info">
                <div
                  className="meeting-avatar"
                  style={{ background: m.color }}
                >
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickCard({ icon, title, subtitle, btnText, btnColor, bgColor, onClick }) {
  return (
    <div className="quick-card">
      <div
        className="quick-card-icon-wrapper"
        style={{ background: bgColor }}
      >
        <div className="quick-card-icon-bg" style={{ background: btnColor }}>
          {icon}
        </div>
      </div>
      <div className="quick-card-title">{title}</div>
      <div className="quick-card-subtitle">{subtitle}</div>
      <button
        onClick={onClick}
        className="quick-card-btn"
        style={{ background: btnColor }}
      >
        {btnText}
      </button>
    </div>
  );
}

export default Dashboard;
