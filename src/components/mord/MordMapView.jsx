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
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '24px 28px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Page Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280', fontWeight: 600 }}>
            Geospatial Decision-Support Infrastructure
          </div>
          <h2 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '2px 0 0', color: '#16233A' }}>
            National Land Acquisition GIS Map
          </h2>
          <p style={{ fontSize: '13px', color: '#3A4A63', margin: '4px 0 0' }}>
            Interactive national geospatial layer displaying corridors, parcels, statutory compliance and dynamic land aggregations.
          </p>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: '#FFFFFF',
          border: '1px solid #D8D5CB',
          padding: '6px 14px',
          fontSize: '11.5px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#2F6F62' }} />
            <span>Healthy / Progressing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#8A6A1E' }} />
            <span>Needs Attention</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#A6432B' }} />
            <span>Delayed / High Risk</span>
          </div>
        </div>
      </div>

      {/* MAIN MAP LAYOUT: LEFT MAP CANVAS + RIGHT FILTER SIDEBAR (Prompt Section 13.1) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '20px'
      }}>
        {/* LEFT: MAP CANVAS */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #D8D5CB',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '680px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Map Top Status Bar */}
          <div style={{
            background: '#F2F1EC',
            borderBottom: '1px solid #D8D5CB',
            padding: '8px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            fontFamily: '"IBM Plex Mono", monospace',
            color: '#3A4A63'
          }}>
            <div>
              ACTIVE GIS VIEW: <strong>INDIA NATIONAL CORRIDORS</strong> ({filteredProjects.length} Projects Displayed)
            </div>
            <div>
              COORDINATES: 20.5937° N, 78.9629° E | CADASTRAL CADRE V4
            </div>
          </div>

          {/* Interactive Simulated Cartographic GIS Canvas */}
          <div style={{
            flex: 1,
            position: 'relative',
            background: '#F4F3F0',
            backgroundImage: `
              radial-gradient(#D8D5CB 1px, transparent 1px),
              linear-gradient(to right, #EFECE6 1px, transparent 1px),
              linear-gradient(to bottom, #EFECE6 1px, transparent 1px)
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
              border: '2px dashed #D8D5CB',
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              opacity: 0.35,
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
                    background: selectedState === pin.state ? '#16233A' : '#FFFFFF',
                    color: selectedState === pin.state ? '#FFFFFF' : '#16233A',
                    border: '1px solid #D8D5CB',
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(22, 35, 58, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    borderRadius: '2px'
                  }}>
                    <MapPin size={11} style={{
                      color: pin.state === 'Madhya Pradesh' || pin.state === 'Maharashtra' ? '#A6432B' : '#2F6F62'
                    }} />
                    <span>{pin.state}</span>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '9.5px',
                      background: selectedState === pin.state ? '#2F6F62' : '#F2F1EC',
                      color: selectedState === pin.state ? '#FFFFFF' : '#3A4A63',
                      padding: '0 4px'
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
                    width: isSelected ? '18px' : '14px',
                    height: isSelected ? '18px' : '14px',
                    borderRadius: '50%',
                    background: isCrit ? '#A6432B' : proj.status === 'Completed' ? '#2F6F62' : '#8A6A1E',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.3)',
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
                  border: '1px solid #D8D5CB',
                  boxShadow: '0 6px 20px rgba(22, 35, 58, 0.15)',
                  padding: '14px 18px',
                  zIndex: 30,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '11px',
                        color: '#2F6F62',
                        fontWeight: 700
                      }}>
                        {p.id}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        fontFamily: '"IBM Plex Mono", monospace',
                        padding: '1px 6px',
                        background: p.status === 'Delayed' ? '#F6E7E2' : '#E4EEE9',
                        color: p.status === 'Delayed' ? '#A6432B' : '#2F6F62',
                        border: '1px solid'
                      }}>
                        {p.status.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                      {p.name}
                    </div>

                    <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>
                      {p.district}, {p.state} &nbsp;|&nbsp;
                      Req: <strong>{p.landRequiredHa} Ha</strong> &nbsp;|&nbsp;
                      Acq: <strong>{p.landAcquiredHa} Ha</strong> &nbsp;|&nbsp;
                      Budget: <strong>{p.estimatedBudget}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onNavigate && onNavigate('project-detail', p.id)}
                      style={{
                        background: '#2F6F62',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        borderRadius: '2px'
                      }}
                    >
                      Open Case File →
                    </button>
                    <button
                      onClick={() => setSelectedProject(null)}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #D8D5CB',
                        color: '#6B7280',
                        padding: '6px 10px',
                        fontSize: '12px',
                        cursor: 'pointer'
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION 13.3 & 13.4: DYNAMIC LAND CALCULATIONS & AGGREGATE SUMMARY */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #D8D5CB',
            padding: '16px'
          }}>
            <div style={{
              fontSize: '10.5px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#3A4A63',
              fontWeight: 700,
              marginBottom: '10px'
            }}>
              Dynamic Land &amp; Value Aggregation
            </div>

            {/* Total Land Required vs Acquired */}
            <div style={{ background: '#F2F1EC', border: '1px solid #D8D5CB', padding: '12px', marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Filtered Projects Land Required</div>
              <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '20px', fontWeight: 700, color: '#16233A' }}>
                {landCalculations.totalReq} <span style={{ fontSize: '13px', fontWeight: 400 }}>Ha</span>
              </div>
              <div style={{ fontSize: '11px', color: '#2F6F62', marginTop: '2px' }}>
                Acquired: <strong>{landCalculations.totalAcq} Ha</strong> ({landCalculations.totalReq ? Math.round((landCalculations.totalAcq / landCalculations.totalReq) * 100) : 0}%)
              </div>
            </div>

            {/* Dynamic Land Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #EFECE6' }}>
                <span style={{ color: '#6B7280' }}>Farming / Agricultural:</span>
                <strong style={{ fontFamily: 'monospace' }}>{landCalculations.farming} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #EFECE6' }}>
                <span style={{ color: '#6B7280' }}>Forest Land (MoEF):</span>
                <strong style={{ fontFamily: 'monospace', color: '#8A6A1E' }}>{landCalculations.forest} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #EFECE6' }}>
                <span style={{ color: '#6B7280' }}>Private NA Land:</span>
                <strong style={{ fontFamily: 'monospace' }}>{landCalculations.privateLand} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #EFECE6' }}>
                <span style={{ color: '#6B7280' }}>Government Revenue:</span>
                <strong style={{ fontFamily: 'monospace' }}>{landCalculations.govtLand} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #EFECE6' }}>
                <span style={{ color: '#6B7280' }}>Community / Gaothan:</span>
                <strong style={{ fontFamily: 'monospace' }}>{landCalculations.communityLand} Ha</strong>
              </div>
            </div>

            {/* Filter Summary Metrics (Prompt 13.4) */}
            <div style={{
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: '1px solid #D8D5CB',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              fontSize: '11px'
            }}>
              <div>
                <span style={{ color: '#6B7280' }}>Projects:</span>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#16233A' }}>{filteredProjects.length}</div>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>Affected Families:</span>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#16233A' }}>{landCalculations.totalFamilies}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: '#6B7280' }}>Estimated Value:</span>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#2F6F62' }}>₹ {landCalculations.totalCostCr} Cr</div>
              </div>
            </div>
          </div>

          {/* SECTION 13.1: MAP FILTERS SIDEBAR */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #D8D5CB',
            padding: '16px'
          }}>
            <div style={{
              fontSize: '10.5px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#3A4A63',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              Interactive Map Filters
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px', fontWeight: 600 }}>
                  Project Type
                </label>
                <select
                  value={selectedProjectType}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  style={{ width: '100%', padding: '5px 8px', fontSize: '11.5px', border: '1px solid #D8D5CB' }}
                >
                  {projectTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px', fontWeight: 600 }}>
                  Ministry / Department
                </label>
                <select
                  value={selectedMinistry}
                  onChange={(e) => setSelectedMinistry(e.target.value)}
                  style={{ width: '100%', padding: '5px 8px', fontSize: '11.5px', border: '1px solid #D8D5CB' }}
                >
                  {ministries.map(opt => <option key={opt} value={opt}>{opt.replace('Ministry of ', 'Mo ')}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px', fontWeight: 600 }}>
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ width: '100%', padding: '5px 8px', fontSize: '11.5px', border: '1px solid #D8D5CB' }}
                >
                  {categories.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px', fontWeight: 600 }}>
                  State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{ width: '100%', padding: '5px 8px', fontSize: '11.5px', border: '1px solid #D8D5CB' }}
                >
                  {states.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px', fontWeight: 600 }}>
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{ width: '100%', padding: '5px 8px', fontSize: '11.5px', border: '1px solid #D8D5CB' }}
                >
                  {statuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px', fontWeight: 600 }}>
                  Risk Rating
                </label>
                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  style={{ width: '100%', padding: '5px 8px', fontSize: '11.5px', border: '1px solid #D8D5CB' }}
                >
                  {risks.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '2px', fontWeight: 600 }}>
                  Land Type Filter
                </label>
                <select
                  value={selectedLandType}
                  onChange={(e) => setSelectedLandType(e.target.value)}
                  style={{ width: '100%', padding: '5px 8px', fontSize: '11.5px', border: '1px solid #D8D5CB' }}
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
