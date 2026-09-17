import React, { useState } from 'react';
import {
  FolderKanban,
  FileSpreadsheet,
  AlertTriangle,
  Clock,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  X,
  ExternalLink,
  PlusCircle,
  TrendingUp,
  MapPin,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';
import { initialProposingAlerts } from '../../data/proposingMockData';

export default function ProposingBodyDashboardView({ onNavigate }) {
  const { proposingProjects, proposingProposals, proposingOfficer } = useSwadesh();

  // Notification Ribbon State
  const [isRibbonDismissed, setIsRibbonDismissed] = useState(false);
  const [activeAlertRow, setActiveAlertRow] = useState('ALT-PB-01');

  // Compute live KPIs
  const activeProjectsCount = proposingProjects.filter(p => p.status !== 'Completed').length;
  const underPrepProposals = proposingProposals.filter(p => p.status === 'Draft' || p.status === 'Pre-Proposal Analysis');
  const submittedProposals = proposingProposals.filter(p => p.status === 'Submitted');
  const highRiskProposals = proposingProposals.filter(p => p.riskAssessment?.overallRisk === 'High' || p.riskAssessment?.overallRisk === 'Critical');

  const totalLandHa = proposingProjects.reduce((acc, p) => acc + (parseFloat(p.landRequiredHa) || 0), 0).toFixed(1);

  // Toggle alert accordion
  const toggleAlert = (id) => {
    setActiveAlertRow(prev => prev === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Official Government Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>PROJECT AUTHORITY WORKSPACE</h1>
          <p>
            {proposingOfficer?.authority} • Land Acquisition Proposal Initiation & Portfolio Monitoring
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate('add-project')}
            style={{
              background: '#FFFFFF',
              color: '#005A36',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <PlusCircle size={15} /> CREATE NEW PROJECT
          </button>
        </div>
      </div>

      {/* 9.2 SUBTLE NOTIFICATION RIBBON */}
      {!isRibbonDismissed && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FEF3C7',
          color: '#92400E',
          border: '1px solid #FDE68A',
          padding: '10px 16px',
          borderRadius: '10px',
          fontSize: '13px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
              <Clock size={15} style={{ color: '#D97706' }} />
              <span>Workspace Action Ribbon:</span>
            </div>
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
              onClick={() => onNavigate('proposals')}
            >
              {underPrepProposals.length} proposals under preparation
            </span>
            <span>•</span>
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
              onClick={() => onNavigate('documents')}
            >
              1 project document requires correction
            </span>
            <span>•</span>
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
              onClick={() => onNavigate('proposals')}
            >
              {submittedProposals.length} proposals awaiting authority review
            </span>
          </div>

          <button
            onClick={() => setIsRibbonDismissed(true)}
            style={{ background: 'none', border: 'none', color: '#92400E', cursor: 'pointer', padding: '2px 6px' }}
            title="Dismiss ribbon"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* 9.1 KPI SECTION (COMPACT & CLICKABLE) */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#64748B', marginBottom: '8px' }}>
          KEY PORTFOLIO INDICATORS
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '12px'
        }}>
          {/* Active Projects */}
          <div
            className="card"
            onClick={() => onNavigate('projects')}
            style={{
              padding: '14px 18px',
              cursor: 'pointer',
              transition: 'transform 0.1s ease, border-color 0.15s ease',
              borderLeft: '4px solid #008E4F'
            }}
            title="Click to view Active Projects"
          >
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              ACTIVE PROJECTS
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-serif)', marginTop: '4px' }}>
              {activeProjectsCount}
            </div>
            <div style={{ fontSize: '11px', color: '#008E4F', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View filtered list <ChevronRight size={12} />
            </div>
          </div>

          {/* Proposals Under Preparation */}
          <div
            className="card"
            onClick={() => onNavigate('proposals')}
            style={{
              padding: '14px 18px',
              cursor: 'pointer',
              borderLeft: '4px solid #D97706'
            }}
            title="Click to view Draft & Pre-Proposal variants"
          >
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              UNDER PREPARATION
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-serif)', marginTop: '4px' }}>
              {underPrepProposals.length}
            </div>
            <div style={{ fontSize: '11px', color: '#D97706', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Drafts / Pre-Proposal <ChevronRight size={12} />
            </div>
          </div>

          {/* Submitted Proposals */}
          <div
            className="card"
            onClick={() => onNavigate('proposals')}
            style={{
              padding: '14px 18px',
              cursor: 'pointer',
              borderLeft: '4px solid #1A73E8'
            }}
            title="Click to view Submitted Proposals"
          >
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              SUBMITTED PROPOSALS
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1A73E8', fontFamily: 'var(--font-serif)', marginTop: '4px' }}>
              {submittedProposals.length}
            </div>
            <div style={{ fontSize: '11px', color: '#1A73E8', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              In Review by State/Collector <ChevronRight size={12} />
            </div>
          </div>

          {/* Total Land Under Acquisition */}
          <div
            className="card"
            onClick={() => onNavigate('map')}
            style={{
              padding: '14px 18px',
              cursor: 'pointer',
              borderLeft: '4px solid #005A36'
            }}
            title="Click to inspect Cadastral GIS Map"
          >
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              LAND UNDER ACQUISITION
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-serif)', marginTop: '4px' }}>
              {totalLandHa} <span style={{ fontSize: '14px', fontWeight: 500 }}>Ha</span>
            </div>
            <div style={{ fontSize: '11px', color: '#005A36', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Open SWADESH GIS <ChevronRight size={12} />
            </div>
          </div>
        </div>

        {/* Secondary KPI Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px'
        }}>
          {/* High-Risk Proposals */}
          <div
            className="card"
            onClick={() => onNavigate('proposals')}
            style={{
              padding: '12px 18px',
              background: '#FFF5F5',
              border: '1px solid #FECACA',
              borderLeft: '4px solid #C5221F',
              cursor: 'pointer'
            }}
            title="Click to view high-risk proposals"
          >
            <div style={{ fontSize: '11px', color: '#991B1B', fontWeight: 700, textTransform: 'uppercase' }}>
              HIGH-RISK PROPOSALS
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#C5221F', fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
              {highRiskProposals.length} <span style={{ fontSize: '12px', fontWeight: 500, color: '#991B1B' }}>requiring mitigation</span>
            </div>
          </div>

          {/* Total Budget */}
          <div
            className="card"
            onClick={() => onNavigate('reports')}
            style={{
              padding: '12px 18px',
              cursor: 'pointer',
              borderLeft: '4px solid #6B7280'
            }}
          >
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              TOTAL PORTFOLIO BUDGET
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
              ₹ 16,450.00 Cr
            </div>
          </div>

          {/* RFCTLARR Compliance */}
          <div
            className="card"
            onClick={() => onNavigate('reports')}
            style={{
              padding: '12px 18px',
              cursor: 'pointer',
              borderLeft: '4px solid #008E4F'
            }}
          >
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
              RFCTLARR COMPLIANCE INDEX
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#008E4F', fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
              94% <span style={{ fontSize: '12px', fontWeight: 500, color: '#166534' }}>statutory audit score</span>
            </div>
          </div>
        </div>
      </div>

      {/* 9.3 PRIORITY ALERTS (SYSTEM / AI ANALYSIS - CLEARLY LABELED) */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '10px',
          marginBottom: '12px'
        }}>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={17} style={{ color: '#D97706' }} />
              PRIORITY SYSTEM & ANALYTICAL ALERTS
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
              Decision-support indicators generated by SWADESH GIS boundary cross-matching and historical models.
            </div>
          </div>
          <span className="badge badge-purple" style={{ fontSize: '10.5px' }}>
            Decision Support (Non-Statutory)
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {initialProposingAlerts.map(alert => {
            const isOpen = activeAlertRow === alert.id;
            const isHigh = alert.severity === 'High';
            return (
              <div
                key={alert.id}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  background: isOpen ? '#FBFAF6' : '#FFFFFF',
                  overflow: 'hidden'
                }}
              >
                <div
                  onClick={() => toggleAlert(alert.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: isHigh ? '#FEE2E2' : '#FEF3C7',
                        color: isHigh ? '#991B1B' : '#92400E',
                        border: `1px solid ${isHigh ? '#FCA5A5' : '#FDE68A'}`
                      }}
                    >
                      {alert.severity}
                    </span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                        {alert.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>
                        {alert.subtitle}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    />
                  </div>
                </div>

                {isOpen && (
                  <div style={{
                    padding: '0 16px 14px 44px',
                    borderTop: '1px solid #F1F5F9',
                    fontSize: '12.5px',
                    color: '#334155'
                  }}>
                    <ul style={{ margin: '8px 0 10px 0', paddingLeft: '18px', color: '#475569', lineHeight: 1.6 }}>
                      {alert.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onNavigate('pre-proposal-report', alert.proposalId)}
                      style={{ fontSize: '11.5px', color: '#005A36', fontWeight: 700 }}
                    >
                      {alert.actionLabel}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 9.4 RECENT ONGOING PROJECTS CAROUSEL / LIST */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#64748B' }}>
              PORTFOLIO ACTIVE PROJECTS
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
              Recent Ongoing Projects Under Your Authority
            </div>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('projects')}
            style={{ fontSize: '11.5px' }}
          >
            View All Projects ({proposingProjects.length}) →
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          {proposingProjects.slice(0, 3).map(proj => (
            <div
              key={proj.id}
              className="card"
              onClick={() => onNavigate('project-detail', proj.id)}
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'box-shadow 0.15s ease, border-color 0.15s ease'
              }}
            >
              {/* Project Image Banner */}
              <div style={{ height: '110px', position: 'relative', background: '#0F172A' }}>
                <img
                  src={proj.image}
                  alt={proj.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '10.5px',
                  fontWeight: 700
                }}>
                  {proj.stage}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <MapPin size={12} /> {proj.district} District
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', minHeight: '40px', lineHeight: 1.4 }}>
                  {proj.name}
                </div>

                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  <span className="mono-code">{proj.id}</span>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                    <span style={{ color: '#64748B' }}>Progress</span>
                    <strong style={{ color: '#005A36' }}>{proj.progress}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${proj.progress}%`,
                      height: '100%',
                      background: proj.progress >= 70 ? '#008E4F' : proj.progress >= 35 ? '#D97706' : '#1A73E8',
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>

                {/* Footer Metadata */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '14px',
                  paddingTop: '10px',
                  borderTop: '1px solid #F1F5F9',
                  fontSize: '11.5px'
                }}>
                  <div>
                    <span style={{ color: '#64748B' }}>Land:</span> <strong>{proj.landRequiredHa} Ha</strong>
                  </div>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    background: proj.riskLevel === 'Critical' ? '#FEE2E2' : proj.riskLevel === 'High' ? '#FEF3C7' : '#E6F4EA',
                    color: proj.riskLevel === 'Critical' ? '#991B1B' : proj.riskLevel === 'High' ? '#92400E' : '#1E7E34'
                  }}>
                    {proj.riskLevel} Risk
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
