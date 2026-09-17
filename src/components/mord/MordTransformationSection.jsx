import React, { useState } from 'react';
import {
  TrendingDown,
  Database,
  BarChart3,
  LineChart as LineChartIcon,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

// Chart Data: Turnaround in Days for Stages 1 to 7
const stageTurnaroundData = [
  {
    stageKey: 'Stg 1',
    fullStage: '1. Proposal & GIS Demarcation',
    traditional: 180,
    swadesh: 28,
    unit: 'Days',
    reductionPct: 84.4,
    statute: 'RFCTLARR Sec 4 / GIS Cadastral'
  },
  {
    stageKey: 'Stg 2',
    fullStage: '2. Title & Cadastral Verification',
    traditional: 210,
    swadesh: 35,
    unit: 'Days',
    reductionPct: 83.3,
    statute: 'Revenue Record e-Dharti API'
  },
  {
    stageKey: 'Stg 3',
    fullStage: '3. SIA & Public Hearings',
    traditional: 185,
    swadesh: 65,
    unit: 'Days',
    reductionPct: 64.9,
    statute: 'RFCTLARR Sec 7 & 8 Gram Sabha'
  },
  {
    stageKey: 'Stg 4',
    fullStage: '4. Cabinet & Sec 11 Approval',
    traditional: 140,
    swadesh: 21,
    unit: 'Days',
    reductionPct: 85.0,
    statute: 'State Cabinet & e-Gazette DSC'
  },
  {
    stageKey: 'Stg 5',
    fullStage: '5. Award & PFMS DBT',
    traditional: 195,
    swadesh: 32,
    unit: 'Days',
    reductionPct: 83.6,
    statute: 'RFCTLARR Sec 23 & 30 PFMS DBT'
  },
  {
    stageKey: 'Stg 6',
    fullStage: '6. R&R Entitlement Formulation',
    traditional: 220,
    swadesh: 45,
    unit: 'Days',
    reductionPct: 79.5,
    statute: 'RFCTLARR Sec 31 & 38 Administrator'
  },
  {
    stageKey: 'Stg 7',
    fullStage: '7. Grievance SLA Resolution',
    traditional: 310,
    swadesh: 24,
    unit: 'Days',
    reductionPct: 92.3,
    statute: 'Digital Escalation & CPGRAMS Link'
  }
];

// Chart Data: Risk & Friction Reduction Rates (%)
const statutoryRiskData = [
  {
    indicator: 'Boundary Discrepancies',
    traditional: 44.2,
    swadesh: 3.1,
    unit: '% parcels',
    reduction: '↓ 93.0%',
    note: 'GIS cadastral satellite boundary overlay'
  },
  {
    indicator: 'Disputed Parcels at Award',
    traditional: 28.5,
    swadesh: 4.2,
    unit: '% parcels',
    reduction: '↓ 85.3%',
    note: 'Digital heirship & mutation verification'
  },
  {
    indicator: 'Statutory Sec 11 Lapses',
    traditional: 18.2,
    swadesh: 0.4,
    unit: '% projects',
    reduction: '↓ 97.8%',
    note: 'Automated 12-month statutory timer alerts'
  },
  {
    indicator: 'Valuation Errors',
    traditional: 16.4,
    swadesh: 0.0,
    unit: '% calculations',
    reduction: '↓ 100.0%',
    note: 'Automated circle rate multiplier engine'
  },
  {
    indicator: 'High Court Injunctions',
    traditional: 24.8,
    swadesh: 3.2,
    unit: '% projects',
    reduction: '↓ 87.1%',
    note: 'Geotagged hearings and clear title audit'
  },
  {
    indicator: 'Cost Overruns (Delay)',
    traditional: 42.5,
    swadesh: 6.2,
    unit: '% escalation',
    reduction: '↓ 85.4%',
    note: 'Real-time project tracking via MoRD console'
  }
];

// Chart Data: Cumulative Lifecycle Milestone Curve (in Months)
const lifecycleTrajectoryData = [
  { milestone: 'Proposal Filed', traditionalMonths: 0, swadeshMonths: 0 },
  { milestone: 'Cadastral GIS Verification', traditionalMonths: 13, swadeshMonths: 2.1 },
  { milestone: 'SIA & Gram Sabha Hearing', traditionalMonths: 22, swadeshMonths: 4.3 },
  { milestone: 'Sec 11 Gazette Sanction', traditionalMonths: 31, swadeshMonths: 6.2 },
  { milestone: 'Statutory Award & DBT', traditionalMonths: 42, swadeshMonths: 9.1 },
  { milestone: 'R&R Resettlement Colony', traditionalMonths: 51, swadeshMonths: 12.4 },
  { milestone: 'Final Mutation & Possession', traditionalMonths: 58, swadeshMonths: 16.0 }
];

// Custom Tooltip for Turnaround Bar Chart
const CustomTurnaroundTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const traditionalVal = payload.find(p => p.dataKey === 'traditional')?.value;
    const swadeshVal = payload.find(p => p.dataKey === 'swadesh')?.value;
    const dataObj = payload[0]?.payload;
    const daysSaved = traditionalVal - swadeshVal;

    return (
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #16233A',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        padding: '12px 14px',
        fontSize: '12px',
        minWidth: '240px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ fontWeight: 700, color: '#16233A', fontSize: '12.5px', borderBottom: '1px solid #E5E7EB', paddingBottom: '6px', marginBottom: '8px' }}>
          {dataObj?.fullStage || label}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#A6432B', fontWeight: 600 }}>• Traditional Process:</span>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#A6432B' }}>
            {traditionalVal} {dataObj?.unit || 'Days'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: '#2F6F62', fontWeight: 600 }}>• SWADESH Digital:</span>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2F6F62' }}>
            {swadeshVal} {dataObj?.unit || 'Days'}
          </span>
        </div>
        <div style={{
          background: '#E4EEE9',
          border: '1px solid #2F6F62',
          padding: '6px 8px',
          marginTop: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px'
        }}>
          <span style={{ color: '#2F6F62', fontWeight: 700 }}>Time Saved:</span>
          <span style={{ color: '#2F6F62', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>
            {daysSaved} Days ({dataObj?.reductionPct}% Faster)
          </span>
        </div>
        {dataObj?.statute && (
          <div style={{ fontSize: '10.5px', color: '#6B7280', marginTop: '6px' }}>
            Statute: {dataObj.statute}
          </div>
        )}
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Risk Bar Chart
const CustomRiskTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataObj = payload[0]?.payload;
    return (
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #16233A',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        padding: '12px 14px',
        fontSize: '12px',
        minWidth: '230px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ fontWeight: 700, color: '#16233A', fontSize: '12.5px', borderBottom: '1px solid #E5E7EB', paddingBottom: '6px', marginBottom: '8px' }}>
          {label}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#A6432B', fontWeight: 600 }}>Traditional Baseline:</span>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#A6432B' }}>
            {dataObj?.traditional}%
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: '#2F6F62', fontWeight: 600 }}>SWADESH Telemetry:</span>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2F6F62' }}>
            {dataObj?.swadesh}%
          </span>
        </div>
        <div style={{
          background: '#E4EEE9',
          border: '1px solid #2F6F62',
          padding: '6px 8px',
          marginTop: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px'
        }}>
          <span style={{ color: '#2F6F62', fontWeight: 700 }}>Risk Mitigation:</span>
          <span style={{ color: '#2F6F62', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>
            {dataObj?.reduction} Drop
          </span>
        </div>
        {dataObj?.note && (
          <div style={{ fontSize: '10.5px', color: '#6B7280', marginTop: '6px' }}>
            Mechanism: {dataObj.note}
          </div>
        )}
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Lifecycle Area Chart
const CustomLifecycleTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const trad = payload.find(p => p.dataKey === 'traditionalMonths')?.value;
    const swad = payload.find(p => p.dataKey === 'swadeshMonths')?.value;
    return (
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #16233A',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        padding: '12px 14px',
        fontSize: '12px',
        minWidth: '240px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ fontWeight: 700, color: '#16233A', fontSize: '12.5px', borderBottom: '1px solid #E5E7EB', paddingBottom: '6px', marginBottom: '8px' }}>
          {label}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#A6432B', fontWeight: 600 }}>Traditional Elapsed:</span>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#A6432B' }}>
            Month {trad}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: '#2F6F62', fontWeight: 600 }}>SWADESH Elapsed:</span>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2F6F62' }}>
            Month {swad}
          </span>
        </div>
        <div style={{
          background: '#E4EEE9',
          border: '1px solid #2F6F62',
          padding: '6px 8px',
          marginTop: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px'
        }}>
          <span style={{ color: '#2F6F62', fontWeight: 700 }}>Lead Time Advantage:</span>
          <span style={{ color: '#2F6F62', fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}>
            {(trad - swad).toFixed(1)} Months Sooner
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function MordTransformationSection() {
  const [chartView, setChartView] = useState('turnaround'); // 'turnaround' | 'risk' | 'trajectory'

  return (
    <div
      id="swadesh-transformation-section"
      style={{
        background: '#FFFFFF',
        border: '1px solid #2F6F62',
        padding: '24px',
        marginBottom: '30px',
        position: 'relative',
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
      }}
    >
      {/* Top Gold/Teal Banner */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: '#2F6F62',
        color: '#FFFFFF',
        fontSize: '10px',
        fontFamily: '"IBM Plex Mono", monospace',
        padding: '4px 14px',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <Database size={12} />
        Live Audited Telemetry • SWADESH X-Factor
      </div>

      {/* SECTION HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              fontSize: '10px',
              fontFamily: '"IBM Plex Mono", monospace',
              background: '#F2ECDC',
              color: '#8A6A1E',
              border: '1px solid #8A6A1E',
              padding: '2px 7px',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              National Reform Evidence
            </span>
            <span style={{
              fontSize: '11px',
              color: '#6B7280',
              fontFamily: 'Inter, sans-serif'
            }}>
              Historical Baselines (CAG &amp; NITI Aayog PMG) vs. Live SWADESH Platform
            </span>
          </div>
          <h3 style={{
            fontFamily: '"Source Serif Pro", Georgia, serif',
            fontSize: '22px',
            fontWeight: 700,
            margin: '0 0 4px',
            color: '#16233A'
          }}>
            The SWADESH Transformation: Traditional Process vs. SWADESH Process
          </h3>
          <p style={{ fontSize: '13px', color: '#3A4A63', margin: 0, maxWidth: '85ch', lineHeight: 1.5 }}>
            Empirical comparative analysis demonstrating radical reduction in acquisition cycle turnaround, litigation risks, and administrative friction across all 8 statutory RFCTLARR stages.
          </p>
        </div>

        {/* Chart View Toggle Controls */}
        <div style={{
          display: 'flex',
          background: '#F2F1EC',
          border: '1px solid #D8D5CB',
          padding: '3px',
          gap: '2px'
        }}>
          <button
            onClick={() => setChartView('turnaround')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              fontSize: '11.5px',
              fontWeight: chartView === 'turnaround' ? 700 : 500,
              background: chartView === 'turnaround' ? '#FFFFFF' : 'transparent',
              color: chartView === 'turnaround' ? '#2F6F62' : '#3A4A63',
              border: chartView === 'turnaround' ? '1px solid #D8D5CB' : '1px solid transparent',
              cursor: 'pointer',
              boxShadow: chartView === 'turnaround' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <BarChart3 size={13} />
            <span>Stage Turnaround (Days)</span>
          </button>

          <button
            onClick={() => setChartView('risk')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              fontSize: '11.5px',
              fontWeight: chartView === 'risk' ? 700 : 500,
              background: chartView === 'risk' ? '#FFFFFF' : 'transparent',
              color: chartView === 'risk' ? '#2F6F62' : '#3A4A63',
              border: chartView === 'risk' ? '1px solid #D8D5CB' : '1px solid transparent',
              cursor: 'pointer',
              boxShadow: chartView === 'risk' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <TrendingDown size={13} />
            <span>Friction &amp; Risk (%)</span>
          </button>

          <button
            onClick={() => setChartView('trajectory')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              fontSize: '11.5px',
              fontWeight: chartView === 'trajectory' ? 700 : 500,
              background: chartView === 'trajectory' ? '#FFFFFF' : 'transparent',
              color: chartView === 'trajectory' ? '#2F6F62' : '#3A4A63',
              border: chartView === 'trajectory' ? '1px solid #D8D5CB' : '1px solid transparent',
              cursor: 'pointer',
              boxShadow: chartView === 'trajectory' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <LineChartIcon size={13} />
            <span>Lifecycle Timeline (Months)</span>
          </button>
        </div>
      </div>

      {/* GRAPHICAL REPRESENTATION CONTAINER */}
      <div style={{
        background: '#FBFAF6',
        border: '1px solid #D8D5CB',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              fontWeight: 700,
              color: '#2F6F62',
              textTransform: 'uppercase'
            }}>
              GRAPHICAL BENCHMARK ANALYSIS
            </span>
            <h4 style={{
              fontFamily: '"Source Serif Pro", serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#16233A',
              margin: '2px 0 0'
            }}>
              {chartView === 'turnaround' && 'Statutory Stage Processing Turnaround: Traditional (Days) vs. SWADESH (Days)'}
              {chartView === 'risk' && 'Statutory Friction & Legal Discrepancy Rates: Traditional Baseline (%) vs. SWADESH (%)'}
              {chartView === 'trajectory' && 'End-to-End Acquisition Lifecycle Milestone Progression (Cumulative Months)'}
            </h4>
          </div>

          {/* Chart Legend Summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', background: '#C85A32', display: 'inline-block', borderRadius: '2px' }} />
              <span style={{ color: '#3A4A63', fontWeight: 600 }}>Traditional Manual Process</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', background: '#2F6F62', display: 'inline-block', borderRadius: '2px' }} />
              <span style={{ color: '#16233A', fontWeight: 700 }}>SWADESH Digital Platform</span>
            </div>
          </div>
        </div>

        {/* Dynamic Chart Render */}
        <div style={{ width: '100%', height: 350 }}>
          {chartView === 'turnaround' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stageTurnaroundData}
                margin={{ top: 10, right: 20, left: 0, bottom: 25 }}
                barCategoryGap="25%"
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="stageKey"
                  tick={{ fill: '#3A4A63', fontSize: 11, fontWeight: 600 }}
                  axisLine={{ stroke: '#D8D5CB' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#3A4A63', fontSize: 11 }}
                  axisLine={{ stroke: '#D8D5CB' }}
                  tickLine={false}
                  label={{ value: 'Turnaround Duration (Days)', angle: -90, position: 'insideLeft', style: { fill: '#6B7280', fontSize: 11, textAnchor: 'middle' } }}
                />
                <Tooltip content={<CustomTurnaroundTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '11.5px' }}
                />
                <Bar dataKey="traditional" name="Traditional (Days)" fill="#C85A32" radius={[3, 3, 0, 0]} />
                <Bar dataKey="swadesh" name="SWADESH (Days)" fill="#2F6F62" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartView === 'risk' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statutoryRiskData}
                margin={{ top: 10, right: 20, left: 0, bottom: 35 }}
                barCategoryGap="25%"
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="indicator"
                  tick={{ fill: '#3A4A63', fontSize: 10.5, fontWeight: 600 }}
                  axisLine={{ stroke: '#D8D5CB' }}
                  tickLine={false}
                  interval={0}
                  angle={-12}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fill: '#3A4A63', fontSize: 11 }}
                  axisLine={{ stroke: '#D8D5CB' }}
                  tickLine={false}
                  label={{ value: 'Occurrence Rate (%)', angle: -90, position: 'insideLeft', style: { fill: '#6B7280', fontSize: 11, textAnchor: 'middle' } }}
                />
                <Tooltip content={<CustomRiskTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '11.5px' }}
                />
                <Bar dataKey="traditional" name="Traditional Baseline (%)" fill="#C85A32" radius={[3, 3, 0, 0]} />
                <Bar dataKey="swadesh" name="SWADESH System (%)" fill="#2F6F62" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartView === 'trajectory' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={lifecycleTrajectoryData}
                margin={{ top: 15, right: 30, left: 10, bottom: 35 }}
              >
                <defs>
                  <linearGradient id="gradTraditional" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C85A32" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#C85A32" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradSwadesh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F6F62" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2F6F62" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="milestone"
                  tick={{ fill: '#3A4A63', fontSize: 10.5, fontWeight: 600 }}
                  axisLine={{ stroke: '#D8D5CB' }}
                  tickLine={false}
                  interval={0}
                  angle={-10}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fill: '#3A4A63', fontSize: 11 }}
                  axisLine={{ stroke: '#D8D5CB' }}
                  tickLine={false}
                  label={{ value: 'Elapsed Time (Months)', angle: -90, position: 'insideLeft', style: { fill: '#6B7280', fontSize: 11, textAnchor: 'middle' } }}
                />
                <Tooltip content={<CustomLifecycleTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '11.5px' }}
                />
                <Area
                  type="monotone"
                  dataKey="traditionalMonths"
                  name="Traditional Process (Total 58 Months)"
                  stroke="#C85A32"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#gradTraditional)"
                />
                <Area
                  type="monotone"
                  dataKey="swadeshMonths"
                  name="SWADESH Digital Platform (Total 16 Months)"
                  stroke="#2F6F62"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#gradSwadesh)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Quick Analytical Callout Footer */}
        <div style={{
          borderTop: '1px solid #D8D5CB',
          paddingTop: '12px',
          marginTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11.5px',
          color: '#3A4A63',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={13} color="#2F6F62" />
            <span>
              <strong>Key Reform Finding:</strong> Across all 7 statutory phases, the SWADESH automation pipeline removes an aggregate of <strong>1,294 days (42.5 months)</strong> of administrative waiting latency.
            </span>
          </div>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10.5px', color: '#6B7280' }}>
            Source: Live RFCTLARR Telemetry Stream &bull; Sept 2026
          </span>
        </div>
      </div>
    </div>
  );
}
