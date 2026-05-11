import { useParams } from 'react-router-dom';
import { meetings } from '../data/meetings';
import '../styles/MeetingParticipantsTab.css';

function MeetingParticipantsTab() {
  const { meetingId } = useParams();
  const meeting = meetings.find((m) => m.id === Number(meetingId));

  const participants = [
    { name: meeting?.host, role: 'Host' },
    { name: 'Alice Johnson', role: 'Participant' },
    { name: 'Bob Smith', role: 'Participant' },
    { name: 'Carol White', role: 'Participant' },
  ];

  return (
    <div>
      <h2 className="tab-section-title">Participants</h2>
      <div className="participants-list">
        {participants.map((p, idx) => (
          <div key={idx} className="participant-item">
            <span className="participant-name">{p.name}</span>
            <span
              className={
                p.role === 'Host'
                  ? 'participant-role host'
                  : 'participant-role participant'
              }
            >
              {p.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetingParticipantsTab;
