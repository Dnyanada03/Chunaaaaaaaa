import React from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { User, ShieldCheck, Mail, Phone, MapPin, Building, LogOut, X } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose }) => {
  const { officerProfile, logout, setActiveTab } = useSwadesh();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '520px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} />
            <span className="modal-title">Tahsildar Officer Profile & Identity</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Officer Identity Card */}
          <div style={{
            background: '#0B4726',
            color: 'white',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}>
              AP
            </div>
            <div style={{ fontFamily: 'Merriweather, serif', fontSize: '20px', fontWeight: '700' }}>
              {officerProfile.name}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)', marginTop: '2px', fontWeight: '600' }}>
              {officerProfile.role}
            </div>
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>
              {officerProfile.department}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
              <ShieldCheck size={16} style={{ color: '#005A36' }} />
              <div><strong>Government ID:</strong> {officerProfile.govtId} ({officerProfile.id})</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
              <MapPin size={16} style={{ color: '#005A36' }} />
              <div><strong>Jurisdiction:</strong> {officerProfile.taluka}, {officerProfile.district} ({officerProfile.division})</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
              <Mail size={16} style={{ color: '#005A36' }} />
              <div><strong>Official Email:</strong> {officerProfile.email}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
              <Phone size={16} style={{ color: '#005A36' }} />
              <div><strong>Contact Number:</strong> {officerProfile.phone}</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              logout();
              onClose();
              setActiveTab('login');
            }}
          >
            <LogOut size={16} /> Secure Session Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
