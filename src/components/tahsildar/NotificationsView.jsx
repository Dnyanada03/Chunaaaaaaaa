import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { Bell, FolderPlus, FileCheck, IndianRupee, Send, CheckCircle2, Filter } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const NotificationsView = () => {
  const { notifications, markNotificationAsRead } = useSwadesh();
  const [filterCategory, setFilterCategory] = useState('All');

  // Filter out objection details per spec
  const workNotifs = notifications.filter(n => n.category !== 'Objection');

  const filtered = filterCategory === 'All'
    ? workNotifs
    : workNotifs.filter(n => n.category === filterCategory);

  const categories = ['All', 'Project', 'Award', 'Compensation', 'Notice', 'Mutation'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>Official Work & Workflow Notifications</h1>
          <p>Revenue Department Official Task Assignments, Award Updates & Notice Statuses</p>
        </div>
        <div style={{ fontSize: '13px', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '20px' }}>
          {workNotifs.filter(n => !n.read).length} Unread Notifications
        </div>
      </div>

      {/* Filter Category Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Filter size={14} /> FILTER CATEGORY:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
              No notifications available in category "{filterCategory}".
            </div>
          ) : (
            filtered.map(n => (
              <div
                key={n.id}
                style={{
                  padding: '18px 24px',
                  border: '1px solid #E2E8F0',
                  borderLeft: n.read ? '5px solid #CBD5E1' : '5px solid #0B4726',
                  borderRadius: '16px',
                  background: n.read ? '#FFFFFF' : '#F8FAFC',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '18px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
                onClick={() => markNotificationAsRead(n.id)}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: n.read ? '#F1F5F9' : '#E6F4EA',
                    color: n.read ? '#64748B' : '#0B4726',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Bell size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: '700', fontSize: '15px', color: '#0B4726', letterSpacing: '-0.2px' }}>
                        {n.title}
                      </span>
                      <StatusBadge status={n.category} />
                      {!n.read && (
                        <span style={{ background: '#0B4726', color: 'white', fontSize: '9.5px', padding: '2px 7px', borderRadius: '6px', fontWeight: '800', textTransform: 'uppercase' }}>
                          UNREAD
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#1A73E8', marginTop: '3px' }}>
                      Project ID: <span className="mono-code">{n.projectId}</span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#334155', marginTop: '4px', lineHeight: '1.5' }}>
                      {n.message}
                    </p>
                  </div>
                </div>

                <div style={{ fontSize: '11.5px', fontWeight: '600', color: '#64748B', whiteSpace: 'nowrap' }}>
                  {n.timestamp}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsView;
