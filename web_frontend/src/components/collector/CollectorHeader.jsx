import React from 'react';
import {
  Search,
  Bell,
  UserCheck,
  LogOut,
  Shield,
  Building2,
  RefreshCw
} from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';
import { initialCollectorProfile } from '../../data/collectorMockData';

export default function CollectorHeader({ onOpenProfile, onOpenSearch, activeRole, onToggleRole }) {
  const { notifications, logout } = useSwadesh();
  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 2;

  return (
    <header className="header-bar">
      <div className="header-brand">
        {/* Official State Emblem Circular Seal */}
        <div className="official-emblem-seal" title="Government of Maharashtra Revenue Department">
          CD
        </div>

        <div className="brand-titles">
          <div className="brand-sub">
            Ministry of Rural Development
          </div>
          <div className="brand-main">
            Collectorate Portal
          </div>
        </div>
      </div>

      <div className="header-right">
        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="search-trigger-btn"
          title="Search projects, villages, parcels or landowners (Ctrl+K)"
        >
          <Search size={14} />
          <span>Search projects, villages, parcels...</span>
          <kbd style={{
            fontSize: '9.5px',
            background: 'rgba(255,255,255,0.2)',
            padding: '8px 8px',
            borderRadius: '6px'
          }}>Ctrl+K</kbd>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => {}}
          className="notification-bell-btn"
          title="Notifications & Alerts"
        >
          <Bell size={16} />
          {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
        </button>

        {/* Collector Profile Chip */}
        <div
          onClick={onOpenProfile}
          className="profile-chip"
          title="View Collector Profile & DSC Status"
        >
          <div className="profile-avatar">RD</div>
        </div>

        {/* Quick Logout Header Button */}
        <button
          onClick={logout}
          className="notification-bell-btn"
          title="Secure Logout from Collector Portal"
          style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.35)' }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
