import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  MapPin,
  Building2,
  FileText,
  FolderArchive,
  AlertTriangle,
  Settings,
  Landmark
} from 'lucide-react';

export default function MordNav({ activeTab, setActiveTab, unreadDirectives = 2 }) {
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban, badge: '128' },
    { id: 'map', label: 'National Map', icon: MapPin },
    { id: 'states', label: 'States', icon: Building2 },
    { id: 'ministries', label: 'Ministries / Depts', icon: Landmark },
    { id: 'reports', label: 'Reports & MIS', icon: FileText },
    { id: 'documents', label: 'Documents', icon: FolderArchive },
    { id: 'alerts', label: 'Alerts & Directives', icon: AlertTriangle, alertBadge: unreadDirectives },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #D8D5CB',
      padding: '0 28px',
      overflowX: 'auto',
      whiteSpace: 'nowrap'
    }} aria-label="National Supervisory Navigation">
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        {navTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 14px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '3px solid #2F6F62' : '3px solid transparent',
                color: isActive ? '#16233A' : '#3A4A63',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.12s ease',
                position: 'relative'
              }}
            >
              <Icon size={15} style={{
                color: isActive ? '#2F6F62' : (tab.highlight ? '#8A6A1E' : '#3A4A63')
              }} />
              <span>{tab.label}</span>

              {tab.badge && (
                <span style={{
                  fontFamily: '"IBM Plex Mono", Consolas, monospace',
                  fontSize: '10.5px',
                  background: isActive ? '#E4EEE9' : '#F2F1EC',
                  color: isActive ? '#2F6F62' : '#3A4A63',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  fontWeight: 600,
                  border: '1px solid #D8D5CB'
                }}>
                  {tab.badge}
                </span>
              )}

              {tab.alertBadge && tab.alertBadge > 0 ? (
                <span style={{
                  fontFamily: '"IBM Plex Mono", Consolas, monospace',
                  fontSize: '10px',
                  background: '#F6E7E2',
                  color: '#A6432B',
                  border: '1px solid #A6432B',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  fontWeight: 700
                }}>
                  {tab.alertBadge}
                </span>
              ) : null}

              {tab.highlight && (
                <span style={{
                  fontSize: '9px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  background: '#F2ECDC',
                  color: '#8A6A1E',
                  border: '1px solid #8A6A1E',
                  padding: '1px 4px',
                  borderRadius: '2px',
                  fontWeight: 700
                }}>
                  X-Factor
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
