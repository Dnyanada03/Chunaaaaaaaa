import React, { useState } from 'react';
import {
  FileCheck, CheckCircle2, XCircle, RotateCcw, Clock, FileText, ShieldCheck,
  Send, AlertTriangle, Eye, Download, ChevronRight, Lock, Play, X, Map,
  Building, Calendar, Users, ArrowRight, Layers, AlertCircle
} from 'lucide-react';
import { statePendingApprovals, stateSiaReports } from '../../data/stateMockData';
import { stateOfficerProfile } from '../../data/stateMockData';
import StatusBadge from '../common/StatusBadge';

export default function StateApprovalsView() {
  const [activeApprovalTab, setActiveApprovalTab] = useState('project-approval');
  const [selectedApprovalId, setSelectedApprovalId] = useState(statePendingApprovals[0]?.id);
  const [selectedSiaId, setSelectedSiaId] = useState(stateSiaReports[0]?.id);

  // Decision Modal
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [selectedActionType, setSelectedActionType] = useState(null);
  const [decisionRemarks, setDecisionRemarks] = useState('');
  const [conditionalTerms, setConditionalTerms] = useState('');
  const [pin, setPin] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [decisionSuccess, setDecisionSuccess] = useState(null);

  // SIA Start Modal
  const [isSiaStartModal, setIsSiaStartModal] = useState(false);
  const [siaTeam, setSiaTeam] = useState([
    { officer: '', department: '', designation: '', role: '', organization: '', status: 'Active' }
  ]);

  const approval = statePendingApprovals.find(a => a.id === selectedApprovalId) || statePendingApprovals[0];
  const siaReport = stateSiaReports.find(s => s.id === selectedSiaId) || stateSiaReports[0];

  const handleOpenDecision = (actionType) => {
    setSelectedActionType(actionType);
    setDecisionRemarks('');
    setConditionalTerms('');
    setPin('');
    setDecisionSuccess(null);
    setIsDecisionModalOpen(true);
  };

  const handleSubmitDecision = (e) => {
    e.preventDefault();
    if (pin.length < 4) return;
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      const labels = {
        'start-sia': 'SIA Initiated',
        'approve': 'Approved',
        'reject': 'Rejected',
        'return': 'Returned for Correction',
        'conditional': 'Conditionally Approved',
        'sia-approve': 'SIA Approved',
        'sia-reject': 'SIA Rejected',
        'sia-return': 'SIA Returned for Correction'
      };
      setDecisionSuccess({
        label: labels[selectedActionType] || 'Decision Recorded',
        timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }) + ' IST'
      });
    }, 1200);
  };

  const approvalTabs = [
    { id: 'project-approval', label: 'Project Approval', badge: statePendingApprovals.length },
    { id: 'sia-review', label: 'SIA Review', badge: stateSiaReports.length }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>STATE PROJECT APPROVALS & SIA REVIEW</h1>
          <p>Review project proposals, SIA reports, and execute statutory decisions</p>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div style={{ display: 'flex', gap: '2px', background: '#F1F5F9', borderRadius: '10px', padding: '4px', width: 'fit-content' }}>
        {approvalTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveApprovalTab(tab.id)}
            style={{
              padding: '8px 18px',
              border: 'none',
              borderRadius: '8px',
              background: activeApprovalTab === tab.id ? '#0B4726' : 'transparent',
              color: activeApprovalTab === tab.id ? '#FFFFFF' : '#475569',
              fontSize: '12.5px',
              fontWeight: activeApprovalTab === tab.id ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {tab.label}
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              padding: '1px 6px',
              borderRadius: '8px',
              background: activeApprovalTab === tab.id ? 'rgba(255,255,255,0.25)' : 'rgba(197, 34, 31, 0.1)',
              color: activeApprovalTab === tab.id ? '#FFF' : '#C5221F'
            }}>
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* ============ PROJECT APPROVAL TAB ============ */}
      {activeApprovalTab === 'project-approval' && approval && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Proposal Selector */}
          {statePendingApprovals.length > 1 && (
            <div className="card" style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B7280', marginBottom: '8px' }}>
                Select Proposal
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {statePendingApprovals.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedApprovalId(a.id)}
                    className={`btn btn-sm ${selectedApprovalId === a.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '11.5px' }}
                  >
                    {a.projectName.length > 40 ? a.projectName.substring(0, 40) + '...' : a.projectName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Proposal Information */}
          <div className="card">
            <div className="card-header">
              <span className="card-title"><FileText size={15} /> Project Report / Proposal Information</span>
              <StatusBadge status={approval.status} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
              <InfoRow label="Sector" value={approval.sector} />
              <InfoRow label="Applicable Law" value={approval.applicableLaw} />
              <InfoRow label="Requiring Body" value={approval.proposingBody} />
              <InfoRow label="Head / Officer" value={approval.headName} />
              <InfoRow label="Purpose" value={approval.purpose} />
              <InfoRow label="District" value={approval.district} />
              <InfoRow label="Talukas" value={approval.talukas.join(', ')} />
              <InfoRow label="Villages" value={approval.villages.join(', ')} />
              <InfoRow label="Land Required" value={`${approval.landRequiredHa} Ha`} />
              <InfoRow label="Estimated Budget" value={approval.estimatedBudget} />
              <InfoRow label="Timeline" value={approval.timeline} />
              <InfoRow label="Urgency" value={approval.urgencyLevel} />
              <InfoRow label="Affected Landowners" value={approval.affectedLandowners?.toLocaleString()} />
              <InfoRow label="Submission Date" value={approval.submissionTimestamp} />
            </div>
          </div>

          {/* Boundary Discrepancies */}
          {approval.boundaryDiscrepancies?.length > 0 && (
            <div className="card">
              <div className="card-header">
                <span className="card-title"><AlertTriangle size={15} style={{ color: '#D97706' }} /> GIS Boundary Discrepancies</span>
              </div>
              {approval.boundaryDiscrepancies.map((bd, i) => (
                <div key={i} style={{ padding: '10px 14px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', marginBottom: i < approval.boundaryDiscrepancies.length - 1 ? '8px' : '0' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#92400E' }}>{bd.type} — {bd.parcel}</div>
                  <div style={{ fontSize: '12px', color: '#78350F', marginTop: '2px' }}>{bd.details}</div>
                </div>
              ))}
            </div>
          )}

          {/* Documents */}
          {approval.documents?.length > 0 && (
            <div className="card">
              <div className="card-header">
                <span className="card-title"><FileText size={15} /> Proposal Documents</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {approval.documents.map((doc, i) => (
                  <div key={i} style={{ padding: '12px 14px', background: '#FAFAF9', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{doc.name}</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>
                          Version {doc.version} · {doc.department} · {doc.uploadedBy}
                        </div>
                        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#9CA3AF', marginTop: '2px' }}>
                          {doc.timestamp}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <StatusBadge status={doc.verificationStatus} />
                        {doc.signatureStatus === 'Digitally Signed' && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', color: '#1E7E34', background: '#E6F4EA', padding: '2px 7px', borderRadius: '6px' }}>
                            <ShieldCheck size={10} /> Signed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decision Actions */}
          <div className="card" style={{ borderLeft: '4px solid #0B4726' }}>
            <div className="card-header">
              <span className="card-title"><ShieldCheck size={15} /> State Government Decision</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => { setIsSiaStartModal(true); }}>
                <Play size={14} /> Start SIA
              </button>
              <button className="btn btn-secondary" onClick={() => handleOpenDecision('return')}>
                <RotateCcw size={14} /> Return for Correction
              </button>
              <button className="btn btn-outline-danger" onClick={() => handleOpenDecision('reject')}>
                <XCircle size={14} /> Reject
              </button>
              <button className="btn btn-secondary" style={{ borderColor: '#8B5CF6', color: '#8B5CF6' }} onClick={() => handleOpenDecision('conditional')}>
                <FileCheck size={14} /> Conditional Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ SIA REVIEW TAB ============ */}
      {activeApprovalTab === 'sia-review' && siaReport && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SIA Selector */}
          {stateSiaReports.length > 1 && (
            <div className="card" style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B7280', marginBottom: '8px' }}>
                Select SIA Report
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {stateSiaReports.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSiaId(s.id)}
                    className={`btn btn-sm ${selectedSiaId === s.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '11.5px' }}
                  >
                    {s.projectName.length > 40 ? s.projectName.substring(0, 40) + '...' : s.projectName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SIA Report Details */}
          <div className="card">
            <div className="card-header">
              <span className="card-title"><FileText size={15} /> SIA Report — {siaReport.projectName}</span>
              <StatusBadge status={siaReport.status} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
              <InfoRow label="SIA Agency" value={siaReport.agency} />
              <InfoRow label="Submission Date" value={siaReport.submissionTimestamp} />
              <InfoRow label="Villages Covered" value={siaReport.villagesCovered.join(', ')} />
              <InfoRow label="Affected Families" value={siaReport.totalAffectedFamilies} />
              <InfoRow label="Displaced Families" value={siaReport.displacedFamilies} />
              <InfoRow label="Affected Landowners" value={siaReport.affectedLandowners} />
              <InfoRow label="Affected Area" value={siaReport.affectedArea} />
              <InfoRow label="Risk Rating" value={siaReport.riskRating} />
            </div>
          </div>

          {/* SIA Assessment Sections */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Assessment Summary</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <AssessmentSection title="Livelihood Impact" content={siaReport.livelihoodImpact} />
              <AssessmentSection title="Environmental Impact" content={siaReport.environmentalImpact} />
              <AssessmentSection title="Major Social Concerns" content={siaReport.majorSocialConcerns} />
              <AssessmentSection title="Expert Appraisal Recommendation" content={siaReport.expertAppraisalRecommendation} />
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>Expert Appraisal Score:</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{siaReport.expertAppraisalScore}</span>
              </div>
            </div>
          </div>

          {/* SIA Documents */}
          {siaReport.documents?.length > 0 && (
            <div className="card">
              <div className="card-header">
                <span className="card-title"><FileText size={15} /> SIA Documents</span>
              </div>
              {siaReport.documents.map((doc, i) => (
                <div key={i} style={{ padding: '10px 14px', background: '#FAFAF9', border: '1px solid #E2E8F0', borderRadius: '10px', marginBottom: i < siaReport.documents.length - 1 ? '8px' : '0' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{doc.name}</div>
                  <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>
                    Version {doc.version} · {doc.department} · {doc.uploadedBy}
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#9CA3AF', marginTop: '2px' }}>
                    {doc.timestamp}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SIA Decision Actions */}
          <div className="card" style={{ borderLeft: '4px solid #0B4726' }}>
            <div className="card-header">
              <span className="card-title"><ShieldCheck size={15} /> SIA Decision</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => handleOpenDecision('sia-approve')}>
                <CheckCircle2 size={14} /> Approve SIA
              </button>
              <button className="btn btn-outline-danger" onClick={() => handleOpenDecision('sia-reject')}>
                <XCircle size={14} /> Reject SIA
              </button>
              <button className="btn btn-secondary" onClick={() => handleOpenDecision('sia-return')}>
                <RotateCcw size={14} /> Return for Correction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ DECISION CONFIRMATION MODAL ============ */}
      {isDecisionModalOpen && (
        <div className="modal-overlay" onClick={() => !isSigning && setIsDecisionModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '560px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} style={{ color: '#89E9AE' }} />
                <span className="modal-title">
                  {decisionSuccess ? 'Decision Recorded' : 'Confirm Official Decision'}
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsDecisionModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {decisionSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                  <CheckCircle2 size={48} style={{ color: '#166534', marginBottom: '14px' }} />
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
                    {decisionSuccess.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>Decision Successfully Recorded</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1E7E34', background: '#E6F4EA', padding: '4px 10px', borderRadius: '6px' }}>
                    <ShieldCheck size={12} /> Digitally Signed
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6B7280', marginTop: '6px' }}>
                    {decisionSuccess.timestamp}
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', marginTop: '8px' }}>
                    Signed by: <strong>{stateOfficerProfile.name}</strong>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitDecision}>
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#0B4726', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Action
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                      {selectedActionType === 'start-sia' && 'Start Social Impact Assessment'}
                      {selectedActionType === 'approve' && 'Approve Project'}
                      {selectedActionType === 'reject' && 'Reject Project'}
                      {selectedActionType === 'return' && 'Return for Correction'}
                      {selectedActionType === 'conditional' && 'Conditional Approval'}
                      {selectedActionType === 'sia-approve' && 'Approve SIA Report'}
                      {selectedActionType === 'sia-reject' && 'Reject SIA Report'}
                      {selectedActionType === 'sia-return' && 'Return SIA for Correction'}
                    </div>
                  </div>

                  {(selectedActionType === 'return' || selectedActionType === 'sia-return') && (
                    <div className="form-group">
                      <label className="form-label">Reason for Correction</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={decisionRemarks}
                        onChange={e => setDecisionRemarks(e.target.value)}
                        placeholder="Specify the corrections required..."
                      />
                    </div>
                  )}

                  {(selectedActionType === 'reject' || selectedActionType === 'sia-reject') && (
                    <div className="form-group">
                      <label className="form-label">Rejection Reason</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={decisionRemarks}
                        onChange={e => setDecisionRemarks(e.target.value)}
                        placeholder="Specify grounds for rejection..."
                        required
                      />
                    </div>
                  )}

                  {selectedActionType === 'conditional' && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Conditions</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={conditionalTerms}
                          onChange={e => setConditionalTerms(e.target.value)}
                          placeholder="Specify conditions for approval..."
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label className="form-label">Additional Remarks</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={selectedActionType !== 'return' && selectedActionType !== 'reject' && selectedActionType !== 'sia-return' && selectedActionType !== 'sia-reject' ? decisionRemarks : undefined}
                      onChange={selectedActionType !== 'return' && selectedActionType !== 'reject' && selectedActionType !== 'sia-return' && selectedActionType !== 'sia-reject' ? (e => setDecisionRemarks(e.target.value)) : undefined}
                      defaultValue={decisionRemarks}
                      placeholder="Optional remarks..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Digital Signature — Security PIN</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter 4 or 6 digit PIN"
                        value={pin}
                        onChange={e => setPin(e.target.value)}
                        maxLength={6}
                        required
                      />
                      <Lock size={16} style={{ position: 'absolute', right: '12px', top: '10px', color: '#64748B' }} />
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                      This action creates a legally binding digitally signed government record under the IT Act 2000.
                    </div>
                  </div>

                  <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsDecisionModalOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSigning || pin.length < 4}>
                      <ShieldCheck size={14} />
                      {isSigning ? 'Authenticating Signature...' : 'Digitally Sign & Confirm'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============ START SIA MODAL ============ */}
      {isSiaStartModal && (
        <div className="modal-overlay" onClick={() => setIsSiaStartModal(false)}>
          <div className="modal-container" style={{ maxWidth: '620px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={18} style={{ color: '#89E9AE' }} />
                <span className="modal-title">Start Social Impact Assessment</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsSiaStartModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                  {approval.projectName}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                  {approval.proposingBody} · {approval.district} District
                </div>
              </div>

              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#4B5563', marginBottom: '10px' }}>
                Recommended SIA Team
              </div>

              {siaTeam.map((member, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px', padding: '12px', background: '#FAFAF9', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Officer / Person</label>
                    <input className="form-control" placeholder="Name" value={member.officer} onChange={e => { const t = [...siaTeam]; t[idx].officer = e.target.value; setSiaTeam(t); }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Department</label>
                    <input className="form-control" placeholder="Department" value={member.department} onChange={e => { const t = [...siaTeam]; t[idx].department = e.target.value; setSiaTeam(t); }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Designation</label>
                    <input className="form-control" placeholder="Designation" value={member.designation} onChange={e => { const t = [...siaTeam]; t[idx].designation = e.target.value; setSiaTeam(t); }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Role</label>
                    <input className="form-control" placeholder="Team role" value={member.role} onChange={e => { const t = [...siaTeam]; t[idx].role = e.target.value; setSiaTeam(t); }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Organization</label>
                    <input className="form-control" placeholder="Organization" value={member.organization} onChange={e => { const t = [...siaTeam]; t[idx].organization = e.target.value; setSiaTeam(t); }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Status</label>
                    <select className="form-select" value={member.status} onChange={e => { const t = [...siaTeam]; t[idx].status = e.target.value; setSiaTeam(t); }}>
                      <option>Active</option>
                      <option>Proposed</option>
                    </select>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => setSiaTeam([...siaTeam, { officer: '', department: '', designation: '', role: '', organization: '', status: 'Active' }])}
                style={{ marginBottom: '14px' }}
              >
                + Add Team Member
              </button>

              <div className="modal-footer" style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsSiaStartModal(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setIsSiaStartModal(false);
                    handleOpenDecision('start-sia');
                  }}
                >
                  <ShieldCheck size={14} /> Digitally Sign & Initiate SIA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ padding: '10px 14px', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: '8px' }}>
      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B7280', minWidth: '130px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
        {label}
      </span>
      <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{value}</span>
    </div>
  );
}

function AssessmentSection({ title, content }) {
  return (
    <div>
      <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '4px' }}>
        {title}
      </div>
      <div style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
        {content}
      </div>
    </div>
  );
}
