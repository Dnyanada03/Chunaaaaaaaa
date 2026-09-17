import React from 'react';
import { Search, Bell, LogOut, PenTool, Building2 } from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';

export default function ProposingBodyHeader({ onOpenProfile, onOpenSearch, onNavigate }) {
  const { proposingOfficer, proposingNotifications, logout, proposingProposals } = useSwadesh();
  const unreadCount = proposingNotifications ? proposingNotifications.filter(n => !n.read).length : 2;
  const draftProposalsCount = proposingProposals ? proposingProposals.filter(p => p.status === 'Draft').length : 1;

  return (
    <header className="header-bar">
      <div className="header-brand" style={{ cursor: 'pointer' }} onClick={() => onNavigate && onNavigate('dashboard')}>
        <div className="official-emblem-seal" title="Project Proposing Body / Project Authority" style={{ background: '#006638' }}>
          PA
        </div>
        <div className="brand-titles">
          <div className="brand-sub">PROJECT AUTHORITY</div>
          <div className="brand-main">{proposingOfficer?.shortAuthority || "Maharail"} Portal</div>
        </div>
      </div>

      <div className="header-right">
        <button onClick={onOpenSearch} className="search-trigger-btn" title="Search projects, proposals, cadastral parcels... (Ctrl+K)">
          <Search size={14} />
          <span>Search projects, proposals, survey parcels...</span>
          <kbd style={{ fontSize: '9.5px', background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '6px' }}>Ctrl+K</kbd>
        </button>

        {draftProposalsCount > 0 && (
          <button
            onClick={() => onNavigate && onNavigate('proposals')}
            className="notification-bell-btn"
            title={`${draftProposalsCount} draft proposals under preparation`}
            style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)' }}
          >
            <PenTool size={15} style={{ color: '#FDE68A' }} />
            <span className="bell-badge" style={{ background: '#D97706' }}>{draftProposalsCount}</span>
          </button>
        )}

        <button
          onClick={() => onNavigate && onNavigate('notifications')}
          className="notification-bell-btn"
          title="Notifications & System Alerts"
        >
          <Bell size={16} />
          {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
        </button>

        <div
          onClick={onOpenProfile}
          className="profile-chip"
          title={`${proposingOfficer?.name} • ${proposingOfficer?.designation}`}
          style={{ cursor: 'pointer' }}
        >
          <div className="profile-avatar" style={{ background: '#005A36' }}>
            {proposingOfficer?.name ? proposingOfficer.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'VK'}
          </div>
        </div>

        <button
          onClick={logout}
          className="notification-bell-btn"
          title="Secure Logout from Proposing Body Portal"
          style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.35)' }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
