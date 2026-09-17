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
    <header className="header-bar" style={{
      background: '#16233A',
      borderBottom: '2px solid #2F6F62',
      color: '#F2F1EC',
      padding: '0 28px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand & Emblem */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Emblem width={36} height={48} color="#FFFFFF" />
          <div>
            <div style={{
              fontSize: '9.5px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#CBD3DE',
              fontWeight: 600,
              lineHeight: 1.2
            }}>
              Ministry of Rural Development • Government of India
            </div>
            <div style={{
              fontFamily: '"Source Serif Pro", Georgia, serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              SWADESH <span style={{ color: '#9FC2B4', fontSize: '13px', fontWeight: 400, fontFamily: 'Inter, sans-serif' }}>| National Supervisory Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center - Live Timestamp */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '5px 12px',
        borderRadius: '4px',
        fontSize: '11.5px',
        fontFamily: '"IBM Plex Mono", Consolas, monospace',
        color: '#E4EEE9'
      }}>
        <Clock size={13} style={{ color: '#9FC2B4' }} />
        <span>{currentTime || 'Loading IST...'}</span>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Global Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="search-trigger-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#CBD3DE',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
          title="Spotlight Search across India (Ctrl+K)"
        >
          <Search size={13} />
          <span>National Search...</span>
          <kbd style={{
            background: 'rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            padding: '2px 5px',
            borderRadius: '3px',
            fontSize: '10px',
            fontFamily: 'monospace'
          }}>Ctrl K</kbd>
        </button>

        {/* Directives & Alerts Notification */}
        <button
          onClick={() => onNavigate && onNavigate('alerts')}
          style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            color: '#F2F1EC',
            width: '36px',
            height: '36px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Supervisory Directives & Priority Alerts"
        >
          <Bell size={16} />
          {unreadDirectivesCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#A6432B',
              color: '#FFFFFF',
              fontSize: '10px',
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 700,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #16233A'
            }}>
              {unreadDirectivesCount}
            </span>
          )}
        </button>

        {/* Secretary Profile Badge */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '4px 10px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            title={`${mordOfficerProfile.name} • ${mordOfficerProfile.designation}`}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              background: '#2F6F62',
              color: '#FFFFFF',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              SS
            </div>
            <div style={{ textAlign: 'left', display: 'none', md: 'block' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2 }}>
                Shri Shailesh K. Singh, IAS
              </div>
              <div style={{ fontSize: '10px', color: '#9FC2B4' }}>
                Secretary (MoRD)
              </div>
            </div>
            <ChevronDown size={13} style={{ color: '#CBD3DE' }} />
          </div>

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '46px',
              right: 0,
              width: '300px',
              background: '#FFFFFF',
              border: '1px solid #D8D5CB',
              boxShadow: '0 8px 24px rgba(22, 35, 58, 0.18)',
              borderRadius: '4px',
              padding: '16px',
              zIndex: 1000,
              color: '#16233A'
            }}>
              <div style={{ borderBottom: '1px solid #D8D5CB', paddingBottom: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#16233A' }}>
                  {mordOfficerProfile.name}
                </div>
                <div style={{ fontSize: '11.5px', color: '#3A4A63', marginTop: '2px' }}>
                  {mordOfficerProfile.designation}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '1px' }}>
                  {mordOfficerProfile.department}, MoRD, GoI
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '8px',
                  padding: '2px 8px',
                  background: '#E4EEE9',
                  color: '#2F6F62',
                  border: '1px solid #2F6F62',
                  fontSize: '10.5px',
                  fontFamily: '"IBM Plex Mono", monospace'
                }}>
                  <CheckCircle2 size={11} /> {mordOfficerProfile.digitalSignStatus}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ color: '#3A4A63' }}>
                  <strong>DSC Serial:</strong> <span style={{ fontFamily: 'monospace' }}>{mordOfficerProfile.certSerial}</span>
                </div>
                <div style={{ color: '#3A4A63' }}>
                  <strong>Office:</strong> Krishi Bhawan, New Delhi
                </div>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #D8D5CB', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => { setDropdownOpen(false); onNavigate && onNavigate('settings'); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2F6F62',
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
                    color: '#A6432B',
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
      </div>
    </header>
  );
}
