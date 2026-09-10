import React from 'react';
import { Shield, X, Mail, Phone, MapPin, Award, CheckCircle2, LogOut, Lock } from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';
import { initialCollectorProfile } from '../../data/collectorMockData';

export default function CollectorProfileModal({ isOpen, onClose }) {
  const { logout } = useSwadesh();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '580px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header" style={{ background: '#06371E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} style={{ color: '#FDE68A' }} />
            <h3 className="modal-title">DISTRICT COLLECTOR PROFILE & DSC CREDENTIALS</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Avatar & Title Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#0B4726', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>
              RD
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{initialCollectorProfile.name}</h3>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0B4726' }}>{initialCollectorProfile.role}</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>{initialCollectorProfile.cadre} • ID: {initialCollectorProfile.id}</div>
            </div>
          </div>

          {/* Official Information Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
            <div style={{ background: '#F1F5F9', padding: '10px', borderRadius: '6px' }}>
              <div style={{ color: '#64748B', fontSize: '10.5px' }}>DISTRICT JURISDICTION</div>
              <div style={{ fontWeight: 700, color: '#1E293B' }}>{initialCollectorProfile.district} ({initialCollectorProfile.division})</div>
            </div>

            <div style={{ background: '#F1F5F9', padding: '10px', borderRadius: '6px' }}>
              <div style={{ color: '#64748B', fontSize: '10.5px' }}>DEPARTMENT</div>
              <div style={{ fontWeight: 700, color: '#1E293B' }}>Revenue & Disaster Management</div>
            </div>

            <div style={{ background: '#F1F5F9', padding: '10px', borderRadius: '6px' }}>
              <div style={{ color: '#64748B', fontSize: '10.5px' }}>OFFICIAL EMAIL</div>
              <div style={{ fontWeight: 600, color: '#1E293B' }}>{initialCollectorProfile.email}</div>
            </div>

            <div style={{ background: '#F1F5F9', padding: '10px', borderRadius: '6px' }}>
              <div style={{ color: '#64748B', fontSize: '10.5px' }}>TELEPHONE</div>
              <div style={{ fontWeight: 600, color: '#1E293B' }}>{initialCollectorProfile.phone}</div>
            </div>
          </div>

          {/* Class 3 Digital Certificate Status */}
          <div style={{ background: '#E6F4EA', border: '1.5px solid #1E7E34', borderRadius: '8px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#1E7E34', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> CLASS 3 DIGITAL SIGNATURE CERTIFICATE (DSC) ACTIVE
              </span>
              <span className="badge badge-green">Valid till Dec 2028</span>
            </div>
            <div style={{ fontSize: '11px', color: '#334155' }}>
              Issuer: {initialCollectorProfile.signCertIssuer} • Tokens: ePass2003 USB Token Connected
            </div>
          </div>

          {/* Dedicated Logout & Session Management Section */}
          <div style={{
            background: '#FEF2F2',
            border: '1.5px solid #FCA5A5',
            borderRadius: '8px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#991B1B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={16} /> ACCOUNT & SESSION LOGOUT
              </div>
              <div style={{ fontSize: '11.5px', color: '#7F1D1D', marginTop: '3px' }}>
                Safely end your District Collector portal session and unmount DSC authentication tokens.
              </div>
            </div>
            <button
              className="btn btn-danger"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                fontWeight: 700,
                fontSize: '12.5px',
                padding: '8px 14px'
              }}
              onClick={handleLogout}
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <button
            className="btn btn-danger"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={handleLogout}
          >
            <LogOut size={16} /> Secure Session Logout
          </button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
