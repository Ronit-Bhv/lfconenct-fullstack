import { useParams } from 'react-router-dom';
import { useMeetingStore } from '../store/meetingStore';
import '../styles/MeetingDetailsTab.css';

function MeetingDetailsTab() {
  const { meetingId } = useParams();

  // Global store: same source of truth as MeetingDetail parent.
  const { meetings } = useMeetingStore();
  const meeting = meetings.find((m) => m.id === Number(meetingId));

  return (
    <div>
      <h2 className="tab-section-title">Meeting Details</h2>
      <p className="tab-section-text">
        <strong>Title:</strong> {meeting?.title}
      </p>
      <p className="tab-section-text">
        <strong>Host:</strong> {meeting?.host}
      </p>
      <p className="tab-section-text">
        <strong>Time:</strong> {meeting?.time}
      </p>
      <p className="tab-section-muted">
        Additional meeting information and agenda would appear here.
      </p>
    </div>
  );
}

export default MeetingDetailsTab;
