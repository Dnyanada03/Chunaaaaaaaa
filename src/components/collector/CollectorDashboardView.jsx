import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
  Filter,
  ChevronRight,
  PieChart,
  BarChart2,
  FileText,
  AlertCircle,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';
import {
  collectorDistrictStats,
  collectorTalukasProgress,
  collectorVillageProgress,
  collectorStagePipeline,
  collectorProjectsMasterList
} from '../../data/collectorMockData';

export default function CollectorDashboardView({ onNavigate }) {
  // Filter States
  const [selectedTaluka, setSelectedTaluka] = useState('All');
  const [selectedVillage, setSelectedVillage] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');

  // Drilldown breadcrumb state
  const [drillLevel, setDrillLevel] = useState({
    district: 'Pune District',
    taluka: null,
    village: null,
    project: null,
    parcel: null
  });

  // Filtered Talukas Data
  const filteredTalukas = collectorTalukasProgress.filter(t => {
    if (selectedTaluka !== 'All' && t.taluka !== selectedTaluka) return false;
    return true;
  });

  // Filtered Villages Data
  const filteredVillages = collectorVillageProgress.filter(v => {
    if (selectedTaluka !== 'All' && v.taluka !== selectedTaluka) return false;
    if (selectedVillage !== 'All' && v.village !== selectedVillage) return false;
    if (selectedProject !== 'All' && !v.project.includes(selectedProject)) return false;
    return true;
  });

  const pieData = [
    { name: 'Completed', value: collectorDistrictStats.completedProjects, color: '#1E7E34' },
    { name: 'Ongoing', value: collectorDistrictStats.ongoingProjects, color: '#D97706' },
    { name: 'Pending Review', value: collectorDistrictStats.pendingCollectorApprovals, color: '#1A73E8' },
    { name: 'High Risk', value: collectorDistrictStats.highRiskProjects, color: '#C5221F' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Formal Top Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DISTRICT LAND ACQUISITION MONITORING DASHBOARD</h1>
          <p>Higher District-Level Revenue & Executive Magistracy Overview</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate && onNavigate('approvals')}
            style={{ background: '#FFFFFF', color: '#0B4726', fontWeight: 700 }}
          >
            Review Pending Approvals (6)
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate && onNavigate('reports')}
            style={{ background: 'rgba(255,255,255,0.2)', color: '#FFF', border: '1px solid rgba(255,255,255,0.4)' }}
          >
            Generate District MIS Report
          </button>
        </div>
      </div>

      {/* KPI ANALYTICS CARDS */}
      <div className="metrics-grid">
        {/* Card 1: TOTAL PROJECTS */}
        <div className="kpi-card neutral">
          <span className="kpi-label">Total Projects</span>
          <div className="kpi-value">{collectorDistrictStats.totalProjects}</div>
          <span className="kpi-subtext">Across 13 Talukas of Pune</span>
        </div>

        {/* Card 2: ONGOING PROJECTS */}
        <div className="kpi-card amber">
          <span className="kpi-label">Ongoing Projects</span>
          <div className="kpi-value" style={{ color: '#D97706' }}>{collectorDistrictStats.ongoingProjects}</div>
          <span className="kpi-subtext">Active acquisition & field survey</span>
        </div>

        {/* Card 3: COMPLETED PROJECTS */}
        <div className="kpi-card" style={{ borderLeft: '4px solid #1E7E34' }}>
          <span className="kpi-label">Completed Projects</span>
          <div className="kpi-value" style={{ color: '#1E7E34' }}>{collectorDistrictStats.completedProjects}</div>
          <span className="kpi-subtext">Final mutation & handover done</span>
        </div>

        {/* Card 4: TOTAL LAND REQUIRED */}
        <div className="kpi-card neutral">
          <span className="kpi-label">Total Land Required</span>
          <div className="kpi-value">{collectorDistrictStats.totalLandRequiredHa.toLocaleString()} <span style={{ fontSize: '13px', fontWeight: 500 }}>Ha</span></div>
          <span className="kpi-subtext">142 Affected Villages</span>
        </div>

        {/* Card 5: TOTAL LAND ACQUIRED + PROGRESS BAR */}
        <div className="kpi-card" style={{ borderLeft: '4px solid #059669', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="kpi-label">Total Land Acquired</span>
            <span className="badge badge-green" style={{ fontSize: '12px', fontWeight: 800 }}>
              Land Acquired: {collectorDistrictStats.acquisitionPercentage}%
            </span>
          </div>
          <div className="kpi-value" style={{ color: '#059669', margin: '4px 0' }}>
            {collectorDistrictStats.totalLandAcquiredHa.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 600 }}>/ 12,850 Ha</span>
          </div>

          {/* Progress Bar */}
          <div style={{ background: '#E2E8F0', height: '10px', borderRadius: '5px', overflow: 'hidden', marginTop: '6px' }}>
            <div
              style={{
                width: `${collectorDistrictStats.acquisitionPercentage}%`,
                background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                height: '100%',
                borderRadius: '5px',
                transition: 'width 0.6s ease'
              }}
            />
          </div>
        </div>
      </div>

      {/* PROJECT PROGRESS ANALYTICS & STAGE PIPELINE */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <BarChart2 size={18} style={{ color: '#0B4726' }} />
            STAGE-WISE PROJECT MONITORING PIPELINE (12 STAGES)
          </div>
          <span className="badge badge-blue">Collector Real-Time Monitoring</span>
        </div>

        {/* Stage Timeline Process Visual */}
        <div style={{ overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '980px' }}>
            {collectorStagePipeline.map((stg, idx) => (
              <React.Fragment key={idx}>
                <div
                  onClick={() => setSelectedStage(stg.stage)}
                  style={{
                    flex: 1,
                    padding: '10px 8px',
                    borderRadius: '8px',
                    border: selectedStage === stg.stage ? '2px solid #0B4726' : '1px solid #CBD5E1',
                    background: selectedStage === stg.stage ? '#E6F4EA' : '#FFFFFF',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                    Stage {idx + 1}
                  </div>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#1E293B', marginTop: '2px', lineHeight: 1.2 }}>
                    {stg.stage}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: stg.status === 'Green' ? '#1E7E34' : stg.status === 'Red' ? '#C5221F' : '#D97706', marginTop: '4px' }}>
                    {stg.count} <span style={{ fontSize: '10px', color: '#64748B' }}>Prj</span>
                  </div>
                </div>
                {idx < collectorStagePipeline.length - 1 && (
                  <ChevronRight size={14} style={{ color: '#94A3B8', flexShrink: 0 }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Chart Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Bar Chart: Stage Wise Distribution */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '10px' }}>
              Project Count per Stage
            </div>
            <div style={{ height: '240px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={collectorStagePipeline} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                  <XAxis dataKey="stage" angle={-35} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0B4726" radius={[4, 4, 0, 0]}>
                    {collectorStagePipeline.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.status === 'Green' ? '#1E7E34' : entry.status === 'Red' ? '#C5221F' : entry.status === 'Purple' ? '#8B5CF6' : '#D97706'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart: Overall Status */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
              Project Status Distribution
            </div>
            <div style={{ width: '100%', height: '170px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', width: '100%', fontSize: '11px' }}>
              {pieData.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: d.color }} />
                  <span style={{ color: '#475569' }}>{d.name}: <strong>{d.value}</strong></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TALUKA-WISE AND VILLAGE-WISE ANALYTICS WITH FILTERS */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <MapPin size={18} style={{ color: '#0B4726' }} />
            TALUKA & VILLAGE LEVEL LAND ACQUISITION MONITORING
          </div>

          {/* Interactive Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Filter size={14} style={{ color: '#64748B' }} />
            <select
              className="form-select"
              style={{ fontSize: '12px', padding: '4px 8px' }}
              value={selectedTaluka}
              onChange={e => {
                setSelectedTaluka(e.target.value);
                setDrillLevel(prev => ({ ...prev, taluka: e.target.value === 'All' ? null : e.target.value }));
              }}
            >
              <option value="All">All Talukas ▼</option>
              {collectorTalukasProgress.map(t => (
                <option key={t.id} value={t.taluka}>Taluka {t.taluka}</option>
              ))}
            </select>

            <select
              className="form-select"
              style={{ fontSize: '12px', padding: '4px 8px' }}
              value={selectedVillage}
              onChange={e => {
                setSelectedVillage(e.target.value);
                setDrillLevel(prev => ({ ...prev, village: e.target.value === 'All' ? null : e.target.value }));
              }}
            >
              <option value="All">All Villages ▼</option>
              {collectorVillageProgress.map((v, i) => (
                <option key={i} value={v.village}>{v.village}</option>
              ))}
            </select>

            <select
              className="form-select"
              style={{ fontSize: '12px', padding: '4px 8px' }}
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
            >
              <option value="All">All Projects ▼</option>
              {collectorProjectsMasterList.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Drilldown Breadcrumb Path Visual */}
        <div style={{ background: '#F1F5F9', padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginBottom: '14px' }}>
          <span style={{ fontWeight: 700, color: '#0B4726' }}>Drilldown Hierarchy:</span>
          <span style={{ padding: '2px 8px', background: '#FFF', borderRadius: '4px', border: '1px solid #CBD5E1', color: '#1E293B', fontWeight: 600 }}>
            District: {drillLevel.district}
          </span>
          <ChevronRight size={14} style={{ color: '#94A3B8' }} />
          <span style={{ padding: '2px 8px', background: drillLevel.taluka ? '#E6F4EA' : '#FFF', borderRadius: '4px', border: '1px solid #CBD5E1', color: drillLevel.taluka ? '#1E7E34' : '#64748B', fontWeight: drillLevel.taluka ? 700 : 500 }}>
            Taluka: {drillLevel.taluka || 'All (13 Talukas)'}
          </span>
          <ChevronRight size={14} style={{ color: '#94A3B8' }} />
          <span style={{ padding: '2px 8px', background: drillLevel.village ? '#E6F4EA' : '#FFF', borderRadius: '4px', border: '1px solid #CBD5E1', color: drillLevel.village ? '#1E7E34' : '#64748B', fontWeight: drillLevel.village ? 700 : 500 }}>
            Village: {drillLevel.village || 'All (142 Villages)'}
          </span>
        </div>

        {/* Structured Data Table */}
        <div className="table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Region / Administrative Unit</th>
                <th>Active Projects</th>
                <th style={{ textAlign: 'right' }}>Land Required (Ha)</th>
                <th style={{ textAlign: 'right' }}>Land Acquired (Ha)</th>
                <th style={{ textAlign: 'center' }}>Completion %</th>
                <th style={{ textAlign: 'center' }}>Pending Approvals</th>
                <th style={{ textAlign: 'center' }}>Risk Rating</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTalukas.map(t => (
                <tr key={t.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>Taluka {t.taluka}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Jurisdiction SDO & Tahsildar Active ({t.activeOfficers} Officers)</div>
                  </td>
                  <td style={{ fontWeight: 700 }}>{t.projects} Projects</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{t.landRequired.toLocaleString()} Ha</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: '#059669' }}>{t.landAcquired.toLocaleString()} Ha</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      <div style={{ flex: 1, background: '#E2E8F0', height: '8px', borderRadius: '4px', overflow: 'hidden', maxWidth: '80px' }}>
                        <div style={{ width: `${t.completion}%`, background: t.completion >= 70 ? '#10B981' : t.completion >= 50 ? '#F59E0B' : '#EF4444', height: '100%' }} />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '12px' }}>{t.completion}%</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {t.pendingApprovals > 0 ? (
                      <span className="badge badge-orange">{t.pendingApprovals} Pending</span>
                    ) : (
                      <span className="badge badge-green">Clean</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {t.riskScore > 60 ? (
                      <span className="badge badge-red">High ({t.riskScore})</span>
                    ) : t.riskScore > 30 ? (
                      <span className="badge badge-orange">Medium ({t.riskScore})</span>
                    ) : (
                      <span className="badge badge-green">Low ({t.riskScore})</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setSelectedTaluka(t.taluka);
                        setDrillLevel(prev => ({ ...prev, taluka: t.taluka }));
                      }}
                    >
                      Drill Down
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
