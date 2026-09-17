import React, { useState } from 'react';
import { Landmark, AlertTriangle, ShieldCheck, ChevronRight, Activity } from 'lucide-react';
import { ministryWiseSupervisoryData, getAllMordProjects } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';

export default function MordMinistriesView({ onNavigate }) {
  const { projects: contextProjects } = useSwadesh();
  const allProjects = getAllMordProjects(contextProjects);

  const [selectedMinistryModal, setSelectedMinistryModal] = useState(null);

  const handleMinistryClick = (ministryName) => {
    setSelectedMinistryModal(ministryName);
  };

  const ministryProjects = selectedMinistryModal
    ? allProjects.filter(p => p.ministry.toLowerCase().includes(selectedMinistryModal.toLowerCase()) || p.authority.toLowerCase().includes(selectedMinistryModal.toLowerCase()))
    : [];

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '24px 28px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Page Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280', fontWeight: 600 }}>
            Inter-Ministerial Project Monitoring
          </div>
          <h2 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '2px 0 0', color: '#16233A' }}>
            Central Ministries &amp; Departments Governance
          </h2>
          <p style={{ fontSize: '13px', color: '#3A4A63', margin: '4px 0 0' }}>
            Supervisory diagnostic identifying departmental bottlenecks, compensation disbursement lag and statutory compliance across central portfolios.
          </p>
        </div>
      </div>

      {/* MINISTRY COMPARISON TABLE */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D8D5CB',
        overflowX: 'auto',
        marginBottom: '24px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
          <thead>
            <tr style={{ background: '#F2F1EC', borderBottom: '1px solid #16233A' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>MINISTRY / AGENCY</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>ACTIVE</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>COMPLETED</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>DELAYED</th>
              <th style={{ padding: '10px 14px', textAlign: 'right', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>TOTAL LAND</th>
              <th style={{ padding: '10px 14px', textAlign: 'right', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>TOTAL BUDGET</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>DISBURSED %</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>RFCTLARR %</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>PRIMARY BOTTLENECK</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {ministryWiseSupervisoryData.map((min, index) => {
              const isCrit = min.bottleneckIndex === 'Critical';
              const isHigh = min.bottleneckIndex === 'High';

              return (
                <tr
                  key={min.ministry}
                  style={{
                    borderBottom: '1px solid #D8D5CB',
                    background: index % 2 === 0 ? '#FFFFFF' : '#FBFAF6'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F2F1EC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = index % 2 === 0 ? '#FFFFFF' : '#FBFAF6'; }}
                >
                  <td style={{ padding: '12px 14px', maxWidth: '280px' }}>
                    <div style={{ fontWeight: 700, color: '#16233A' }}>{min.ministry}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '1px' }}>{min.short}</div>
                  </td>

                  <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>
                    {min.activeProjects}
                  </td>

                  <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', color: '#2F6F62' }}>
                    {min.completedProjects}
                  </td>

                  <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', color: min.delayedProjects > 3 ? '#A6432B' : '#8A6A1E', fontWeight: 600 }}>
                    {min.delayedProjects}
                  </td>

                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>
                    {min.totalLandHa} Ha
                  </td>

                  <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}>
                    {min.totalBudget}
                  </td>

                  <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', color: min.compDisbursedPct < 60 ? '#A6432B' : '#2F6F62', fontWeight: 600 }}>
                    {min.compDisbursedPct}%
                  </td>

                  <td style={{ padding: '12px 12px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: min.rfctlarrCompliance < 80 ? '#A6432B' : '#2F6F62' }}>
                    {min.rfctlarrCompliance}%
                  </td>

                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      fontSize: '11px',
                      color: isCrit ? '#A6432B' : isHigh ? '#A6432B' : '#3A4A63',
                      fontWeight: isCrit || isHigh ? 600 : 400
                    }}>
                      {min.primaryIssue}
                    </span>
                  </td>

                  <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleMinistryClick(min.ministry)}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #2F6F62',
                        color: '#2F6F62',
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        borderRadius: '2px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      Portfolio <ChevronRight size={11} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MINISTRY PORTFOLIO MODAL */}
      {selectedMinistryModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(22, 35, 58, 0.65)',
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
            border: '1px solid #D8D5CB',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              background: '#16233A',
              color: '#F2F1EC',
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #2F6F62'
            }}>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9FC2B4', fontWeight: 600 }}>
                  Central Ministry Supervisory Review
                </div>
                <h3 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '18px', fontWeight: 600, margin: '2px 0 0', color: '#FFFFFF' }}>
                  {selectedMinistryModal} — Projects
                </h3>
              </div>
              <button
                onClick={() => setSelectedMinistryModal(null)}
                style={{ background: 'none', border: 'none', color: '#CBD3DE', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ministryProjects.length === 0 ? (
                  <p style={{ color: '#6B7280', textAlign: 'center', padding: '30px' }}>
                    No specific individual project records currently mapped for this ministry.
                  </p>
                ) : (
                  ministryProjects.map(p => (
                    <div
                      key={p.id}
                      style={{
                        border: '1px solid #D8D5CB',
                        background: '#FBFAF6',
                        padding: '14px 18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#2F6F62', fontWeight: 700 }}>
                            {p.id}
                          </span>
                          <span style={{ fontSize: '10px', padding: '1px 5px', border: '1px solid', borderColor: p.status === 'Delayed' ? '#A6432B' : '#2F6F62', color: p.status === 'Delayed' ? '#A6432B' : '#2F6F62' }}>
                            {p.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                          State: {p.state} ({p.district}) &nbsp;|&nbsp;
                          Stage: {p.stage} &nbsp;|&nbsp;
                          Land: {p.landRequiredHa} Ha &nbsp;|&nbsp;
                          Budget: {p.estimatedBudget}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedMinistryModal(null);
                          onNavigate && onNavigate('project-detail', p.id);
                        }}
                        style={{
                          background: '#2F6F62',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          borderRadius: '2px'
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
