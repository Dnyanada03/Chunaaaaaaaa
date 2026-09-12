import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, ChevronRight, Clock } from 'lucide-react';
import { stateNotifications } from '../../data/stateMockData';

export default function StateNotificationsView({ onNavigate }) {
  const [filter, setFilter] = useState('All');
  const [notifs, setNotifs] = useState(stateNotifications);

  const categories = ['All', 'Action', 'Information', 'System'];

  const filteredNotifs = filter === 'All' ? notifs : notifs.filter(n => n.category === filter);

  const markAsRead = (id) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Action': return <AlertCircle size={15} style={{ color: '#D97706' }} />;
      case 'Information': return <Info size={15} style={{ color: '#1A73E8' }} />;
      case 'System': return <CheckCircle2 size={15} style={{ color: '#6B7280' }} />;
      default: return <Bell size={15} style={{ color: '#6B7280' }} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>NOTIFICATIONS</h1>
          <p>Alerts, action items, and system updates</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '2px', background: '#F1F5F9', borderRadius: '10px', padding: '4px', width: 'fit-content' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '7px 16px', border: 'none', borderRadius: '8px',
              background: filter === cat ? '#0B4726' : 'transparent',
              color: filter === cat ? '#FFFFFF' : '#475569',
              fontSize: '12.5px', fontWeight: filter === cat ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            {cat === 'Action' ? 'Requires Action' : cat}
            {cat !== 'All' && (
              <span style={{ marginLeft: '6px', fontSize: '10px', opacity: 0.8 }}>
                {notifs.filter(n => n.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {filteredNotifs.map(notif => (
          <div
            key={notif.id}
            className="card"
            style={{
              padding: '14px 18px',
              borderLeft: notif.read ? '4px solid transparent' : '4px solid #0B4726',
              cursor: 'pointer',
              opacity: notif.read ? 0.85 : 1
            }}
            onClick={() => {
              markAsRead(notif.id);
              if (notif.action && onNavigate) onNavigate(notif.action);
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              {getCategoryIcon(notif.category)}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '13.5px', fontWeight: notif.read ? 500 : 700, color: '#111827' }}>
                    {notif.title}
                  </div>
                  <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: '#9CA3AF', flexShrink: 0, marginLeft: '12px' }}>
                    {notif.timestamp}
                  </span>
                </div>
                <div style={{ fontSize: '12.5px', color: '#4B5563', marginTop: '4px', lineHeight: 1.5 }}>
                  {notif.message}
                </div>
                {notif.action && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1A73E8', fontWeight: 600, marginTop: '6px' }}>
                    View Details <ChevronRight size={12} />
                  </div>
                )}
              </div>
              {!notif.read && (
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0B4726', flexShrink: 0, marginTop: '6px' }} />
              )}
            </div>
          </div>
        ))}
        {filteredNotifs.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <Bell size={28} style={{ color: '#CBD5E1', marginBottom: '8px' }} />
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>No notifications in this category</div>
          </div>
        )}
      </div>
    </div>
  );
}
