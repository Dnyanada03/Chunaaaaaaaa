import React from 'react';
import { Search, Bell, LogOut, PenTool } from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';
import { stateOfficerProfile } from '../../data/stateMockData';

export default function StateHeader({ onOpenProfile, onOpenSearch, pendingSignatures = 4, onNavigate }) {
  const { notifications, logout } = useSwadesh();
  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 4;

  return (
    <header className="header-bar">
      <div className="header-brand">
        <div className="official-emblem-seal" title="Government of Maharashtra — State Cabinet Ministry">
          SG
        </div>
        <div className="brand-titles">
          <div className="brand-sub">State Government</div>
          <div className="brand-main">Cabinet Ministry</div>
        </div>
      </div>

      <div className="header-right">
        <button onClick={onOpenSearch} className="search-trigger-btn" title="Search projects, documents, officers... (Ctrl+K)">
          <Search size={14} />
          <span>Search projects, documents, officers...</span>
          <kbd style={{ fontSize: '9.5px', background: 'rgba(255,255,255,0.2)', padding: '8px 8px', borderRadius: '6px' }}>Ctrl+K</kbd>
        </button>

        {pendingSignatures > 0 && (
          <button
            onClick={() => onNavigate && onNavigate('signatures')}
            className="notification-bell-btn"
            title={`${pendingSignatures} pending digital signatures`}
            style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)' }}
          >
            <PenTool size={15} style={{ color: '#FDE68A' }} />
            <span className="bell-badge" style={{ background: '#D97706' }}>{pendingSignatures}</span>
          </button>
        )}

        <button
          onClick={() => onNavigate && onNavigate('notifications')}
          className="notification-bell-btn"
          title="Notifications & Alerts"
        >
          <Bell size={16} />
          {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
        </button>

        <div onClick={onOpenProfile} className="profile-chip" title="View Officer Profile & DSC Status">
          <div className="profile-avatar">SC</div>
          <div className="profile-meta">
            <span className="profile-name">{stateOfficerProfile.name.split(',')[0]}</span>
            <span className="profile-role">Principal Secretary (Revenue)</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="notification-bell-btn"
          title="Secure Logout from State Portal"
          style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.35)' }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
