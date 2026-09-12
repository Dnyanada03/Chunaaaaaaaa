import React, { useState } from 'react';
import {
  FolderKanban,
  Building,
  MapPin,
  Clock,
  AlertTriangle,
  IndianRupee,
  AlertCircle,
  TrendingUp,
  FileCheck,
  BarChart2,
  Layers,
  Activity,
  ArrowRight,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  PenTool
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from 'recharts';
import StateOverviewHub from './StateOverviewHub';
import {
  stateOfficerProfile,
  stateOverviewStats,
  stateProjectsMasterList,
  stateActivityFeed
} from '../../data/stateMockData';

const CustomDistrictTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const acquired = payload.find(p => p.dataKey === 'acquired')?.value || 0;
    const pending = payload.find(p => p.dataKey === 'pending')?.value || 0;
    const dispute = payload.find(p => p.dataKey === 'dispute')?.value || 0;
    const total = acquired + pending + dispute;
    const pct = total > 0 ? Math.round((acquired / total) * 100) : 0;

    return (
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D1D5DB',
        borderRadius: '10px',
        padding: '12px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
        fontSize: '12px',
        minWidth: '200px'
      }}>
        <div style={{
          fontWeight: '700',
          color: '#0B4726',
          fontSize: '13px',
          borderBottom: '1px solid #E5E7EB',
          paddingBottom: '6px',
          marginBottom: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{label} District</span>
          <span style={{ fontSize: '10px', background: '#E6F4EA', color: '#1E7E34', padding: '2px 7px', borderRadius: '6px', fontWeight: '700' }}>
            {pct}% Acquired
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1E7E34' }} /> Acquired:
            </span>
            <strong style={{ color: '#1E7E34' }}>{acquired} Ha</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} /> Pending Survey:
            </span>
            <strong style={{ color: '#D97706' }}>{pending} Ha</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5221F' }} /> Under Dispute:
            </span>
            <strong style={{ color: '#C5221F' }}>{dispute} Ha</strong>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const renderCustomPieLabel = (props) => {
  const { cx, cy, midAngle, outerRadius, percent, name, fill, payload } = props;
  const sliceName = name || payload?.name || '';
  const sliceFill = fill || payload?.color || '#1F2937';
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 18;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const isRight = x >= cx;
  const shortName = sliceName.split(' ')[0] || '';
  const pct = Math.round((percent || 0) * 100);

  if (pct < 3) return null;

  return (
    <g>
      <text
        x={x}
        y={y - 6}
        fill="#1F2937"
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="11"
        fontWeight="700"
      >
        {shortName}
      </text>
      <text
        x={x}
        y={y + 8}
        fill={sliceFill}
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="800"
      >
        {pct}%
      </text>
    </g>
  );
};

export default function StateDashboardView({ onNavigate }) {
  const [districtChartType, setDistrictChartType] = useState('grouped'); // 'grouped' | 'stacked' | 'area'
  const [hoveredActivity, setHoveredActivity] = useState(null);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Stage Breakdown Data for Donut Chart
  const stageData = [
    { name: 'Possession Taken', value: 11280, color: '#1E7E34' },
    { name: 'Under Survey / Verification', value: 4520, color: '#F59E0B' },
    { name: 'SIA Appraisal Review', value: 1510, color: '#1A73E8' },
    { name: 'Disputed / Objections', value: 680, color: '#C5221F' },
    { name: 'Delayed (>30 Days)', value: 430, color: '#991B1B' }
  ];

  // District-wise comparative acquisition data
  const districtBarData = [
    { district: 'Pune', acquired: 3200, pending: 850, dispute: 150 },
    { district: 'Thane', acquired: 2400, pending: 950, dispute: 280 },
    { district: 'Raigad', acquired: 2100, pending: 1100, dispute: 120 },
    { district: 'Nashik', acquired: 1850, pending: 720, dispute: 80 },
    { district: 'Palghar', acquired: 1730, pending: 900, dispute: 50 }
  ];

  // Critical Risk Projects Watchlist
  const criticalProjects = stateProjectsMasterList
    .filter(p => p.riskLevel === 'Critical' || p.riskLevel === 'High')
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Formal Page Banner matching Tahsildar styling */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>Cabinet Ministry Executive Dashboard</h1>
          <p>{greeting}, {stateOfficerProfile.name.split(',')[0]} — Land Acquisition Monitoring & State Executive Portal</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate && onNavigate('reports')}
          >
            <BarChart2 size={14} strokeWidth={1.5} /> Generate State MIS Report
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate && onNavigate('approvals')}
            style={{ background: '#991B1B', color: '#FFFFFF', borderColor: '#7F1D1D' }}
          >
            <AlertTriangle size={14} strokeWidth={1.5} /> Review Pending Approvals ({stateOverviewStats.pendingStateApprovals})
          </button>
        </div>
      </div>

      {/* Overview Hub Radial Metrics Display */}
      <StateOverviewHub onNavigate={onNavigate} />

      {/* WORK COMPLETED VS WORK PENDING SECTION */}
      <div className="card" style={{ borderLeft: '4px solid #0B4726' }}>
        <div className="card-header" style={{ marginBottom: '10px', paddingBottom: '8px' }}>
          <div className="card-title" style={{ fontSize: '14px', letterSpacing: '0.4px' }}>
            <TrendingUp size={16} strokeWidth={2} style={{ color: '#0B4726' }} />
            Statewide Land Acquisition & Milestone Progress Breakdown
          </div>
          <span className="mono-code" style={{ fontSize: '11px', fontWeight: '700', background: '#E6F4EA', color: '#0B4726', padding: '3px 10px', borderRadius: '8px', border: '1px solid #CEEAD6' }}>
            Total State Target: 18,420 Hectares (36 Districts)
          </span>
        </div>

        {/* Visual Segmented Progress Bar */}
        <div style={{ margin: '8px 0 14px 0' }}>
          <div style={{
            height: '22px',
            width: '100%',
            background: '#F1F5F9',
            borderRadius: '12px',
            display: 'flex',
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)'
          }}>
            <div style={{ width: '61.2%', background: '#1E7E34' }} title="Acquired: 11,280 Ha (61.2%)" />
            <div style={{ width: '24.5%', background: '#F59E0B' }} title="Pending Verification: 4,520 Ha (24.5%)" />
            <div style={{ width: '8.2%', background: '#1A73E8' }} title="Under SIA Appraisal: 1,510 Ha (8.2%)" />
            <div style={{ width: '3.7%', background: '#C5221F' }} title="Disputed Parcels: 680 Ha (3.7%)" />
            <div style={{ width: '2.4%', background: '#991B1B' }} title="Delayed Cases: 430 Ha (2.4%)" />
          </div>

          {/* Interactive Metric Breakdown Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '14px' }}>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#1E7E34', flexShrink: 0 }} /> Acquired:
              </span>
              <strong style={{ fontSize: '12px', color: '#1E7E34' }}>11.3K Ha <span style={{ opacity: 0.8, fontSize: '11px' }}>(61.2%)</span></strong>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }} /> Pending Survey:
              </span>
              <strong style={{ fontSize: '12px', color: '#D97706' }}>4.5K Ha <span style={{ opacity: 0.8, fontSize: '11px' }}>(24.5%)</span></strong>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#1A73E8', flexShrink: 0 }} /> SIA Appraisal:
              </span>
              <strong style={{ fontSize: '12px', color: '#1A73E8' }}>1.5K Ha <span style={{ opacity: 0.8, fontSize: '11px' }}>(8.2%)</span></strong>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#C5221F', flexShrink: 0 }} /> Disputed:
              </span>
              <strong style={{ fontSize: '12px', color: '#C5221F' }}>680 Ha <span style={{ opacity: 0.8, fontSize: '11px' }}>(3.7%)</span></strong>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#991B1B', flexShrink: 0 }} /> Delayed:
              </span>
              <strong style={{ fontSize: '12px', color: '#991B1B' }}>430 Ha <span style={{ opacity: 0.8, fontSize: '11px' }}>(2.4%)</span></strong>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD ANALYTICS CHARTS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        {/* Chart 1: Acquisition Stage Donut */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Statewide Acquisition Stage Breakdown</div>
          </div>
          <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
                  cx="40%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={108}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={{ stroke: '#94A3B8', strokeWidth: 1.5 }}
                  label={renderCustomPieLabel}
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val.toLocaleString()} Hectares`, 'Area']}
                  contentStyle={{ background: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '10px', fontSize: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '11.5px', lineHeight: '24px', paddingRight: '5px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: District-Wise Progress Bar Chart - with Grouped / Stacked / Area Flow toggles */}
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="card-title">District-Wise Acquisition Progress Register</div>
            <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <button
                type="button"
                onClick={() => setDistrictChartType('grouped')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: districtChartType === 'grouped' ? '#FFFFFF' : 'transparent',
                  color: districtChartType === 'grouped' ? '#0B4726' : '#64748B',
                  boxShadow: districtChartType === 'grouped' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <BarChart2 size={13} /> Grouped
              </button>
              <button
                type="button"
                onClick={() => setDistrictChartType('stacked')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: districtChartType === 'stacked' ? '#FFFFFF' : 'transparent',
                  color: districtChartType === 'stacked' ? '#0B4726' : '#64748B',
                  boxShadow: districtChartType === 'stacked' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Layers size={13} /> Stacked
              </button>
              <button
                type="button"
                onClick={() => setDistrictChartType('area')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: districtChartType === 'area' ? '#FFFFFF' : 'transparent',
                  color: districtChartType === 'area' ? '#0B4726' : '#64748B',
                  boxShadow: districtChartType === 'area' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Activity size={13} /> Area Flow
              </button>
            </div>
          </div>
          <div style={{ height: '300px', width: '100%', paddingTop: '6px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {districtChartType === 'area' ? (
                <AreaChart data={districtBarData}>
                  <defs>
                    <linearGradient id="colorAcq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E7E34" stopOpacity={0.45}/>
                      <stop offset="95%" stopColor="#1E7E34" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorPen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.45}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorDis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5221F" stopOpacity={0.45}/>
                      <stop offset="95%" stopColor="#C5221F" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="district" tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }} axisLine={{ stroke: '#E2E8F0' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <Tooltip content={<CustomDistrictTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Area type="monotone" dataKey="acquired" name="Acquired (Ha)" stroke="#1E7E34" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAcq)" />
                  <Area type="monotone" dataKey="pending" name="Pending (Ha)" stroke="#F59E0B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPen)" />
                  <Area type="monotone" dataKey="dispute" name="Disputed (Ha)" stroke="#C5221F" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDis)" />
                </AreaChart>
              ) : (
                <BarChart data={districtBarData} barGap={4} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="district" tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }} axisLine={{ stroke: '#E2E8F0' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <Tooltip content={<CustomDistrictTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Bar
                    dataKey="acquired"
                    name="Acquired (Ha)"
                    fill="#1E7E34"
                    stackId={districtChartType === 'stacked' ? 'a' : undefined}
                    radius={districtChartType === 'stacked' ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending (Ha)"
                    fill="#F59E0B"
                    stackId={districtChartType === 'stacked' ? 'a' : undefined}
                    radius={districtChartType === 'stacked' ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="dispute"
                    name="Disputed (Ha)"
                    fill="#C5221F"
                    stackId={districtChartType === 'stacked' ? 'a' : undefined}
                    radius={districtChartType === 'stacked' ? [4, 4, 0, 0] : [4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Critical Risk Projects Watchlist + Recent State Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        {/* Left Column: Priority Actions & Critical Projects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Priority Actions */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={16} style={{ color: '#D97706' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#1F2937' }}>
                  State Priority Actions
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#F1F5F9', borderRadius: '10px', overflow: 'hidden' }}>
              <PriorityRow
                icon={<FileCheck size={15} style={{ color: '#1A73E8' }} />}
                text={<><strong>{stateOverviewStats.pendingStateApprovals} proposals</strong> awaiting Cabinet decision</>}
                onClick={() => onNavigate && onNavigate('approvals')}
              />
              <PriorityRow
                icon={<ShieldAlert size={15} style={{ color: '#C5221F' }} />}
                text={<><strong>{stateOverviewStats.projectsAtRisk} projects</strong> flagged under critical risk</>}
                onClick={() => onNavigate && onNavigate('projects')}
              />
              <PriorityRow
                icon={<Activity size={15} style={{ color: '#D97706' }} />}
                text={<><strong>{stateOverviewStats.delayedProjects} projects</strong> require executive intervention (exceeded timelines)</>}
                onClick={() => onNavigate && onNavigate('projects')}
              />
              <PriorityRow
                icon={<PenTool size={15} style={{ color: '#8B5CF6' }} />}
                text={<><strong>4 orders</strong> pending your digital signature</>}
                onClick={() => onNavigate && onNavigate('signatures')}
              />
            </div>
          </div>

          {/* Critical Risk Watchlist */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <ShieldAlert size={15} style={{ color: '#C5221F' }} /> Critical Risk Projects Watchlist
              </span>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => onNavigate && onNavigate('projects')}
                style={{ fontSize: '11px' }}
              >
                View All ({stateOverviewStats.totalProjects})
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {criticalProjects.map((proj) => (
                <div
                  key={proj.id}
                  style={{
                    padding: '12px 14px',
                    background: '#FAFAF9',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => onNavigate && onNavigate('project-detail', proj.id)}
                  onMouseOver={e => {
                    e.currentTarget.style.borderColor = '#CBD5E1';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{proj.name}</span>
                    <span className={`badge ${proj.riskLevel === 'Critical' ? 'badge-red' : 'badge-orange'}`} style={{ fontSize: '10px' }}>
                      <span className="badge-dot"></span>
                      {proj.riskLevel}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '6px' }}>
                    {proj.riskFactors && proj.riskFactors.length > 0
                      ? proj.riskFactors[0].description
                      : `${proj.district} · ${proj.stage}`}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '50px', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${proj.progress}%`, height: '100%', background: proj.progress >= 70 ? '#1E7E34' : '#D97706' }} />
                      </div>
                      <span style={{ fontSize: '11px', color: '#4B5563', fontWeight: 600 }}>{proj.progress}%</span>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#1A73E8', fontWeight: 600 }}>
                      Inspect Corridor <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent State Activity Feed */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">
              <Clock size={15} /> Recent State & Cabinet Sanctions
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {stateActivityFeed.map((act, idx) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '12px 0',
                  borderBottom: idx < stateActivityFeed.length - 1 ? '1px solid #F1F5F9' : 'none',
                  cursor: 'default'
                }}
                onMouseEnter={() => setHoveredActivity(act.id)}
                onMouseLeave={() => setHoveredActivity(null)}
              >
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#6B7280',
                  minWidth: '95px',
                  flexShrink: 0,
                  paddingTop: '2px'
                }}>
                  {hoveredActivity === act.id ? (
                    <span style={{ fontSize: '10px', color: '#475569', fontFamily: 'var(--font-mono)' }}>
                      {act.timestamp}
                    </span>
                  ) : (
                    act.date
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
                    {act.action}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                    {act.project} — <span style={{ color: '#0B4726', fontWeight: 500 }}>{act.department}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PriorityRow({ icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '11px 16px',
        background: '#FFFFFF',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        fontSize: '13px',
        color: '#1F2937',
        transition: 'background 0.12s ease'
      }}
      onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'}
      onMouseOut={e => e.currentTarget.style.background = '#FFFFFF'}
    >
      {icon}
      <span style={{ flex: 1 }}>{text}</span>
      <ArrowRight size={14} style={{ color: '#9CA3AF' }} />
    </button>
  );
}
