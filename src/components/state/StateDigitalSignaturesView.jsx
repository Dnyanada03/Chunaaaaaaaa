import React, { useState } from 'react';
import { PenTool, ShieldCheck, Lock, CheckCircle2, X, Clock, FileCheck, Eye, ChevronRight } from 'lucide-react';
import { stateDigitalSignatureQueue, stateOfficerProfile } from '../../data/stateMockData';

export default function StateDigitalSignaturesView({ onNavigate }) {
  const [signModal, setSignModal] = useState(null);
  const [pin, setPin] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [signedItems, setSignedItems] = useState([]);

  const handleSign = (e) => {
    e.preventDefault();
    if (pin.length < 4) return;
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setSignedItems(prev => [...prev, signModal.id]);
      setTimeout(() => {
        setSignModal(null);
        setPin('');
      }, 1500);
    }, 1200);
  };

  const pendingItems = stateDigitalSignatureQueue.filter(s => !signedItems.includes(s.id));
  const completedItems = stateDigitalSignatureQueue.filter(s => signedItems.includes(s.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DIGITAL SIGNATURE CENTER</h1>
          <p>Pending official actions requiring your digital signature</p>
        </div>
      </div>

      {/* Pending Signatures */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <PenTool size={15} style={{ color: '#D97706' }} /> Pending Your Signature
          </span>
          <span className="badge badge-orange"><span className="badge-dot"></span>{pendingItems.length} pending</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {pendingItems.map(item => (
            <div key={item.id} style={{
              padding: '14px 16px', background: '#FAFAF9', border: '1px solid #E2E8F0',
              borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span className="badge badge-blue" style={{ fontSize: '10px' }}>
                    <span className="badge-dot"></span>
                    {item.type}
                  </span>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#111827' }}>{item.projectName}</div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                  {item.department} · Submitted by {item.submittedBy}
                </div>
                <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: '#9CA3AF', marginTop: '3px' }}>
                  {item.submissionTimestamp}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => onNavigate && onNavigate('project-detail', item.projectId)}
                  style={{ fontSize: '10.5px' }}
                >
                  <Eye size={11} /> Review
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setSignModal(item)}
                  style={{ fontSize: '10.5px' }}
                >
                  <ShieldCheck size={11} /> Sign
                </button>
              </div>
            </div>
          ))}
          {pendingItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px', color: '#6B7280' }}>
              <CheckCircle2 size={24} style={{ color: '#1E7E34', marginBottom: '8px' }} />
              <div style={{ fontSize: '13px', fontWeight: 600 }}>No pending signatures</div>
            </div>
          )}
        </div>
      </div>

      {/* Completed Signatures */}
      {completedItems.length > 0 && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <CheckCircle2 size={15} style={{ color: '#1E7E34' }} /> Recently Signed
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {completedItems.map(item => (
              <div key={item.id} style={{ padding: '10px 14px', background: '#E6F4EA', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#166534' }}>{item.projectName}</div>
                  <div style={{ fontSize: '11px', color: '#1E7E34' }}>{item.type} — Digitally Signed</div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#1E7E34' }}>
                  <ShieldCheck size={12} /> Signed
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sign Modal */}
      {signModal && (
        <div className="modal-overlay" onClick={() => !isSigning && setSignModal(null)}>
          <div className="modal-container" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} style={{ color: '#89E9AE' }} />
                <span className="modal-title">Digital Signature Sign-Off</span>
              </div>
              <button className="modal-close-btn" onClick={() => setSignModal(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {signedItems.includes(signModal.id) ? (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <CheckCircle2 size={48} style={{ color: '#166534', marginBottom: '14px' }} />
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#166534' }}>Digital Signature Applied</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
                    Signed by: <strong>{stateOfficerProfile.name}</strong>
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6B7280', marginTop: '4px' }}>
                    {new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })} IST
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSign}>
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#0B4726', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {signModal.type}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{signModal.projectName}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                      {signModal.department} · {signModal.submittedBy}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Security PIN / Token Passcode</label>
                    <div style={{ position: 'relative' }}>
                      <input type="password" className="form-control" placeholder="Enter 4 or 6 digit PIN" value={pin} onChange={e => setPin(e.target.value)} maxLength={6} required />
                      <Lock size={16} style={{ position: 'absolute', right: '12px', top: '10px', color: '#64748B' }} />
                    </div>
                  </div>

                  <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setSignModal(null)}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={isSigning || pin.length < 4}>
                      <ShieldCheck size={14} />
                      {isSigning ? 'Authenticating...' : 'Digitally Sign & Confirm'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
