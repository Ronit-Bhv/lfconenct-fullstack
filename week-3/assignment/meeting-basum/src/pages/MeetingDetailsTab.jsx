import { useParams } from 'react-router-dom';
import { meetings } from '../data/meetings';
import '../styles/MeetingDetailsTab.css';

function MeetingDetailsTab() {
  const { meetingId } = useParams();
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
