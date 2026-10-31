import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, X, AlertCircle, FileText, Send, Building2, MapPin } from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';

export default function ProposingBodyProposalFinalSubmitModal({
  isOpen,
  onClose,
  proposal,
  parentProject,
  analysisSummary,
  onSubmissionSuccess
}) {
  const { proposingOfficer, handleCreateProposingProposal, getExactTimestamp } = useSwadesh();
  const [pin, setPin] = useState('');
  const [tokenType, setTokenType] = useState('USB Hardware Token (Class-3 e-Token)');
  const [isSigning, setIsSigning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !proposal) return null;

  const currentTimestamp = getExactTimestamp();

  const handleFinalSubmit = (e) => {
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

      const signCert = {
        certSerial: `DS-MH-PROP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        signer: proposingOfficer.name,
        timestamp: currentTimestamp
      };

      // Submit proposal via context handler
      handleCreateProposingProposal({
        ...proposal,
        status: 'Submitted',
        submissionStage: 'Under Review by State Cabinet',
        signCert
      }, 'submit');

      setTimeout(() => {
        setSuccess(false);
        setPin('');
        onSubmissionSuccess();
      }, 1200);
    }, 1300);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} style={{ color: '#89E9AE' }} />
            <span className="modal-title">Final Statutory Proposal Submission & Digital Sign-Off</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} disabled={isSigning}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {success ? (
            <div style={{ textAlign: 'center', padding: '36px 10px' }}>
              <CheckCircle2 size={56} style={{ color: '#008E4F', marginBottom: '16px' }} />
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#008E4F', fontFamily: 'var(--font-serif)' }}>
                Proposal Successfully Forwarded to State Government!
              </div>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '8px' }}>
                Proposal: <strong>{proposal.name}</strong> ({proposal.id})<br />
                Forwarded to: <strong>Principal Secretary, Revenue & State Cabinet Ministry</strong><br />
                Timestamp: <strong>{currentTimestamp}</strong><br />
                Status updated to: <span className="badge badge-green">Submitted & Active</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleFinalSubmit}>
              {/* Review Summary Grid */}
              <div style={{
                background: '#F8FAFC',
                border: '1.5px solid #CBD5E1',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '18px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#005A36', textTransform: 'uppercase', marginBottom: '8px' }}>
                  STATUTORY SUBMISSION DOSSIER (SECTION 39)
                </div>

                <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                  {proposal.name}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginBottom: '12px' }}>
                  Variant: <strong>{proposal.variant}</strong> • Parent: {parentProject?.name || proposal.projectId}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#334155' }}>
                  <div><strong>State & District:</strong> Maharashtra • {proposal.district}</div>
                  <div><strong>Villages:</strong> {proposal.village}</div>
                  <div><strong>Total Land Required:</strong> {proposal.totalLandRequiredHa} Ha</div>
                  <div><strong>Estimated Cost:</strong> {proposal.estimatedCost}</div>
                  <div><strong>Advance Deposit:</strong> {proposal.advanceDeposit}</div>
                  <div><strong>Sanction Order No:</strong> <span className="mono-code">{proposal.sanctionNumber}</span></div>
                  <div><strong>Statutory Urgency:</strong> {proposal.isUrgent ? 'YES (Section 40)' : 'NO'}</div>
                  <div><strong>Preliminary Feasibility:</strong> {analysisSummary?.projectFeasibility || 'High'}</div>
                </div>

                <div style={{
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11.5px',
                  color: '#64748B'
                }}>
                  <span>Signing Authority: <strong>{proposingOfficer.name}</strong></span>
                  <span>Submission Timestamp: <strong style={{ color: '#0F172A' }}>{currentTimestamp}</strong></span>
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

              {/* DSC Credentials */}
              <div className="form-group">
                <label className="form-label">Signatory Digital Certificate</label>
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
                    Issuer: {proposingOfficer.signCertIssuer} • Class-3 Active Token
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
                <label className="form-label">Hardware Token PIN / Passphrase</label>
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
                Submitting this proposal will transmit the dossier to the <strong>State Government Cabinet Ministry</strong> and <strong>District Collectorate</strong> review benches.
              </div>

              <div className="modal-footer" style={{ padding: 0 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={isSigning}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSigning}
                  style={{
                    background: 'linear-gradient(135deg, #008E4F 0%, #006638 100%)',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Send size={16} />
                  {isSigning ? 'Signing & Submitting...' : 'DIGITALLY SIGN & SUBMIT TO STATE'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
