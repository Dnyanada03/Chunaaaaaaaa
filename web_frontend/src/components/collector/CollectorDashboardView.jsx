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
  AreaChart,
  Area,
  CartesianGrid,
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

const CustomStageTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const statusColor = data.status === 'Green' ? '#1E7E34' : data.status === 'Red' ? '#C5221F' : data.status === 'Purple' ? '#8B5CF6' : '#D97706';
    return (
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #CBD5E1',
        borderRadius: '10px',
        padding: '12px 14px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
        fontSize: '12px',
        minWidth: '200px'
      }}>
        <div style={{ fontWeight: '800', color: '#0F172A', fontSize: '13px', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{data.stage}</span>
          <span style={{ fontSize: '10px', background: `${statusColor}15`, color: statusColor, padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>
            {data.status} Status
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748B' }}>Project Count:</span>
            <strong style={{ color: statusColor, fontSize: '14px' }}>{data.count} Projects</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748B' }}>Share of Pipeline:</span>
            <strong style={{ color: '#1E293B' }}>{Math.round((data.count / 48) * 100)}%</strong>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function CollectorDashboardView({ onNavigate }) {
  // Filter States
  const [selectedTaluka, setSelectedTaluka] = useState('All');
  const [selectedVillage, setSelectedVillage] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [stageChartType, setStageChartType] = useState('bar'); // 'bar' | 'area'

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Clean Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DISTRICT LAND ACQUISITION MONITORING DASHBOARD</h1>
          <p>Higher District-Level Revenue & Executive Magistracy Overview • Pune District (13 Talukas)</p>
        </div>
      </div>



      {/* 4-CARD TEHSILDAR OVERVIEW HUB & FULL-WIDTH PROGRESS BAR */}
      <div className="overview-hub-card">
        <div className="hub-layout-4card">
          {/* Left Column (2 Cards) */}
          <div className="hub-column left-column">
            {/* Card 1: TOTAL PROJECTS */}
            <div
              className="hub-item-card"
              onClick={() => onNavigate && onNavigate('projects')}
            >
              <div className="hub-item-icon" style={{ background: '#E6F4EA', color: '#1E7E34' }}>
                <Building2 size={20} strokeWidth={2} />
              </div>
              <div className="hub-item-content">
                <div className="hub-item-title-row">
                  <span className="hub-item-value" style={{ color: '#1E7E34' }}>{collectorDistrictStats.totalProjects}</span>
                  <span className="hub-item-title">Total Projects</span>
                </div>
                <span className="hub-item-desc">Across 13 Talukas of Pune</span>
              </div>
              <button className="hub-item-btn" style={{ background: '#1E7E34' }} title="View Total Projects">
                <ChevronRight size={15} strokeWidth={2.5} />
              </button>
            </div>

            {/* Card 2: ONGOING PROJECTS */}
            <div
              className="hub-item-card"
              onClick={() => onNavigate && onNavigate('projects')}
            >
              <div className="hub-item-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
                <Clock size={20} strokeWidth={2} />
              </div>
              <div className="hub-item-content">
                <div className="hub-item-title-row">
                  <span className="hub-item-value" style={{ color: '#D97706' }}>{collectorDistrictStats.ongoingProjects}</span>
                  <span className="hub-item-title">Ongoing Projects</span>
                </div>
                <span className="hub-item-desc">Active acquisition & field survey</span>
              </div>
              <button className="hub-item-btn" style={{ background: '#D97706' }} title="View Ongoing Projects">
                <ChevronRight size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Center Hub Emblem & Connector SVGs */}
          <div className="hub-center-container-4card">
            <svg className="hub-connectors-svg" viewBox="0 0 300 240" preserveAspectRatio="none">
              {/* Left Connector Curves */}
              <path d="M 10,60 C 90,60 100,100 150,100" fill="none" stroke="#1E7E34" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
              <path d="M 10,180 C 90,180 100,140 150,140" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

              {/* Right Connector Curves */}
              <path d="M 290,60 C 210,60 200,100 150,100" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
              <path d="M 290,180 C 210,180 200,140 150,140" fill="none" stroke="#1A73E8" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

              {/* Left Dots */}
              <circle cx="10" cy="60" r="4" fill="#1E7E34" />
              <circle cx="10" cy="180" r="4" fill="#D97706" />

              {/* Right Dots */}
              <circle cx="290" cy="60" r="4" fill="#059669" />
              <circle cx="290" cy="180" r="4" fill="#1A73E8" />
            </svg>

            {/* Radial Hub Circle */}
            <div className="hub-radial-circle">
              <div className="hub-outer-ring">
                <div className="hub-inner-ring">
                  <div className="hub-center-core">
                    <div className="hub-sub-text">Land Acquisition Overview</div>
                    <div className="hub-main-text">SWADESH</div>
                    <div className="hub-badge-title">Overview</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pedestal Stand */}
            <div className="hub-pedestal-base">
              <div className="pedestal-ring-1" />
              <div className="pedestal-ring-2" />
              <div className="pedestal-ring-3" />
            </div>
          </div>

          {/* Right Column (2 Cards) */}
          <div className="hub-column right-column">
            {/* Card 3: COMPLETED PROJECTS */}
            <div
              className="hub-item-card"
              onClick={() => onNavigate && onNavigate('projects')}
            >
              <div className="hub-item-icon" style={{ background: '#D1FAE5', color: '#059669' }}>
                <CheckCircle2 size={20} strokeWidth={2} />
              </div>
              <div className="hub-item-content">
                <div className="hub-item-title-row">
                  <span className="hub-item-value" style={{ color: '#059669' }}>{collectorDistrictStats.completedProjects}</span>
                  <span className="hub-item-title">Completed Projects</span>
                </div>
                <span className="hub-item-desc">Final mutation & handover done</span>
              </div>
              <button className="hub-item-btn" style={{ background: '#059669' }} title="View Completed Projects">
                <ChevronRight size={15} strokeWidth={2.5} />
              </button>
            </div>

            {/* Card 4: TOTAL LAND REQUIRED */}
            <div
              className="hub-item-card"
              onClick={() => onNavigate && onNavigate('projects')}
            >
              <div className="hub-item-icon" style={{ background: '#E8F0FE', color: '#1A73E8' }}>
                <MapPin size={20} strokeWidth={2} />
              </div>
              <div className="hub-item-content">
                <div className="hub-item-title-row">
                  <span className="hub-item-value" style={{ color: '#1A73E8' }}>{collectorDistrictStats.totalLandRequiredHa.toLocaleString()} Ha</span>
                  <span className="hub-item-title">Total Land Required</span>
                </div>
                <span className="hub-item-desc">142 Affected Villages</span>
              </div>
              <button className="hub-item-btn" style={{ background: '#1A73E8' }} title="View Land Details">
                <ChevronRight size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH SCREEN LAND ACQUISITION PROGRESS BAR */}
        <div className="full-screen-progress-card" style={{ marginTop: '20px' }}>
          <div className="progress-banner-header">
            <div className="progress-banner-title-group">
              <div className="progress-icon-pill">
                <TrendingUp size={20} style={{ color: '#059669' }} />
              </div>
              <div>
                <div className="progress-banner-label">TOTAL LAND ACQUIRED ACROSS DISTRICT</div>
                <div className="progress-banner-value">
                  {collectorDistrictStats.totalLandAcquiredHa.toLocaleString()} <span className="progress-banner-total">/ 12,850 Ha</span>
                </div>
              </div>
            </div>

            <div className="progress-banner-meta">
              <div className="progress-stat-pill">
                <span className="stat-pill-dot green" />
                <span>Acquired: <strong>8,420 Ha</strong></span>
              </div>
              <div className="progress-stat-pill">
                <span className="stat-pill-dot orange" />
                <span>Remaining: <strong>4,430 Ha</strong></span>
              </div>
              <div className="progress-pct-badge">
                Land Acquired: {collectorDistrictStats.acquisitionPercentage}%
              </div>
            </div>
          </div>

          {/* Full Width Progress Bar & Tick Milestones */}
          <div className="progress-bar-container">
            <div className="progress-track-outer">
              <div
                className="progress-fill-bar"
                style={{ width: `${collectorDistrictStats.acquisitionPercentage}%` }}
              >
                <div className="progress-fill-glow" />
              </div>
            </div>

            {/* Milestone markers */}
            <div className="progress-milestones">
              <div className="milestone-item active">
                <div className="milestone-tick" />
                <span>0 Ha (0%)</span>
              </div>
              <div className="milestone-item active">
                <div className="milestone-tick" />
                <span>3,212 Ha (25%)</span>
              </div>
              <div className="milestone-item active">
                <div className="milestone-tick" />
                <span>6,425 Ha (50%)</span>
              </div>
              <div className="milestone-item">
                <div className="milestone-tick" />
                <span>9,637 Ha (75%)</span>
              </div>
              <div className="milestone-item">
                <div className="milestone-tick" />
                <span>12,850 Ha (100%)</span>
              </div>
            </div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="btn-group" style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px' }}>
              <button
                onClick={() => setStageChartType('bar')}
                style={{
                  padding: '4px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  border: 'none',
                  background: stageChartType === 'bar' ? '#FFFFFF' : 'transparent',
                  color: stageChartType === 'bar' ? '#0B4726' : '#64748B',
                  boxShadow: stageChartType === 'bar' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Bar Chart
              </button>
              <button
                onClick={() => setStageChartType('area')}
                style={{
                  padding: '4px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  border: 'none',
                  background: stageChartType === 'area' ? '#FFFFFF' : 'transparent',
                  color: stageChartType === 'area' ? '#0B4726' : '#64748B',
                  boxShadow: stageChartType === 'area' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Area Trend
              </button>
            </div>
            <span className="badge badge-blue">Collector Real-Time Monitoring</span>
          </div>
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

        {/* Metric Cards Summary Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>TOTAL PIPELINE STAGES</span>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>12 Active Stages</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>TOP VOLUME STAGE</span>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#1E7E34', marginTop: '2px' }}>Stage 12: Completed (17 Prj)</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>FIELD SURVEY PEAK</span>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#D97706', marginTop: '2px' }}>Stage 6: Survey (6 Prj)</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>AVERAGE PER STAGE</span>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#1A73E8', marginTop: '2px' }}>4.0 Projects / Stage</div>
          </div>
        </div>

        {/* Enhanced Full-Width 100% Graph */}
        <div style={{ width: '100%', height: '300px', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <ResponsiveContainer width="100%" height="100%">
            {stageChartType === 'bar' ? (
              <BarChart data={collectorStagePipeline} margin={{ top: 15, right: 20, left: -10, bottom: 45 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="stage" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} />
                <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip content={<CustomStageTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {collectorStagePipeline.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.status === 'Green' ? '#1E7E34' : entry.status === 'Red' ? '#C5221F' : entry.status === 'Purple' ? '#8B5CF6' : '#D97706'}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <AreaChart data={collectorStagePipeline} margin={{ top: 15, right: 20, left: -10, bottom: 45 }}>
                <defs>
                  <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B4726" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0B4726" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="stage" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} />
                <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                <Tooltip content={<CustomStageTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#0B4726" strokeWidth={3} fillOpacity={1} fill="url(#stageGrad)" />
              </AreaChart>
            )}
          </ResponsiveContainer>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
