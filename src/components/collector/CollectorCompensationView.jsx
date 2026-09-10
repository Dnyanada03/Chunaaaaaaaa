import React, { useState } from 'react';
import {
  Coins,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Download,
  Eye,
  ShieldCheck,
  ChevronRight,
  FileText,
  Sparkles,
  XCircle,
  RefreshCcw,
  ArrowRight
} from 'lucide-react';
import {
  collectorRrExcelRecords,
  collectorProjectsMasterList
} from '../../data/collectorMockData';

export default function CollectorCompensationView() {
  // Hierarchical Drilldown State
  const [hierarchicalState, setHierarchicalState] = useState({
    project: 'Pune Ring Road Expressway',
    taluka: 'Haveli',
    village: 'Wagholi',
    parcelId: 'MH-PL-10234',
    surveyNo: '142/1A',
    gatNo: 'GAT-8842',
    landowner: 'Rameshwar Dhondu Patil'
  });

  // Selected Excel File & Comparison State
  const [selectedExcelFile, setSelectedExcelFile] = useState(collectorRrExcelRecords[0]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(true);

  // Modal State for Digital Approval
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalRemarks, setApprovalRemarks] = useState('Verified with Sub-Registrar Valuation Circle Rate 2026. Approved for direct PFMS DBT transfer.');
  const [isApprovedSuccess, setIsApprovedSuccess] = useState(false);

  // AI Generated Document State
  const [isAiDocGenerated, setIsAiDocGenerated] = useState(false);
  const [isDocPreviewOpen, setIsDocPreviewOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>COMPENSATION & REHABILITATION & RESETTLEMENT (R&R) MONITORING</h1>
          <p>Multi-Level Drilldown, R&R Excel Data Comparison, Digital Signatures & AI Compensation Reports</p>
        </div>
      </div>

      {/* HIERARCHICAL DRILLDOWN NAVIGATION BAR */}
      <div className="card" style={{ padding: '14px 20px', background: '#F8FAFC' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#0B4726', textTransform: 'uppercase', marginBottom: '8px' }}>
          HIERARCHICAL REVENUE MONITORING DRILLDOWN
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '12.5px' }}>
          <span style={{ padding: '4px 10px', background: '#FFF', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 700, color: '#0F172A' }}>
            Project: {hierarchicalState.project}
          </span>
          <ChevronRight size={14} style={{ color: '#94A3B8' }} />
          <span style={{ padding: '4px 10px', background: '#FFF', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 700, color: '#0F172A' }}>
            Taluka: {hierarchicalState.taluka}
          </span>
          <ChevronRight size={14} style={{ color: '#94A3B8' }} />
          <span style={{ padding: '4px 10px', background: '#FFF', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 700, color: '#0F172A' }}>
            Village: {hierarchicalState.village}
          </span>
          <ChevronRight size={14} style={{ color: '#94A3B8' }} />
          <span className="mono-code" style={{ padding: '4px 10px', background: '#E6F4EA', borderRadius: '6px', border: '1px solid #CEEAD6', fontWeight: 700, color: '#0B4726' }}>
            Parcel ID: {hierarchicalState.parcelId}
          </span>
          <ChevronRight size={14} style={{ color: '#94A3B8' }} />
          <span style={{ padding: '4px 10px', background: '#FFF', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 600 }}>
            Survey: #{hierarchicalState.surveyNo}
          </span>
          <ChevronRight size={14} style={{ color: '#94A3B8' }} />
          <span style={{ padding: '4px 10px', background: '#FFF', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 600 }}>
            Gat: {hierarchicalState.gatNo}
          </span>
          <ChevronRight size={14} style={{ color: '#94A3B8' }} />
          <span style={{ padding: '4px 10px', background: '#FEF3C7', borderRadius: '6px', border: '1px solid #FDE68A', fontWeight: 800, color: '#B45309' }}>
            Landowner: {hierarchicalState.landowner}
          </span>
        </div>
      </div>

      {/* R&R EXCEL DATA MANAGEMENT SECTION */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileSpreadsheet size={18} style={{ color: '#059669' }} />
            R&R COMPENSATION EXCEL FILE DATA MANAGEMENT
          </div>
          <button className="btn btn-secondary btn-sm">
            <Upload size={13} /> Upload New R&R Excel Sheet
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
          {/* Uploaded File Meta Card */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>FILE INFORMATION</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
              {selectedExcelFile.filename}
            </div>
            <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '4px' }}>
              Uploaded on {selectedExcelFile.uploadDate} by {selectedExcelFile.uploadedBy}
            </div>
            <div style={{ fontSize: '12px', color: '#0B4726', fontWeight: 700, marginTop: '8px' }}>
              Project: {selectedExcelFile.project} • {selectedExcelFile.recordCount} Landowner Records
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}><Eye size={12} /> View File</button>
              <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}><Download size={12} /> Download</button>
            </div>
          </div>

          {/* Action Callout Box */}
          <div style={{ background: '#E6F4EA', border: '1px solid #CEEAD6', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1E7E34', marginBottom: '4px' }}>
                Automated Database vs Excel Record Discrepancy Verification Engine
              </h4>
              <p style={{ fontSize: '12px', color: '#334155' }}>
                System automatically cross-verifies area calculation, Sub-Registrar rate, and PFMS bank accounts between SLAO Excel upload and Revenue Database.
              </p>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: 'fit-content', background: '#0B4726' }}
              onClick={() => setIsComparisonOpen(true)}
            >
              <RefreshCcw size={14} /> Compare Database with Excel Sheet
            </button>
          </div>
        </div>
      </div>

      {/* COMPENSATION DATA COMPARISON INTERFACE */}
      {isComparisonOpen && (
        <div className="card" style={{ border: '2px solid #0B4726' }}>
          <div className="card-header" style={{ background: '#E6F4EA', margin: '-18px -20px 18px -20px', padding: '12px 20px', borderRadius: '15px 15px 0 0' }}>
            <div className="card-title" style={{ color: '#0B4726' }}>
              <RefreshCcw size={18} />
              DATABASE RECORDS VS R&R EXCEL RECORDS COMPARISON TABLE
            </div>
            <span className="badge badge-orange">1 Area Mismatch Detected</span>
          </div>

          <div className="table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Landowner & Parcel ID</th>
                  <th>Field Parameter</th>
                  <th>Database Record</th>
                  <th>R&R Excel Record</th>
                  <th style={{ textAlign: 'center' }}>Match Status</th>
                  <th style={{ textAlign: 'center' }}>Risk Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedExcelFile.records.map((r, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td rowSpan={3} style={{ verticalAlign: 'top', background: '#F8FAFC', fontWeight: 700 }}>
                        <div style={{ color: '#0F172A' }}>{r.landowner}</div>
                        <div className="mono-code" style={{ fontSize: '11px', color: '#0B4726' }}>{r.parcelId}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>Survey #{r.surveyNo}</div>
                      </td>
                      <td>Acquired Area (Ha)</td>
                      <td style={{ fontWeight: 700 }}>{r.dbAreaHa}</td>
                      <td style={{ fontWeight: 700, color: r.areaMatch ? '#0F172A' : '#C5221F' }}>{r.excelAreaHa}</td>
                      <td style={{ textAlign: 'center' }}>
                        {r.areaMatch ? <span className="badge badge-green">Match ✓</span> : <span className="badge badge-red">Mismatch ⚠</span>}
                      </td>
                      <td rowSpan={3} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setHierarchicalState(prev => ({ ...prev, landowner: r.landowner, parcelId: r.parcelId, surveyNo: r.surveyNo }));
                          }}
                        >
                          Select Record
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Compensation (₹)</td>
                      <td style={{ fontWeight: 800, color: '#059669' }}>{r.dbComp}</td>
                      <td style={{ fontWeight: 800, color: r.compMatch ? '#059669' : '#C5221F' }}>{r.excelComp}</td>
                      <td style={{ textAlign: 'center' }}>
                        {r.compMatch ? <span className="badge badge-green">Match ✓</span> : <span className="badge badge-orange">Review Rate ⚠</span>}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '2px solid #CBD5E1' }}>
                      <td>Bank IFSC Code</td>
                      <td className="mono-code">{r.dbIfsc}</td>
                      <td className="mono-code">{r.excelIfsc}</td>
                      <td style={{ textAlign: 'center' }}>
                        {r.bankMatch ? <span className="badge badge-green">Match ✓</span> : <span className="badge badge-red">Mismatch ⚠</span>}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Row */}
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn btn-outline-danger">
              Return Batch for Correction to SLAO
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setIsAiDocGenerated(true)}
              >
                <Sparkles size={14} style={{ color: '#8B5CF6' }} /> Generate AI Compensation Document
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setIsApprovalModalOpen(true)}
                style={{ background: '#1E7E34', border: '1px solid #06371E' }}
              >
                <ShieldCheck size={14} /> Approve Verified Compensation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI-GENERATED COMPENSATION DOCUMENT SECTION */}
      {isAiDocGenerated && (
        <div className="card" style={{ border: '2px solid #8B5CF6', background: 'linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)' }}>
          <div className="card-header">
            <div className="card-title" style={{ color: '#6B21A8' }}>
              <Sparkles size={18} />
              AI-GENERATED OFFICIAL COMPENSATION REPORT (FORM 19-A)
            </div>
            <span className="badge badge-purple">Auto-Generated from Verified Database</span>
          </div>

          <div style={{ background: '#FFF', border: '1px solid #E9D5FF', borderRadius: '10px', padding: '20px', fontSize: '12.5px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px', marginBottom: '14px' }}>
              <div>
                <div style={{ color: '#6B21A8', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>PROJECT & LOCATION</div>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#0F172A' }}>{hierarchicalState.project}</div>
                <div>Taluka: {hierarchicalState.taluka} • Village: {hierarchicalState.village}</div>
              </div>
              <div>
                <div style={{ color: '#6B21A8', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>LANDOWNER & PARCEL</div>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#0F172A' }}>{hierarchicalState.landowner}</div>
                <div>Parcel: <span className="mono-code">{hierarchicalState.parcelId}</span> • Survey #{hierarchicalState.surveyNo}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
              <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '6px' }}>
                <div style={{ color: '#64748B', fontSize: '10.5px' }}>BASE LAND VALUE</div>
                <div style={{ fontWeight: 800, color: '#0B4726', fontSize: '15px' }}>₹ 1,02,00,000</div>
              </div>
              <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '6px' }}>
                <div style={{ color: '#64748B', fontSize: '10.5px' }}>ASSET & TREE COMP</div>
                <div style={{ fontWeight: 800, color: '#0B4726', fontSize: '15px' }}>₹ 33,00,000</div>
              </div>
              <div style={{ background: '#E6F4EA', padding: '10px', borderRadius: '6px' }}>
                <div style={{ color: '#1E7E34', fontSize: '10.5px', fontWeight: 800 }}>TOTAL AWARD AMOUNT</div>
                <div style={{ fontWeight: 900, color: '#1E7E34', fontSize: '16px' }}>₹ 1,35,00,000</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setIsDocPreviewOpen(true)}>
                <Eye size={14} /> Preview Full Document
              </button>
              <button className="btn btn-primary" onClick={() => alert('Compensation Report PDF downloaded successfully!')}>
                <Download size={14} /> Download PDF Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* APPROVAL MODAL WITH DIGITAL SIGNATURE */}
      {isApprovalModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="modal-title">DISTRICT COLLECTOR COMPENSATION SIGN-OFF</h3>
              <button className="modal-close-btn" onClick={() => setIsApprovalModalOpen(false)}>
                <XCircle size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ fontSize: '13px', background: '#F8FAFC', padding: '12px', borderRadius: '8px', marginBottom: '14px' }}>
                Landowner: <strong>{hierarchicalState.landowner}</strong><br />
                Parcel: <strong>{hierarchicalState.parcelId} (Survey #{hierarchicalState.surveyNo})</strong><br />
                Total Approved Amount: <strong style={{ color: '#059669', fontSize: '15px' }}>₹ 1,35,00,000</strong>
              </div>

              <div className="form-group">
                <label className="form-label">Collector Approval Remarks & Audit Note</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={approvalRemarks}
                  onChange={e => setApprovalRemarks(e.target.value)}
                />
              </div>

              <div style={{ background: '#E6F4EA', padding: '10px', borderRadius: '6px', fontSize: '12px', color: '#1E7E34' }}>
                <ShieldCheck size={16} style={{ display: 'inline', marginRight: '4px' }} />
                Digital Signature Certificate: <strong>Dr. Rajesh V. Deshmukh, IAS (NIC Class 3 Active)</strong>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsApprovalModalOpen(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsApprovalModalOpen(false);
                  setIsApprovedSuccess(true);
                }}
              >
                <ShieldCheck size={14} /> Digitally Sign & Approve Compensation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS NOTIFICATION BANNER */}
      {isApprovedSuccess && (
        <div style={{ background: '#E6F4EA', border: '2px solid #1E7E34', padding: '16px', borderRadius: '10px', color: '#1E7E34', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={24} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '14px' }}>Compensation Digitally Signed & Approved by District Collector!</div>
              <div style={{ fontSize: '12px' }}>PFMS Direct Benefit Transfer (DBT) dispatch triggered for ₹ 1.35 Cr to Rameshwar Dhondu Patil (SBI Wagholi).</div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsApprovedSuccess(false)}>Dismiss</button>
        </div>
      )}
    </div>
  );
}
