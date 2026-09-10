import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Map,
  Layers,
  FileText,
  Sparkles,
  Download,
  Eye,
  ShieldCheck,
  Send,
  AlertTriangle,
  FileSpreadsheet,
  Zap,
  Building,
  Sliders
} from 'lucide-react';
import {
  collectorPendingProjectProposals,
  collectorSiaReports,
  collectorEgazetteDrafts
} from '../../data/collectorMockData';
import ViewProposalModal from './ViewProposalModal';

export default function CollectorApprovalsView() {
  const [activeApprovalTab, setActiveApprovalTab] = useState('project-approval'); // 'project-approval', 'sia-approval', 'state-dispute'
  
  // Selected Proposal State
  const [selectedProposalId, setSelectedProposalId] = useState(collectorPendingProjectProposals[0].id);
  const proposal = collectorPendingProjectProposals.find(p => p.id === selectedProposalId) || collectorPendingProjectProposals[0];
  const [isViewProposalModalOpen, setIsViewProposalModalOpen] = useState(false);

  // Map Comparison State
  const [mapComparisonMode, setMapComparisonMode] = useState('side-by-side'); // 'side-by-side' or 'overlay'
  const [transparency, setTransparency] = useState(50); // 0 to 100 for overlay

  // Decision Modal State
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [selectedActionType, setSelectedActionType] = useState(null); // 'approve', 'reject', 'return', 'conditional'
  const [decisionRemarks, setDecisionRemarks] = useState('');
  const [conditionalTerms, setConditionalTerms] = useState('');
  const [decisionSuccessTimeline, setDecisionSuccessTimeline] = useState(null);

  // SIA Review State
  const [selectedSiaId, setSelectedSiaId] = useState(collectorSiaReports[0].id);
  const siaReport = collectorSiaReports.find(s => s.id === selectedSiaId) || collectorSiaReports[0];

  // E-Gazette Form & Modal State
  const [isGazetteFormOpen, setIsGazetteFormOpen] = useState(false);
  const [isGazettePreviewOpen, setIsGazettePreviewOpen] = useState(false);
  const [gazetteFormData, setGazetteFormData] = useState(collectorEgazetteDrafts[0]);

  // Open Decision Modal Handler
  const handleOpenDecisionModal = (actionType) => {
    setSelectedActionType(actionType);
    setDecisionRemarks('');
    setConditionalTerms(actionType === 'conditional' ? 'Subject to Kumbh Mela 2027 emergency access timelines & submission of environmental mitigation plan within 60 days.' : '');
    setIsDecisionModalOpen(true);
  };

  // Submit Collector Approval Action
  const handleSubmitDecision = () => {
    setIsDecisionModalOpen(false);
    
    // Set workflow timeline result
    let statusLabel = 'Approved';
    let statusBadgeColor = 'badge-green';
    if (selectedActionType === 'reject') {
      statusLabel = 'Rejected (Land Permanently Barred)';
      statusBadgeColor = 'badge-red';
    } else if (selectedActionType === 'return') {
      statusLabel = 'Returned for Correction';
      statusBadgeColor = 'badge-orange';
    } else if (selectedActionType === 'conditional') {
      statusLabel = 'Conditionally Approved';
      statusBadgeColor = 'badge-purple';
    }

    setDecisionSuccessTimeline({
      action: selectedActionType,
      statusLabel,
      statusBadgeColor,
      timestamp: new Date().toLocaleString(),
      remarks: decisionRemarks,
      conditions: conditionalTerms
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Masthead */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DISTRICT COLLECTORATE APPROVALS & E-GAZETTE PORTAL</h1>
          <p>Statutory Project Approvals, SIA Reports Verification & Preliminary Gazette Notifications</p>
        </div>
        <div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsGazetteFormOpen(true)}
            style={{ background: '#6afc96ff', color: '#000', fontWeight: 800 }}
          >
            <Send size={14} /> Release Preliminary Notification (E-Gazette)
          </button>
        </div>
      </div>

      {/* PRIMARY TAB NAVIGATION */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #CBD5E1', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveApprovalTab('project-approval')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px 8px 0 0',
            border: activeApprovalTab === 'project-approval' ? '2px solid #0B4726' : '1px solid #CBD5E1',
            borderBottom: activeApprovalTab === 'project-approval' ? '3px solid #0B4726' : 'none',
            background: activeApprovalTab === 'project-approval' ? '#FFFFFF' : '#F1F5F9',
            color: activeApprovalTab === 'project-approval' ? '#0B4726' : '#475569',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Building size={16} /> 1. Project Approval (2 Pending)
        </button>

        <button
          onClick={() => setActiveApprovalTab('sia-approval')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px 8px 0 0',
            border: activeApprovalTab === 'sia-approval' ? '2px solid #0B4726' : '1px solid #CBD5E1',
            borderBottom: activeApprovalTab === 'sia-approval' ? '3px solid #0B4726' : 'none',
            background: activeApprovalTab === 'sia-approval' ? '#FFFFFF' : '#F1F5F9',
            color: activeApprovalTab === 'sia-approval' ? '#0B4726' : '#475569',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={16} /> 2. SIA Approval & AI Extraction (2 Reports)
        </button>

        <button
          onClick={() => setActiveApprovalTab('state-dispute')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px 8px 0 0',
            border: activeApprovalTab === 'state-dispute' ? '2px solid #0B4726' : '1px solid #CBD5E1',
            borderBottom: activeApprovalTab === 'state-dispute' ? '3px solid #0B4726' : 'none',
            background: activeApprovalTab === 'state-dispute' ? '#FFFFFF' : '#F1F5F9',
            color: activeApprovalTab === 'state-dispute' ? '#0B4726' : '#475569',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <AlertTriangle size={16} /> 3. State Dispute (Future Module)
        </button>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: PROJECT APPROVAL */}
      {/* =================================================================== */}
      {activeApprovalTab === 'project-approval' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Proposal Selection & Details Header */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <FileCheck size={18} style={{ color: '#0B4726' }} />
                PROPOSING BODY PROJECT PROPOSAL REVIEW
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>Select Proposal:</span>
                <select
                  className="form-select"
                  value={selectedProposalId}
                  onChange={e => {
                    setSelectedProposalId(e.target.value);
                    setDecisionSuccessTimeline(null);
                  }}
                  style={{ fontWeight: 700 }}
                >
                  {collectorPendingProjectProposals.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.proposingBody})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Proposal Specs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                  {proposal.name}
                </h3>
                <div style={{ fontSize: '12px', color: '#475569', marginBottom: '12px' }}>
                  Proposal ID: <span className="mono-code" style={{ color: '#0B4726', fontWeight: 700 }}>{proposal.id}</span> • Proposing Body: <strong>{proposal.proposingBody}</strong> ({proposal.proposingOfficer})
                </div>

                <p style={{ fontSize: '13px', color: '#334155', background: '#F8FAFC', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #0B4726', marginBottom: '14px' }}>
                  <strong>Project Purpose & Scope:</strong> {proposal.purpose}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '12px' }}>
                  <div style={{ background: '#F1F5F9', padding: '8px 12px', borderRadius: '6px' }}>
                    <div style={{ color: '#64748B', fontSize: '10.5px' }}>LAND REQUIRED</div>
                    <div style={{ fontWeight: 800, color: '#0B4726', fontSize: '14px' }}>{proposal.landRequiredHa} Ha</div>
                  </div>
                  <div style={{ background: '#F1F5F9', padding: '8px 12px', borderRadius: '6px' }}>
                    <div style={{ color: '#64748B', fontSize: '10.5px' }}>ESTIMATED BUDGET</div>
                    <div style={{ fontWeight: 800, color: '#1E293B', fontSize: '14px' }}>{proposal.estimatedCost}</div>
                  </div>
                  <div style={{ background: '#F1F5F9', padding: '8px 12px', borderRadius: '6px' }}>
                    <div style={{ color: '#64748B', fontSize: '10.5px' }}>GEOGRAPHIC AREA</div>
                    <div style={{ fontWeight: 700, color: '#1E293B' }}>{proposal.talukaCount} Talukas ({proposal.villageCount} Villages)</div>
                  </div>
                </div>
              </div>

              {/* Proposal Document Link Box */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#0B4726', textTransform: 'uppercase' }}>
                    <FileText size={14} /> Official Proposal Document
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '6px' }}>
                    {proposal.proposalDoc}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                    Submitted on {proposal.submissionDate} • Digitally Signed by CGM Land
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setIsViewProposalModalOpen(true)} style={{ flex: 1, background: '#0B4726', color: '#FFF' }}>
                    <Eye size={13} /> View Proposal Report & 12 Sections
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => setIsViewProposalModalOpen(true)} style={{ flex: 1 }}>
                    <Download size={13} /> Download Dossier
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT MAP COMPARISON (GIS) */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Map size={18} style={{ color: '#0B4726' }} />
                GIS PROJECT BOUNDARY & PARCEL OVERLAY COMPARISON
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '6px', padding: '2px' }}>
                  <button
                    onClick={() => setMapComparisonMode('side-by-side')}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '5px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      border: 'none',
                      background: mapComparisonMode === 'side-by-side' ? '#0B4726' : 'transparent',
                      color: mapComparisonMode === 'side-by-side' ? '#FFF' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Side-by-Side View
                  </button>
                  <button
                    onClick={() => setMapComparisonMode('overlay')}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '5px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      border: 'none',
                      background: mapComparisonMode === 'overlay' ? '#0B4726' : 'transparent',
                      color: mapComparisonMode === 'overlay' ? '#FFF' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Overlay Mode
                  </button>
                </div>

                {mapComparisonMode === 'overlay' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px' }}>
                    <Sliders size={13} /> Transparency:
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={transparency}
                      onChange={e => setTransparency(e.target.value)}
                      style={{ width: '90px' }}
                    />
                    <strong>{transparency}%</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Map Canvas Box */}
            {mapComparisonMode === 'side-by-side' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Proposed Project Map */}
                <div style={{ border: '2px solid #3B82F6', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ background: '#3B82F6', color: '#FFF', padding: '6px 12px', fontSize: '12px', fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}>
                    <span>PROPOSED PROJECT BOUNDARY (Proposing Body)</span>
                    <span style={{ fontSize: '10.5px', opacity: 0.9 }}>MSRDC / Maharail Alignment</span>
                  </div>
                  <img
                    src={proposal.proposedMapUrl}
                    alt="Proposed Project Map"
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.75)', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '10px' }}>
                    🔴 Proposed Alignment Boundary Line
                  </div>
                </div>

                {/* Government / GIS Reference Map */}
                <div style={{ border: '2px solid #059669', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ background: '#059669', color: '#FFF', padding: '6px 12px', fontSize: '12px', fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}>
                    <span>GOVERNMENT OFFICIAL GIS & PARCEL MAP</span>
                    <span style={{ fontSize: '10.5px', opacity: 0.9 }}>State Revenue Land Records</span>
                  </div>
                  <img
                    src={proposal.officialGisMapUrl}
                    alt="Official GIS Map"
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.75)', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '10px' }}>
                    🟢 Verified Cadastral Survey Parcels & Forest Overlay
                  </div>
                </div>
              </div>
            ) : (
              /* Overlay Comparison View */
              <div style={{ border: '2px solid #8B5CF6', borderRadius: '10px', overflow: 'hidden', position: 'relative', height: '320px' }}>
                <div style={{ background: '#8B5CF6', color: '#FFF', padding: '6px 12px', fontSize: '12px', fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}>
                  <span>GIS OVERLAY COMPARISON MODE (Proposed vs Cadastral Database)</span>
                  <span>Slider Transparency: {transparency}%</span>
                </div>
                <div style={{ position: 'relative', width: '100%', height: '280px' }}>
                  <img
                    src={proposal.officialGisMapUrl}
                    alt="Base Map"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <img
                    src={proposal.proposedMapUrl}
                    alt="Overlay Map"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: transparency / 100,
                      mixBlendMode: 'difference'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Discrepancies Alert Panel */}
            <div style={{ marginTop: '14px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', padding: '12px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', marginBottom: '6px' }}>
                <AlertTriangle size={15} /> GIS Boundary Discrepancies Detected by System ({proposal.boundaryDiscrepancies.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {proposal.boundaryDiscrepancies.map((d, i) => (
                  <div key={i} style={{ fontSize: '12px', color: '#78350F', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="mono-code" style={{ background: '#FFF', padding: '1px 6px', borderRadius: '3px', border: '1px solid #FCD34D' }}>{d.parcel}</span>
                    <strong>{d.type}:</strong> {d.details}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROJECT APPROVAL ACTIONS (4 OPTIONS) */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <ShieldCheck size={18} style={{ color: '#0B4726' }} />
                DISTRICT COLLECTOR APPROVAL DECISION PANEL
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: '#475569', marginBottom: '14px' }}>
              Select one of the statutory executive actions for project proposal <strong>{proposal.id}</strong>:
            </p>

            {/* Simple Standard Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => handleOpenDecisionModal('approve')}
                style={{ background: '#1E7E34', border: 'none', gap: '8px', padding: '10px 18px' }}
              >
                <CheckCircle2 size={16} /> Approve Proposal
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleOpenDecisionModal('reject')}
                style={{ gap: '8px', padding: '10px 18px' }}
              >
                <XCircle size={16} /> Reject Proposal
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => handleOpenDecisionModal('return')}
                style={{ background: '#F59E0B', color: '#000', border: 'none', fontWeight: 700, gap: '8px', padding: '10px 18px' }}
              >
                <RotateCcw size={16} /> Return for Correction
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => handleOpenDecisionModal('conditional')}
                style={{ background: '#521fcaff', color: '#ffffffff', border: 'none', fontWeight: 700, gap: '8px', padding: '10px 18px' }}
              >
                <Sparkles size={16} /> Conditional Approval
              </button>
            </div>

            {/* Workflow Result Banner after action taken */}
            {decisionSuccessTimeline && (
              <div style={{ marginTop: '20px', background: '#F8FAFC', border: '1.5px solid #0B4726', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0B4726' }}>DECISION EXECUTED & SIA DISPATCH TIMELINE</span>
                  <span className={`badge ${decisionSuccessTimeline.statusBadgeColor}`}>
                    {decisionSuccessTimeline.statusLabel}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#334155' }}>
                  <Clock size={15} style={{ color: '#0B4726' }} />
                  <span>Decision logged on: <strong>{decisionSuccessTimeline.timestamp}</strong></span>
                </div>

                {decisionSuccessTimeline.conditions && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#5B21B6', background: '#F3E8FF', padding: '8px', borderRadius: '6px' }}>
                    <strong>Specific Conditions:</strong> {decisionSuccessTimeline.conditions}
                  </div>
                )}

                <div style={{ marginTop: '12px', background: '#E6F4EA', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', color: '#1E7E34', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Send size={15} />
                  Notification automatically dispatched to SIA Appointing Authority (TISS / Gokhale Institute Cell) to invoke Social Impact Assessment.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: SIA APPROVAL & AI EXTRACTION */}
      {/* =================================================================== */}
      {activeApprovalTab === 'sia-approval' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* SIA Selection Header */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Sparkles size={18} style={{ color: '#8B5CF6' }} />
                SOCIAL IMPACT ASSESSMENT (SIA) REVIEW & DOCUMENT MANAGEMENT
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600 }}>Select SIA Report:</span>
                <select
                  className="form-select"
                  value={selectedSiaId}
                  onChange={e => setSelectedSiaId(e.target.value)}
                  style={{ fontWeight: 700 }}
                >
                  {collectorSiaReports.map(s => (
                    <option key={s.id} value={s.id}>{s.projectName} ({s.id})</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ fontSize: '12.5px', color: '#475569' }}>
              Agency: <strong>{siaReport.agency}</strong> • Submission Date: {siaReport.submissionDate} • Expert Appraisal Score: <strong style={{ color: '#1E7E34' }}>{siaReport.expertAppraisalScore}</strong>
            </div>
          </div>

          {/* AI INFORMATION EXTRACTION PANEL (HIGHLIGHTED REQUIREMENT) */}
          <div className="card" style={{ border: '2px solid #8B5CF6', background: 'linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)' }}>
            <div className="card-header" style={{ borderBottom: '1px solid #E9D5FF' }}>
              <div className="card-title" style={{ color: '#6B21A8' }}>
                <Sparkles size={18} />
                AI-ASSISTED INFORMATION EXTRACTION (AUTOMATED SIA SUMMARY)
              </div>
              <span className="badge badge-purple">AI Intelligence Engine v3.4</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
                <div style={{ fontSize: '10.5px', color: '#6B21A8', fontWeight: 700 }}>AFFECTED FAMILIES</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1E293B' }}>{siaReport.totalAffectedFamilies}</div>
              </div>

              <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
                <div style={{ fontSize: '10.5px', color: '#6B21A8', fontWeight: 700 }}>AFFECTED LANDOWNERS</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#1E293B' }}>{siaReport.affectedLandowners}</div>
              </div>

              <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
                <div style={{ fontSize: '10.5px', color: '#C5221F', fontWeight: 700 }}>ESTIMATED DISPLACED FAMILIES</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#C5221F' }}>{siaReport.displacedFamilies}</div>
              </div>

              <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E9D5FF' }}>
                <div style={{ fontSize: '10.5px', color: '#6B21A8', fontWeight: 700 }}>RISK RATING</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: siaReport.riskRating.includes('High') ? '#C5221F' : '#D97706' }}>{siaReport.riskRating}</div>
              </div>
            </div>

            {/* Extracted Details Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
              <div style={{ background: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>🌾 Livelihood Impact Analysis</h4>
                <p style={{ color: '#334155' }}>{siaReport.livelihoodImpact}</p>
              </div>

              <div style={{ background: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>🌳 Environmental & Drainage Impact</h4>
                <p style={{ color: '#334155' }}>{siaReport.environmentalImpact}</p>
              </div>
            </div>

            <div style={{ marginTop: '12px', background: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
              <h4 style={{ fontWeight: 800, color: '#C5221F', marginBottom: '4px' }}>⚠️ Major Social Concerns & Objections Identified</h4>
              <pre style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap', color: '#334155' }}>{siaReport.majorSocialConcerns}</pre>
            </div>
          </div>

          {/* DOCUMENT MANAGEMENT SECTION & GRAM PANCHAYAT REPORTS */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <FileText size={18} style={{ color: '#0B4726' }} />
                STRUCTURED SIA DOCUMENT MANAGEMENT & GRAM PANCHAYAT RESOLUTIONS
              </div>
            </div>

            <div className="table-container">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Document Type</th>
                    <th>Related Village</th>
                    <th>Uploaded By</th>
                    <th>Submission Date</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700 }}>{siaReport.siaReportDoc}</td>
                    <td>SIA Comprehensive Report</td>
                    <td>Multi-Village ({siaReport.villagesCovered.join(', ')})</td>
                    <td>{siaReport.agency}</td>
                    <td>{siaReport.submissionDate}</td>
                    <td><span className="badge badge-green">Verified</span></td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="btn btn-secondary btn-sm" style={{ marginRight: '6px' }}><Eye size={12} /> View</button>
                      <button className="btn btn-primary btn-sm"><Download size={12} /> Download</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700 }}>{siaReport.expertAppraisalDoc}</td>
                    <td>Expert Appraisal Committee Report</td>
                    <td>District Level</td>
                    <td>State EAC Committee</td>
                    <td>{siaReport.submissionDate}</td>
                    <td><span className="badge badge-purple">Recommended</span></td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="btn btn-secondary btn-sm" style={{ marginRight: '6px' }}><Eye size={12} /> View</button>
                      <button className="btn btn-primary btn-sm"><Download size={12} /> Download</button>
                    </td>
                  </tr>
                  {siaReport.gramPanchayatResolutions.map((gp, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>Gram Panchayat Resolution #{gp.resolutionNo}</td>
                      <td>Gram Sabha Resolution</td>
                      <td style={{ fontWeight: 700, color: '#0B4726' }}>{gp.village}</td>
                      <td>Sarpanch & Gram Sevak</td>
                      <td>{gp.date}</td>
                      <td>
                        <span className={`badge ${gp.status.includes('Approved') ? 'badge-green' : gp.status.includes('Rejected') ? 'badge-red' : 'badge-orange'}`}>
                          {gp.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button className="btn btn-secondary btn-sm" style={{ marginRight: '6px' }}><Eye size={12} /> View</button>
                        <button className="btn btn-primary btn-sm"><Download size={12} /> Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Collector Action for SIA Approval */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '14px', justifyContent: 'flex-end', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#475569' }}>Upon SIA Approval, system unlocks E-Gazette Preliminary Notification release:</span>
              <button
                className="btn btn-danger"
                onClick={() => alert('SIA Proposal Rejected. Land acquisition barred under LARR 2013.')}
              >
                🔴 Reject SIA (Permanent Land Bar)
              </button>
              <button
                className="btn btn-primary"
                style={{ background: '#1E7E34', border: '1px solid #06371E' }}
                onClick={() => {
                  alert('SIA Approved by District Collector! Opening E-Gazette Preliminary Notification Form...');
                  setIsGazetteFormOpen(true);
                }}
              >
                🟢 Approve SIA & Release E-Gazette Notification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: STATE DISPUTE (EXPANDABLE FUTURE MODULE) */}
      {/* =================================================================== */}
      {activeApprovalTab === 'state-dispute' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title" style={{ color: '#C5221F' }}>
              <AlertTriangle size={18} />
              STATE-LEVEL LAND DISPUTES & JURISDICTIONAL CONFLICTS MODULE
            </div>
            <span className="badge badge-red">District Magistrate Oversight</span>
          </div>

          <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>
            This section tracks high-level inter-departmental state disputes, forest land transfers, and PESA tribal territory litigation awaiting District Collector adjudication.
          </p>

          <div className="table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Dispute ID</th>
                  <th>Project</th>
                  <th>Conflicting Authorities</th>
                  <th>Legal Issue</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mono-code" style={{ fontWeight: 700 }}>ST-DISP-2026-01</td>
                  <td>Mulshi Dam Reservoir Project</td>
                  <td>Forest Dept vs Revenue Dept</td>
                  <td>45 Ha unclassified forest submerged; compensatory afforestation land dispute in Purandar.</td>
                  <td><span className="badge badge-red">Under Hearing</span></td>
                  <td><button className="btn btn-secondary btn-sm">Review File</button></td>
                </tr>
                <tr>
                  <td className="mono-code" style={{ fontWeight: 700 }}>ST-DISP-2026-02</td>
                  <td>Pune Ring Road Corridor</td>
                  <td>MSRDC vs NHAI Corridor Overlap</td>
                  <td>0.4 km intersection overlap at Wagholi bypass requiring joint toll plaza determination.</td>
                  <td><span className="badge badge-orange">Under Review</span></td>
                  <td><button className="btn btn-secondary btn-sm">Review File</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 1: APPROVAL DECISION MODAL (4 ACTIONS) */}
      {/* =================================================================== */}
      {isDecisionModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ maxWidth: '620px' }}>
            <div className="modal-header">
              <h3 className="modal-title">
                EXECUTE COLLECTOR STATUTORY ACTION: {selectedActionType?.toUpperCase()}
              </h3>
              <button className="modal-close-btn" onClick={() => setIsDecisionModalOpen(false)}>
                <XCircle size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ fontSize: '13px', marginBottom: '14px', background: '#F8FAFC', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                Project: <strong>{proposal.name}</strong> ({proposal.id})<br />
                Proposing Body: <strong>{proposal.proposingBody}</strong>
              </div>

              {selectedActionType === 'reject' && (
                <div style={{ background: '#FCE8E6', color: '#991B1B', padding: '10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, marginBottom: '14px' }}>
                  ⚠️ PERMANENT REJECTION NOTICE: Rejection by District Collector permanently debars proposing body from claiming this land again under Maharashtra Revenue Code.
                </div>
              )}

              {selectedActionType === 'conditional' && (
                <div className="form-group">
                  <label className="form-label" style={{ color: '#8B5CF6' }}>SPECIFIC CONDITIONAL APPROVAL TERMS</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={conditionalTerms}
                    onChange={e => setConditionalTerms(e.target.value)}
                    placeholder="Specify conditions (e.g. Kumbh Mela 2027 emergency access, environmental clearance within 60 days)..."
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">DISTRICT COLLECTOR REMARKS & EXECUTIVE ORDER NOTE</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={decisionRemarks}
                  onChange={e => setDecisionRemarks(e.target.value)}
                  placeholder="Enter detailed executive order remarks, legal references, or directives for SLAO..."
                  required
                />
              </div>

              <div style={{ background: '#E6F4EA', padding: '10px', borderRadius: '6px', fontSize: '11.5px', color: '#1E7E34' }}>
                <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Signing Authority: <strong>Dr. Rajesh V. Deshmukh, IAS (Class 3 DSC Active)</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsDecisionModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmitDecision}>
                <ShieldCheck size={14} /> Digitally Sign & Confirm Decision
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 2: E-GAZETTE GENERATION FORM */}
      {/* =================================================================== */}
      {isGazetteFormOpen && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ maxWidth: '800px' }}>
            <div className="modal-header" style={{ background: '#06371E' }}>
              <h3 className="modal-title">FORM 1: E-GAZETTE PRELIMINARY NOTIFICATION FORM (SEC 11)</h3>
              <button className="modal-close-btn" onClick={() => setIsGazetteFormOpen(false)}>
                <XCircle size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '12px', background: '#F8FAFC', padding: '10px', borderRadius: '6px', color: '#475569' }}>
                Auto-retrieved project metadata from SWADESH Land Acquisition Database:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Gazette Reference Number</label>
                  <input type="text" className="form-control" value={gazetteFormData.gazetteRefNo} readOnly />
                </div>
                <div className="form-group">
                  <label className="form-label">Notification Number</label>
                  <input type="text" className="form-control" value={gazetteFormData.notificationNo} readOnly />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input type="text" className="form-control" value={gazetteFormData.projectName} readOnly />
                </div>
                <div className="form-group">
                  <label className="form-label">Proposing Body</label>
                  <input type="text" className="form-control" value={gazetteFormData.proposingBody} readOnly />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Relevant Statutory Act & Section</label>
                <input type="text" className="form-control" value={gazetteFormData.actSection} readOnly />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Total Land Required</label>
                  <input type="text" className="form-control" value={`${gazetteFormData.landRequiredHa} Hectares`} readOnly />
                </div>
                <div className="form-group">
                  <label className="form-label">Parcel Count</label>
                  <input type="text" className="form-control" value={`${gazetteFormData.parcelCount} Parcels`} readOnly />
                </div>
                <div className="form-group">
                  <label className="form-label">Affected Landowners</label>
                  <input type="text" className="form-control" value={`${gazetteFormData.affectedLandownersCount} Landowners`} readOnly />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Survey Numbers Schedule</label>
                <textarea className="form-control" rows={2} value={gazetteFormData.surveyNumbers} readOnly />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsGazetteFormOpen(false)}>
                Save Draft
              </button>
              <button className="btn btn-secondary" onClick={() => setIsGazettePreviewOpen(true)}>
                <Eye size={14} /> Preview Gazette
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsGazetteFormOpen(false);
                  alert('E-Gazette Preliminary Notification Published & Dispatched to Government Printing Press!');
                }}
              >
                <Send size={14} /> Digitally Sign & Release Preliminary Notification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRELIMINARY NOTIFICATION PREVIEW MODAL */}
      {isGazettePreviewOpen && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ maxWidth: '850px', background: '#FFF' }}>
            <div className="modal-header" style={{ background: '#000' }}>
              <h3 className="modal-title">THE MAHARASHTRA GOVERNMENT GAZETTE (EXTRAORDINARY) PREVIEW</h3>
              <button className="modal-close-btn" onClick={() => setIsGazettePreviewOpen(false)}>
                <XCircle size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '30px', fontFamily: 'var(--font-serif)', color: '#000' }}>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase' }}>Government of Maharashtra</div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>REVENUE AND FORESTS DEPARTMENT</div>
                <div style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '4px' }}>Ref No: {gazetteFormData.gazetteRefNo} • Date: {gazetteFormData.notificationDate}</div>
              </div>

              <h4 style={{ textTransform: 'uppercase', textAlign: 'center', fontSize: '14px', fontWeight: 800, marginBottom: '16px' }}>
                PRELIMINARY NOTIFICATION UNDER SECTION 11(1) OF THE RIGHT TO FAIR COMPENSATION AND TRANSPARENCY IN LAND ACQUISITION, REHABILITATION AND RESETTLEMENT ACT, 2013
              </h4>

              <p style={{ fontSize: '13px', lineHeight: 1.6, textIndent: '30px' }}>
                Whereas it appears to the Government of Maharashtra that land specified in the Schedule below is needed for a public purpose, namely <strong>{gazetteFormData.purpose}</strong> ({gazetteFormData.projectName}) in Haveli Taluka of Pune District.
              </p>

              <div style={{ marginTop: '20px', fontSize: '12px' }}>
                <strong>SCHEDULE OF LAND PARCELS:</strong>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px', border: '1px solid #000' }}>
                  <thead>
                    <tr style={{ background: '#F1F5F9' }}>
                      <th style={{ border: '1px solid #000', padding: '6px' }}>District</th>
                      <th style={{ border: '1px solid #000', padding: '6px' }}>Taluka</th>
                      <th style={{ border: '1px solid #000', padding: '6px' }}>Villages</th>
                      <th style={{ border: '1px solid #000', padding: '6px' }}>Area (Ha)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '6px' }}>Pune</td>
                      <td style={{ border: '1px solid #000', padding: '6px' }}>Haveli</td>
                      <td style={{ border: '1px solid #000', padding: '6px' }}>{gazetteFormData.villages.join(', ')}</td>
                      <td style={{ border: '1px solid #000', padding: '6px' }}>{gazetteFormData.landRequiredHa} Ha</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '40px', textAlign: 'right', fontSize: '13px', fontWeight: 700 }}>
                By order and in the name of the Governor of Maharashtra,<br /><br />
                <span style={{ borderBottom: '1px solid #000' }}>Dr. Rajesh V. Deshmukh, IAS</span><br />
                District Collector & District Magistrate, Pune District
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsGazettePreviewOpen(false)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW PROPOSAL FULL DOSSIER MODAL */}
      <ViewProposalModal
        isOpen={isViewProposalModalOpen}
        onClose={() => setIsViewProposalModalOpen(false)}
        proposal={proposal}
      />
    </div>
  );
}
