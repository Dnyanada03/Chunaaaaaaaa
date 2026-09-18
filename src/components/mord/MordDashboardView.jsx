import React, { useState } from 'react';
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  TrendingUp,
  FileCheck,
  Shield,
  Layers,
  ChevronRight,
  Send,
  Users,
  TreePine,
  ExternalLink,
  HelpCircle,
  Bell
} from 'lucide-react';
import {
  nationalStageFlow,
  nationalLandSummary,
  nationalSocialImpact,
  nationalRfctlarrCompliance,
  getAllMordProjects
} from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';
import MordIssueDirectiveModal from './MordIssueDirectiveModal';
import MordTransformationSection from './MordTransformationSection';

export default function MordDashboardView({ onNavigate, onFilterByStage }) {
  const { projects: contextProjects } = useSwadesh();
  const allProjects = getAllMordProjects(contextProjects);

  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedComplianceFilter, setSelectedComplianceFilter] = useState('all');
  const [selectedSocialCategory, setSelectedSocialCategory] = useState(null);
  const [selectedProjectForDirective, setSelectedProjectForDirective] = useState(null);
  const [isDirectiveModalOpen, setIsDirectiveModalOpen] = useState(false);

  // Delayed and High Risk projects for Priority Alerts
  const delayedProjects = allProjects.filter(p => p.status === 'Delayed' || p.riskLevel === 'Critical');

  const handleStageClick = (stageName) => {
    if (onNavigate) {
      onNavigate('projects', null, { stage: stageName });
    }
  };

  const handleSocialImpactClick = (category) => {
    if (onNavigate) {
      onNavigate('projects', null, { socialFilter: category });
    }
  };

  const handleOpenDirective = (project) => {
    setSelectedProjectForDirective(project);
    setIsDirectiveModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Official Clean Page Banner matching Tahsildar */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>National Supervisory Executive Dashboard</h1>
          <p>Ministry of Rural Development • Land Acquisition Monitoring &amp; RFCTLARR Act Statutory Compliance Gateway</p>
        </div>
      </div>

      {/* TOP NOTIFICATIONS & LIVE FIELD WORK ALERTS STREAM */}
      <div className="card" style={{ borderLeft: '4px solid #D97706', padding: '16px 22px', background: '#FFFBEB' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#FEF3C7',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertTriangle size={18} strokeWidth={2} />
            </div>
            <div>
              <span style={{ fontWeight: 700, color: '#92400E', fontSize: '13.5px' }}>
                National Oversight Alert:
              </span>{' '}
              <span style={{ color: '#78350F', fontSize: '13.5px' }}>
                19 projects currently record abnormal delay (&gt;30 days). 3 ministerial directives are awaiting state responses.
              </span>
            </div>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate && onNavigate('alerts')}
            style={{ whiteSpace: 'nowrap', color: '#92400E', borderColor: '#FDE68A', background: '#FFFFFF' }}
          >
            View Directives Console →
          </button>
        </div>
      </div>

      {/* TOP KPI STRIP - PORTFOLIO COMMAND SUMMARY */}
      <div>
        <div style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          color: '#475569',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          National Land Acquisition Portfolio Overview
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px'
        }}>
          <div className="card" style={{ padding: '20px 22px', borderLeft: '4px solid #4B5563' }}>
            <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
              Active Projects
            </p>
            <p style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.1 }}>
              128
            </p>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '6px 0 0', fontWeight: 500 }}>Across 28 States / UTs</p>
          </div>

          <div className="card" style={{ padding: '20px 22px', borderLeft: '4px solid #008E4F' }}>
            <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
              Land Acquired
            </p>
            <p style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.1 }}>
              23,650 <span style={{ fontSize: '15px', fontWeight: 500, color: '#64748B' }}>Ha</span>
            </p>
            <p style={{ fontSize: '12px', color: '#008E4F', margin: '6px 0 0', fontWeight: 600 }}>61.5% of 38,420 Ha Target</p>
          </div>

          <div className="card" style={{ padding: '20px 22px', borderLeft: '4px solid #D97706' }}>
            <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
              Forest &amp; Tribal Land Under Projects
            </p>
            <p style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.1 }}>
              7,460 <span style={{ fontSize: '15px', fontWeight: 500, color: '#64748B' }}>Ha</span>
            </p>
            <p style={{ fontSize: '12px', color: '#D97706', margin: '6px 0 0', fontWeight: 600 }}>4,520 Ha Forest · 2,940 Ha Tribal (PESA)</p>
          </div>

          <div className="card" style={{ padding: '20px 22px', borderLeft: '4px solid #1A73E8' }}>
            <p style={{ fontSize: '11.5px', color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
              Affected Families
            </p>
            <p style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.1 }}>
              84,320
            </p>
            <p style={{ fontSize: '12px', color: '#D97706', margin: '6px 0 0', fontWeight: 500 }}>14,850 Tribal / PESA</p>
          </div>
        </div>
      </div>

      {/* 7.1 PROMINENT STAGE-FLOW VISUALIZATION */}
      <div className="card" style={{ borderLeft: '4px solid #0B4726' }}>
        <div className="card-header" style={{ marginBottom: '18px', paddingBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title" style={{ fontSize: '15.5px' }}>
              <TrendingUp size={16} strokeWidth={2} style={{ color: '#0B4726' }} />
              Statutory Stage-Flow Pipeline
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 0' }}>
              National tracking of projects progressing through the statutory RFCTLARR stages. Click any stage to inspect underlying projects.
            </p>
          </div>

          <span className="mono-code" style={{ fontSize: '11px', fontWeight: '700', background: '#E6F4EA', color: '#0B4726', padding: '4px 12px', borderRadius: '8px', border: '1px solid #CEEAD6' }}>
            LAND REQUIRED: 38,420 Ha | ACQUIRED: 23,650 Ha
          </span>
        </div>

        {/* Stage Flow Nodes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          position: 'relative'
        }}>
          {nationalStageFlow.map((flow, index) => {
            return (
              <div
                key={flow.stage}
                onClick={() => handleStageClick(flow.stage)}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#008E4F';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 142, 79, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span className="mono-code" style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase'
                  }}>
                    STAGE 0{index + 1}
                  </span>
                  {index < 4 && (
                    <ArrowRight size={13} style={{ color: '#008E4F' }} />
                  )}
                </div>

                <div style={{
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#0F172A',
                  lineHeight: 1
                }}>
                  {flow.count}
                </div>

                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#008E4F',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginTop: '6px'
                }}>
                  {flow.stage}
                </div>

                <div style={{
                  fontSize: '11px',
                  color: '#64748B',
                  marginTop: '4px',
                  lineHeight: 1.4
                }}>
                  {flow.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-COLUMN SECTION: RFCTLARR COMPLIANCE (7.2) & SOCIAL IMPACT (7.3) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
        gap: '24px'
      }}>
        {/* 7.2 RFCTLARR COMPLIANCE SECTION */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header" style={{ marginBottom: '14px', paddingBottom: '12px' }}>
              <div>
                <div className="card-title">
                  <FileCheck size={16} strokeWidth={2} style={{ color: '#0B4726' }} />
                  RFCTLARR Statutory Compliance
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 0' }}>
                  Verification across 9 mandatory statutory sections under RFCTLARR Act 2013
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#059669',
                  lineHeight: 1.1
                }}>
                  88.4%
                </div>
                <span style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                  National Average
                </span>
              </div>
            </div>

            {/* Compliance Breakdown Table */}
            <div className="table-container" style={{ margin: 0, boxShadow: 'none' }}>
              <table className="gov-table">
                <thead>
                  <tr>
                    <th style={{ padding: '12px 14px' }}>Statutory Section</th>
                    <th style={{ padding: '12px 14px' }}>Milestone Requirement</th>
                    <th style={{ textAlign: 'right', padding: '12px 14px' }}>Compliance %</th>
                    <th style={{ textAlign: 'right', padding: '12px 14px' }}>Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {nationalRfctlarrCompliance.statutoryMilestones.slice(0, 5).map((row, idx) => (
                    <tr key={row.section}>
                      <td className="mono-code" style={{ padding: '12px 14px', color: '#0F172A' }}>
                        {row.section}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#334155' }}>
                        {row.title}
                      </td>
                      <td className="mono-code" style={{ textAlign: 'right', padding: '12px 14px', color: row.complianceRate < 85 ? '#C5221F' : '#059669', fontWeight: 700 }}>
                        {row.complianceRate}%
                      </td>
                      <td className="mono-code" style={{ textAlign: 'right', padding: '12px 14px', color: '#64748B' }}>
                        {row.pendingCases} projects
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Showing top 5 of 9 statutory sections. Section 31 R&amp;R has lowest compliance (79%).
            </span>
            <button
              onClick={() => onNavigate && onNavigate('reports')}
              className="btn btn-secondary btn-sm"
              style={{
                background: 'none',
                border: 'none',
                color: '#008E4F',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 0'
              }}
            >
              Full Compliance Audit <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* 7.3 AFFECTED FAMILIES / SOCIAL IMPACT SECTION */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header" style={{ marginBottom: '14px', paddingBottom: '12px' }}>
              <div>
                <div className="card-title">
                  <Users size={16} strokeWidth={2} style={{ color: '#0B4726' }} />
                  Social Impact &amp; Land Types
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 0' }}>
                  Displaced citizen demographic and parcel classification across projects
                </p>
              </div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#E6F4EA',
                color: '#008E4F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Users size={18} />
              </div>
            </div>

            {/* Families Category Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
              <div
                onClick={() => handleSocialImpactClick('all')}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Total Families</div>
                <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                  84,320
                </div>
              </div>

              <div
                onClick={() => handleSocialImpactClick('tribal')}
                style={{
                  background: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#F59E0B';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(217, 119, 6, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#FDE68A';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '11px', color: '#92400E', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>Tribal / PESA</div>
                <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '20px', fontWeight: 800, color: '#92400E', marginTop: '4px' }}>
                  14,850
                </div>
              </div>

              <div
                onClick={() => handleSocialImpactClick('marginal')}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Smallholder Farmers</div>
                <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                  42,100
                </div>
              </div>
            </div>

            {/* Land Type Breakdown Matrix */}
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.7px', color: '#475569', fontWeight: 700, marginBottom: '10px' }}>
              Land Type Distribution (Total: 38,420 Ha)
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                <span style={{ color: '#334155', fontSize: '12px', fontWeight: 600 }}>Irrigated Agriculture:</span>
                <strong className="mono-code" style={{ fontSize: '12px', color: '#0F172A' }}>16,240 Ha (42.3%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                <span style={{ color: '#334155', fontSize: '12px', fontWeight: 600 }}>Unirrigated Farmland:</span>
                <strong className="mono-code" style={{ fontSize: '12px', color: '#0F172A' }}>9,810 Ha (25.5%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                <span style={{ color: '#334155', fontSize: '12px', fontWeight: 600 }}>Forest Land (MoEF):</span>
                <strong className="mono-code" style={{ fontSize: '12px', color: '#92400E' }}>4,520 Ha (11.8%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                <span style={{ color: '#334155', fontSize: '12px', fontWeight: 600 }}>Private NA Land:</span>
                <strong className="mono-code" style={{ fontSize: '12px', color: '#0F172A' }}>4,120 Ha (10.7%)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. THE X-FACTOR — SWADESH TRANSFORMATION GRAPHICAL BENCHMARK & AUDIT TELEMETRY */}
      <MordTransformationSection onNavigate={onNavigate} />

      {/* 9. PRIORITY ALERTS & ACTIONABLE DIRECTIVES (WITH SYSTEM ANALYSIS TAGS) */}
      <div className="card" style={{ borderLeft: '4px solid #C5221F' }}>
        <div className="card-header" style={{ marginBottom: '18px', paddingBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="card-title">
              <Shield size={16} strokeWidth={2} style={{ color: '#C5221F' }} />
              Supervisory Priority Alerts &amp; Administrative Interventions
              <span className="mono-code" style={{
                fontSize: '10px',
                padding: '3px 8px',
                background: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FDE68A',
                borderRadius: '6px',
                fontWeight: 700
              }}>
                AI-ASSISTED SYSTEM ANALYSIS
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 0' }}>
              Analytical decision-support identifying delays, statutory risks, and recommending executive action.
            </p>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate && onNavigate('alerts')}
          >
            All Alerts ({delayedProjects.length})
          </button>
        </div>

        {/* Alerts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {delayedProjects.slice(0, 4).map(proj => (
            <div
              key={proj.id}
              style={{
                border: '1px solid #E2E8F0',
                borderLeft: '4px solid #C5221F',
                borderRadius: '12px',
                background: '#F8FAFC',
                padding: '16px 20px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '16px',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span className="mono-code" style={{
                    fontSize: '10px',
                    background: '#FEE2E2',
                    color: '#C5221F',
                    border: '1px solid #FCA5A5',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    fontWeight: 700
                  }}>
                    HIGH RISK
                  </span>
                  <strong style={{ fontSize: '14px', color: '#0F172A' }}>
                    {proj.name}
                  </strong>
                  <span className="mono-code" style={{ fontSize: '12px', color: '#64748B' }}>
                    [{proj.id}] · {proj.state} ({proj.district})
                  </span>
                </div>

                <div style={{ fontSize: '12.5px', color: '#334155', marginTop: '4px' }}>
                  <strong>Stage:</strong> {proj.stage} &nbsp;|&nbsp;
                  <strong>Issue:</strong> {proj.pendingReason?.reason || 'Project stalled exceeding standard timeline'} &nbsp;|&nbsp;
                  <strong>Idle Period:</strong> <span style={{ color: '#C5221F', fontWeight: 600 }}>{proj.pendingReason?.idleDays || proj.delayDays || 30} Days</span>
                </div>

                <div style={{
                  fontSize: '11.5px',
                  color: '#008E4F',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Shield size={12} />
                  <span>
                    <strong>Recommended Review:</strong> {proj.aiAnalysis?.recommendedReview || 'Issue show-cause directive to District Collector'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleOpenDirective(proj)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    padding: '8px 14px'
                  }}
                  title="Demand formal explanation or issue guidance"
                >
                  <Send size={12} />
                  Demand Explanation
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onNavigate && onNavigate('project-detail', proj.id)}
                  style={{ fontSize: '12px', padding: '8px 14px' }}
                >
                  View Case
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Issuing Supervisory Directive */}
      {selectedProjectForDirective && (
        <MordIssueDirectiveModal
          isOpen={isDirectiveModalOpen}
          onClose={() => {
            setIsDirectiveModalOpen(false);
            setSelectedProjectForDirective(null);
          }}
          project={selectedProjectForDirective}
          onDirectiveIssued={(directive) => {
            // Persist directive
            const saved = localStorage.getItem('swadesh_mord_directives');
            const list = saved ? JSON.parse(saved) : [];
            localStorage.setItem('swadesh_mord_directives', JSON.stringify([directive, ...list]));
          }}
        />
      )}
    </div>
  );
}
