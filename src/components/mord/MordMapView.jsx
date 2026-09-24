import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
  Tooltip,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import {
  MapPin,
  Layers,
  Filter,
  Eye,
  ChevronRight,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Crosshair,
  LocateFixed
} from 'lucide-react';
import { getAllMordProjects } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';

// Geographic Centroids for Indian States
const stateGeoCenters = {
  'Maharashtra': [19.7515, 75.7139],
  'Gujarat': [22.2587, 71.1924],
  'Karnataka': [15.3173, 75.7139],
  'Madhya Pradesh': [22.9734, 78.6569],
  'Uttar Pradesh': [26.8467, 80.9462],
  'Tamil Nadu': [11.1271, 78.6569],
  'Odisha': [20.9517, 85.0985],
  'Rajasthan': [27.0238, 74.2179],
  'Delhi': [28.7041, 77.1025],
  'West Bengal': [22.9868, 87.8550],
  'Andhra Pradesh': [15.9129, 79.7400],
  'Telangana': [18.1124, 79.0193],
  'Kerala': [10.8505, 76.2711],
  'Bihar': [25.0961, 85.3131],
  'Punjab': [31.1471, 75.3412],
  'Haryana': [29.0588, 76.0856],
  'Assam': [26.2006, 92.9376]
};

// Deterministic coordinate generator for projects within their respective state
function getProjectCoordinates(proj) {
  const base = stateGeoCenters[proj.state] || [22.5, 78.5];
  // Calculate deterministic offset from project ID string
  const hash = (proj.id || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const latDelta = (((hash % 23) - 11) * 0.12);
  const lngDelta = ((((hash * 7) % 29) - 14) * 0.12);
  return [base[0] + latDelta, base[1] + lngDelta];
}

// Controller for programmatic Leaflet camera movements & tile size invalidation
function MordMapController({ selectedState, targetedProject, resetTrigger }) {
  const map = useMap();
  const isInitialMount = useRef(true);

  // Invalidate size immediately so tiles render with 100% dimensions without gray gaps
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  // Handle State filter zoom
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      map.setView([22.5937, 78.9629], 5);
      return;
    }
    if (selectedState !== 'All' && stateGeoCenters[selectedState]) {
      map.flyTo(stateGeoCenters[selectedState], 7, {
        animate: true,
        duration: 1.2
      });
    } else if (selectedState === 'All') {
      map.flyTo([22.5937, 78.9629], 5, { animate: true });
    }
  }, [selectedState, map]);

  // Handle selected project zoom
  useEffect(() => {
    if (targetedProject) {
      const coords = getProjectCoordinates(targetedProject);
      map.flyTo(coords, 9, {
        animate: true,
        duration: 1.2
      });
    }
  }, [targetedProject, map]);

  // Reset trigger to whole country
  useEffect(() => {
    if (resetTrigger > 0) {
      map.flyTo([22.5937, 78.9629], 5, { animate: true });
    }
  }, [resetTrigger, map]);

  return null;
}

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
  const [activeBaseLayer, setActiveBaseLayer] = useState('cadastral'); // cadastral, satellite, terrain
  const [resetTrigger, setResetTrigger] = useState(0);

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

  // Base map tile layers (100% free, no API keys or watermarks)
  const baseMapTiles = {
    cadastral: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri World Imagery'
    },
    terrain: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri World Topo'
    }
  };

  // State summary cards data
  const stateSummaryList = useMemo(() => {
    return Object.keys(stateGeoCenters).map(st => {
      const projs = allProjects.filter(p => p.state === st);
      const atRisk = projs.filter(p => p.riskLevel === 'Critical' || p.status === 'Delayed').length;
      return {
        state: st,
        count: projs.length,
        atRisk,
        coords: stateGeoCenters[st]
      };
    }).filter(s => s.count > 0);
  }, [allProjects]);

  // Custom DivIcon for State Hubs
  const createStateHubIcon = (stateName, count, atRisk, isSelected) => {
    return L.divIcon({
      className: 'custom-mord-state-hub',
      html: `
        <div style="
          display: flex;
          align-items: center;
          gap: 5px;
          background: ${isSelected ? '#0F172A' : '#FFFFFF'};
          color: ${isSelected ? '#FDE68A' : '#1E293B'};
          border: 2px solid ${atRisk > 0 ? '#DC2626' : '#008E4F'};
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transform: translate(-50%, -50%);
          cursor: pointer;
        ">
          <span style="
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${atRisk > 0 ? '#DC2626' : '#008E4F'};
            display: inline-block;
          "></span>
          <span>${stateName}</span>
          <span style="
            background: ${isSelected ? 'rgba(255,255,255,0.2)' : '#F1F5F9'};
            padding: 1px 5px;
            border-radius: 8px;
            font-size: 9.5px;
            color: ${isSelected ? '#FFFFFF' : '#475569'};
          ">${count}</span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  };

  // Custom DivIcon for Project Dots
  const createProjectDotIcon = (proj, isSelected) => {
    const isCrit = proj.riskLevel === 'Critical' || proj.status === 'Delayed';
    const color = isCrit ? '#DC2626' : proj.status === 'Completed' ? '#008E4F' : '#D97706';
    return L.divIcon({
      className: 'custom-mord-project-dot',
      html: `
        <div style="
          width: ${isSelected ? '18px' : '12px'};
          height: ${isSelected ? '18px' : '12px'};
          border-radius: 50%;
          background: ${color};
          border: 2px solid #FFFFFF;
          box-shadow: ${isSelected ? '0 0 0 3px rgba(15, 23, 42, 0.4), 0 4px 10px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.2)'};
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: all 0.15s ease;
        "></div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  };

  const targetedProjectObj = allProjects.find(item => item.id === selectedProject);

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

      {/* MAIN MAP LAYOUT: LEFT MAP CANVAS + RIGHT FILTER SIDEBAR */}
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
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '10px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            zIndex: 1000
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <Compass size={16} style={{ color: '#008E4F' }} />
              <span>ACTIVE GIS VIEW: <strong>INDIA NATIONAL CORRIDORS</strong> ({filteredProjects.length} Projects Displayed)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Base layer toggle */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.12)', borderRadius: '6px', padding: '2px' }}>
                {['cadastral', 'satellite', 'terrain'].map(layer => (
                  <button
                    key={layer}
                    onClick={() => setActiveBaseLayer(layer)}
                    style={{
                      padding: '4px 10px',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: activeBaseLayer === layer ? '#008E4F' : 'transparent',
                      color: '#FFFFFF',
                      textTransform: 'capitalize'
                    }}
                  >
                    {layer}
                  </button>
                ))}
              </div>

              {/* Reset to Whole India View */}
              <button
                onClick={() => {
                  setSelectedState('All');
                  setSelectedProject(null);
                  setResetTrigger(t => t + 1);
                }}
                title="Reset to Full India View"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Crosshair size={13} /> Full India
              </button>
            </div>
          </div>

          {/* Interactive Leaflet Map Viewport */}
          <div style={{ position: 'relative', width: '100%', height: '620px' }}>
            <MapContainer
              center={[22.5937, 78.9629]}
              zoom={5}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
            >
              <MordMapController
                selectedState={selectedState}
                targetedProject={targetedProjectObj}
                resetTrigger={resetTrigger}
              />

              <TileLayer
                key={activeBaseLayer}
                url={baseMapTiles[activeBaseLayer].url}
                attribution={baseMapTiles[activeBaseLayer].attribution}
                maxZoom={18}
              />

              {/* State Hub Markers */}
              {stateSummaryList.map(st => {
                const isSelected = selectedState === st.state;
                return (
                  <Marker
                    key={`state-${st.state}`}
                    position={st.coords}
                    icon={createStateHubIcon(st.state, st.count, st.atRisk, isSelected)}
                    eventHandlers={{
                      click: () => {
                        setSelectedState(selectedState === st.state ? 'All' : st.state);
                        setSelectedProject(null);
                      }
                    }}
                  >
                    <Tooltip direction="top">
                      <div style={{ fontSize: '11px', fontWeight: 600 }}>
                        {st.state} • {st.count} Projects {st.atRisk > 0 ? `(${st.atRisk} at Risk)` : ''}
                      </div>
                    </Tooltip>
                  </Marker>
                );
              })}

              {/* Individual Project Node Dots on Map */}
              {filteredProjects.map(proj => {
                const coords = getProjectCoordinates(proj);
                const isSelected = selectedProject === proj.id;

                return (
                  <Marker
                    key={`proj-${proj.id}`}
                    position={coords}
                    icon={createProjectDotIcon(proj, isSelected)}
                    eventHandlers={{
                      click: () => setSelectedProject(isSelected ? null : proj.id)
                    }}
                  >
                    <Popup>
                      <div style={{ width: '250px', padding: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 800, color: '#008E4F' }}>
                            {proj.id}
                          </span>
                          <span style={{
                            fontSize: '9.5px',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: '10px',
                            background: proj.status === 'Delayed' ? '#FEE2E2' : '#E6F4EA',
                            color: proj.status === 'Delayed' ? '#991B1B' : '#166534'
                          }}>
                            {proj.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                          {proj.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                          {proj.district}, {proj.state} • {proj.ministry}
                        </div>
                        <div style={{ fontSize: '11px', marginTop: '6px', background: '#F8FAFC', padding: '6px', borderRadius: '6px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                          <div><strong>Required:</strong> {proj.landRequiredHa} Ha</div>
                          <div><strong>Acquired:</strong> {proj.landAcquiredHa} Ha</div>
                        </div>
                        <button
                          onClick={() => onNavigate && onNavigate('project-detail', proj.id)}
                          style={{
                            marginTop: '8px',
                            width: '100%',
                            padding: '6px',
                            background: '#008E4F',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Open Project Case File →
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>

            {/* Active Selected Project Card Overlay on Map */}
            {selectedProject && targetedProjectObj && (
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                padding: '16px 20px',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: '"Roboto Mono", monospace',
                      fontSize: '11px',
                      color: '#008E4F',
                      fontWeight: 700
                    }}>
                      {targetedProjectObj.id}
                    </span>
                    <span style={{
                      fontSize: '10.5px',
                      fontFamily: '"Roboto Mono", monospace',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      background: targetedProjectObj.status === 'Delayed' ? '#FEF2F2' : '#ECFDF5',
                      color: targetedProjectObj.status === 'Delayed' ? '#991B1B' : '#065F46',
                      border: targetedProjectObj.status === 'Delayed' ? '1px solid #FECACA' : '1px solid #A7F3D0',
                      fontWeight: 600
                    }}>
                      {targetedProjectObj.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>
                    {targetedProjectObj.name}
                  </div>

                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    {targetedProjectObj.district}, {targetedProjectObj.state} &nbsp;|&nbsp;
                    Req: <strong style={{ color: '#1E293B' }}>{targetedProjectObj.landRequiredHa} Ha</strong> &nbsp;|&nbsp;
                    Acq: <strong style={{ color: '#008E4F' }}>{targetedProjectObj.landAcquiredHa} Ha</strong> &nbsp;|&nbsp;
                    Budget: <strong style={{ color: '#1E293B' }}>{targetedProjectObj.estimatedBudget}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => onNavigate && onNavigate('project-detail', targetedProjectObj.id)}
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
            )}
          </div>
        </div>

        {/* RIGHT: MAP FILTER SIDEBAR & DYNAMIC LAND CALCULATIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* DYNAMIC LAND CALCULATIONS & AGGREGATE SUMMARY */}
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
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Layers size={14} style={{ color: '#008E4F' }} />
              <span>National Aggregations</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '10px', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '10px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Total Required</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B', marginTop: '2px' }}>
                  {landCalculations.totalReq.toLocaleString()} <span style={{ fontSize: '11px', fontWeight: 500 }}>Ha</span>
                </div>
              </div>

              <div style={{ background: '#ECFDF5', padding: '10px 12px', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                <div style={{ fontSize: '10px', color: '#065F46', textTransform: 'uppercase', fontWeight: 600 }}>Total Acquired</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#008E4F', marginTop: '2px' }}>
                  {landCalculations.totalAcq.toLocaleString()} <span style={{ fontSize: '11px', fontWeight: 500 }}>Ha</span>
                </div>
              </div>
            </div>

            {/* Land Breakdown Categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>🌾 Agricultural Land</span>
                <strong>{landCalculations.farming.toLocaleString()} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>🌲 Forest / Environmental</span>
                <strong>{landCalculations.forest.toLocaleString()} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>🏘️ Private Title Land</span>
                <strong>{landCalculations.privateLand.toLocaleString()} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                <span>🏛️ Government Revenue Land</span>
                <strong>{landCalculations.govtLand.toLocaleString()} Ha</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', paddingTop: '8px', borderTop: '1px dashed #E2E8F0' }}>
                <span>👥 Affected Families</span>
                <strong>{landCalculations.totalFamilies.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#008E4F', fontWeight: 700 }}>
                <span>💰 Total Est Outlay</span>
                <strong>₹{landCalculations.totalCostCr.toLocaleString()} Cr</strong>
              </div>
            </div>
          </div>

          {/* MULTI-TIER FILTERS */}
          <div className="card" style={{
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#64748B',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={14} style={{ color: '#008E4F' }} />
                <span>Geospatial Filters</span>
              </span>
              <button
                onClick={() => {
                  setSelectedProjectType('All');
                  setSelectedMinistry('All');
                  setSelectedCategory('All');
                  setSelectedState('All');
                  setSelectedStatus('All');
                  setSelectedRisk('All');
                  setSelectedLandType('All');
                  setSelectedProject(null);
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#008E4F',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reset All
              </button>
            </div>

            {/* State Filter */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                STATE / UT
              </label>
              <select
                className="form-select"
                value={selectedState}
                onChange={e => {
                  setSelectedState(e.target.value);
                  setSelectedProject(null);
                }}
                style={{ fontSize: '12px' }}
              >
                {states.map(st => <option key={st} value={st}>{st === 'All' ? 'All States (Pan-India)' : st}</option>)}
              </select>
            </div>

            {/* Ministry Filter */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                UNION MINISTRY
              </label>
              <select
                className="form-select"
                value={selectedMinistry}
                onChange={e => setSelectedMinistry(e.target.value)}
                style={{ fontSize: '12px' }}
              >
                {ministries.map(m => (
                  <option key={m} value={m}>
                    {m.replace('Ministry of ', 'Mo ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Status */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                ACQUISITION STATUS
              </label>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                style={{ fontSize: '12px' }}
              >
                {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
              </select>
            </div>

            {/* Risk Level */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                RISK SEVERITY
              </label>
              <select
                className="form-select"
                value={selectedRisk}
                onChange={e => setSelectedRisk(e.target.value)}
                style={{ fontSize: '12px' }}
              >
                {risks.map(r => <option key={r} value={r}>{r === 'All' ? 'All Risk Levels' : `${r} Risk`}</option>)}
              </select>
            </div>

            {/* Land Classification */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                LAND CLASSIFICATION
              </label>
              <select
                className="form-select"
                value={selectedLandType}
                onChange={e => setSelectedLandType(e.target.value)}
                style={{ fontSize: '12px' }}
              >
                {landTypes.map(l => <option key={l} value={l}>{l === 'All' ? 'All Land Types' : l}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
