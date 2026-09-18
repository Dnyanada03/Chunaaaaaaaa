import React, { useState } from 'react';
import { GitCompare, TrendingDown, TrendingUp, CheckCircle2, Shield, AlertCircle, Clock, Database } from 'lucide-react';
import { swadeshTransformationStages } from '../../data/mordData';

export default function MordTransformationView() {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const activeStage = swadeshTransformationStages[selectedStageIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div className="page-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title-group">
          <h1>The SWADESH Transformation: Before vs. After</h1>
          <p>Evidence-driven comparison demonstrating how the SWADESH national e-governance platform replaces decades of fragmented manual processes across every statutory stage of RFCTLARR land acquisition • National Reform Evidence</p>
        </div>

        {/* Data Provenance Badge */}
        <div style={{
          background: '#E6F4EA',
          border: '1px solid #CEEAD6',
          borderRadius: '8px',
          padding: '8px 14px',
          fontSize: '11px',
          textAlign: 'right'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', color: '#008E4F', fontWeight: 700 }}>
            <Database size={13} />
            <span>Audited Telemetry vs Historical Baselines</span>
          </div>
          <div style={{ color: '#64748B', marginTop: '2px', fontSize: '10.5px' }}>
            CAG &amp; NITI Aayog PMG Historical Baseline Reference Data
          </div>
        </div>
      </div>

      {/* EXECUTIVE HIGH-LEVEL REFORM METRICS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px'
      }}>
        <div className="card" style={{ borderLeft: '4px solid #008E4F', padding: '18px 20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.04em', fontWeight: 600 }}>
            Project Acquisition Turnaround
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', color: '#DC2626', textDecoration: 'line-through', fontFamily: 'var(--font-mono, monospace)' }}>58 Mos</span>
            <span style={{ fontFamily: 'var(--font-serif, "Merriweather", Georgia, serif)', fontSize: '24px', fontWeight: 700, color: '#008E4F' }}>16 Mos</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#008E4F', fontWeight: 600, marginTop: '4px' }}>
            ↓ 72.4% Average Duration Reduction
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #008E4F', padding: '18px 20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.04em', fontWeight: 600 }}>
            Compensation DBT Settlement
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', color: '#DC2626', textDecoration: 'line-through', fontFamily: 'var(--font-mono, monospace)' }}>240 Days</span>
            <span style={{ fontFamily: 'var(--font-serif, "Merriweather", Georgia, serif)', fontSize: '24px', fontWeight: 700, color: '#008E4F' }}>7 Days</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#008E4F', fontWeight: 600, marginTop: '4px' }}>
            ↓ 97.1% Faster PFMS Bank Transfer
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #008E4F', padding: '18px 20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.04em', fontWeight: 600 }}>
            High Court Stay Injunctions
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', color: '#DC2626', textDecoration: 'line-through', fontFamily: 'var(--font-mono, monospace)' }}>24.8%</span>
            <span style={{ fontFamily: 'var(--font-serif, "Merriweather", Georgia, serif)', fontSize: '24px', fontWeight: 700, color: '#008E4F' }}>3.2%</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#008E4F', fontWeight: 600, marginTop: '4px' }}>
            ↓ 87.1% Litigation Rate Drop via GIS
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #008E4F', padding: '18px 20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.04em', fontWeight: 600 }}>
            Citizen Grievance SLA
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', color: '#DC2626', textDecoration: 'line-through', fontFamily: 'var(--font-mono, monospace)' }}>310 Days</span>
            <span style={{ fontFamily: 'var(--font-serif, "Merriweather", Georgia, serif)', fontSize: '24px', fontWeight: 700, color: '#008E4F' }}>24 Days</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#008E4F', fontWeight: 600, marginTop: '4px' }}>
            ↓ 92.3% Turnaround with Digital SLA
          </div>
        </div>
      </div>

      {/* STAGE-WISE COMPARISON SHELL: STAGE SELECTOR TABS + COMPARATIVE PANELS */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Stage Selector Header */}
        <div style={{
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          padding: '12px 20px',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto'
        }}>
          {swadeshTransformationStages.map((st, idx) => {
            const isSelected = selectedStageIndex === idx;
            return (
              <button
                key={st.stageId}
                onClick={() => setSelectedStageIndex(idx)}
                style={{
                  padding: '8px 14px',
                  background: isSelected ? '#FFFFFF' : 'transparent',
                  border: isSelected ? '1px solid #E2E8F0' : '1px solid transparent',
                  borderBottom: isSelected ? '2px solid #008E4F' : 'none',
                  borderRadius: '6px 6px 0 0',
                  color: isSelected ? '#008E4F' : '#64748B',
                  fontSize: '12px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {st.stageName.split('.')[0]}. {st.stageName.split('.')[1]?.split('&')[0]}
              </button>
            );
          })}
        </div>

        {/* Comparative Stage Analysis View */}
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: '#E6F4EA',
              color: '#008E4F',
              fontWeight: 700
            }}>
              STATUTORY STAGE DEEP-DIVE
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif, "Merriweather", Georgia, serif)', fontSize: '20px', fontWeight: 700, color: '#0F172A', margin: '6px 0 2px' }}>
              {activeStage.stageName}
            </h2>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Telemetry: {activeStage.systemTelemetrySource} &nbsp;|&nbsp; {activeStage.baselineDatasetStatus}
            </div>
          </div>

          {/* SIDE-BY-SIDE PROCESS PARADIGM COMPARISON */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '26px'
          }}>
            {/* TRADITIONAL PROCESS (BEFORE) */}
            <div style={{
              background: '#FFF5F5',
              border: '1px solid #FED7D7',
              borderLeft: '4px solid #DC2626',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono, monospace)',
                  background: '#FEE2E2',
                  color: '#B91C1C',
                  border: '1px solid #FCA5A5',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontWeight: 700
                }}>
                  BEFORE SWADESH
                </span>
                <strong style={{ fontSize: '13.5px', color: '#0F172A' }}>
                  Traditional Process (Pehle Kya Scene Tha?)
                </strong>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: '0 0 14px' }}>
                {activeStage.traditionalProcess}
              </p>

              <div style={{ background: '#FFFFFF', border: '1px solid #FED7D7', borderRadius: '6px', padding: '10px 12px', fontSize: '11.5px', color: '#64748B' }}>
                <strong>Key Administrative Friction:</strong> Physical paperwork, lack of cross-departmental coordination, delayed Gazette printing, and frequent boundary disputes leading to High Court stays.
              </div>
            </div>

            {/* SWADESH PROCESS (AFTER) */}
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderLeft: '4px solid #008E4F',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono, monospace)',
                  background: '#DCFCE7',
                  color: '#15803D',
                  border: '1px solid #86EFAC',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontWeight: 700
                }}>
                  AFTER SWADESH
                </span>
                <strong style={{ fontSize: '13.5px', color: '#0F172A' }}>
                  Improved System (Ab Kya Change Hua Hai?)
                </strong>
              </div>

              <p style={{ fontSize: '13px', color: '#0F172A', lineHeight: 1.6, margin: '0 0 14px' }}>
                {activeStage.swadeshProcess}
              </p>

              <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '6px', padding: '10px 12px', fontSize: '11.5px', color: '#15803D' }}>
                <strong>Institutional Impact:</strong> Instant GIS cadastral conflict detection, automated statutory timers, Class-3 DSC digital gazette issuance, and direct PFMS bank transfer.
              </div>
            </div>
          </div>

          {/* CONCRETE AUDITABLE COMPARATIVE METRICS TABLE */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif, "Merriweather", Georgia, serif)', fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '0 0 12px' }}>
              Measurable Key Performance Indicators (Stage 0{selectedStageIndex + 1})
            </h4>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
              <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ textAlign: 'left', padding: '12px 14px', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>PERFORMANCE INDICATOR</th>
                    <th style={{ textAlign: 'center', padding: '12px 14px', fontSize: '11px', color: '#DC2626', fontWeight: 700, textTransform: 'uppercase' }}>BEFORE SWADESH (TRADITIONAL)</th>
                    <th style={{ textAlign: 'center', padding: '12px 14px', fontSize: '11px', color: '#008E4F', fontWeight: 700, textTransform: 'uppercase' }}>AFTER SWADESH (E-PLATFORM)</th>
                    <th style={{ textAlign: 'right', padding: '12px 14px', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>MEASURED REFORM DELTA</th>
                  </tr>
                </thead>
                <tbody>
                  {activeStage.keyMetrics.map((m, mIdx) => (
                    <tr
                      key={m.metric}
                      style={{
                        borderBottom: '1px solid #E2E8F0',
                        background: mIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'
                      }}
                    >
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0F172A' }}>
                        {m.metric}
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)', color: '#DC2626' }}>
                        {m.before}
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, color: '#008E4F' }}>
                        {m.after}
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, color: '#008E4F' }}>
                        {m.changePct < 0 ? `↓ ${Math.abs(m.changePct)}%` : `↑ ${m.changePct}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
