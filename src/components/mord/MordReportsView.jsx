import React, { useState } from 'react';
import { FileText, Download, Printer, ChevronRight, CheckCircle2, Shield, Calendar, BarChart3 } from 'lucide-react';
import Emblem from '../common/Emblem';
import { mordOfficerProfile, nationalLandSummary } from '../../data/mordData';

export default function MordReportsView() {
  const [activeReportId, setActiveReportId] = useState('REP-01');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const reportList = [
    { id: 'REP-01', title: 'National Land Acquisition Master Report', category: 'Executive Summary', frequency: 'Monthly (August 2026)', desc: 'Consolidated statutory summary across 128 active infrastructure projects in India.' },
    { id: 'REP-02', title: 'RFCTLARR Statutory Compliance Audit', category: 'Legal & Statutory', frequency: 'Bi-Monthly', desc: 'Section 4, 7, 11, 15, 19, 23 & 31 compliance index across all 28 States.' },
    { id: 'REP-03', title: 'State-wise Performance & Delay Diagnostic', category: 'Inter-State Analysis', frequency: 'Monthly', desc: 'Ranking of state revenue administrations by average processing latency and pending statutory notices.' },
    { id: 'REP-04', title: 'Social Impact, PESA & Tribal Displacement Report', category: 'Social Welfare', frequency: 'Quarterly', desc: 'Audit of 84,320 affected families with focus on 14,850 tribal households and alternative land grants.' },
    { id: 'REP-05', title: 'PFMS Direct Benefit Transfer & Compensation Ledger', category: 'Financial Audit', frequency: 'Real-time / Monthly', desc: 'Tracking ₹ 34,110 Cr disbursed across verified bank accounts vs pending escrow holds.' },
    { id: 'REP-06', title: 'SWADESH Transformation & Time-Reduction Index', category: 'Impact Evaluation', frequency: 'Annual (2026)', desc: 'Empirical measurement of process turnaround reduction (58 months traditional to 16 months SWADESH).' },
    { id: 'REP-07', title: 'Citizen Grievance Redressal & Court Injunction Report', category: 'Grievances & Litigation', frequency: 'Monthly', desc: 'Analysis of 1,420 logged citizen petitions, resolution turnaround, and High Court stay prevention.' },
    { id: 'REP-08', title: 'Critical Projects at Risk & Bottleneck Intervention Brief', category: 'Supervisory Action', frequency: 'Weekly', desc: 'Early warning dossier identifying 19 stalled corridors requiring Ministerial Directives.' }
  ];

  const currentReport = reportList.find(r => r.id === activeReportId) || reportList[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '24px 28px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280', fontWeight: 600 }}>
            Official Statutory Reporting &amp; MIS
          </div>
          <h2 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '2px 0 0', color: '#16233A' }}>
            National Reports &amp; MIS Dossiers
          </h2>
          <p style={{ fontSize: '13px', color: '#3A4A63', margin: '4px 0 0' }}>
            Official regulatory digests generated from real-time land acquisition and PFMS transaction registries.
          </p>
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: REPORT DIRECTORY + ACTIVE PREVIEW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        gap: '20px'
      }}>
        {/* Left: Reports Catalog */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #D8D5CB',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '12px 16px',
            background: '#F2F1EC',
            borderBottom: '1px solid #D8D5CB',
            fontSize: '11.5px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#3A4A63'
          }}>
            Available MIS Reports ({reportList.length})
          </div>

          <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {reportList.map(rep => {
              const isActive = rep.id === activeReportId;
              return (
                <div
                  key={rep.id}
                  onClick={() => setActiveReportId(rep.id)}
                  style={{
                    padding: '12px 14px',
                    border: '1px solid',
                    borderColor: isActive ? '#2F6F62' : '#EFECE6',
                    background: isActive ? '#E4EEE9' : '#FFFFFF',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'all 0.12s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '10px',
                      fontFamily: '"IBM Plex Mono", monospace',
                      color: isActive ? '#2F6F62' : '#6B7280',
                      fontWeight: 600
                    }}>
                      {rep.id} · {rep.category}
                    </span>
                    <span style={{ fontSize: '10.5px', color: '#6B7280' }}>
                      {rep.frequency}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#16233A', marginTop: '4px' }}>
                    {rep.title}
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '4px', lineHeight: 1.35 }}>
                    {rep.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Report Preview Case Record */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #D8D5CB',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Government Dossier Header */}
          <div style={{
            borderBottom: '2px solid #16233A',
            paddingBottom: '20px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <Emblem width={34} height={46} color="#16233A" />
            </div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#3A4A63', fontWeight: 700 }}>
              GOVERNMENT OF INDIA • MINISTRY OF RURAL DEVELOPMENT
            </div>
            <div style={{ fontSize: '10.5px', color: '#6B7280', textTransform: 'uppercase', marginTop: '2px' }}>
              DEPARTMENT OF LAND RESOURCES • KRISHI BHAWAN, NEW DELHI
            </div>
            <h2 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#16233A', margin: '8px 0 2px' }}>
              {currentReport.title}
            </h2>
            <div style={{ fontSize: '11.5px', fontFamily: '"IBM Plex Mono", monospace', color: '#6B7280' }}>
              DOCUMENT REF: MORD/SWADESH/MIS/2026/088 &nbsp;|&nbsp; GENERATED: 15 SEP 2026
            </div>
          </div>

          {/* Dossier Meta Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            background: '#F2F1EC',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '12px'
          }}>
            <div>
              <span style={{ color: '#6B7280' }}>Report Scope:</span>
              <div style={{ fontWeight: 600, color: '#16233A' }}>All 28 States &amp; 8 UTs</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Supervisory Authority:</span>
              <div style={{ fontWeight: 600, color: '#16233A' }}>{mordOfficerProfile.name}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Statutory Authority:</span>
              <div style={{ fontWeight: 600, color: '#16233A' }}>RFCTLARR Act 2013 (Sec 86)</div>
            </div>
          </div>

          {/* Report Summary Data Table */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '15px', fontWeight: 600, color: '#16233A', margin: '0 0 10px' }}>
              Consolidated Key Metrics
            </h4>
            <div style={{ border: '1px solid #D8D5CB', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #D8D5CB', background: '#FFFFFF' }}>
                    <td style={{ padding: '8px 12px', color: '#3A4A63', fontWeight: 500 }}>Total Registered Infrastructure Projects:</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700, fontFamily: 'monospace' }}>128 Corridors</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #D8D5CB', background: '#FBFAF6' }}>
                    <td style={{ padding: '8px 12px', color: '#3A4A63', fontWeight: 500 }}>Total Land Required / Acquired:</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700, fontFamily: 'monospace' }}>38,420 Ha / 23,650 Ha (61.5%)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #D8D5CB', background: '#FFFFFF' }}>
                    <td style={{ padding: '8px 12px', color: '#3A4A63', fontWeight: 500 }}>Total Compensation Awarded vs Disbursed:</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700, fontFamily: 'monospace', color: '#2F6F62' }}>₹ 54,820 Cr / ₹ 34,110 Cr (62.2%)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #D8D5CB', background: '#FBFAF6' }}>
                    <td style={{ padding: '8px 12px', color: '#3A4A63', fontWeight: 500 }}>Statutory RFCTLARR Compliance Index:</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700, fontFamily: 'monospace', color: '#2F6F62' }}>88.4% Average</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #D8D5CB', background: '#FFFFFF' }}>
                    <td style={{ padding: '8px 12px', color: '#3A4A63', fontWeight: 500 }}>Projects with Active Ministerial Directives:</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 700, fontFamily: 'monospace', color: '#A6432B' }}>3 Projects</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Signature & Seal Footer */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '20px',
            borderTop: '1px solid #D8D5CB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: '11px',
            color: '#6B7280'
          }}>
            <div>
              <div>Digitally Authenticated by:</div>
              <div style={{ fontWeight: 700, color: '#16233A', fontSize: '12px' }}>{mordOfficerProfile.name}</div>
              <div>Secretary, Ministry of Rural Development</div>
              <div style={{ fontFamily: 'monospace', marginTop: '2px' }}>DSC Serial: {mordOfficerProfile.certSerial}</div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handlePrint}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D8D5CB',
                  padding: '8px 16px',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Printer size={13} /> Print Official Copy
              </button>
              <button
                onClick={() => alert(`Downloading signed copy of ${currentReport.title}...`)}
                style={{
                  background: '#2F6F62',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 16px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={13} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
