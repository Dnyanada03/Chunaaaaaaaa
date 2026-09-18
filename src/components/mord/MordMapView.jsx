import React, { useState, useMemo } from 'react';
import { MapPin, Layers, Filter, Eye, ChevronRight, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getAllMordProjects } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';

export default function MordMapView({ onNavigate }) {
  const { projects: contextProjects } = useSwadesh();
  const allProjects = useMemo(() => getAllMordProjects(contextProjects), [contextProjects]);

  // Filters State
  const [selectedProjectType, setSelectedProjectType] = useState('All');
  const [selectedMinistry, setSelectedMinistry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [selectedLandType, setSelectedLandType] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter options
  const projectTypes = ['All', 'State Infrastructure', 'National Expressway', 'National Flagship Project', 'Centre-State Joint Venture', 'State Highway', 'State Enterprise', 'State Water Project'];
  const ministries = ['All', ...new Set(allProjects.map(p => p.ministry).filter(Boolean))];
  const categories = ['All', ...new Set(allProjects.map(p => p.category).filter(Boolean))];
  const states = ['All', ...new Set(allProjects.map(p => p.state).filter(Boolean))];
  const statuses = ['All', 'Ongoing', 'Delayed', 'Under Review', 'Completed'];
  const risks = ['All', 'Critical', 'High', 'Medium', 'Low', 'None'];
  const landTypes = ['All', 'Agricultural', 'Forest', 'Private NA', 'Government'];

  // Dynamically Filtered Projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
      const matchType = selectedProjectType === 'All' || p.projectType === selectedProjectType;
      const matchMin = selectedMinistry === 'All' || p.ministry === selectedMinistry;
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchState = selectedState === 'All' || p.state === selectedState;
      const matchStat = selectedStatus === 'All' || p.status.toLowerCase() === selectedStatus.toLowerCase();
      const matchRisk = selectedRisk === 'All' || (p.riskLevel && p.riskLevel.toLowerCase() === selectedRisk.toLowerCase());

      let matchLand = true;
      if (selectedLandType === 'Forest') matchLand = (p.landBreakdown?.forest || 0) > 0;
      if (selectedLandType === 'Agricultural') matchLand = (p.landBreakdown?.agricultural || 0) > 0;
      if (selectedLandType === 'Private NA') matchLand = (p.landBreakdown?.private || 0) > 0;
      if (selectedLandType === 'Government') matchLand = (p.landBreakdown?.government || 0) > 0;

      return matchType && matchMin && matchCat && matchState && matchStat && matchRisk && matchLand;
    });
  }, [allProjects, selectedProjectType, selectedMinistry, selectedCategory, selectedState, selectedStatus, selectedRisk, selectedLandType]);

  // Section 13.3: DYNAMIC LAND CALCULATIONS ACCORDING TO ACTIVE FILTERS
  const landCalculations = useMemo(() => {
    let totalReq = 0;
    let totalAcq = 0;
    let farming = 0;
    let forest = 0;
    let defence = 0;
    let privateLand = 0;
    let govtLand = 0;
    let communityLand = 0;
    let totalFamilies = 0;
    let totalCostCr = 0;

    filteredProjects.forEach(p => {
      totalReq += (p.landRequiredHa || 0);
      totalAcq += (p.landAcquiredHa || 0);
      farming += (p.landBreakdown?.agricultural || (p.landRequiredHa * 0.6) || 0);
      forest += (p.landBreakdown?.forest || (p.landRequiredHa * 0.1) || 0);
      privateLand += (p.landBreakdown?.private || (p.landRequiredHa * 0.7) || 0);
      govtLand += (p.landBreakdown?.government || (p.landRequiredHa * 0.15) || 0);
      communityLand += (p.landBreakdown?.community || (p.landRequiredHa * 0.05) || 0);
      totalFamilies += (p.affectedFamilies || 0);

      const numBudget = parseFloat((p.estimatedBudget || '0').replace(/[^0-9.]/g, ''));
      if (!isNaN(numBudget)) totalCostCr += numBudget;
    });

    return {
      totalReq: Math.round(totalReq * 10) / 10,
      totalAcq: Math.round(totalAcq * 10) / 10,
      farming: Math.round(farming * 10) / 10,
      forest: Math.round(forest * 10) / 10,
      defence: Math.round(defence * 10) / 10,
      privateLand: Math.round(privateLand * 10) / 10,
      govtLand: Math.round(govtLand * 10) / 10,
      communityLand: Math.round(communityLand * 10) / 10,
      totalFamilies,
      totalCostCr: Math.round(totalCostCr)
    };
  }, [filteredProjects]);

  // State Map Anchor Pins
  const stateCoordinates = [
    { state: 'Maharashtra', x: 38, y: 55, count: allProjects.filter(p => p.state === 'Maharashtra').length },
    { state: 'Gujarat', x: 26, y: 44, count: allProjects.filter(p => p.state === 'Gujarat').length },
    { state: 'Karnataka', x: 39, y: 72, count: allProjects.filter(p => p.state === 'Karnataka').length },
    { state: 'Madhya Pradesh', x: 48, y: 46, count: allProjects.filter(p => p.state === 'Madhya Pradesh').length },
    { state: 'Uttar Pradesh', x: 55, y: 32, count: allProjects.filter(p => p.state === 'Uttar Pradesh').length },
    { state: 'Tamil Nadu', x: 46, y: 84, count: allProjects.filter(p => p.state === 'Tamil Nadu').length },
    { state: 'Odisha', x: 67, y: 50, count: allProjects.filter(p => p.state === 'Odisha').length },
    { state: 'Rajasthan', x: 30, y: 32, count: allProjects.filter(p => p.state === 'Rajasthan').length }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Title Banner */}
      <div className="page-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div className="page-banner-title">National Land Acquisition GIS Map</div>
          <p className="page-banner-sub">
            Interactive national geospatial layer displaying corridors, parcels, statutory compliance and dynamic land aggregations.
          </p>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '8px 16px',
          fontSize: '12px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#008E4F' }} />
            <span style={{ color: '#4B5563', fontWeight: 500 }}>Healthy / Progressing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#D97706' }} />
            <span style={{ color: '#4B5563', fontWeight: 500 }}>Needs Attention</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#DC2626' }} />
            <span style={{ color: '#4B5563', fontWeight: 500 }}>Delayed / High Risk</span>
          </div>
        </div>
      </div>

      {/* MAIN MAP LAYOUT: LEFT MAP CANVAS + RIGHT FILTER SIDEBAR (Prompt Section 13.1) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '24px'
      }}>
        {/* LEFT: MAP CANVAS */}
        <div className="card" style={{
          padding: 0,
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '680px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Map Top Status Bar */}
          <div style={{
            background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            padding: '10px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            fontFamily: '"Roboto Mono", monospace',
            color: '#475569'
          }}>
            <div>
              ACTIVE GIS VIEW: <strong style={{ color: '#0F172A' }}>INDIA NATIONAL CORRIDORS</strong> ({filteredProjects.length} Projects Displayed)
            </div>
            <div>
              COORDINATES: 20.5937° N, 78.9629° E | CADASTRAL CADRE V4
            </div>
          </div>

          {/* Interactive Simulated Cartographic GIS Canvas */}
          <div style={{
            flex: 1,
            position: 'relative',
            background: '#F8FAFC',
            backgroundImage: `
              radial-gradient(#CBD5E1 1px, transparent 1px),
              linear-gradient(to right, #F1F5F9 1px, transparent 1px),
              linear-gradient(to bottom, #F1F5F9 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px, 120px 120px, 120px 120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Outline representation watermark */}
            <div style={{
              position: 'absolute',
              width: '420px',
              height: '460px',
              border: '2px dashed #CBD5E1',
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              opacity: 0.45,
              pointerEvents: 'none'
            }} />

            {/* National State Pins */}
            {stateCoordinates.map(pin => {
              const matchesFilter = selectedState === 'All' || selectedState === pin.state;
              return (
                <div
                  key={pin.state}
                  onClick={() => setSelectedState(selectedState === pin.state ? 'All' : pin.state)}
                  style={{
                    position: 'absolute',
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: matchesFilter ? 10 : 2,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    background: selectedState === pin.state ? '#008E4F' : '#FFFFFF',
                    color: selectedState === pin.state ? '#FFFFFF' : '#1E293B',
                    border: selectedState === pin.state ? '1px solid #008E4F' : '1px solid #CBD5E1',
                    padding: '5px 10px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '8px'
                  }}>
                    <MapPin size={12} style={{
                      color: selectedState === pin.state ? '#FFFFFF' : (pin.state === 'Madhya Pradesh' || pin.state === 'Maharashtra' ? '#DC2626' : '#008E4F')
                    }} />
                    <span>{pin.state}</span>
                    <span style={{
                      fontFamily: '"Roboto Mono", monospace',
                      fontSize: '10px',
                      background: selectedState === pin.state ? 'rgba(255,255,255,0.2)' : '#F1F5F9',
                      color: selectedState === pin.state ? '#FFFFFF' : '#475569',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      fontWeight: 700
                    }}>
                      {pin.count}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Project Hub Marker Nodes */}
            {filteredProjects.slice(0, 10).map((proj, idx) => {
              const offsets = [
                { x: 37, y: 52 }, { x: 39, y: 56 }, { x: 42, y: 50 },
                { x: 28, y: 42 }, { x: 47, y: 44 }, { x: 40, y: 70 },
                { x: 53, y: 34 }, { x: 65, y: 48 }, { x: 32, y: 35 }, { x: 45, y: 82 }
              ];
              const pos = offsets[idx % offsets.length];
              const isCrit = proj.riskLevel === 'Critical' || proj.status === 'Delayed';
              const isSelected = selectedProject === proj.id;

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(isSelected ? null : proj.id)}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: isSelected ? 20 : 5
                  }}
                  title={`${proj.name} (${proj.status})`}
                >
                  <div style={{
                    width: isSelected ? '20px' : '14px',
                    height: isSelected ? '20px' : '14px',
                    borderRadius: '50%',
                    background: isCrit ? '#DC2626' : proj.status === 'Completed' ? '#008E4F' : '#D97706',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0 0 0 2px rgba(0,0,0,0.25)',
                    transition: 'all 0.15s ease'
                  }} />
                </div>
              );
            })}

            {/* Active Selected Project Card Overlay on Map */}
            {selectedProject && (() => {
              const p = allProjects.find(item => item.id === selectedProject);
              if (!p) return null;
              return (
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  padding: '16px 20px',
                  zIndex: 30,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontFamily: '"Roboto Mono", monospace',
                        fontSize: '11px',
                        color: '#008E4F',
                        fontWeight: 700
                      }}>
                        {p.id}
                      </span>
                      <span style={{
                        fontSize: '10.5px',
                        fontFamily: '"Roboto Mono", monospace',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        background: p.status === 'Delayed' ? '#FEF2F2' : '#ECFDF5',
                        color: p.status === 'Delayed' ? '#991B1B' : '#065F46',
                        border: p.status === 'Delayed' ? '1px solid #FECACA' : '1px solid #A7F3D0',
                        fontWeight: 600
                      }}>
                        {p.status.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B', marginTop: '4px' }}>
                      {p.name}
                    </div>

                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                      {p.district}, {p.state} &nbsp;|&nbsp;
                      Req: <strong style={{ color: '#1E293B' }}>{p.landRequiredHa} Ha</strong> &nbsp;|&nbsp;
                      Acq: <strong style={{ color: '#008E4F' }}>{p.landAcquiredHa} Ha</strong> &nbsp;|&nbsp;
                      Budget: <strong style={{ color: '#1E293B' }}>{p.estimatedBudget}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => onNavigate && onNavigate('project-detail', p.id)}
                      className="btn btn-primary btn-sm"
                      style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        borderRadius: '8px'
                      }}
                    >
                      Open Case File →
                    </button>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        padding: '8px 14px',
                        fontSize: '12px',
                        borderRadius: '8px'
                      }}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* RIGHT: MAP FILTER SIDEBAR & DYNAMIC LAND CALCULATIONS (Prompt 13.1 & 13.3) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* SECTION 13.3 & 13.4: DYNAMIC LAND CALCULATIONS & AGGREGATE SUMMARY */}
          <div className="card" style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#64748B',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              Dynamic Land &amp; Value Aggregation
            </div>

            {/* Total Land Required vs Acquired */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Filtered Projects Land Required</div>
              <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '22px', fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>
                {landCalculations.totalReq} <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}>Ha</span>
              </div>
              <div style={{ fontSize: '12px', color: '#008E4F', marginTop: '4px', fontWeight: 500 }}>
                Acquired: <strong>{landCalculations.totalAcq} Ha</strong> ({landCalculations.totalReq ? Math.round((landCalculations.totalAcq / landCalculations.totalReq) * 100) : 0}%)
              </div>
            </div>

            {/* Dynamic Land Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Farming / Agricultural:</span>
                <strong style={{ fontFamily: '"Roboto Mono", monospace', color: '#1E293B' }}>{landCalculations.farming} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Forest Land (MoEF):</span>
                <strong style={{ fontFamily: '"Roboto Mono", monospace', color: '#D97706' }}>{landCalculations.forest} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Private NA Land:</span>
                <strong style={{ fontFamily: '"Roboto Mono", monospace', color: '#1E293B' }}>{landCalculations.privateLand} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Government Revenue:</span>
                <strong style={{ fontFamily: '"Roboto Mono", monospace', color: '#1E293B' }}>{landCalculations.govtLand} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Community / Gaothan:</span>
                <strong style={{ fontFamily: '"Roboto Mono", monospace', color: '#1E293B' }}>{landCalculations.communityLand} Ha</strong>
              </div>
            </div>

            {/* Filter Summary Metrics (Prompt 13.4) */}
            <div style={{
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid #E2E8F0',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              fontSize: '11px'
            }}>
              <div>
                <span style={{ color: '#64748B' }}>Projects:</span>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1E293B', marginTop: '2px' }}>{filteredProjects.length}</div>
              </div>
              <div>
                <span style={{ color: '#64748B' }}>Affected Families:</span>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1E293B', marginTop: '2px' }}>{landCalculations.totalFamilies}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: '#64748B' }}>Estimated Value:</span>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#008E4F', marginTop: '2px' }}>₹ {landCalculations.totalCostCr} Cr</div>
              </div>
            </div>
          </div>

          {/* SECTION 13.1: MAP FILTERS SIDEBAR */}
          <div className="card" style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#64748B',
              fontWeight: 700,
              marginBottom: '14px'
            }}>
              Interactive Map Filters
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                  Project Type
                </label>
                <select
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12.5px', border: '1px solid #CBD5E1', borderRadius: '8px', background: '#FFFFFF', color: '#1E293B' }}
                >
                  {projectTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                  Ministry / Department
                </label>
                <select
                  value={selectedMinistry}
                  onChange={(e) => setSelectedMinistry(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12.5px', border: '1px solid #CBD5E1', borderRadius: '8px', background: '#FFFFFF', color: '#1E293B' }}
                >
                  {ministries.map(opt => <option key={opt} value={opt}>{opt.replace('Ministry of ', 'Mo ')}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12.5px', border: '1px solid #CBD5E1', borderRadius: '8px', background: '#FFFFFF', color: '#1E293B' }}
                >
                  {categories.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                  State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12.5px', border: '1px solid #CBD5E1', borderRadius: '8px', background: '#FFFFFF', color: '#1E293B' }}
                >
                  {states.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12.5px', border: '1px solid #CBD5E1', borderRadius: '8px', background: '#FFFFFF', color: '#1E293B' }}
                >
                  {statuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                  Risk Rating
                </label>
                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12.5px', border: '1px solid #CBD5E1', borderRadius: '8px', background: '#FFFFFF', color: '#1E293B' }}
                >
                  {risks.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                  Land Type Filter
                </label>
                <select
                  value={selectedLandType}
                  onChange={(e) => setSelectedLandType(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '12.5px', border: '1px solid #CBD5E1', borderRadius: '8px', background: '#FFFFFF', color: '#1E293B' }}
                >
                  {landTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
