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
  HelpCircle
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
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '24px 28px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* High-Level Notification Ribbon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#F2ECDC',
        color: '#8A6A1E',
        border: '1px solid #8A6A1E',
        padding: '10px 18px',
        fontSize: '13px',
        marginBottom: '24px',
        borderRadius: '2px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertTriangle size={16} style={{ color: '#8A6A1E' }} />
          <span>
            <strong>National Oversight Alert:</strong> 19 projects currently record abnormal delay (&gt;30 days). 3 ministerial directives are awaiting state responses.
          </span>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('alerts')}
          style={{
            background: 'none',
            border: 'none',
            color: '#8A6A1E',
            textDecoration: 'underline',
            fontWeight: 600,
            fontSize: '12.5px',
            cursor: 'pointer'
          }}
        >
          View Directives Console →
        </button>
      </div>

      {/* TOP KPI STRIP - PORTFOLIO COMMAND SUMMARY */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#3A4A63',
          fontWeight: 700,
          margin: '0 0 10px'
        }}>
          National Land Acquisition Portfolio Overview
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          background: '#D8D5CB',
          border: '1px solid #D8D5CB'
        }}>
          <div style={{ background: '#FFFFFF', padding: '16px 20px' }}>
            <p style={{ fontSize: '11.5px', color: '#3A4A63', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Projects
            </p>
            <p style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, color: '#16233A', margin: 0 }}>
              128
            </p>
            <p style={{ fontSize: '11px', color: '#6B7280', margin: '4px 0 0' }}>Across 28 States / UTs</p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px' }}>
            <p style={{ fontSize: '11.5px', color: '#3A4A63', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Land Acquired
            </p>
            <p style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, color: '#16233A', margin: 0 }}>
              23,650 <span style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Ha</span>
            </p>
            <p style={{ fontSize: '11px', color: '#2F6F62', margin: '4px 0 0', fontWeight: 500 }}>61.5% of 38,420 Ha Target</p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px' }}>
            <p style={{ fontSize: '11.5px', color: '#3A4A63', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Forest & Tribal Land Under Projects
            </p>
            <p style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, color: '#16233A', margin: 0 }}>
              7,460 <span style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Ha</span>
            </p>
            <p style={{ fontSize: '11px', color: '#8A6A1E', margin: '4px 0 0', fontWeight: 500 }}>4,520 Ha Forest · 2,940 Ha Tribal (PESA)</p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px' }}>
            <p style={{ fontSize: '11.5px', color: '#3A4A63', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Affected Families
            </p>
            <p style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, color: '#16233A', margin: 0 }}>
              84,320
            </p>
            <p style={{ fontSize: '11px', color: '#8A6A1E', margin: '4px 0 0' }}>14,850 Tribal / PESA</p>
          </div>
        </div>
      </div>

      {/* 7.1 PROMINENT STAGE-FLOW VISUALIZATION */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D8D5CB',
        padding: '24px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '18px', fontWeight: 600, margin: '0 0 4px', color: '#16233A' }}>
              Statutory Stage-Flow Pipeline
            </h3>
            <p style={{ fontSize: '12.5px', color: '#3A4A63', margin: 0 }}>
              National tracking of projects progressing through the statutory RFCTLARR stages. Click any stage to inspect underlying projects.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#F2F1EC',
            padding: '6px 14px',
            border: '1px solid #D8D5CB',
            fontSize: '12px',
            fontFamily: '"IBM Plex Mono", monospace'
          }}>
            <span style={{ color: '#3A4A63' }}>PARALLEL METRIC:</span>
            <strong style={{ color: '#16233A' }}>LAND REQUIRED: 38,420 Ha</strong>
            <span style={{ color: '#2F6F62' }}>| ACQUIRED: 23,650 Ha</span>
          </div>
        </div>

        {/* Stage Flow Nodes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '12px',
          position: 'relative'
        }}>
          {nationalStageFlow.map((flow, index) => {
            return (
              <div
                key={flow.stage}
                onClick={() => handleStageClick(flow.stage)}
                style={{
                  background: '#FBFAF6',
                  border: '1px solid #D8D5CB',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#2F6F62';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 111, 98, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FBFAF6';
                  e.currentTarget.style.borderColor = '#D8D5CB';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 700,
                    color: '#6B7280',
                    textTransform: 'uppercase'
                  }}>
                    STAGE 0{index + 1}
                  </span>
                  {index < 4 && (
                    <ArrowRight size={13} style={{ color: '#2F6F62' }} />
                  )}
                </div>

                <div style={{
                  fontFamily: '"Source Serif Pro", Georgia, serif',
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#16233A',
                  lineHeight: 1
                }}>
                  {flow.count}
                </div>

                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#2F6F62',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginTop: '6px'
                }}>
                  {flow.stage}
                </div>

                <div style={{
                  fontSize: '11px',
                  color: '#6B7280',
                  marginTop: '4px',
                  lineHeight: 1.3
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
        gridTemplateColumns: '1.2fr 1fr',
        gap: '24px',
        marginBottom: '30px'
      }}>
        {/* 7.2 RFCTLARR COMPLIANCE SECTION */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #D8D5CB',
          padding: '22px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <h4 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '16px', fontWeight: 600, margin: '0 0 2px', color: '#16233A' }}>
                RFCTLARR Statutory Compliance
              </h4>
              <p style={{ fontSize: '12px', color: '#3A4A63', margin: 0 }}>
                Verification across 9 mandatory statutory sections under RFCTLARR Act 2013
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: '"Source Serif Pro", Georgia, serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#2F6F62'
              }}>
                88.4%
              </div>
              <span style={{ fontSize: '10.5px', color: '#6B7280', textTransform: 'uppercase' }}>
                National Average
              </span>
            </div>
          </div>

          {/* Compliance Breakdown Table */}
          <div style={{ border: '1px solid #D8D5CB', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ background: '#F2F1EC', borderBottom: '1px solid #D8D5CB' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>Statutory Section</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>Milestone Requirement</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>Compliance %</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>Pending</th>
                </tr>
              </thead>
              <tbody>
                {nationalRfctlarrCompliance.statutoryMilestones.slice(0, 5).map((row, idx) => (
                  <tr key={row.section} style={{
                    borderBottom: '1px solid #D8D5CB',
                    background: idx % 2 === 0 ? '#FFFFFF' : '#FBFAF6'
                  }}>
                    <td style={{ padding: '8px 12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#16233A' }}>
                      {row.section}
                    </td>
                    <td style={{ padding: '8px 12px', color: '#3A4A63' }}>
                      {row.title}
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: row.complianceRate < 85 ? '#A6432B' : '#2F6F62' }}>
                      {row.complianceRate}%
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', color: '#6B7280' }}>
                      {row.pendingCases} projects
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', color: '#6B7280' }}>
              Showing top 5 of 9 statutory sections. Section 31 R&R has lowest compliance (79%).
            </span>
            <button
              onClick={() => onNavigate && onNavigate('reports')}
              style={{
                background: 'none',
                border: 'none',
                color: '#2F6F62',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Full Compliance Audit <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* 7.3 AFFECTED FAMILIES / SOCIAL IMPACT SECTION */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #D8D5CB',
          padding: '22px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <h4 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '16px', fontWeight: 600, margin: '0 0 2px', color: '#16233A' }}>
                Social Impact & Land Types
              </h4>
              <p style={{ fontSize: '12px', color: '#3A4A63', margin: 0 }}>
                Displaced citizen demographic and parcel classification across projects
              </p>
            </div>
            <Users size={20} style={{ color: '#2F6F62' }} />
          </div>

          {/* Families Category Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
            <div
              onClick={() => handleSocialImpactClick('all')}
              style={{
                background: '#F2F1EC',
                border: '1px solid #D8D5CB',
                padding: '10px 12px',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '10.5px', color: '#6B7280', textTransform: 'uppercase' }}>Total Families</div>
              <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', fontWeight: 700, color: '#16233A' }}>
                84,320
              </div>
            </div>

            <div
              onClick={() => handleSocialImpactClick('tribal')}
              style={{
                background: '#F2ECDC',
                border: '1px solid #8A6A1E',
                padding: '10px 12px',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '10.5px', color: '#8A6A1E', textTransform: 'uppercase', fontWeight: 600 }}>Tribal / PESA</div>
              <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', fontWeight: 700, color: '#8A6A1E' }}>
                14,850
              </div>
            </div>

            <div
              onClick={() => handleSocialImpactClick('marginal')}
              style={{
                background: '#F2F1EC',
                border: '1px solid #D8D5CB',
                padding: '10px 12px',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '10.5px', color: '#6B7280', textTransform: 'uppercase' }}>Smallholder Farmers</div>
              <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', fontWeight: 700, color: '#16233A' }}>
                42,100
              </div>
            </div>
          </div>

          {/* Land Type Breakdown Matrix */}
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', fontWeight: 600, margin: '0 0 6px' }}>
            Land Type Distribution (Total: 38,420 Ha)
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            fontSize: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
              <span style={{ color: '#3A4A63' }}>Irrigated Agriculture:</span>
              <strong style={{ fontFamily: 'monospace' }}>16,240 Ha (42.3%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
              <span style={{ color: '#3A4A63' }}>Unirrigated Farmland:</span>
              <strong style={{ fontFamily: 'monospace' }}>9,810 Ha (25.5%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
              <span style={{ color: '#3A4A63' }}>Forest Land (MoEF):</span>
              <strong style={{ fontFamily: 'monospace', color: '#8A6A1E' }}>4,520 Ha (11.8%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
              <span style={{ color: '#3A4A63' }}>Private NA Land:</span>
              <strong style={{ fontFamily: 'monospace' }}>4,120 Ha (10.7%)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 8. THE X-FACTOR — SWADESH TRANSFORMATION GRAPHICAL BENCHMARK & AUDIT TELEMETRY */}
      <MordTransformationSection onNavigate={onNavigate} />


      {/* 9. PRIORITY ALERTS & ACTIONABLE DIRECTIVES (WITH SYSTEM ANALYSIS TAGS) */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D8D5CB',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '18px', fontWeight: 600, margin: 0, color: '#16233A' }}>
                Supervisory Priority Alerts & Administrative Interventions
              </h3>
              <span style={{
                fontSize: '10px',
                fontFamily: '"IBM Plex Mono", monospace',
                padding: '2px 6px',
                background: '#F2ECDC',
                color: '#8A6A1E',
                border: '1px solid #8A6A1E',
                fontWeight: 600
              }}>
                AI-ASSISTED SYSTEM ANALYSIS
              </span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#3A4A63', margin: '4px 0 0' }}>
              Analytical decision-support identifying delays, statutory risks, and recommending executive action.
            </p>
          </div>

          <button
            onClick={() => onNavigate && onNavigate('alerts')}
            style={{
              background: 'none',
              border: '1px solid #D8D5CB',
              padding: '6px 12px',
              fontSize: '12px',
              color: '#3A4A63',
              cursor: 'pointer'
            }}
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
                border: '1px solid #D8D5CB',
                borderLeft: '4px solid #A6432B',
                background: '#FBFAF6',
                padding: '14px 18px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '16px',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: '"IBM Plex Mono", monospace',
                    background: '#F6E7E2',
                    color: '#A6432B',
                    border: '1px solid #A6432B',
                    padding: '1px 6px',
                    fontWeight: 700
                  }}>
                    HIGH RISK
                  </span>
                  <strong style={{ fontSize: '14px', color: '#16233A' }}>
                    {proj.name}
                  </strong>
                  <span style={{ fontSize: '12px', fontFamily: '"IBM Plex Mono", monospace', color: '#6B7280' }}>
                    [{proj.id}] · {proj.state} ({proj.district})
                  </span>
                </div>

                <div style={{ fontSize: '12.5px', color: '#3A4A63', marginTop: '4px' }}>
                  <strong>Stage:</strong> {proj.stage} &nbsp;|&nbsp;
                  <strong>Issue:</strong> {proj.pendingReason?.reason || 'Project stalled exceeding standard timeline'} &nbsp;|&nbsp;
                  <strong>Idle Period:</strong> <span style={{ color: '#A6432B', fontWeight: 600 }}>{proj.pendingReason?.idleDays || proj.delayDays || 30} Days</span>
                </div>

                <div style={{
                  fontSize: '11.5px',
                  color: '#2F6F62',
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
                  onClick={() => handleOpenDirective(proj)}
                  style={{
                    background: '#2F6F62',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Demand formal explanation or issue guidance"
                >
                  <Send size={12} />
                  Demand Explanation
                </button>

                <button
                  onClick={() => onNavigate && onNavigate('project-detail', proj.id)}
                  style={{
                    background: '#FFFFFF',
                    color: '#16233A',
                    border: '1px solid #D8D5CB',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    borderRadius: '2px'
                  }}
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
