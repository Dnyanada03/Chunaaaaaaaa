import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  ArrowLeft, FileText, CheckCircle2, Clock, AlertTriangle, Building2,
  Calendar, Layers, ShieldCheck, MapPin, IndianRupee, Download, ExternalLink,
  ChevronRight, BrainCircuit, Users, Info, Sparkles, Hash, Eye, RefreshCw
} from 'lucide-react';
import { initialParcelsCadastral } from '../../data/proposingMockData';

export default function ProposingBodyProposalDetailView({ proposalId, onBack, onNavigate }) {
  const { proposingProposals, proposingProjects, setActiveDoc, setIsDocViewerOpen } = useSwadesh();
  const [activeTab, setActiveTab] = useState('overview'); // overview, parcels, finance, milestones, documents, ai

  const proposal = proposingProposals.find(p => p.id === proposalId) || proposingProposals[0];
  const linkedProject = proposingProjects.find(p => p.id === proposal?.projectId);

  if (!proposal) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <p style={{ color: '#64748B' }}>Proposal not found.</p>
        <button className="btn btn-secondary" onClick={onBack} style={{ marginTop: '12px' }}>
          Back to Directory
        </button>
      </div>
    );
  }

  // Lifecycle stages reference for proposal
  const stages = [
    {
      id: 'DRAFT',
      name: 'Proposal Formulation & AI Validation',
      status: 'completed',
      date: proposal.createdAt || '12 Aug 2026',
      authority: 'Proposing Authority (Maharail)',
      remarks: 'Requisition draft prepared with digital cadastral survey overlay and AI comparators'
    },
    {
      id: 'SUBMITTED',
      name: 'Statutory Submission & DSC Verification',
      status: proposal.status === 'Draft' ? 'current' : 'completed',
      date: proposal.submissionDate || '14 Aug 2026',
      authority: 'CGM Land, Maharail',
      remarks: proposal.digitalSignature?.isSigned
        ? `Digitally signed via Class-3 DSC (${proposal.digitalSignature.signatory})`
        : 'Draft saved; awaiting digital token sign-off'
    },
    {
      id: 'SCRUTINY',
      name: 'State Revenue Dept Requisition Scrutiny',
      status: proposal.status === 'Draft' ? 'upcoming' : (proposal.status === 'Submitted to State' ? 'current' : 'completed'),
      date: proposal.status === 'Under Review' || proposal.status === 'Approved' ? '18 Aug 2026' : 'Pending',
      authority: 'Revenue & Forest Department, Mantralaya',
      remarks: 'Verification of project alignment, Section 40 urgency applicability, and administrative approval'
    },
    {
      id: 'COLLECTOR_FORWARD',
      name: 'Collectorate Competent Authority Notification',
      status: proposal.status === 'Under Review' ? 'current' : (proposal.status === 'Approved' ? 'completed' : 'upcoming'),
      date: proposal.status === 'Approved' ? '22 Aug 2026' : 'Scheduled',
      authority: 'District Collector Office, Pune',
      remarks: 'Transmission to Sub-Divisional Officer (SDO) / Tahsildar for joint measurement survey (JMS)'
    },
    {
      id: 'SIA_SEC4',
      name: 'Social Impact Assessment & Section 4(1) Notification',
      status: proposal.status === 'Approved' ? 'upcoming' : 'upcoming',
      date: 'Expected Oct 2026',
      authority: 'Directorate of SIA / SDO',
      remarks: 'Statutory SIA public hearings and preliminary gazette publication'
    }
  ];

  // Mock PFMS ledger entries
  const pfmsLedger = [
    { head: 'MH-8443-00-106-01', description: 'Civil Deposit - Land Acquisition Awards', sanctioned: (proposal.estimatedCost * 0.7).toFixed(2), disbursed: (proposal.estimatedCost * 0.28).toFixed(2), balance: (proposal.estimatedCost * 0.42).toFixed(2), status: 'Active' },
    { head: 'MH-2235-02-102-04', description: 'R&R Rehabilitation Grant & Subsistence Allowance', sanctioned: (proposal.estimatedCost * 0.18).toFixed(2), disbursed: (proposal.estimatedCost * 0.05).toFixed(2), balance: (proposal.estimatedCost * 0.13).toFixed(2), status: 'Allocated' },
    { head: 'MH-2053-00-093-02', description: 'Establishment & Administrative Contingencies (3%)', sanctioned: (proposal.estimatedCost * 0.12).toFixed(2), disbursed: (proposal.estimatedCost * 0.04).toFixed(2), balance: (proposal.estimatedCost * 0.08).toFixed(2), status: 'Active' }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Top Breadcrumb Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', fontSize: '13px' }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B' }}>
            <span>Proposals</span>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 700, color: '#0F172A' }}>{proposal.id}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {proposal.aiAnalysis && (
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate && onNavigate('ai-pre-proposal', proposal.projectId, proposal)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                borderColor: '#6366F1',
                color: '#4338CA',
                background: '#EEF2FF',
                fontWeight: 700
              }}
            >
              <Sparkles size={15} style={{ color: '#6366F1' }} />
              Open AI Pre-Proposal Dossier
            </button>
          )}

          {linkedProject && (
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate && onNavigate('project-detail', linkedProject.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
            >
              <Building2 size={15} />
              View Parent Project
            </button>
          )}

          <button
            className="btn btn-secondary"
            onClick={() => {
              setActiveDoc({
                title: `${proposal.id} - Statutory Requisition Proposal Dossier`,
                date: proposal.submissionDate || proposal.createdAt,
                type: 'PDF',
                category: 'Requisition',
                authority: 'Maharail',
                url: '#'
              });
              setIsDocViewerOpen(true);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
          >
            <Eye size={15} />
            Preview Dossier
          </button>
        </div>
      </div>

      {/* Hero Proposal Header */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, minWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                fontWeight: 800,
                color: '#008E4F',
                background: '#E6F4EA',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid #CEEAD6'
              }}>
                {proposal.id}
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '12px',
                background: proposal.status === 'Approved' ? '#DEF7EC' : proposal.status === 'Submitted to State' ? '#E1EFFE' : '#FEF3C7',
                color: proposal.status === 'Approved' ? '#03543F' : proposal.status === 'Submitted to State' ? '#1E429F' : '#92400E'
              }}>
                ● {proposal.status}
              </span>
              {proposal.section40Urgency?.invoked && (
                <span style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: '#FEE2E2',
                  color: '#991B1B',
                  border: '1px solid #FECACA'
                }}>
                  ⚡ Section 40 Urgency Clause Invoked
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
              {proposal.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '13px', color: '#64748B', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Building2 size={15} style={{ color: '#94A3B8' }} />
                <span>Project: <strong>{proposal.projectName || linkedProject?.name}</strong> ({proposal.projectId})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={15} style={{ color: '#94A3B8' }} />
                <span>{proposal.districts?.join(', ')} • {proposal.talukas?.join(', ')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={15} style={{ color: '#94A3B8' }} />
                <span>Created: {proposal.createdAt}</span>
              </div>
            </div>
          </div>

          {/* DSC Digital Signing Status Badge */}
          <div style={{
            background: proposal.digitalSignature?.isSigned ? '#F0FDF4' : '#FFFBEB',
            border: `1px solid ${proposal.digitalSignature?.isSigned ? '#BBF7D0' : '#FDE68A'}`,
            borderRadius: '10px',
            padding: '12px 16px',
            minWidth: '260px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <ShieldCheck size={18} style={{ color: proposal.digitalSignature?.isSigned ? '#16A34A' : '#D97706' }} />
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: proposal.digitalSignature?.isSigned ? '#15803D' : '#B45309' }}>
                {proposal.digitalSignature?.isSigned ? 'Class-3 DSC Digitally Signed' : 'Digital Sign-Off Pending'}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {proposal.digitalSignature?.isSigned ? (
                <>
                  Signatory: <strong>{proposal.digitalSignature.signatory}</strong><br />
                  Timestamp: <span style={{ fontFamily: 'monospace' }}>{proposal.digitalSignature.timestamp}</span>
                </>
              ) : (
                <span>Requisition draft requires DSC authentication prior to formal transmission.</span>
              )}
            </div>
          </div>
        </div>

        {/* Key Quick Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid #F1F5F9'
        }}>
          <div style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>LAND REQUIRED</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{proposal.landRequiredHa || 0} Ha</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Across {proposal.villages?.length || 4} Villages</div>
          </div>

          <div style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>ESTIMATED COST</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>₹{proposal.estimatedCost || 0} Cr</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>Financial Year: {proposal.financialYear || '2026–2027'}</div>
          </div>

          <div style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CADASTRAL PARCELS</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{proposal.parcelsCount || 14} Parcels</div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>~{proposal.affectedFamilies || 34} Affected Families</div>
          </div>

          <div style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>ESTIMATED DURATION</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{proposal.aiAnalysis?.estimatedDurationMonths || 14} Months</div>
            <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Target: {proposal.milestones?.targetCompletion || 'Dec 2027'}</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #E2E8F0', marginBottom: '24px' }}>
        {[
          { id: 'overview', label: 'Overview & Current Stage', icon: Layers },
          { id: 'parcels', label: `Cadastral Parcels (${proposal.parcelsCount || 14})`, icon: MapPin },
          { id: 'finance', label: 'Financial & PFMS Ledger', icon: IndianRupee },
          { id: 'milestones', label: 'Milestones & Timeline', icon: Calendar },
          { id: 'documents', label: `Documents (${proposal.documents?.length || 2})`, icon: FileText },
          { id: 'ai', label: 'AI Pre-Proposal Insights', icon: BrainCircuit }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 18px',
                border: 'none',
                background: 'transparent',
                borderBottom: isActive ? '3px solid #008E4F' : '3px solid transparent',
                color: isActive ? '#008E4F' : '#64748B',
                fontWeight: isActive ? 800 : 600,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* 1. OVERVIEW & CURRENT STAGE */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Current Stage Explanation Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: '#E6F4EA', color: '#008E4F',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Layers size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Current Statutory Stage Explanation
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Tracking statutory RFCTLARR Act 2013 compliance state
                  </div>
                </div>
              </div>

              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                  Current Status: <span style={{ color: '#008E4F' }}>{proposal.status}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {proposal.status === 'Submitted to State' ? (
                    `The statutory acquisition proposal has been transmitted to the State Revenue & Forest Department with digital Class-3 signature. The scrutiny bench is reviewing the alignment justification, DPDC budget allocation, and the Section 40 urgency applicability prior to formal issuance of the Section 4(1) mandate to the District Collector.`
                  ) : proposal.status === 'Under Review' ? (
                    `The proposal is currently with the District Collectorate Competent Authority (SDO Pune Division). Joint cadastral field measurement and 7/12 record verification are underway across ${proposal.villages?.length || 4} villages.`
                  ) : proposal.status === 'Approved' ? (
                    `Administrative & statutory approvals granted. Section 11(1) preliminary gazette notification published. Compensation awards and rehabilitation matrix formulation underway.`
                  ) : (
                    `Proposal package is in draft status within the Proposing Authority domain. Cadastral parcels have been mapped and AI pre-proposal evaluation completed. Pending final Class-3 DSC sign-off.`
                  )}
                </p>
              </div>

              {/* Justification & Scope */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                  Project Alignment & Scope Summary
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                  {proposal.justification || 'The proposed rail chord line will connect the freight bypass corridor to the industrial logistics park, mitigating severe bottleneck congestion and enabling multimodal container transfer.'}
                </p>
              </div>

              {proposal.section40Urgency?.invoked && (
                <div style={{
                  marginTop: '16px',
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '8px',
                  padding: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991B1B', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                    <AlertTriangle size={16} />
                    Section 40 (Urgency Clause) Invocation Justification
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#7F1D1D', margin: 0, lineHeight: 1.5 }}>
                    {proposal.section40Urgency.justification || 'National infrastructure corridor deadline mandate under PM GatiShakti. Eliminates Section 7 Social Impact Assessment public hearing delays.'}
                  </p>
                </div>
              )}
            </div>

            {/* Geographical Hierarchy */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                Geographic Jurisdiction
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>DISTRICTS</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                    {proposal.districts?.join(', ')}
                  </div>
                </div>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>TALUKAS</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>
                    {proposal.talukas?.join(', ')}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>AFFECTED REVENUE VILLAGES</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {proposal.villages?.map((v, i) => (
                    <span key={i} style={{
                      fontSize: '12px',
                      background: '#E2E8F0',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      color: '#334155',
                      fontWeight: 600
                    }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Previous Stages Timeline */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            height: 'fit-content'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
              Statutory Lifecycle Progress
            </h3>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '20px' }}>
              End-to-end multi-stakeholder governance audit trail
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              {stages.map((stage, idx) => {
                const isDone = stage.status === 'completed';
                const isCurrent = stage.status === 'current';
                const isLast = idx === stages.length - 1;

                return (
                  <div key={stage.id} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                    {/* Vertical Connector */}
                    {!isLast && (
                      <div style={{
                        position: 'absolute',
                        left: '13px',
                        top: '28px',
                        bottom: '-8px',
                        width: '2px',
                        background: isDone ? '#008E4F' : '#E2E8F0'
                      }} />
                    )}

                    {/* Step Icon */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isDone ? '#008E4F' : isCurrent ? '#FEF3C7' : '#F1F5F9',
                      border: `2px solid ${isDone ? '#008E4F' : isCurrent ? '#D97706' : '#CBD5E1'}`,
                      color: isDone ? '#FFFFFF' : isCurrent ? '#D97706' : '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                      flexShrink: 0
                    }}>
                      {isDone ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                    </div>

                    {/* Step Details */}
                    <div style={{ paddingBottom: isLast ? '0px' : '24px', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: '13px', fontWeight: isCurrent ? 800 : 700, color: isCurrent ? '#0F172A' : isDone ? '#1E293B' : '#64748B' }}>
                          {stage.name}
                        </div>
                        <span style={{ fontSize: '11px', color: '#94A3B8', whiteSpace: 'nowrap' }}>
                          {stage.date}
                        </span>
                      </div>

                      <div style={{ fontSize: '11.5px', color: '#008E4F', fontWeight: 600, marginTop: '2px' }}>
                        {stage.authority}
                      </div>

                      <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                        {stage.remarks}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. CADASTRAL PARCELS TAB */}
      {activeTab === 'parcels' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Cadastral Survey Parcels Schedule
              </h3>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Detailed parcel-wise requisition schedule with 7/12 RoR records and compensation estimates
              </div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#008E4F', background: '#E6F4EA', padding: '4px 10px', borderRadius: '6px' }}>
              Total Area: {proposal.landRequiredHa || 42.5} Ha
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Survey No. / Gat No.</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Village & Taluka</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Land Classification</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Required Area</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Registered Owners</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Est. Compensation</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Encumbrance Status</th>
                </tr>
              </thead>
              <tbody>
                {initialParcelsCadastral.map(parcel => (
                  <tr key={parcel.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px', fontWeight: 700, fontFamily: 'monospace', color: '#0F172A' }}>
                      {parcel.surveyNo}
                    </td>
                    <td style={{ padding: '12px', color: '#334155' }}>
                      {parcel.village}, {parcel.taluka}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: parcel.landType.includes('Agriculture') ? '#ECFDF5' : parcel.landType.includes('Government') ? '#EFF6FF' : '#FFFBEB',
                        color: parcel.landType.includes('Agriculture') ? '#047857' : parcel.landType.includes('Government') ? '#1D4ED8' : '#B45309',
                        fontWeight: 600
                      }}>
                        {parcel.landType}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#0F172A' }}>
                      {parcel.areaHa} Ha
                    </td>
                    <td style={{ padding: '12px', color: '#475569' }}>
                      {parcel.owners} owner(s)
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#008E4F' }}>
                      ₹{parcel.estimatedComp} Cr
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        fontSize: '11px',
                        color: parcel.encumbrance === 'None / Clear' ? '#16A34A' : '#D97706',
                        fontWeight: 600
                      }}>
                        ● {parcel.encumbrance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. FINANCIAL & PFMS LEDGER TAB */}
      {activeTab === 'finance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top 4 Financial Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>TOTAL ESTIMATED OUTLAY</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                ₹{proposal.estimatedCost || 112.5} Cr
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>Sanctioned by Board / Finance Dept</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>DISBURSED TO COLLECTOR</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#008E4F', marginTop: '6px' }}>
                ₹{((proposal.estimatedCost || 112.5) * 0.35).toFixed(2)} Cr
              </div>
              <div style={{ fontSize: '11.5px', color: '#10B981', marginTop: '4px' }}>35% initial deposit for preliminary work</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>COMMITTED R&R PACKAGE</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#2563EB', marginTop: '6px' }}>
                ₹{((proposal.estimatedCost || 112.5) * 0.18).toFixed(2)} Cr
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>Second Schedule entitlements</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>REMAINING DRAWDOWN BALANCE</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#D97706', marginTop: '6px' }}>
                ₹{((proposal.estimatedCost || 112.5) * 0.47).toFixed(2)} Cr
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>Tied to Section 19(1) declaration</div>
            </div>
          </div>

          {/* PFMS Integrated Component Ledger */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  PFMS / Treasury Head-Wise Component Ledger
                </h3>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  Integrated with Public Financial Management System (PFMS) & Maharashtra BeAMS portal
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E40AF', background: '#DBEAFE', padding: '4px 10px', borderRadius: '6px' }}>
                Live Gateway Sync: Active
              </span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Treasury Head</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Description / Head Title</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Sanctioned (₹ Cr)</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Disbursed (₹ Cr)</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Balance (₹ Cr)</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {pfmsLedger.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 700, color: '#0F172A' }}>
                      {row.head}
                    </td>
                    <td style={{ padding: '12px', color: '#334155' }}>
                      {row.description}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#0F172A' }}>
                      ₹{row.sanctioned}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#008E4F' }}>
                      ₹{row.disbursed}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#D97706' }}>
                      ₹{row.balance}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '11.5px', color: '#15803D', background: '#DCFCE7', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        ● {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. MILESTONES & TIMELINES */}
      {activeTab === 'milestones' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
            Statutory RFCTLARR Compliance Timelines & Key Milestones
          </h3>
          <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '20px' }}>
            Statutory limitation deadlines tracked under Central Act 30 of 2013
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {[
              {
                step: 'Section 4(1) Notification',
                deadline: 'Within 60 days of approval',
                status: 'In Progress',
                desc: 'Intimation of intention to acquire land published in Official Gazette & Taluka offices'
              },
              {
                step: 'Joint Measurement Survey (JMS)',
                deadline: 'Within 90 days',
                status: 'Scheduled',
                desc: 'Physical peg-marking and tree/structure valuation with DILR and Tahsildar team'
              },
              {
                step: 'Section 11(1) Preliminary Declaration',
                deadline: 'Statutory 12-month limit',
                status: 'Upcoming',
                desc: 'Formal declaration of public purpose land parcel boundaries and bar on land sale'
              },
              {
                step: 'Section 15 Hearing of Objections',
                deadline: '60 days from Sec 11',
                status: 'Upcoming',
                desc: 'Statutory quasi-judicial bench conducted by Tahsildar / Collector'
              },
              {
                step: 'Section 19(1) Final Declaration',
                deadline: 'Within 12 months of Sec 11',
                status: 'Upcoming',
                desc: 'Government declaration of acquisition; prerequisite for financial award deposit'
              },
              {
                step: 'Section 23 & 31 Awards & Possession',
                deadline: 'Within 12 months of Sec 19',
                status: 'Upcoming',
                desc: 'Final financial award determination, direct DBT disbursement, and mutation under Sec 38'
              }
            ].map((m, i) => (
              <div key={i} style={{
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '16px',
                background: '#F8FAFC'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>{m.step}</span>
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    background: m.status === 'In Progress' ? '#FEF3C7' : '#E2E8F0',
                    color: m.status === 'In Progress' ? '#B45309' : '#64748B'
                  }}>
                    {m.status}
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#008E4F', fontWeight: 700, marginBottom: '6px' }}>
                  ⏱ {m.deadline}
                </div>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DOCUMENTS TAB */}
      {activeTab === 'documents' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Statutory Dossier Documents
              </h3>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                All documents submitted under proposal package with Class-3 DSC cryptographic seals
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                title: 'Statutory Requisition Form-A with Administrative Approval',
                type: 'PDF',
                version: 'V1.0',
                size: '4.8 MB',
                date: proposal.createdAt || '14 Aug 2026',
                signed: true,
                signatory: 'Shri V. K. Sharma (CGM Land, Maharail)'
              },
              {
                title: 'Cadastral GIS Survey Map & Alignment Overlay (KML / GeoJSON)',
                type: 'ZIP / GIS',
                version: 'V1.1',
                size: '18.4 MB',
                date: proposal.createdAt || '14 Aug 2026',
                signed: true,
                signatory: 'DILR Certified GIS Team'
              },
              {
                title: 'Detailed Project Report (DPR) Volume III - Land Schedule',
                type: 'PDF',
                version: 'V2.0',
                size: '12.1 MB',
                date: '10 Aug 2026',
                signed: true,
                signatory: 'Maharail Planning Cell'
              },
              {
                title: 'Decision-Support AI Pre-Proposal Feasibility Dossier',
                type: 'PDF (Generated)',
                version: 'V1.0',
                size: '2.4 MB',
                date: proposal.createdAt || '14 Aug 2026',
                signed: false,
                signatory: 'SWADESH AI Analytics Engine'
              }
            ].map((doc, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                background: '#FAFAFA'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: '#E6F4EA', color: '#008E4F',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>
                      {doc.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', display: 'flex', gap: '12px', marginTop: '2px' }}>
                      <span>Format: <strong>{doc.type}</strong></span>
                      <span>Version: <strong>{doc.version}</strong></span>
                      <span>Size: {doc.size}</span>
                      <span>Date: {doc.date}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {doc.signed ? (
                    <span style={{ fontSize: '11px', color: '#16A34A', background: '#DCFCE7', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      ✓ Class-3 DSC Signed
                    </span>
                  ) : (
                    <span style={{ fontSize: '11px', color: '#4338CA', background: '#EEF2FF', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      ⚡ System Generated
                    </span>
                  )}

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setActiveDoc({
                        title: doc.title,
                        date: doc.date,
                        type: doc.type,
                        category: 'Proposal Document',
                        authority: 'Maharail'
                      });
                      setIsDocViewerOpen(true);
                    }}
                    style={{ padding: '6px 12px', fontSize: '12.5px' }}
                  >
                    <Eye size={14} style={{ marginRight: '4px' }} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. AI PRE-PROPOSAL INSIGHTS TAB */}
      {activeTab === 'ai' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Sparkles size={18} style={{ color: '#6366F1' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  SWADESH AI Pre-Proposal Predictive Summary
                </h3>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Historical pattern matching across 40+ completed Maharashtra land acquisition corridors
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => onNavigate && onNavigate('ai-pre-proposal', proposal.projectId, proposal)}
              style={{
                background: 'linear-gradient(135deg, #4338CA 0%, #6366F1 100%)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                fontSize: '13px'
              }}
            >
              <Sparkles size={15} />
              Open Full Comprehensive AI Report
            </button>
          </div>

          {/* Alert Notice */}
          <div style={{
            background: '#F8FAFC',
            borderLeft: '4px solid #6366F1',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 0',
            fontSize: '12px',
            color: '#475569',
            marginBottom: '20px'
          }}>
            <strong>Statutory Notice:</strong> This pre-proposal assessment is powered by deterministic heuristic models trained on past collectorate acquisition records. It serves as analytical decision-support and does not supersede statutory decisions of the Competent Authority.
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>COMPLEXITY RISK SCORE</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
                {proposal.aiAnalysis?.complexityScore || 64}/100
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B' }}>Medium Risk Profile</div>
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>HISTORICAL MATCH</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#4338CA', marginTop: '4px' }}>
                91% Match
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B' }}>Pune Metro Line 3 Corridor</div>
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>PROJECTED TIMELINE</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#008E4F', marginTop: '4px' }}>
                {proposal.aiAnalysis?.estimatedDurationMonths || 14} Months
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B' }}>To 90% encumbrance-free handover</div>
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>R&R DISPLACEMENT</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                {proposal.affectedFamilies || 34} PAFs
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B' }}>12 Commercial, 22 Agricultural</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate && onNavigate('ai-pre-proposal', proposal.projectId, proposal)}
              style={{ fontSize: '13px', fontWeight: 700 }}
            >
              Inspect Past Comparators, Risk Breakdown & Cost Benchmarks →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
