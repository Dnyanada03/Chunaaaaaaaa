import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderKanban,
  Building2,
  Award,
  TrendingUp,
  Search,
  ChevronRight
} from 'lucide-react';
import {
  collectorWorkforceSummary,
  collectorProjectsMasterList
} from '../../data/collectorMockData';

export default function CollectorAdminView() {
  const [searchOfficer, setSearchOfficer] = useState('');

  // Overall Workforce Totals
  const totalAssigned = collectorWorkforceSummary.reduce((acc, o) => acc + o.tasksCompleted + o.tasksPending, 0);
  const totalCompleted = collectorWorkforceSummary.reduce((acc, o) => acc + o.tasksCompleted, 0);
  const totalPending = collectorWorkforceSummary.reduce((acc, o) => acc + o.tasksPending, 0);
  const overallProgress = ((totalCompleted / totalAssigned) * 100).toFixed(1);

  const filteredOfficers = collectorWorkforceSummary.filter(o => {
    if (searchOfficer) {
      const q = searchOfficer.toLowerCase();
      return (
        o.name.toLowerCase().includes(q) ||
        o.role.toLowerCase().includes(q) ||
        o.jurisdiction.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>ADMINISTRATION & SUBORDINATE WORKFORCE MONITORING</h1>
          <p>Executive Workload Oversight, Officer Performance Summary & District Resource Allocation</p>
        </div>
      </div>

      {/* WORKFORCE ANALYTICS KPI CARDS */}
      <div className="metrics-grid">
        <div className="kpi-card neutral">
          <span className="kpi-label">Total Tasks Assigned</span>
          <div className="kpi-value">{totalAssigned.toLocaleString()}</div>
          <span className="kpi-subtext">Across Tahsildars, SDOs & Surveyors</span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid #1E7E34' }}>
          <span className="kpi-label">Total Tasks Completed</span>
          <div className="kpi-value" style={{ color: '#1E7E34' }}>{totalCompleted.toLocaleString()}</div>
          <span className="kpi-subtext">Verified & Signed</span>
        </div>

        <div className="kpi-card amber">
          <span className="kpi-label">Pending Active Tasks</span>
          <div className="kpi-value" style={{ color: '#D97706' }}>{totalPending.toLocaleString()}</div>
          <span className="kpi-subtext">In Field Survey & Scrutiny</span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid #059669' }}>
          <span className="kpi-label">Overall Completion Rate</span>
          <div className="kpi-value" style={{ color: '#059669' }}>{overallProgress}%</div>
          <div style={{ background: '#E2E8F0', height: '6px', borderRadius: '3px', marginTop: '4px' }}>
            <div style={{ width: `${overallProgress}%`, background: '#10B981', height: '100%', borderRadius: '3px' }} />
          </div>
        </div>
      </div>

      {/* OFFICER PERFORMANCE SUMMARY TABLE */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Users size={18} style={{ color: '#0B4726' }} />
            SUBORDINATE OFFICERS PERFORMANCE SUMMARY
          </div>
          <div style={{ position: 'relative', width: '260px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Officer Name or Role..."
              value={searchOfficer}
              onChange={e => setSearchOfficer(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '12px' }}
            />
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          </div>
        </div>

        <div className="table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Officer Name</th>
                <th>Role / Designation</th>
                <th>Jurisdiction</th>
                <th style={{ textAlign: 'center' }}>Projects</th>
                <th style={{ textAlign: 'center' }}>Completed</th>
                <th style={{ textAlign: 'center' }}>Pending</th>
                <th style={{ textAlign: 'center' }}>Attention Cases</th>
                <th style={{ textAlign: 'center' }}>Work Completion %</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfficers.map((o, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 800, color: '#0F172A' }}>{o.name}</td>
                  <td><span style={{ fontWeight: 600, color: '#334155' }}>{o.role}</span></td>
                  <td>{o.jurisdiction}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{o.assignedProjects}</td>
                  <td style={{ textAlign: 'center', fontWeight: 800, color: '#059669' }}>{o.tasksCompleted}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: '#D97706' }}>{o.tasksPending}</td>
                  <td style={{ textAlign: 'center' }}>
                    {o.casesRequiringAttention > 15 ? (
                      <span className="badge badge-red">{o.casesRequiringAttention} Flagged</span>
                    ) : (
                      <span className="badge badge-orange">{o.casesRequiringAttention} Cases</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                      <div style={{ flex: 1, background: '#E2E8F0', height: '6px', borderRadius: '3px', overflow: 'hidden', maxWidth: '60px' }}>
                        <div style={{ width: `${o.completionPercentage}%`, background: o.completionPercentage >= 85 ? '#10B981' : o.completionPercentage >= 70 ? '#F59E0B' : '#EF4444', height: '100%' }} />
                      </div>
                      <span style={{ fontWeight: 800, fontSize: '12px' }}>{o.completionPercentage}%</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${o.completionPercentage >= 85 ? 'badge-green' : o.completionPercentage >= 70 ? 'badge-blue' : 'badge-red'}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROJECT AND OFFICER SUMMARY MAPPING */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FolderKanban size={18} style={{ color: '#0B4726' }} />
            PROJECT & RESPONSIBLE OFFICER WORKLOAD MAPPING
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {collectorProjectsMasterList.map(p => (
            <div
              key={p.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '18px 22px',
                display: 'grid',
                gridTemplateColumns: '2.2fr 1.4fr 1fr 1fr 1fr',
                gap: '16px',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '14.5px', lineHeight: 1.35 }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  ID: <span className="mono-code" style={{ color: '#008E4F', fontWeight: 700 }}>{p.id}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#475569' }}>
                  Proposing Body: <strong style={{ color: '#1E293B' }}>{p.proposingBody}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '2px' }}>RESPONSIBLE OFFICER</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', lineHeight: 1.4 }}>Dr. Arvind R. Patil</div>
                <div style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.4 }}>Tahsildar Haveli</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '6px' }}>CURRENT STAGE</div>
                <span className="badge badge-blue" style={{ fontSize: '11.5px', padding: '5px 12px' }}>{p.stage}</span>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '6px' }}>RISK SCORE</div>
                <span className={`badge ${p.riskColor === 'Red' ? 'badge-red' : p.riskColor === 'Orange' ? 'badge-orange' : 'badge-green'}`} style={{ fontSize: '11.5px', padding: '5px 12px' }}>
                  {p.riskLevel} ({p.riskScore})
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <button className="btn btn-secondary btn-sm" style={{ fontWeight: 700, padding: '8px 14px', borderRadius: '8px' }}>
                  View Mapping <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
