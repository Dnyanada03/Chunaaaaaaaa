import React, { useState } from 'react';
import { FileText, Download, ChevronRight, BarChart2, TrendingUp, Shield, Users, AlertTriangle, MapPin, Coins } from 'lucide-react';

const reportCategories = [
  { id: 'project', label: 'Project Reports', icon: FileText, desc: 'Status, progress, and milestone reports for all State projects', count: 8 },
  { id: 'land', label: 'Land Acquisition', icon: MapPin, desc: 'Land survey, verification, and acquisition progress reports', count: 6 },
  { id: 'sia', label: 'SIA Reports', icon: Users, desc: 'Social Impact Assessment reports and expert appraisals', count: 4 },
  { id: 'compensation', label: 'Compensation & R&R', icon: Coins, desc: 'Compensation calculation, disbursement, and R&R tracking', count: 5 },
  { id: 'compliance', label: 'Compliance', icon: Shield, desc: 'RFCTLARR Act compliance status across districts', count: 3 },
  { id: 'performance', label: 'Performance', icon: TrendingUp, desc: 'Officer and department performance monitoring reports', count: 4 },
  { id: 'risk', label: 'Risk & Delay', icon: AlertTriangle, desc: 'Delayed projects, stuck projects, and predicted delays', count: 3 },
  { id: 'grievance', label: 'Grievances', icon: AlertTriangle, desc: 'Citizen and departmental grievance tracking reports', count: 2 }
];

const sampleReports = {
  project: [
    { name: 'State Project Status Summary — September 2026', date: '01 Sep 2026', format: 'PDF' },
    { name: 'District-wise Project Progress Report', date: '01 Sep 2026', format: 'PDF' },
    { name: 'Monthly MIS Report — August 2026', date: '01 Sep 2026', format: 'Excel' },
    { name: 'Quarterly Project Review Report — Q2 2026', date: '01 Jul 2026', format: 'PDF' }
  ],
  land: [
    { name: 'Land Acquisition Progress — All Districts', date: '01 Sep 2026', format: 'PDF' },
    { name: 'Survey & Verification Status Report', date: '25 Aug 2026', format: 'Excel' }
  ],
  sia: [
    { name: 'SIA Reports Summary — Pending State Review', date: '06 Sep 2026', format: 'PDF' },
    { name: 'Expert Appraisal Committee Recommendations', date: '02 Sep 2026', format: 'PDF' }
  ],
  compensation: [
    { name: 'State Compensation Disbursement Report', date: '01 Sep 2026', format: 'Excel' },
    { name: 'R&R Package Status — Multi-District', date: '28 Aug 2026', format: 'PDF' }
  ],
  compliance: [
    { name: 'RFCTLARR Compliance Dashboard Report', date: '01 Sep 2026', format: 'PDF' },
    { name: 'District-wise Compliance Score Card', date: '01 Sep 2026', format: 'Excel' }
  ],
  performance: [
    { name: 'District Collector Performance Report', date: '01 Sep 2026', format: 'PDF' },
    { name: 'Tahsildar Monthly Activity Summary', date: '01 Sep 2026', format: 'Excel' }
  ],
  risk: [
    { name: 'Delayed Projects Alert Report', date: '08 Sep 2026', format: 'PDF' },
    { name: 'Predicted Delay Analysis — State Level', date: '05 Sep 2026', format: 'PDF' }
  ],
  grievance: [
    { name: 'Grievance Summary — September 2026', date: '01 Sep 2026', format: 'PDF' }
  ]
};

export default function StateReportsView() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>REPORTS & MIS</h1>
          <p>State-level management information reports and analytics</p>
        </div>
      </div>

      {!selectedCategory ? (
        /* Category Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {reportCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="card"
                onClick={() => setSelectedCategory(cat.id)}
                style={{ cursor: 'pointer', padding: '18px 20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: '#E6F4EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Icon size={18} style={{ color: '#0B4726' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>{cat.label}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.4 }}>{cat.desc}</div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '6px' }}>{cat.count} reports available</div>
                  </div>
                  <ChevronRight size={16} style={{ color: '#CBD5E1', marginTop: '4px' }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Report List */
        <div>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setSelectedCategory(null)}
            style={{ marginBottom: '14px', fontSize: '11px' }}
          >
            ← Back to Categories
          </button>
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                {reportCategories.find(c => c.id === selectedCategory)?.label}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {(sampleReports[selectedCategory] || []).map((report, idx) => (
                <div key={idx} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: '1px solid #F1F5F9'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{report.name}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{report.date} · {report.format}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn btn-sm btn-secondary" style={{ fontSize: '10.5px' }}>View</button>
                    <button className="btn btn-sm btn-primary" style={{ fontSize: '10.5px' }}>
                      <Download size={11} /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
