import React, { useState } from 'react';
import { GitCompare, TrendingDown, TrendingUp, CheckCircle2, Shield, AlertCircle, Clock, Database } from 'lucide-react';
import { swadeshTransformationStages } from '../../data/mordData';

export default function MordTransformationView() {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const activeStage = swadeshTransformationStages[selectedStageIndex];

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '24px 28px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '11px',
              fontFamily: '"IBM Plex Mono", monospace',
              background: '#F2ECDC',
              color: '#8A6A1E',
              border: '1px solid #8A6A1E',
              padding: '2px 8px',
              fontWeight: 700
            }}>
              NATIONAL REFORM EVIDENCE • THE SWADESH X-FACTOR
            </span>
          </div>
          <h1 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '26px', fontWeight: 700, margin: '6px 0 2px', color: '#16233A' }}>
            The SWADESH Transformation: Before vs. After
          </h1>
          <p style={{ fontSize: '13.5px', color: '#3A4A63', margin: '4px 0 0', maxWidth: '80ch' }}>
            Evidence-driven comparison demonstrating how the SWADESH national e-governance platform replaces decades of fragmented manual processes across every statutory stage of RFCTLARR land acquisition.
          </p>
        </div>

        {/* Data Provenance Badge */}
        <div style={{
          background: '#FBFAF6',
          border: '1px solid #D8D5CB',
          padding: '8px 14px',
          fontSize: '11px',
          color: '#3A4A63',
          textAlign: 'right'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', color: '#2F6F62', fontWeight: 600 }}>
            <Database size={13} />
            <span>Audited Telemetry vs Historical Baselines</span>
          </div>
          <div style={{ color: '#6B7280', marginTop: '2px' }}>
            CAG &amp; NITI Aayog PMG Historical Baseline Reference Data
          </div>
        </div>
      </div>

      {/* EXECUTIVE HIGH-LEVEL REFORM METRICS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '14px',
        marginBottom: '26px'
      }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #D8D5CB', padding: '18px 20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em', fontWeight: 600 }}>
            Project Acquisition Turnaround
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', color: '#A6432B', textDecoration: 'line-through', fontFamily: 'monospace' }}>58 Mos</span>
            <span style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '26px', fontWeight: 700, color: '#2F6F62' }}>16 Mos</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#2F6F62', fontWeight: 600, marginTop: '4px' }}>
            ↓ 72.4% Average Duration Reduction
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #D8D5CB', padding: '18px 20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em', fontWeight: 600 }}>
            Compensation DBT Settlement
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', color: '#A6432B', textDecoration: 'line-through', fontFamily: 'monospace' }}>240 Days</span>
            <span style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '26px', fontWeight: 700, color: '#2F6F62' }}>7 Days</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#2F6F62', fontWeight: 600, marginTop: '4px' }}>
            ↓ 97.1% Faster PFMS Bank Transfer
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #D8D5CB', padding: '18px 20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em', fontWeight: 600 }}>
            High Court Stay Injunctions
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', color: '#A6432B', textDecoration: 'line-through', fontFamily: 'monospace' }}>24.8%</span>
            <span style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '26px', fontWeight: 700, color: '#2F6F62' }}>3.2%</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#2F6F62', fontWeight: 600, marginTop: '4px' }}>
            ↓ 87.1% Litigation Rate Drop via GIS
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #D8D5CB', padding: '18px 20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em', fontWeight: 600 }}>
            Citizen Grievance SLA
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', color: '#A6432B', textDecoration: 'line-through', fontFamily: 'monospace' }}>310 Days</span>
            <span style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '26px', fontWeight: 700, color: '#2F6F62' }}>24 Days</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#2F6F62', fontWeight: 600, marginTop: '4px' }}>
            ↓ 92.3% Turnaround with Digital SLA
          </div>
        </div>
      </div>

      {/* STAGE-WISE COMPARISON SHELL: STAGE SELECTOR TABS + COMPARATIVE PANELS */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D8D5CB',
        overflow: 'hidden'
      }}>
        {/* Stage Selector Header */}
        <div style={{
          background: '#F2F1EC',
          borderBottom: '1px solid #D8D5CB',
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
                  border: '1px solid',
                  borderColor: isSelected ? '#2F6F62' : 'transparent',
                  borderBottom: isSelected ? '2px solid #2F6F62' : 'none',
                  color: isSelected ? '#16233A' : '#3A4A63',
                  fontSize: '12px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {st.stageName.split('.')[0]}. {st.stageName.split('.')[1]?.split('&')[0]}
              </button>
            );
          })}
        </div>

        {/* Comparative Stage Analysis View */}
        <div style={{ padding: '28px' }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              padding: '2px 8px',
              background: '#E4EEE9',
              color: '#2F6F62',
              fontWeight: 700
            }}>
              STATUTORY STAGE DEEP-DIVE
            </span>
            <h2 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#16233A', margin: '4px 0 2px' }}>
              {activeStage.stageName}
            </h2>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>
              Telemetry: {activeStage.systemTelemetrySource} &nbsp;|&nbsp; {activeStage.baselineDatasetStatus}
            </div>
          </div>

          {/* SIDE-BY-SIDE PROCESS PARADIGM COMPARISON ("PEHLE KYA SCENE THA? AB KYA CHANGE HUA HAI?") */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '26px'
          }}>
            {/* TRADITIONAL PROCESS (BEFORE) */}
            <div style={{
              background: '#FBFAF6',
              border: '1px solid #D8D5CB',
              borderTop: '4px solid #A6432B',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontFamily: '"IBM Plex Mono", monospace',
                  background: '#F6E7E2',
                  color: '#A6432B',
                  border: '1px solid #A6432B',
                  padding: '2px 6px',
                  fontWeight: 700
                }}>
                  BEFORE SWADESH
                </span>
                <strong style={{ fontSize: '13.5px', color: '#16233A' }}>
                  Traditional Process (Pehle Kya Scene Tha?)
                </strong>
              </div>

              <p style={{ fontSize: '13px', color: '#3A4A63', lineHeight: 1.6, margin: '0 0 14px' }}>
                {activeStage.traditionalProcess}
              </p>

              <div style={{ background: '#FFFFFF', border: '1px solid #D8D5CB', padding: '10px 12px', fontSize: '11.5px', color: '#6B7280' }}>
                <strong>Key Administrative Friction:</strong> Physical paperwork, lack of cross-departmental coordination, delayed Gazette printing, and frequent boundary disputes leading to High Court stays.
              </div>
            </div>

            {/* SWADESH PROCESS (AFTER) */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #2F6F62',
              borderTop: '4px solid #2F6F62',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontFamily: '"IBM Plex Mono", monospace',
                  background: '#E4EEE9',
                  color: '#2F6F62',
                  border: '1px solid #2F6F62',
                  padding: '2px 6px',
                  fontWeight: 700
                }}>
                  AFTER SWADESH
                </span>
                <strong style={{ fontSize: '13.5px', color: '#16233A' }}>
                  Improved System (Ab Kya Change Hua Hai?)
                </strong>
              </div>

              <p style={{ fontSize: '13px', color: '#16233A', lineHeight: 1.6, margin: '0 0 14px' }}>
                {activeStage.swadeshProcess}
              </p>

              <div style={{ background: '#E4EEE9', border: '1px solid #2F6F62', padding: '10px 12px', fontSize: '11.5px', color: '#2F6F62' }}>
                <strong>Institutional Impact:</strong> Instant GIS cadastral conflict detection, automated statutory timers, Class-3 DSC digital gazette issuance, and direct PFMS bank transfer.
              </div>
            </div>
          </div>

          {/* CONCRETE AUDITABLE COMPARATIVE METRICS TABLE */}
          <div>
            <h4 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '16px', fontWeight: 600, color: '#16233A', margin: '0 0 10px' }}>
              Measurable Key Performance Indicators (Stage 0{selectedStageIndex + 1})
            </h4>

            <div style={{ border: '1px solid #D8D5CB', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <thead>
                  <tr style={{ background: '#F2F1EC', borderBottom: '1px solid #16233A' }}>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>PERFORMANCE INDICATOR</th>
                    <th style={{ textAlign: 'center', padding: '10px 14px', fontSize: '11px', color: '#A6432B', fontWeight: 600 }}>BEFORE SWADESH (TRADITIONAL)</th>
                    <th style={{ textAlign: 'center', padding: '10px 14px', fontSize: '11px', color: '#2F6F62', fontWeight: 600 }}>AFTER SWADESH (E-PLATFORM)</th>
                    <th style={{ textAlign: 'right', padding: '10px 14px', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>MEASURED REFORM DELTA</th>
                  </tr>
                </thead>
                <tbody>
                  {activeStage.keyMetrics.map((m, mIdx) => (
                    <tr
                      key={m.metric}
                      style={{
                        borderBottom: '1px solid #D8D5CB',
                        background: mIdx % 2 === 0 ? '#FFFFFF' : '#FBFAF6'
                      }}
                    >
                      <td style={{ padding: '12px 14px', fontWeight: 600, color: '#16233A' }}>
                        {m.metric}
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', color: '#A6432B' }}>
                        {m.before}
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'center', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2F6F62' }}>
                        {m.after}
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: m.changePct < 0 ? '#2F6F62' : '#2F6F62' }}>
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
