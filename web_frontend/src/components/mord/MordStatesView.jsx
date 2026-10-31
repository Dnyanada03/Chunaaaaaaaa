import React, { useState } from 'react';
import { Building2, ChevronRight, MapPin, AlertTriangle, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { stateWiseSupervisoryData, getAllMordProjects } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';

export default function MordStatesView({ onNavigate }) {
  const { projects: contextProjects } = useSwadesh();
  const allProjects = getAllMordProjects(contextProjects);

  const [selectedStateModal, setSelectedStateModal] = useState(null);

  const handleStateClick = (stateName) => {
    setSelectedStateModal(stateName);
  };

  const stateProjects = selectedStateModal
    ? allProjects.filter(p => p.state === selectedStateModal)
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>State-Wise Land Acquisition Governance</h1>
          <p>Comparative statutory performance, RFCTLARR compliance and administrative bottleneck analysis across Indian States • Inter-State Supervisory Matrix</p>
        </div>
      </div>

      {/* STATE PERFORMANCE COMPARATIVE TABLE */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div className="table-container" style={{ margin: 0, border: 'none', borderRadius: 0 }}>
          <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>STATE / UT</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>ACTIVE</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>COMPLETED</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>DELAYED</th>
                <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>LAND REQUIRED</th>
                <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>ACQUIRED</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>FAMILIES</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>RFCTLARR %</th>
                <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>DISBURSED</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>GRIEVANCES</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>AVG DELAY</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>RISK</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>PORTFOLIO</th>
              </tr>
            </thead>
            <tbody>
              {stateWiseSupervisoryData.map((st, index) => {
                const isCrit = st.riskLevel === 'Critical';
                const isHigh = st.riskLevel === 'High';

                return (
                  <tr
                    key={st.state}
                    style={{
                      borderBottom: '1px solid #E2E8F0',
                      background: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                      transition: 'background 0.1s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F5F9'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = index % 2 === 0 ? '#FFFFFF' : '#F8FAFC'; }}
                  >
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Building2 size={14} style={{ color: '#008E4F' }} />
                        <span>{st.state}</span>
                      </div>
                    </td>

                    <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600 }}>
                      {st.activeProjects}
                    </td>

                    <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)', color: '#008E4F', fontWeight: 600 }}>
                      {st.completedProjects}
                    </td>

                    <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)', color: st.delayedProjects > 1 ? '#DC2626' : '#D97706', fontWeight: 600 }}>
                      {st.delayedProjects}
                    </td>

                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-mono, monospace)' }}>
                      {st.landRequiredHa} Ha
                    </td>

                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-mono, monospace)', color: '#008E4F', fontWeight: 600 }}>
                      {st.landAcquiredHa} Ha
                    </td>

                    <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)' }}>
                      {st.affectedFamilies}
                    </td>

                    <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, color: st.rfctlarrCompliance < 80 ? '#DC2626' : '#008E4F' }}>
                      {st.rfctlarrCompliance}%
                    </td>

                    <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-mono, monospace)' }}>
                      {st.totalCompDisbursed}
                    </td>

                    <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)', color: st.totalGrievances > 150 ? '#DC2626' : '#475569' }}>
                      {st.totalGrievances}
                    </td>

                    <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)' }}>
                      {st.avgDelayDays} Days
                    </td>

                    <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                      <span style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono, monospace)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: isCrit || isHigh ? '#FCA5A5' : st.riskLevel === 'Medium' ? '#FCD34D' : '#86EFAC',
                        background: isCrit || isHigh ? '#FEE2E2' : st.riskLevel === 'Medium' ? '#FEF3C7' : '#E6F4EA',
                        color: isCrit || isHigh ? '#B91C1C' : st.riskLevel === 'Medium' ? '#B45309' : '#15803D',
                        fontWeight: 700
                      }}>
                        {st.riskLevel.toUpperCase()}
                      </span>
                    </td>

                    <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleStateClick(st.state)}
                        style={{
                          padding: '4px 10px',
                          fontSize: '11.5px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                      >
                        View Portfolio <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* STATE PORTFOLIO DRILL-DOWN MODAL */}
      {selectedStateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            width: '100%',
            maxWidth: '960px',
            maxHeight: '85vh',
            border: '1px solid #E2E8F0',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #008E4F 0%, #0B4726 100%)',
              color: '#FFFFFF',
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A7F3D0', fontWeight: 700 }}>
                  State Portfolio Supervision
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif, "Merriweather", Georgia, serif)', fontSize: '18px', fontWeight: 700, margin: '2px 0 0', color: '#FFFFFF' }}>
                  {selectedStateModal} — Active Projects Portfolio ({stateProjects.length})
                </h3>
              </div>
              <button
                onClick={() => setSelectedStateModal(null)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {stateProjects.length === 0 ? (
                  <p style={{ color: '#64748B', textAlign: 'center', padding: '30px' }}>
                    No specific individual project records currently mapped for this state.
                  </p>
                ) : (
                  stateProjects.map(p => (
                    <div
                      key={p.id}
                      style={{
                        border: '1px solid #E2E8F0',
                        borderRadius: '12px',
                        background: '#F8FAFC',
                        padding: '14px 18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: '#008E4F', fontWeight: 700 }}>
                            {p.id}
                          </span>
                          <span style={{
                            fontSize: '10px',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid',
                            borderColor: p.status === 'Delayed' ? '#FCA5A5' : '#86EFAC',
                            color: p.status === 'Delayed' ? '#B91C1C' : '#15803D',
                            background: p.status === 'Delayed' ? '#FEE2E2' : '#E6F4EA',
                            fontWeight: 700
                          }}>
                            {p.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginTop: '2px' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                          District: {p.district} &nbsp;|&nbsp;
                          Stage: {p.stage} &nbsp;|&nbsp;
                          Land: {p.landRequiredHa} Ha &nbsp;|&nbsp;
                          Budget: {p.estimatedBudget}
                        </div>
                      </div>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setSelectedStateModal(null);
                          onNavigate && onNavigate('project-detail', p.id);
                        }}
                      >
                        Inspect Case →
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
