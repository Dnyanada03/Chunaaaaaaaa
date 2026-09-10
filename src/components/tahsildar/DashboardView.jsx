import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import OverviewHub from './OverviewHub';
import {
  FolderKanban,
  Building,
  MapPin,
  Clock,
  AlertTriangle,
  IndianRupee,
  AlertCircle,
  Bell,
  ArrowRight,
  TrendingUp,
  FileCheck,
  BarChart2,
  Layers,
  Activity
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

const CustomVillageTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const verified = payload.find(p => p.dataKey === 'verified')?.value || 0;
    const pending = payload.find(p => p.dataKey === 'pending')?.value || 0;
    const dispute = payload.find(p => p.dataKey === 'dispute')?.value || 0;
    const total = verified + pending + dispute;
    const pct = total > 0 ? Math.round((verified / total) * 100) : 0;

    return (
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D1D5DB',
        borderRadius: '10px',
        padding: '12px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
        fontSize: '12px',
        minWidth: '190px'
      }}>
        <div style={{ fontWeight: '700', color: '#0B4726', fontSize: '13px', borderBottom: '1px solid #E5E7EB', paddingBottom: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{label} Village</span>
          <span style={{ fontSize: '10px', background: '#E6F4EA', color: '#1E7E34', padding: '2px 7px', borderRadius: '6px', fontWeight: '700' }}>
            {pct}% Verified
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1E7E34' }} /> Verified:
            </span>
            <strong style={{ color: '#1E7E34' }}>{verified}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} /> Pending:
            </span>
            <strong style={{ color: '#D97706' }}>{pending}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5221F' }} /> Dispute:
            </span>
            <strong style={{ color: '#C5221F' }}>{dispute}</strong>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const renderCustomPieLabel = (props) => {
  const { cx, cy, midAngle, outerRadius, percent, name, fill } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 22;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const isRight = x >= cx;
  const shortName = name.split(' ')[0];
  const pct = Math.round(percent * 100);

  return (
    <g>
      <text
        x={x}
        y={y - 6}
        fill="#1F2937"
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="11.5"
        fontWeight="700"
      >
        {shortName}
      </text>
      <text
        x={x}
        y={y + 8}
        fill={fill}
        textAnchor={isRight ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12.5"
        fontWeight="800"
      >
        {pct}%
      </text>
    </g>
  );
};

const DashboardView = () => {
  const { setActiveTab, notifications, objections, markNotificationAsRead } = useSwadesh();
  const [villageChartType, setVillageChartType] = useState('grouped'); // 'grouped' | 'stacked' | 'area'

  // Strict Semantic Metrics System:
  // - neutral: Gray-Navy border (#4B5563) for Informational metrics
  // - amber: Amber border (#B06000) for Action Required metrics
  // - red: Brick-Red border (#C5221F) for Overdue / Critical metrics
  const metrics = [
    { label: "Active Assigned Projects", value: "12", sub: "3 Major Infrastructure Corridors", icon: FolderKanban, type: "neutral", targetTab: "projects" },
    { label: "Total Revenue Villages", value: "48", sub: "Haveli & Khed Taluka Jurisdiction", icon: Building, type: "neutral", targetTab: "tasks" },
    { label: "Affected Land Parcels", value: "8,450", sub: "Total Corridor Surveyed Area", icon: MapPin, type: "neutral", targetTab: "projects" },
    { label: "Pending Field Verification", value: "1,240", sub: "Talathi Inspection Queue", icon: Clock, type: "amber", targetTab: "tasks" },
    { label: "Compensation Approved", value: "580", sub: "PFMS Direct Benefit Transfer", icon: IndianRupee, type: "amber", targetTab: "compensation" },
    { label: "Under Objection / Dispute", value: "320", sub: "Escalated to Tahsildar Bench", icon: AlertTriangle, type: "red", targetTab: "objections" },
    { label: "Delayed Cases (>15 Days)", value: "85", sub: "Resolution Deadline Expired", icon: AlertCircle, type: "red", targetTab: "tasks" }
  ];

  // Visual Analytics Muted Semantic Data: Verification Status
  const verificationData = [
    { name: 'Verified / Approved', value: 5200, color: '#1E7E34' },
    { name: 'Pending Verification', value: 2100, color: '#F59E0B' },
    { name: 'Under Objection', value: 320, color: '#C5221F' },
    { name: 'Notice / Mutation', value: 745, color: '#1A73E8' },
    { name: 'Delayed Cases', value: 85, color: '#991B1B' }
  ];

  // Village-Wise Progress Bar Data
  const villageBarData = [
    { village: 'Wagholi', verified: 95, pending: 15, dispute: 10 },
    { village: 'Avalwadi', verified: 60, pending: 15, dispute: 10 },
    { village: 'Manjari Khurd', verified: 85, pending: 25, dispute: 5 },
    { village: 'Khed Shivapur', verified: 90, pending: 10, dispute: 10 },
    { village: 'Shindewadi', verified: 60, pending: 10, dispute: 5 }
  ];

  // Work-related notifications preview (exclude objection details per spec)
  const workNotifs = notifications.filter(n => n.category !== 'Objection').slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>Tahsildar Executive Dashboard</h1>
          <p>Land Acquisition Monitoring & Verification Portal</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('notices')}>
            <FileCheck size={14} strokeWidth={1.5} /> Issue Statutory Notices
          </button>
          {/* Reserved Gold exclusively for header accent line; Objections button uses deep maroon/brick red (#991B1B) */}
          <button
            className="btn btn-primary"
            onClick={() => setActiveTab('objections')}
            style={{ background: '#991B1B', color: '#FFFFFF', borderColor: '#7F1D1D' }}
          >
            <AlertTriangle size={14} strokeWidth={1.5} /> Review Objections ({objections.filter(o => o.status !== 'Resolved').length})
          </button>
        </div>
      </div>

      {/* Overview Stack Hub Radial Metrics Display */}
      <OverviewHub onNavigate={setActiveTab} />

      {/* WORK COMPLETED VS WORK PENDING SECTION */}
      <div className="card" style={{ borderLeft: '4px solid #0B4726' }}>
        <div className="card-header" style={{ marginBottom: '10px', paddingBottom: '8px' }}>
          <div className="card-title" style={{ fontSize: '14px', letterSpacing: '0.4px' }}>
            <TrendingUp size={16} strokeWidth={2} style={{ color: '#0B4726' }} />
            Work Completed vs Work Pending Breakdown
          </div>
          <span className="mono-code" style={{ fontSize: '11px', fontWeight: '700', background: '#E6F4EA', color: '#0B4726', padding: '3px 10px', borderRadius: '8px', border: '1px solid #CEEAD6' }}>
            Total Assigned Work: 8,450 Parcels
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
            <div style={{ width: '61.5%', background: '#1E7E34' }} title="Completed: 5,200 (61.5%)" />
            <div style={{ width: '24.8%', background: '#F59E0B' }} title="Pending Verification: 2,100 (24.8%)" />
            <div style={{ width: '3.8%', background: '#C5221F' }} title="Under Objection: 320 (3.8%)" />
            <div style={{ width: '8.9%', background: '#1A73E8' }} title="Notice / Mutation: 745 (8.9%)" />
            <div style={{ width: '1.0%', background: '#991B1B' }} title="Delayed: 85 (1.0%)" />
          </div>

          {/* Interactive Metric Breakdown Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '14px' }}>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#1E7E34', flexShrink: 0 }} /> Completed:
              </span>
              <strong style={{ fontSize: '12px', color: '#1E7E34' }}>5,200 <span style={{ opacity: 0.8, fontSize: '11px' }}>(61.5%)</span></strong>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }} /> Pending:
              </span>
              <strong style={{ fontSize: '12px', color: '#D97706' }}>2,100 <span style={{ opacity: 0.8, fontSize: '11px' }}>(24.8%)</span></strong>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#C5221F', flexShrink: 0 }} /> Objections:
              </span>
              <strong style={{ fontSize: '12px', color: '#C5221F' }}>320 <span style={{ opacity: 0.8, fontSize: '11px' }}>(3.8%)</span></strong>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#1A73E8', flexShrink: 0 }} /> Notices:
              </span>
              <strong style={{ fontSize: '12px', color: '#1A73E8' }}>745 <span style={{ opacity: 0.8, fontSize: '11px' }}>(8.9%)</span></strong>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '8px 12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#334155' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#991B1B', flexShrink: 0 }} /> Delayed:
              </span>
              <strong style={{ fontSize: '12px', color: '#991B1B' }}>85 <span style={{ opacity: 0.8, fontSize: '11px' }}>(1.0%)</span></strong>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD ANALYTICS CHARTS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        {/* Chart 1: Verification Status Donut */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Verification Status Breakdown</div>
          </div>
          <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="40%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={108}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={{ stroke: '#94A3B8', strokeWidth: 1.5 }}
                  label={renderCustomPieLabel}
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val} Parcels`, 'Count']} contentStyle={{ background: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '10px', fontSize: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }} />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '11.5px', lineHeight: '24px', paddingRight: '5px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Village-Wise Progress Bar Chart - Enhanced & Sundar */}
        <div className="card">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="card-title">Village-Wise Progress Register</div>
            <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <button
                type="button"
                onClick={() => setVillageChartType('grouped')}
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
                  background: villageChartType === 'grouped' ? '#FFFFFF' : 'transparent',
                  color: villageChartType === 'grouped' ? '#0B4726' : '#64748B',
                  boxShadow: villageChartType === 'grouped' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <BarChart2 size={13} /> Grouped
              </button>
              <button
                type="button"
                onClick={() => setVillageChartType('stacked')}
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
                  background: villageChartType === 'stacked' ? '#FFFFFF' : 'transparent',
                  color: villageChartType === 'stacked' ? '#0B4726' : '#64748B',
                  boxShadow: villageChartType === 'stacked' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Layers size={13} /> Stacked
              </button>
              <button
                type="button"
                onClick={() => setVillageChartType('area')}
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
                  background: villageChartType === 'area' ? '#FFFFFF' : 'transparent',
                  color: villageChartType === 'area' ? '#0B4726' : '#64748B',
                  boxShadow: villageChartType === 'area' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Activity size={13} /> Area Flow
              </button>
            </div>
          </div>
          <div style={{ height: '300px', width: '100%', paddingTop: '6px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {villageChartType === 'area' ? (
                <AreaChart data={villageBarData}>
                  <defs>
                    <linearGradient id="colorVer" x1="0" y1="0" x2="0" y2="1">
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
                  <XAxis dataKey="village" tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }} axisLine={{ stroke: '#E2E8F0' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <Tooltip content={<CustomVillageTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Area type="monotone" dataKey="verified" name="Verified" stroke="#1E7E34" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVer)" />
                  <Area type="monotone" dataKey="pending" name="Pending" stroke="#F59E0B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPen)" />
                  <Area type="monotone" dataKey="dispute" name="Dispute" stroke="#C5221F" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDis)" />
                </AreaChart>
              ) : (
                <BarChart data={villageBarData} barGap={4} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="village" tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }} axisLine={{ stroke: '#E2E8F0' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={{ stroke: '#E2E8F0' }} />
                  <Tooltip content={<CustomVillageTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Bar
                    dataKey="verified"
                    name="Verified"
                    fill="#1E7E34"
                    stackId={villageChartType === 'stacked' ? 'a' : undefined}
                    radius={villageChartType === 'grouped' ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending"
                    fill="#F59E0B"
                    stackId={villageChartType === 'stacked' ? 'a' : undefined}
                    radius={villageChartType === 'grouped' ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="dispute"
                    name="Dispute"
                    fill="#C5221F"
                    stackId={villageChartType === 'stacked' ? 'a' : undefined}
                    radius={villageChartType === 'grouped' || villageChartType === 'stacked' ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* DASHBOARD NOTIFICATION PREVIEW PANEL */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Bell size={16} strokeWidth={1.5} style={{ color: '#0B4726' }} />
            Official Work Notifications Register
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('notifications')}
          >
            View All Notifications <ArrowRight size={13} strokeWidth={1.5} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {workNotifs.map(n => (
            <div
              key={n.id}
              style={{
                padding: '16px 20px',
                border: '1px solid #E2E8F0',
                borderLeft: n.read ? '5px solid #CBD5E1' : '5px solid #0B4726',
                borderRadius: '14px',
                background: n.read ? '#FFFFFF' : '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s ease-in-out',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
              onClick={() => {
                markNotificationAsRead(n.id);
                setActiveTab('notifications');
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: n.read ? '#F1F5F9' : '#E6F4EA',
                  color: n.read ? '#64748B' : '#0B4726',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bell size={18} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    {/* Distinct Dark Green Heading */}
                    <span style={{ fontWeight: '700', color: '#0B4726', fontSize: '15px', letterSpacing: '-0.2px' }}>
                      {n.title}
                    </span>
                    {/* Project ID Tag */}
                    <span className="mono-code" style={{ fontSize: '11px', background: '#E8F0FE', color: '#1A73E8', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                      {n.projectId}
                    </span>
                    {!n.read && (
                      <span style={{ background: '#0B4726', color: '#FFFFFF', fontSize: '10px', padding: '2px 7px', borderRadius: '4px', fontWeight: '800', textTransform: 'uppercase' }}>
                        UNREAD
                      </span>
                    )}
                  </div>
                  {/* Distinct Slate Description */}
                  <div style={{ fontSize: '13.5px', color: '#334155', marginTop: '4px', lineHeight: '1.5' }}>
                    {n.message}
                  </div>
                </div>
              </div>

              {/* Timestamp on the right */}
              <div style={{ textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#64748B', flexShrink: 0, marginLeft: '20px' }}>
                {n.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
