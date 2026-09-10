import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { ShieldCheck, Lock, CheckCircle2, X, AlertCircle } from 'lucide-react';

const DigitalSignModal = () => {
  const {
    isDigitalSignOpen,
    setIsDigitalSignOpen,
    digitalSignTarget,
    officerProfile,
    handleApproveCompensation,
    handleIssueNotice,
    handleApproveFinalMutation
  } = useSwadesh();

  const [pin, setPin] = useState('');
  const [tokenType, setTokenType] = useState('USB Hardware Dongle e-Token (Class-3)');
  const [isSigning, setIsSigning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isDigitalSignOpen || !digitalSignTarget) return null;

  const { type, item } = digitalSignTarget;

  const handleConfirmSignature = (e) => {
    e.preventDefault();
    if (pin.length < 4) {
      setError('Please enter your valid 4-digit Security Token PIN.');
      return;
    }

    setError('');
    setIsSigning(true);

    setTimeout(() => {
      setIsSigning(false);
      setSuccess(true);

      const signCert = `DS-MH-REV-2026-${Math.floor(100000 + Math.random() * 900000)}`;

      if (type === 'compensation') {
        handleApproveCompensation(item.id);
      } else if (type === 'notice') {
        handleIssueNotice(item.id);
      } else if (type === 'mutation') {
        handleApproveFinalMutation(item.id, signCert);
      }

      setTimeout(() => {
        setSuccess(false);
        setIsDigitalSignOpen(false);
        setPin('');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsDigitalSignOpen(false)}>
      <div
        className="modal-container"
        style={{ maxWidth: '540px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} style={{ color: '#89E9AE' }} />
            <span className="modal-title">Authorized Digital Signature Sign-Off</span>
          </div>
          <button className="modal-close-btn" onClick={() => setIsDigitalSignOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {success ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <CheckCircle2 size={54} style={{ color: '#166534', marginBottom: '16px' }} />
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#166534' }}>
                Digital Signature Applied Successfully!
              </div>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>
                Signed by: <strong>{officerProfile.name}</strong> ({officerProfile.role})<br />
                Timestamp: {new Date().toLocaleString()}
              </p>
            </div>
          ) : (
            <form onSubmit={handleConfirmSignature}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#005A36', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Target Approval Details
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
                  {type === 'compensation' && `Compensation Approval: ${item.landowner} (${item.id})`}
                  {type === 'notice' && `Statutory Notice Issuance: ${item.landowner} (${item.id})`}
                  {type === 'mutation' && `Final Land Mutation Approval: ${item.landowner} (${item.id})`}
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                  Project: {item.projectName || item.projectId} • Village: {item.village} • Survey No: {item.surveyNumber}
                </div>
                {item.totalCompensation && (
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E40AF', marginTop: '6px' }}>
                    Total Approved Amount: ₹ {item.totalCompensation.toLocaleString('en-IN')}
                  </div>
                )}
              </div>

              {error && (
                <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Digital Signature Token Type</label>
                <select
                  className="form-select"
                  value={tokenType}
                  onChange={e => setTokenType(e.target.value)}
                >
                  <option>USB Hardware Dongle e-Token (Class-3 National PKI)</option>
                  <option>MahaGov e-Sign Aadhaar Gateway</option>
                  <option>Government Department Certificate Store (.pfx)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Tahsildar Security PIN / Token Passcode</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter 4 or 6 digit PIN (e.g. 8842)"
                    value={pin}
                    onChange={e => setPin(e.target.value)}
                    maxLength={6}
                  />
                  <Lock size={16} style={{ position: 'absolute', right: '12px', top: '10px', color: '#64748B' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  Digitally signing records creates a legally binding government approval timestamp in accordance with the IT Act 2000.
                </div>
              </div>

              <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsDigitalSignOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSigning}
                >
                  {isSigning ? "Authenticating Signature..." : "Digitally Sign & Approve"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalSignModal;
