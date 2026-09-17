import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  FileText, Download, Printer, Filter, Calendar, BarChart3,
  TrendingUp, ShieldCheck, IndianRupee, MapPin, CheckCircle2,
  ChevronRight, Building2, Eye, Sparkles
} from 'lucide-react';
import { initialParcelsCadastral } from '../../data/proposingMockData';

export default function ProposingBodyReportsView() {
  const { proposingProjects, proposingProposals, proposingOfficer, getExactTimestamp } = useSwadesh();
  const [selectedReport, setSelectedReport] = useState('executive'); // executive, financial, parcels, rr, urgency
  const [selectedFY, setSelectedFY] = useState('2026-2027');
  const [selectedProject, setSelectedProject] = useState('All');
  const [exportNotice, setExportNotice] = useState(null);

  const handleExport = (type) => {
    const timestamp = getExactTimestamp();
    setExportNotice(`Report successfully generated in ${type.toUpperCase()} format with Class-3 DSC cryptographic seal. (${timestamp})`);
    setTimeout(() => {
      setExportNotice(null);
    }, 4500);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Top Header & Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
            <span>Project Authority</span>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 700, color: '#0F172A' }}>MIS & Statutory Compliance Reports</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Executive MIS & Statutory Compliance Reporting
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Periodic audit statements, PFMS disbursement summaries, and Section 40 urgency justifications for state monitoring
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => handleExport('csv')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
          >
            <Download size={15} />
            Export CSV
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleExport('pdf')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              background: '#008E4F',
              border: 'none'
            }}
          >
            <ShieldCheck size={15} />
            Generate DSC Signed PDF
          </button>
        </div>
      </div>

      {/* Export Notice Banner */}
      {exportNotice && (
        <div style={{
          background: '#DCFCE7',
          border: '1px solid #86EFAC',
          color: '#15803D',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Report Selection Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid #E2E8F0',
        marginBottom: '20px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {[
          { id: 'executive', label: 'Executive Pipeline Summary' },
          { id: 'financial', label: 'PFMS & Treasury Head Ledger' },
          { id: 'parcels', label: 'Cadastral Gat Requisition Reconciliation' },
          { id: 'rr', label: 'R&R Entitlements & Rehabilitation' },
          { id: 'urgency', label: 'Section 40 Urgency Clause Audit' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedReport(tab.id)}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'transparent',
              borderBottom: selectedReport === tab.id ? '3px solid #008E4F' : '3px solid transparent',
              color: selectedReport === tab.id ? '#008E4F' : '#64748B',
              fontWeight: selectedReport === tab.id ? 800 : 600,
              fontSize: '13.5px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters Toolbar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        padding: '14px 18px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={16} style={{ color: '#64748B' }} />
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#475569' }}>FINANCIAL YEAR:</span>
          <select
            className="form-select"
            value={selectedFY}
            onChange={e => setSelectedFY(e.target.value)}
            style={{ fontSize: '13px', width: '150px' }}
          >
            <option value="2026-2027">FY 2026–2027</option>
            <option value="2025-2026">FY 2025–2026</option>
            <option value="2024-2025">FY 2024–2025</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={16} style={{ color: '#64748B' }} />
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#475569' }}>PROJECT:</span>
          <select
            className="form-select"
            value={selectedProject}
            onChange={e => setSelectedProject(e.target.value)}
            style={{ fontSize: '13px', width: '280px' }}
          >
            <option value="All">All Projects Portfolio</option>
            {proposingProjects.map(p => (
              <option key={p.id} value={p.id}>{p.id} — {p.name.substring(0, 24)}...</option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748B' }}>
          Generated by: <strong>{proposingOfficer.name}</strong> • Authority: <strong>{proposingOfficer.authority}</strong>
        </div>
      </div>

      {/* REPORT CONTENT VIEWPORT */}

      {/* 1. EXECUTIVE PIPELINE SUMMARY */}
      {selectedReport === 'executive' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Summary KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>TOTAL PORTFOLIO PROJECTS</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{proposingProjects.length}</div>
              <div style={{ fontSize: '11.5px', color: '#008E4F', fontWeight: 600 }}>100% On Schedule</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>ACTIVE STATUTORY PROPOSALS</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{proposingProposals.length}</div>
              <div style={{ fontSize: '11.5px', color: '#2563EB', fontWeight: 600 }}>Across 4 Districts</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CUMULATIVE LAND DEMAND</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                {proposingProposals.reduce((sum, p) => sum + (parseFloat(p.landRequiredHa) || 0), 0).toFixed(1)} Ha
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B' }}>Cadastral mapped</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>TOTAL ACQUISITION BUDGET</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#008E4F', marginTop: '4px' }}>
                ₹{proposingProposals.reduce((sum, p) => sum + (parseFloat(p.estimatedCost) || 0), 0).toFixed(1)} Cr
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B' }}>IFMS Sanctioned</div>
            </div>
          </div>

          {/* Proposals Pipeline Table */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
              Statutory Land Acquisition Proposal Pipeline Tracker
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Proposal ID</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Title & Project</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Area (Ha)</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Est. Cost</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Current Stage</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Statutory Status</th>
                </tr>
              </thead>
              <tbody>
                {proposingProposals.map(prop => (
                  <tr key={prop.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 700, color: '#008E4F' }}>
                      {prop.id}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{prop.title}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{prop.projectName || prop.projectId}</div>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#0F172A' }}>
                      {prop.landRequiredHa} Ha
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#008E4F' }}>
                      ₹{prop.estimatedCost} Cr
                    </td>
                    <td style={{ padding: '12px', color: '#475569' }}>
                      {prop.currentStage || 'Section 4(1) Scrutiny'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        fontSize: '11.5px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        background: prop.status === 'Approved' ? '#DCFCE7' : prop.status === 'Submitted to State' ? '#DBEAFE' : '#FEF3C7',
                        color: prop.status === 'Approved' ? '#15803D' : prop.status === 'Submitted to State' ? '#1E40AF' : '#B45309'
                      }}>
                        {prop.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. FINANCIAL & PFMS LEDGER REPORT */}
      {selectedReport === 'financial' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                PFMS Major & Minor Head Utilization Ledger
              </h3>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Reconciled with Maharashtra BeAMS Treasury & State Finance Department
              </div>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#008E4F', background: '#E6F4EA', padding: '4px 10px', borderRadius: '6px' }}>
              Ledger Health: 100% Reconciled
            </span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Major / Minor Head Code</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Appropriation Purpose</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Sanction Order No.</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Budget Sanction (₹ Cr)</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Disbursed to Collector (₹ Cr)</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Treasury Balance (₹ Cr)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { head: 'MH-8443-00-106-01', desc: 'Civil Deposits - Direct Compensation to Landowners', order: 'MRIDC/FIN/2026/089', sanction: 350.0, disbursed: 122.5, balance: 227.5 },
                { head: 'MH-2235-02-102-04', desc: 'R&R Package Grants & Subsistence Allowance', order: 'MRIDC/RR/2026/041', sanction: 65.0, disbursed: 18.0, balance: 47.0 },
                { head: 'MH-2053-00-093-02', desc: 'DILR Survey & Talathi Administrative Contingency', order: 'MRIDC/ADM/2026/012', sanction: 12.5, disbursed: 4.8, balance: 7.7 },
                { head: 'MH-3054-80-797-01', desc: 'Corridor Boundary Fencing & Utility Shifting', order: 'MRIDC/ENG/2026/104', sanction: 45.0, disbursed: 14.2, balance: 30.8 }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontWeight: 700, color: '#0F172A' }}>{row.head}</td>
                  <td style={{ padding: '12px', color: '#334155' }}>{row.desc}</td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '12px', color: '#64748B' }}>{row.order}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#0F172A' }}>₹{row.sanction.toFixed(2)}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#008E4F' }}>₹{row.disbursed.toFixed(2)}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#D97706' }}>₹{row.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. CADASTRAL GAT REQUISITION RECONCILIATION */}
      {selectedReport === 'parcels' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
            Cadastral Survey Gat Reconciliation Statement
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Gat / Survey No.</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Revenue Village</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Taluka</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Requisition Area</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Land Classification</th>
                <th style={{ padding: '10px 12px', fontWeight: 700, color: '#475569' }}>JMS Survey Status</th>
              </tr>
            </thead>
            <tbody>
              {initialParcelsCadastral.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px', fontWeight: 700, fontFamily: 'monospace', color: '#0F172A' }}>{p.surveyNo}</td>
                  <td style={{ padding: '12px', color: '#334155' }}>{p.village}</td>
                  <td style={{ padding: '12px', color: '#334155' }}>{p.taluka}</td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#0F172A' }}>{p.areaHa} Ha</td>
                  <td style={{ padding: '12px', color: '#475569' }}>{p.landType}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '11px', color: '#16A34A', background: '#DCFCE7', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      ✓ Verified in Field
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. R&R ENTITLEMENTS & REHABILITATION */}
      {selectedReport === 'rr' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Second Schedule R&R Compliance Matrix (Act 30 of 2013)
          </h3>
          <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
            Mandatory entitlements for Project Affected Families (PAFs) and commercial units
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Provision of Housing Units in Resettlement Colony</div>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '6px 0 0 0' }}>
                48 constructed residential tenements (50 sq.m each) planned at Uruli Devachi resettlement layout.
              </p>
              <div style={{ fontSize: '11px', color: '#008E4F', fontWeight: 700, marginTop: '8px' }}>Status: Site Identified</div>
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Subsistence Grant (₹3,000 / month for 12 months)</div>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '6px 0 0 0' }}>
                Escrow bank deposit initialized for 34 verified vulnerable agricultural families.
              </p>
              <div style={{ fontSize: '11px', color: '#2563EB', fontWeight: 700, marginTop: '8px' }}>Status: Direct DBT Ready</div>
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>One-Time Resettlement Allowance (₹50,000)</div>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '6px 0 0 0' }}>
                Transport and shifting allowance sanctioned for 12 commercial shops near rail right-of-way.
              </p>
              <div style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700, marginTop: '8px' }}>Status: Funds Deposited</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SECTION 40 URGENCY CLAUSE AUDIT */}
      {selectedReport === 'urgency' && (
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Section 40 Urgency Clause Compliance & Justification Audit
          </h3>
          <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
            Statutory records for proposals where Section 7 Social Impact Assessment (SIA) exemption was sought
          </div>

          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#991B1B', marginBottom: '4px' }}>
              Proposal Ref: PROP-2026-00418 — Pune–Nashik High-Speed Rail Chord Line
            </div>
            <p style={{ fontSize: '12.5px', color: '#7F1D1D', margin: 0, lineHeight: 1.5 }}>
              Section 40 urgency invoked under PM GatiShakti national logistic corridor priority mandate. 80% advance compensation deposit of ₹29.75 Cr placed with Collectorate prior to possession notice. Cabinet approval No. CAB/MH/2026/418 attached.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>ADVANCE COMPENSATION DEPOSITED</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#008E4F', marginTop: '2px' }}>80% (₹29.75 Cr)</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Statutory Section 40(1) mandate fulfilled</div>
            </div>

            <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CABINET SANCTION RESOLUTION</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>GR-2026/891</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Revenue & Forest Dept, Mantralaya</div>
            </div>

            <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>SIA EXEMPTION STATUS</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563EB', marginTop: '2px' }}>Exempted</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Direct Section 9 notice invoked</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
