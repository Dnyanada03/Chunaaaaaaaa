import React from 'react';
import { X, ShieldCheck, User, Building2, Mail, Phone, MapPin, CheckCircle2, Award, FileText } from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';

export default function ProposingBodyProfileModal({ isOpen, onClose }) {
  const { proposingOfficer } = useSwadesh();

  if (!isOpen || !proposingOfficer) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '600px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={20} style={{ color: '#89E9AE' }} />
            <span className="modal-title">Project Authority Officer Profile</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Officer Hero Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '12px',
            padding: '16px 20px'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#005A36',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: 800,
              fontFamily: 'var(--font-serif)',
              flexShrink: 0
            }}>
              {proposingOfficer.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-serif)' }}>
                {proposingOfficer.name}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#005A36', marginTop: '2px' }}>
                {proposingOfficer.designation}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                {proposingOfficer.authority}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="card" style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>GOVT OFFICER ID</div>
              <div className="mono-code" style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                {proposingOfficer.govtId}
              </div>
            </div>

            <div className="card" style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>CADRE & SERVICE</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', marginTop: '4px' }}>
                {proposingOfficer.cadre}
              </div>
            </div>

            <div className="card" style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>OFFICIAL EMAIL</div>
              <div style={{ fontSize: '12.5px', color: '#005A36', fontWeight: 600, marginTop: '4px' }}>
                {proposingOfficer.email}
              </div>
            </div>

            <div className="card" style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>TELEPHONE & MOBILE</div>
              <div className="mono-code" style={{ fontSize: '12.5px', color: '#0F172A', marginTop: '4px' }}>
                {proposingOfficer.phone}
              </div>
            </div>
          </div>

          {/* Digital Signature Credentials */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #86EFAC',
            borderRadius: '10px',
            padding: '14px 16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
              <ShieldCheck size={18} /> Class-3 Digital Signature Certificate (DSC) Status
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#374151' }}>
              <div>Status: <strong style={{ color: '#166534' }}>{proposingOfficer.digitalSignStatus}</strong></div>
              <div>Issuer: <strong>{proposingOfficer.signCertIssuer}</strong></div>
              <div>Cert Serial: <span className="mono-code" style={{ fontSize: '11px' }}>{proposingOfficer.certSerial}</span></div>
              <div>Validity: <strong>Active until 31-Dec-2026</strong></div>
            </div>
          </div>

          {/* Departmental HQ */}
          <div style={{ fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <MapPin size={16} style={{ color: '#64748B', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Headquarters Address:</strong><br />
              {proposingOfficer.officeAddress}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
