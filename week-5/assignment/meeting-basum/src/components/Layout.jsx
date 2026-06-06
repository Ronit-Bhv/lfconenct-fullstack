import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  LogIn,
  CalendarDays,
  Clock,
  UserCircle,
  Bell,
  ChevronDown,
  Video,
} from 'lucide-react';
import '../styles/Layout.css';

function Layout() {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/new-meeting', label: 'New Meeting', icon: PlusCircle },
    { to: '/join-meeting', label: 'Join Meeting', icon: LogIn },
    { to: '/calendar', label: 'Calendar', icon: CalendarDays },
    { to: '/schedule-meeting', label: 'Schedule Meeting', icon: Clock },
    { to: '/profile-settings', label: 'Profile Settings', icon: UserCircle },
  ];

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Video size={28} strokeWidth={2.5} />
          <span className="logo-text">Meeting Basum</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <Icon size={22} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="main-area">
        {/* Header */}
        <header className="top-header">
          <div className="header-datetime">
            <CalendarDays size={18} color="#374151" />
            <span className="header-date">{dateStr}</span>
            <span className="header-separator">|</span>
            <Clock size={18} color="#374151" />
            <span className="header-time">{timeStr}</span>
          </div>
          <Bell size={20} color="#374151" />
          <div className="header-profile">
            <div className="profile-avatar">R</div>
            <span className="profile-name">Ronit Bhujel</span>
            <ChevronDown size={16} color="#374151" />
          </div>
        </header>

        {/* Content */}
        <main className="main-content">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="footer">
          Copyright 2026 Ronit Bhujel. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Layout;
