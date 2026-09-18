import React, { useState, useEffect } from 'react';
import { Search, Bell, LogOut, Shield, FileText, CheckCircle2, ChevronDown, Clock } from 'lucide-react';
import Emblem from '../common/Emblem';
import { mordOfficerProfile } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';

export default function MordHeader({ onOpenProfile, onOpenSearch, onNavigate, unreadDirectivesCount = 2 }) {
  const { logout } = useSwadesh();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) + ' | ' + now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }) + ' IST';
      setCurrentTime(formatted);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header-bar">
      {/* Brand & Emblem */}
      <div className="header-brand">
        <Emblem width={34} height={46} color="#FFFFFF" />
        <div className="brand-titles">
          <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: '600', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '1px' }}>
            Ministry of Rural Development • Government of India
          </div>
          <div className="brand-main" style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '17px', fontWeight: '700', letterSpacing: '0.3px', color: '#FFFFFF' }}>
            SWADESH <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontWeight: 300, margin: '0 4px' }}>|</span> National Supervisory Portal
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="header-right">
        {/* Global Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="search-trigger-btn"
          title="Spotlight Search across India (Ctrl+K)"
        >
          <Search size={14} />
          <span>National Search...</span>
          <kbd style={{
            fontSize: '9.5px',
            background: 'rgba(255,255,255,0.2)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>Ctrl K</kbd>
        </button>

        {/* Directives & Alerts Notification */}
        <button
          onClick={() => onNavigate && onNavigate('alerts')}
          className="notification-bell-btn"
          title="Supervisory Directives & Priority Alerts"
        >
          <Bell size={16} />
          {unreadDirectivesCount > 0 && (
            <span className="bell-badge">
              {unreadDirectivesCount}
            </span>
          )}
        </button>

        {/* Secretary Profile Avatar Chip */}
        <div className="profile-menu-container" style={{ position: 'relative' }}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="profile-chip"
            title={`${mordOfficerProfile.name} • ${mordOfficerProfile.designation}`}
          >
            <div className="profile-avatar">SS</div>
          </div>

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '52px',
              right: 0,
              width: '300px',
              background: '#FFFFFF',
              border: '1.5px solid #0B4726',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.22), 0 4px 12px rgba(11, 71, 38, 0.15)',
              borderRadius: '16px',
              padding: '16px',
              zIndex: 2000,
              color: '#1F2937'
            }}>
              <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                  {mordOfficerProfile.name}
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                  {mordOfficerProfile.designation}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>
                  {mordOfficerProfile.department}, MoRD, GoI
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '8px',
                  padding: '2px 8px',
                  background: '#E6F4EA',
                  color: '#1E7E34',
                  border: '1px solid #CEEAD6',
                  borderRadius: '6px',
                  fontSize: '10.5px',
                  fontFamily: "'Roboto Mono', monospace",
                  fontWeight: 600
                }}>
                  <CheckCircle2 size={11} /> {mordOfficerProfile.digitalSignStatus}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ color: '#334155' }}>
                  <strong>DSC Serial:</strong> <span style={{ fontFamily: 'monospace' }}>{mordOfficerProfile.certSerial}</span>
                </div>
                <div style={{ color: '#334155' }}>
                  <strong>Office:</strong> Krishi Bhawan, New Delhi
                </div>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => { setDropdownOpen(false); onNavigate && onNavigate('settings'); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#008E4F',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Supervisory Settings
                </button>
                <button
                  onClick={logout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#C5221F',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <LogOut size={12} /> Secure Exit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Logout Header Button */}
        <button
          onClick={logout}
          className="notification-bell-btn"
          title="Secure Logout from MoRD Portal"
          style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.35)' }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
