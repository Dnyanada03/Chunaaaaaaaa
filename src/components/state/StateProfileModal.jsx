import React from 'react';
import { X, ShieldCheck, Building2, Mail, Phone, MapPin, User } from 'lucide-react';
import { stateOfficerProfile } from '../../data/stateMockData';
import { useSwadesh } from '../../context/SwadeshContext';

export default function StateProfileModal({ isOpen, onClose }) {
  const { logout } = useSwadesh();

  if (!isOpen) return null;

  const profile = stateOfficerProfile;

  const fields = [
    { label: 'Officer Name', value: profile.name },
    { label: 'Designation', value: profile.role },
    { label: 'Officer ID', value: profile.id, mono: true },
    { label: 'IAS Cadre', value: profile.cadre },
    { label: 'Department', value: profile.department },
    { label: 'Ministry', value: profile.ministry },
    { label: 'Government ID', value: profile.govtId, mono: true },
    { label: 'Jurisdiction', value: profile.jurisdiction },
    { label: 'Email', value: profile.email },
    { label: 'Phone', value: profile.phone },
    { label: 'Office Address', value: profile.officeAddress },
    { label: 'DSC Status', value: profile.digitalSignStatus },
    { label: 'Certificate Issuer', value: profile.signCertIssuer }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '540px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} style={{ color: '#89E9AE' }} />
            <span className="modal-title">State Officer Profile</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body" style={{ padding: '0' }}>
          {/* Profile Header */}
          <div style={{ background: '#F8FAFC', padding: '18px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '12px', background: '#0B4726',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFF', fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 800
            }}>
              SC
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>{profile.name}</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>{profile.role}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#1E7E34', background: '#E6F4EA', padding: '2px 8px', borderRadius: '6px', marginTop: '4px' }}>
                <ShieldCheck size={11} /> DSC Active
              </div>
            </div>
          </div>

          {/* Profile Fields */}
          <div style={{ padding: '14px 20px' }}>
            {fields.map((f, i) => (
              <div key={i} style={{ display: 'flex', padding: '7px 0', borderBottom: i < fields.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.3px', minWidth: '130px' }}>
                  {f.label}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827', fontFamily: f.mono ? 'var(--font-mono)' : 'inherit' }}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-danger" onClick={logout}>Secure Logout</button>
        </div>
      </div>
    </div>
  );
}
