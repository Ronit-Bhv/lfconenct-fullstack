import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useMeetingStore } from '../store/meetingStore';
import '../styles/MeetingDetail.css';

function MeetingDetail() {
  const { meetingId } = useParams();

  // Global store: look up the meeting by id so changes elsewhere are reflected here.
  const { meetings } = useMeetingStore();
  const meeting = meetings.find((m) => m.id === Number(meetingId));

  if (!meeting) {
    return (
      <div>
        <h1 className="page-title">Meeting Not Found</h1>
        <p className="page-description">The meeting you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="meeting-detail-header">
        <div className="meeting-detail-avatar" style={{ background: meeting.color }}>
          {meeting.title.charAt(0)}
        </div>
        <div>
          <h1 className="meeting-detail-title">{meeting.title}</h1>
          <p className="meeting-detail-meta">
            Host: {meeting.host} • {meeting.time}
          </p>
        </div>
      </div>

      <div className="meeting-tabs">
        <NavLink
          to="details"
          className={({ isActive }) => (isActive ? 'meeting-tab active' : 'meeting-tab')}
        >
          Details
        </NavLink>
        <NavLink
          to="participants"
          className={({ isActive }) => (isActive ? 'meeting-tab active' : 'meeting-tab')}
        >
          Participants
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

export default MeetingDetail;
