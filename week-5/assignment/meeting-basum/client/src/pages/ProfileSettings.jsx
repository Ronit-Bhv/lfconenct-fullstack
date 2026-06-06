import { useState } from 'react';
import { useUser } from '../context/UserContext';
import '../styles/PageCommon.css';
import '../styles/Form.css';
import '../styles/ProfileSettings.css';

function ProfileSettings() {
  // Context API: reads and writes user/session state.
  const { user, updateUser } = useUser();

  // Local state: form fields shadow context values until saved.
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [theme, setTheme] = useState(user.theme);
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    const initials = name.trim().charAt(0).toUpperCase();
    updateUser({ name: name.trim(), initials, email: email.trim(), theme });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="page-title">Profile Settings</h1>
      <p className="page-description">
        Manage your account details. Changes update the Context so the header and footer reflect them immediately.
      </p>

      <form className="meeting-form" onSubmit={handleSave}>
        <div className="form-group">
          <label className="form-label">Display Name</label>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Theme</label>
          <div className="theme-toggle">
            {['light', 'dark'].map((t) => (
              <button
                key={t}
                type="button"
                className={`theme-btn ${theme === t ? 'active' : ''}`}
                onClick={() => setTheme(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {saved ? 'Saved ✓' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="profile-preview">
        <p className="profile-preview-label">Live preview (from Context):</p>
        <div className="profile-preview-card">
          <div className="preview-avatar">{user.initials}</div>
          <div>
            <strong>{user.name}</strong>
            <p className="preview-email">{user.email}</p>
            <p className="preview-theme">Theme: {user.theme}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
