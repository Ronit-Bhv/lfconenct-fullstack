import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewMeeting from './pages/NewMeeting';
import JoinMeeting from './pages/JoinMeeting';
import Calendar from './pages/Calendar';
import ScheduleMeeting from './pages/ScheduleMeeting';
import ProfileSettings from './pages/ProfileSettings';
import MeetingDetail from './pages/MeetingDetail';
import MeetingDetailsTab from './pages/MeetingDetailsTab';
import MeetingParticipantsTab from './pages/MeetingParticipantsTab';
import NotFound from './pages/NotFound';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Navigate to="/" replace />} />
            <Route path="new-meeting" element={<NewMeeting />} />
            <Route path="join-meeting" element={<JoinMeeting />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="schedule-meeting" element={<ScheduleMeeting />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
            <Route path="meetings/:meetingId" element={<MeetingDetail />}>
              <Route index element={<Navigate to="details" replace />} />
              <Route path="details" element={<MeetingDetailsTab />} />
              <Route path="participants" element={<MeetingParticipantsTab />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
