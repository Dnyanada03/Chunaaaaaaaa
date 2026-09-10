import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  FileSpreadsheet,
  Image,
  Eye,
  Filter,
  CheckCircle2,
  Building2,
  Calendar,
  XCircle
} from 'lucide-react';
import {
  collectorTalukasProgress,
  collectorProjectsMasterList
} from '../../data/collectorMockData';

export default function CollectorReportsView() {
  const [selectedReportCategory, setSelectedReportCategory] = useState('District-Level Land Acquisition Report');
  const [filterProject, setFilterProject] = useState('All');
  const [filterTaluka, setFilterTaluka] = useState('All');
  const [filterDateRange, setFilterDateRange] = useState('Current Financial Year 2026-27');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const reportCategories = [
    "District-Level Land Acquisition Report",
    "Project Progress Report",
    "Taluka-Wise Report",
    "Village-Wise Report",
    "Land Acquisition Status Report",
    "Compensation Report",
    "R&R Report",
    "Objection Report",
    "Risk Assessment Report",
    "Officer Performance Summary",
    "Audit Report"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DISTRICT REPORTS & MANAGEMENT INFORMATION SYSTEM (MIS)</h1>
          <p>Statutory Report Generation, Executive Summaries & Government MIS Export Engine</p>
        </div>
      </div>

      {/* REPORT GENERATION CONFIGURATION PANEL */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileText size={18} style={{ color: '#0B4726' }} />
            SELECT REPORT CATEGORY & CONFIGURATION FILTERS
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          {/* Category Selection List */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#0B4726', textTransform: 'uppercase', marginBottom: '8px', padding: '0 6px' }}>
              REPORT CATEGORIES (11 TYPES)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {reportCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedReportCategory(cat)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '12.5px',
                    fontWeight: selectedReportCategory === cat ? 700 : 500,
                    background: selectedReportCategory === cat ? '#0B4726' : 'transparent',
                    color: selectedReportCategory === cat ? '#FFF' : '#334155',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {i + 1}. {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Options & Export Trigger */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#E6F4EA', padding: '12px', borderRadius: '8px', border: '1px solid #CEEAD6' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#1E7E34' }}>SELECTED REPORT</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0B4726' }}>{selectedReportCategory}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Project Scope</label>
                  <select className="form-select" value={filterProject} onChange={e => setFilterProject(e.target.value)}>
                    <option value="All">All District Projects (48)</option>
                    {collectorProjectsMasterList.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Taluka Scope</label>
                  <select className="form-select" value={filterTaluka} onChange={e => setFilterTaluka(e.target.value)}>
                    <option value="All">All 13 Talukas</option>
                    {collectorTalukasProgress.map(t => (
                      <option key={t.id} value={t.taluka}>Taluka {t.taluka}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Date Range / Duration</label>
                  <select className="form-select" value={filterDateRange} onChange={e => setFilterDateRange(e.target.value)}>
                    <option>Current Financial Year 2026-27</option>
                    <option>Previous Quarter (Q1 2026)</option>
                    <option>Custom Date Range</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Report Format Style</label>
                  <select className="form-select">
                    <option>Official Revenue Dept MIS Standard</option>
                    <option>State Cabinet Executive Summary</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Export & Preview Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setIsPreviewOpen(true)}
                style={{ flex: 1 }}
              >
                <Eye size={15} /> Preview Report
              </button>

              <button
                className="btn btn-primary"
                onClick={() => setIsPreviewOpen(true)}
                style={{ flex: 1, background: '#0B4726' }}
              >
                <Download size={15} /> Generate & Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT PREVIEW & EXPORT MODAL */}
      {isPreviewOpen && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ maxWidth: '880px', background: '#FFF' }}>
            <div className="modal-header" style={{ background: '#06371E' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} />
                <h3 className="modal-title">GOVERNMENT MIS REPORT PREVIEW</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsPreviewOpen(false)}>
                <XCircle size={18} />
              </button>
            </div>

            {/* Official Report Content Canvas */}
            <div className="modal-body" style={{ padding: '30px', fontFamily: 'var(--font-serif)', color: '#1F2937' }}>
              {/* Official Masthead */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0B4726', paddingBottom: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#0B4726', letterSpacing: '1px' }}>GOVERNMENT OF MAHARASHTRA • REVENUE DEPARTMENT</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>
                  DISTRICT COLLECTORATE PUNE — MIS REPORT
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0B4726', marginTop: '4px' }}>
                  {selectedReportCategory.toUpperCase()}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  Generated on: {new Date().toLocaleDateString()} • Scope: {filterTaluka === 'All' ? 'District-Wide (13 Talukas)' : `Taluka ${filterTaluka}`} • Period: {filterDateRange}
                </div>
              </div>

              {/* Summary Metrics Box */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>TOTAL PROJECTS</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>48 Projects</div>
                </div>
                <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>LAND REQUIRED</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>12,850 Ha</div>
                </div>
                <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>LAND ACQUIRED</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669' }}>8,420 Ha (65.5%)</div>
                </div>
                <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '10px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>COMPENSATION DISBURSED</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#0B4726' }}>₹ 3,120.40 Cr</div>
                </div>
              </div>

              {/* Official Data Table */}
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #CBD5E1' }}>
                  <thead>
                    <tr style={{ background: '#EFECE6' }}>
                      <th style={{ border: '1px solid #CBD5E1', padding: '8px' }}>Taluka</th>
                      <th style={{ border: '1px solid #CBD5E1', padding: '8px' }}>Projects</th>
                      <th style={{ border: '1px solid #CBD5E1', padding: '8px', textAlign: 'right' }}>Land Req (Ha)</th>
                      <th style={{ border: '1px solid #CBD5E1', padding: '8px', textAlign: 'right' }}>Land Acq (Ha)</th>
                      <th style={{ border: '1px solid #CBD5E1', padding: '8px', textAlign: 'center' }}>Completion %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectorTalukasProgress.map(t => (
                      <tr key={t.id}>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px 8px', fontWeight: 700 }}>Taluka {t.taluka}</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px 8px' }}>{t.projects}</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px 8px', textAlign: 'right' }}>{t.landRequired}</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px 8px', textAlign: 'right', fontWeight: 700, color: '#059669' }}>{t.landAcquired}</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px 8px', textAlign: 'center', fontWeight: 800 }}>{t.completion}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature Block */}
              <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <div>
                  Report System Identifier: <strong>SWADESH-MIS-PUNE-88421</strong><br />
                  Generated by: <strong>Collectorate Administrative MIS Cell</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong>Dr. Rajesh V. Deshmukh, IAS</strong><br />
                  District Collector & District Magistrate, Pune District
                </div>
              </div>
            </div>

            {/* Export Actions Toolbar */}
            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center' }}>Export Formats:</span>
                <button className="btn btn-secondary btn-sm" onClick={() => alert('Exported as PDF')}><FileText size={12} /> PDF</button>
                <button className="btn btn-secondary btn-sm" onClick={() => alert('Exported as Excel')}><FileSpreadsheet size={12} /> Excel</button>
                <button className="btn btn-secondary btn-sm" onClick={() => alert('Exported as JPG')}><Image size={12} /> JPG</button>
                <button className="btn btn-secondary btn-sm" onClick={() => window.print()}><Printer size={12} /> Print</button>
              </div>

              <button className="btn btn-primary" onClick={() => { setIsPreviewOpen(false); alert('Report downloaded successfully!'); }}>
                <Download size={14} /> Download Final Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
