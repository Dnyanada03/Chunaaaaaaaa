import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { Search, Bell, User, LogOut, ShieldCheck, ChevronDown } from 'lucide-react';
import Emblem from './Emblem';

const Header = ({ onOpenProfile }) => {
  const { officerProfile, notifications, setActiveTab, setIsGlobalSearchOpen, logout } = useSwadesh();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header-bar">
      <div className="header-brand">
        {/* State Emblem of India (Ashoka Lion Capital with Satyameva Jayate) */}
        <Emblem width={34} height={46} color="#FFFFFF" />

        <div className="brand-titles">
          <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: '600', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '1px' }}>
            Ministry of Rural Development
          </div>
          <div className="brand-main" style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '17px', fontWeight: '700', letterSpacing: '0.3px', color: '#FFFFFF' }}>
            Land Acquisition Officer<span style={{ color: 'rgba(255, 255, 255, 0.4)', fontWeight: 300, margin: '0 4px' }}>|</span> Revenue Department
          </div>
        </div>
      </div>

      <div className="header-right">
        {/* Global Search Trigger */}
        <button
          className="search-trigger-btn"
          onClick={() => setIsGlobalSearchOpen(true)}
          title="Search Projects, Villages, Parcels, Landowners (Ctrl+K)"
        >
          <Search size={14} />
          <span>Global Search...</span>
          <kbd style={{ background: 'rgba(255,255,255,0.15)', padding: '1px 5px', borderRadius: '6px', fontSize: '10px', fontFamily: 'monospace' }}>Ctrl K</kbd>
        </button>

        {/* Notification Bell */}
        <button
          className="notification-bell-btn"
          onClick={() => setActiveTab('notifications')}
          title="Work Notifications"
        >
          <Bell size={16} />
          {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
        </button>

        {/* Tahsildar Officer Profile Chip & Dropdown */}
        <div className="profile-menu-container">
          <div
            className="profile-chip"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="profile-avatar">AP</div>
            <div className="profile-meta">
              <span className="profile-name">{officerProfile.name}</span>
              <span className="profile-role">Tahsildar • {officerProfile.taluka}</span>
            </div>
            <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.8)' }} />
          </div>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '44px',
                right: '0',
                width: '260px',
                background: '#FFFFFF',
                color: '#1F2937',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                border: '1px solid #D1D5DB',
                padding: '12px',
                zIndex: 1050
              }}
            >
              <div style={{ paddingBottom: '10px', marginBottom: '10px', borderBottom: '1px solid #E5E7EB' }}>
                <div style={{ fontFamily: 'Merriweather, serif', fontWeight: '700', fontSize: '13.5px', color: '#0B4726' }}>{officerProfile.name}</div>
                <div style={{ fontSize: '11px', color: '#4B5563' }}>{officerProfile.role}</div>
                <div style={{ fontSize: '11px', color: '#4B5563', marginTop: '4px' }}>
                  <ShieldCheck size={12} style={{ display: 'inline', verticalAlign: '-2px', color: '#0B4726' }} /> {officerProfile.govtId}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button
                  onClick={() => { setDropdownOpen(false); onOpenProfile(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '7px 10px',
                    border: 'none',
                    background: 'none',
                    color: '#374151',
                    fontSize: '12.5px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#EFECE6'}
                  onMouseOut={(e) => e.target.style.background = 'none'}
                >
                  <User size={14} /> Officer Profile & Identity
                </button>

                <button
                  onClick={() => { setDropdownOpen(false); logout(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '7px 10px',
                    border: 'none',
                    background: 'none',
                    color: '#C5221F',
                    fontSize: '12.5px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: '600'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#FCE8E6'}
                  onMouseOut={(e) => e.target.style.background = 'none'}
                >
                  <LogOut size={14} /> Secure Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
