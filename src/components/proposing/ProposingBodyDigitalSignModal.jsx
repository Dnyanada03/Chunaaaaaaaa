import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, X, AlertCircle, FileText, Calendar, Building2, User } from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';

export default function ProposingBodyDigitalSignModal({
  isOpen,
  onClose,
  projectData,
  onSigningComplete,
  title = "PROJECT CREATION — DIGITAL SIGNATURE",
  actionLabel = "DIGITALLY SIGN & CREATE PROJECT"
}) {
  const { proposingOfficer, getExactTimestamp } = useSwadesh();
  const [pin, setPin] = useState('');
  const [tokenType, setTokenType] = useState('USB Hardware Token (Class-3 e-Token)');
  const [isSigning, setIsSigning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !projectData) return null;

  const currentTimestamp = getExactTimestamp();

  const handleSignSubmit = (e) => {
    e.preventDefault();
    if (pin.length < 4) {
      setError('Please enter your 4-digit Security Token PIN.');
      return;
    }

    setError('');
    setIsSigning(true);

    setTimeout(() => {
      setIsSigning(false);
      setSuccess(true);

      const signCert = {
        certSerial: `DS-MH-MAHARAIL-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        signer: proposingOfficer.name,
        authority: proposingOfficer.authority,
        timestamp: currentTimestamp,
        verified: true
      };

      setTimeout(() => {
        setSuccess(false);
        setPin('');
        onSigningComplete(signCert);
      }, 1200);
    }, 1300);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '580px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} style={{ color: '#89E9AE' }} />
            <span className="modal-title">{title}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} disabled={isSigning}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {success ? (
            <div style={{ textAlign: 'center', padding: '32px 10px' }}>
              <CheckCircle2 size={56} style={{ color: '#008E4F', marginBottom: '16px' }} />
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#008E4F', fontFamily: 'var(--font-serif)' }}>
                Digitally Signed & Validated!
              </div>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '8px' }}>
                Officer: <strong>{proposingOfficer.name}</strong><br />
                {proposingOfficer.authority}<br />
                Timestamp: <strong>{currentTimestamp}</strong><br />
                <span className="mono-code" style={{ fontSize: '11px', color: '#005A36' }}>
                  DSC Hash: SHA256-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                </span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignSubmit}>
              {/* Project Review Summary Box */}
              <div style={{
                background: '#F8FAFC',
                border: '1.5px solid #CBD5E1',
                borderRadius: '10px',
                padding: '14px 16px',
                marginBottom: '18px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#005A36', textTransform: 'uppercase', marginBottom: '8px' }}>
                  PROJECT SPECIFICATIONS FOR STATUTORY SIGN-OFF
                </div>

                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  {projectData.name}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#475569', marginTop: '8px' }}>
                  <div><strong>Authority:</strong> {projectData.authority || proposingOfficer.authority}</div>
                  <div><strong>Proposing Officer:</strong> {proposingOfficer.name}</div>
                  <div><strong>District:</strong> {projectData.district || 'Statewide'}</div>
                  <div><strong>Total Land:</strong> {projectData.landRequiredHa || '0'} Ha</div>
                  <div><strong>Estimated Cost:</strong> {projectData.estimatedBudget || '₹ 0.00 Cr'}</div>
                  <div><strong>Financial Year:</strong> {projectData.financialYear || '2026–27'}</div>
                </div>

                <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #E2E8F0', fontSize: '11.5px', color: '#64748B' }}>
                  Exact Timestamp: <strong style={{ color: '#0F172A' }}>{currentTimestamp}</strong>
                </div>
              </div>

              {error && (
                <div style={{
                  background: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              {/* Certificate Verification Box */}
              <div className="form-group">
                <label className="form-label">Digital Certificate Profile</label>
                <div style={{
                  background: '#F0FDF4',
                  border: '1px solid #86EFAC',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <strong>{proposingOfficer.name}</strong> ({proposingOfficer.certSerial})<br />
                    Issuer: {proposingOfficer.signCertIssuer} • Class-3 Active
                  </div>
                  <span className="badge badge-green" style={{ fontSize: '10px' }}>DSC Ready</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Security Token Interface</label>
                <select className="form-select" value={tokenType} onChange={e => setTokenType(e.target.value)}>
                  <option>USB Hardware Token (Class-3 e-Token)</option>
                  <option>NIC Government PKI e-Sign Smartcard</option>
                  <option>e-Mudhra Central Aadhaar e-Sign XML</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Hardware Token PIN / DSC Passphrase</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter 4-digit PIN (Default: 1234)"
                    value={pin}
                    onChange={e => setPin(e.target.value)}
                    style={{ paddingLeft: '34px', letterSpacing: '2px', fontWeight: 700 }}
                    maxLength={8}
                    required
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>

              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '18px', lineHeight: 1.5 }}>
                Under Section 3A of the Information Technology Act 2000, your electronic signature will be irrevocably linked to this record and audit trail. If cancelled, the project will remain saved as an unsigned <strong>Draft</strong>.
              </div>

              <div className="modal-footer" style={{ padding: 0 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={isSigning}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSigning}
                  style={{
                    background: 'linear-gradient(135deg, #008E4F 0%, #006638 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700
                  }}
                >
                  <ShieldCheck size={16} />
                  {isSigning ? 'Verifying Token...' : actionLabel}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
