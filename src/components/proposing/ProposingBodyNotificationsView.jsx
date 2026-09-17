import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  Bell, CheckCircle2, Clock, AlertTriangle, FileText,
  Building2, ChevronRight, Filter, ShieldCheck, ArrowRight
} from 'lucide-react';

export default function ProposingBodyNotificationsView({ onNavigate }) {
  const { proposingNotifications, markProposingNotificationAsRead, setProposingNotifications } = useSwadesh();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Approval', 'Survey', 'Financial', 'Document', 'System'];

  const filteredNotifications = proposingNotifications.filter(notif => {
    if (selectedFilter !== 'All' && notif.category !== selectedFilter) return false;
    return true;
  });

  const handleMarkAllAsRead = () => {
    setProposingNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = proposingNotifications.filter(n => !n.read).length;

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Top Header & Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
            <span>Project Authority</span>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 700, color: '#0F172A' }}>Notifications & Statutory Dispatch Feed</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Official Intimations & Dispatch Alerts
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Direct intimations from State Mantralaya, District Collectorates, and Tahsildar benches
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            className="btn btn-secondary"
            onClick={handleMarkAllAsRead}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
          >
            <CheckCircle2 size={15} />
            Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '20px',
        background: '#FFFFFF',
        padding: '8px 12px',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        overflowX: 'auto'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: selectedFilter === cat ? '1px solid #008E4F' : '1px solid transparent',
              background: selectedFilter === cat ? '#E6F4EA' : 'transparent',
              color: selectedFilter === cat ? '#008E4F' : '#64748B',
              fontSize: '12.5px',
              fontWeight: selectedFilter === cat ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => markProposingNotificationAsRead(notif.id)}
              style={{
                background: notif.read ? '#FFFFFF' : '#F0FDF4',
                border: `1px solid ${notif.read ? '#E2E8F0' : '#86EFAC'}`,
                borderRadius: '10px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                boxShadow: notif.read ? 'none' : '0 2px 6px rgba(0, 142, 79, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: notif.category === 'Approval' ? '#E6F4EA' : notif.category === 'Financial' ? '#FEF3C7' : '#EFF6FF',
                  color: notif.category === 'Approval' ? '#008E4F' : notif.category === 'Financial' ? '#D97706' : '#2563EB',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {notif.category === 'Approval' ? <ShieldCheck size={18} /> :
                   notif.category === 'Financial' ? <Clock size={18} /> :
                   <FileText size={18} />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 700,
                      background: notif.read ? '#F1F5F9' : '#DCFCE7',
                      color: notif.read ? '#475569' : '#15803D'
                    }}>
                      {notif.category}
                    </span>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A' }} />
                    )}
                  </div>

                  <p style={{ fontSize: '13px', color: '#475569', margin: '4px 0 6px 0', lineHeight: 1.5 }}>
                    {notif.message}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11.5px', color: '#94A3B8' }}>
                    <span style={{ fontFamily: 'monospace' }}>⏱ {notif.timestamp}</span>
                    {notif.projectId && <span>Project: <strong>{notif.projectId}</strong></span>}
                    {notif.proposalId && <span>Proposal: <strong>{notif.proposalId}</strong></span>}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              {notif.projectId && onNavigate && (
                <button
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    markProposingNotificationAsRead(notif.id);
                    onNavigate('project-detail', notif.projectId);
                  }}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>View Details</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <Bell size={32} style={{ margin: '0 auto 12px auto', display: 'block', color: '#CBD5E1' }} />
            <p style={{ fontSize: '14px', margin: 0 }}>No notifications found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
