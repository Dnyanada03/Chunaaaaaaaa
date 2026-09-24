import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
  Tooltip,
  useMap
} from 'react-leaflet';
import {
  MapPin,
  Layers,
  Filter,
  ChevronRight,
  Eye,
  Compass,
  Crosshair,
  AlertTriangle,
  CheckCircle2,
  Building2
} from 'lucide-react';
import L from 'leaflet';
import { stateProjectsMasterList, stateDistrictSummary } from '../../data/stateMockData';
import StatusBadge from '../common/StatusBadge';

// Coordinates for Maharashtra Districts
const districtCoordinates = {
  "Mumbai": [18.9600, 72.8250],
  "Pune": [18.5204, 73.8567],
  "Nashik": [19.9975, 73.7898],
  "Nagpur": [21.1458, 79.0882],
  "Thane": [19.2183, 72.9781],
  "Raigad": [18.5158, 73.1822],
  "Satara": [17.6805, 73.9930],
  "Kolhapur": [16.7050, 74.2433],
  "Chhatrapati Sambhajinagar": [19.8762, 75.3433]
};

// Project specific coordinates
const projectCoordinates = {
  "PRJ-MH-STATE-2026-001": [18.9750, 72.8050], // Mumbai Coastal Road
  "PRJ-MH-STATE-2026-002": [19.8800, 75.3200], // Samruddhi Mahamarg Phase-II
  "PRJ-MH-STATE-2026-003": [18.6500, 73.8800], // Pune–Nashik Semi High-Speed Rail
  "PRJ-MH-STATE-2026-004": [21.1400, 79.0900], // Nagpur Metro Phase-II
  "PRJ-MH-STATE-2026-005": [19.0800, 72.9800], // Thane Creek Bridge-III
  "PRJ-MH-STATE-2026-006": [18.6800, 73.1000], // Raigad Industrial SEZ
  "PRJ-MH-STATE-2026-007": [17.6900, 74.0000], // Satara Water Supply
  "PRJ-MH-STATE-2026-008": [16.7100, 74.2300]  // Kolhapur Ring Road
};

// Map controller for handling programmatic zoom & flyTo
function StateMapController({ selectedDistrict, selectedProject, resetTrigger }) {
  const map = useMap();
  const isInitialMount = useRef(true);

  // Initial mount: fit Maharashtra state view
  useEffect(() => {
    map.setView([19.50, 76.00], 7);
  }, [map]);

  // Handle District filter change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (selectedDistrict !== 'All' && districtCoordinates[selectedDistrict]) {
      map.flyTo(districtCoordinates[selectedDistrict], 11, {
        animate: true,
        duration: 1.2
      });
    } else if (selectedDistrict === 'All') {
      map.flyTo([19.50, 76.00], 7, { animate: true });
    }
  }, [selectedDistrict, map]);

  // Handle Project selection
  useEffect(() => {
    if (selectedProject && projectCoordinates[selectedProject]) {
      map.flyTo(projectCoordinates[selectedProject], 13, {
        animate: true,
        duration: 1.2
      });
    }
  }, [selectedProject, map]);

  // Reset to full state view
  useEffect(() => {
    if (resetTrigger > 0) {
      map.flyTo([19.50, 76.00], 7, { animate: true });
    }
  }, [resetTrigger, map]);

  return null;
}

export default function StateGISView({ onNavigate }) {
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeLayers, setActiveLayers] = useState(['boundaries', 'acquired', 'risk']);
  const [activeBaseLayer, setActiveBaseLayer] = useState('cadastral'); // cadastral, satellite, terrain
  const [resetTrigger, setResetTrigger] = useState(0);

  const districts = [...new Set(stateProjectsMasterList.map(p => p.district))];
  const filteredProjects = selectedDistrict === 'All'
    ? stateProjectsMasterList
    : stateProjectsMasterList.filter(p => p.district === selectedDistrict);

  const toggleLayer = (layer) => {
    setActiveLayers(prev => prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]);
  };

  const layers = [
    { id: 'boundaries', label: 'Project Boundaries', color: '#1A73E8' },
    { id: 'acquired', label: 'Land Acquired', color: '#1E7E34' },
    { id: 'pending', label: 'Pending Acquisition', color: '#D97706' },
    { id: 'disputed', label: 'Disputed Parcels', color: '#C5221F' },
    { id: 'risk', label: 'High-Risk Areas', color: '#991B1B' }
  ];

  // Base Map Tile configurations (100% free, no API keys or watermarks)
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

  // Custom styled DivIcon for District Centroids
  const createDistrictIcon = (distName, projectCount, atRisk, isSelected) => {
    return L.divIcon({
      className: 'custom-state-district-marker',
      html: `
        <div style="
          display: flex;
          align-items: center;
          gap: 6px;
          background: ${isSelected ? '#0F172A' : '#FFFFFF'};
          color: ${isSelected ? '#FDE68A' : '#1E293B'};
          border: 2px solid ${atRisk > 0 ? '#C5221F' : '#1E7E34'};
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.18);
          transform: translate(-50%, -50%);
          cursor: pointer;
        ">
          <span style="
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${atRisk > 0 ? '#C5221F' : '#1E7E34'};
            display: inline-block;
          "></span>
          <span>${distName}</span>
          <span style="
            background: ${isSelected ? 'rgba(255,255,255,0.2)' : '#F1F5F9'};
            padding: 1px 5px;
            border-radius: 10px;
            font-size: 9.5px;
            color: ${isSelected ? '#FFFFFF' : '#64748B'};
          ">${projectCount}</span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  };

  // Custom styled DivIcon for Individual Project Markers
  const createProjectIcon = (projectName, riskLevel, isSelected) => {
    const color = riskLevel === 'Critical' ? '#991B1B' : riskLevel === 'High' ? '#C5221F' : '#1E7E34';
    return L.divIcon({
      className: 'custom-state-project-marker',
      html: `
        <div style="
          display: flex;
          align-items: center;
          gap: 5px;
          background: ${isSelected ? '#0F172A' : 'rgba(255, 255, 255, 0.95)'};
          color: ${isSelected ? '#FDE68A' : '#0F172A'};
          border: 2px solid ${color};
          padding: 3px 7px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          transform: translate(-50%, -50%);
          cursor: pointer;
        ">
          <span>🏛️</span>
          <span>${projectName.length > 20 ? projectName.substring(0, 20) + '...' : projectName}</span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>STATE GIS MAP</h1>
          <p>Interactive geospatial overview of land acquisition projects across all 36 districts of Maharashtra</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px' }}>
        {/* Left Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* District Filter */}
          <div className="card" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B7280', marginBottom: '8px' }}>
              <Filter size={12} style={{ marginRight: '4px' }} /> District Filter
            </div>
            <select
              className="form-select"
              value={selectedDistrict}
              onChange={e => {
                setSelectedDistrict(e.target.value);
                setSelectedProject(null);
              }}
              style={{ fontSize: '12.5px' }}
            >
              <option value="All">All Districts (Maharashtra State)</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Map Layers */}
          <div className="card" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B7280', marginBottom: '10px' }}>
              <Layers size={12} style={{ marginRight: '4px' }} /> Map Overlays
            </div>
            {layers.map(layer => (
              <label key={layer.id} style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0',
                fontSize: '12.5px', color: '#374151', cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={activeLayers.includes(layer.id)}
                  onChange={() => toggleLayer(layer.id)}
                  style={{ accentColor: layer.color }}
                />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: layer.color, flexShrink: 0 }} />
                {layer.label}
              </label>
            ))}
          </div>

          {/* Project List */}
          <div className="card" style={{ padding: '14px 16px', maxHeight: '420px', overflowY: 'auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B7280', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Projects ({filteredProjects.length})</span>
              {selectedProject && (
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{ border: 'none', background: 'transparent', color: '#008E4F', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Clear Selection
                </button>
              )}
            </div>
            {filteredProjects.map(proj => (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px',
                  background: selectedProject === proj.id ? '#E6F4EA' : 'transparent',
                  border: '1px solid', borderColor: selectedProject === proj.id ? '#CEEAD6' : '#F1F5F9',
                  borderRadius: '8px', cursor: 'pointer', marginBottom: '6px',
                  transition: 'background 0.12s ease'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#111827' }}>{proj.name}</div>
                <div style={{ fontSize: '10.5px', color: '#6B7280', marginTop: '2px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{proj.district} · {proj.landRequiredHa} Ha</span>
                  <span style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    color: proj.riskLevel === 'Critical' ? '#991B1B' : proj.riskLevel === 'High' ? '#C5221F' : '#1E7E34'
                  }}>
                    {proj.riskLevel} Risk
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map Area with Live Leaflet Map */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', minHeight: '620px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Top Leaflet Bar */}
          <div style={{
            background: '#0F172A',
            color: '#FFFFFF',
            padding: '10px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800 }}>
              <Compass size={18} style={{ color: '#008E4F' }} />
              MAHARASHTRA STATE GIS REVENUE COMMAND
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

              {/* Reset to Maharashtra Full View Button */}
              <button
                onClick={() => {
                  setSelectedDistrict('All');
                  setSelectedProject(null);
                  setResetTrigger(t => t + 1);
                }}
                title="Reset to Full Maharashtra State View"
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
                <Crosshair size={13} /> Full State
              </button>
            </div>
          </div>

          {/* Interactive Leaflet Map Container */}
          <div style={{ position: 'relative', width: '100%', height: '540px' }}>
            <MapContainer
              center={[19.50, 76.00]}
              zoom={7}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
            >
              <StateMapController
                selectedDistrict={selectedDistrict}
                selectedProject={selectedProject}
                resetTrigger={resetTrigger}
              />

              <TileLayer
                key={activeBaseLayer}
                url={baseMapTiles[activeBaseLayer].url}
                attribution={baseMapTiles[activeBaseLayer].attribution}
                maxZoom={18}
              />

              {/* District Centroid Markers */}
              {stateDistrictSummary.map(dist => {
                const coords = districtCoordinates[dist.district];
                if (!coords) return null;
                const isSelected = selectedDistrict === dist.district;

                return (
                  <Marker
                    key={`district-${dist.district}`}
                    position={coords}
                    icon={createDistrictIcon(dist.district, dist.projects, dist.atRisk, isSelected)}
                    eventHandlers={{
                      click: () => {
                        setSelectedDistrict(dist.district);
                        setSelectedProject(null);
                      }
                    }}
                  >
                    <Tooltip direction="top">
                      <div style={{ fontSize: '11px', fontWeight: 600 }}>
                        {dist.district} District • {dist.projects} Projects ({dist.landRequired} Ha)
                      </div>
                    </Tooltip>
                    <Popup>
                      <div style={{ width: '220px', padding: '6px' }}>
                        <strong style={{ fontSize: '13px', color: '#0F172A' }}>{dist.district} District</strong>
                        <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                          Active Projects: <strong>{dist.projects}</strong>
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                          Land Required: <strong>{dist.landRequired} Ha</strong>
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                          Acquired: <strong>{dist.landAcquired} Ha</strong>
                        </div>
                        <div style={{ fontSize: '11.5px', color: dist.atRisk > 0 ? '#C5221F' : '#1E7E34', fontWeight: 700, marginTop: '4px' }}>
                          {dist.atRisk > 0 ? `⚠️ ${dist.atRisk} Projects at Risk` : '✅ All Projects on Track'}
                        </div>
                        <button
                          onClick={() => setSelectedDistrict(dist.district)}
                          style={{
                            marginTop: '8px',
                            width: '100%',
                            padding: '5px',
                            background: '#008E4F',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Filter {dist.district} Projects
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

              {/* Individual Project Footprint Markers / Circles */}
              {activeLayers.includes('boundaries') && filteredProjects.map(proj => {
                const coords = projectCoordinates[proj.id];
                if (!coords) return null;
                const isSelected = selectedProject === proj.id;
                const isCritical = proj.riskLevel === 'Critical';

                return (
                  <React.Fragment key={`proj-map-${proj.id}`}>
                    {/* Footprint Buffer Circle */}
                    <CircleMarker
                      center={coords}
                      radius={isSelected ? 32 : 22}
                      pathOptions={{
                        color: isCritical ? '#991B1B' : '#1A73E8',
                        fillColor: isCritical ? '#EF4444' : '#3B82F6',
                        fillOpacity: isSelected ? 0.35 : 0.2,
                        weight: isSelected ? 3 : 1.5
                      }}
                      eventHandlers={{
                        click: () => setSelectedProject(proj.id)
                      }}
                    />

                    {/* Project Marker Badge */}
                    <Marker
                      position={coords}
                      icon={createProjectIcon(proj.name, proj.riskLevel, isSelected)}
                      eventHandlers={{
                        click: () => setSelectedProject(proj.id)
                      }}
                    >
                      <Popup>
                        <div style={{ width: '240px', padding: '6px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{proj.name}</div>
                          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                            {proj.district} · {proj.taluka}
                          </div>
                          <div style={{ fontSize: '11px', marginTop: '6px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                            <div><strong>Required:</strong> {proj.landRequiredHa} Ha</div>
                            <div><strong>Acquired:</strong> {proj.landAcquiredHa} Ha</div>
                          </div>
                          <div style={{ fontSize: '11px', marginTop: '4px' }}>
                            <strong>Budget:</strong> {proj.estimatedBudget}
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
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Open Project Dossier →
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  </React.Fragment>
                );
              })}
            </MapContainer>

            {/* Map Legend Floating Box */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(8px)',
              padding: '10px 14px',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '10.5px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <div style={{ fontWeight: 800, color: '#FDE68A', marginBottom: '2px' }}>STATE GIS LEGEND</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1E7E34' }} />
                <span>On-Track District / Project</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5221F' }} />
                <span>High-Risk / Delayed Project</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #3B82F6', background: 'rgba(59, 130, 246, 0.2)' }} />
                <span>Statutory Acquisition Footprint</span>
              </div>
            </div>
          </div>

          {/* Selected Project Info Footer Bar */}
          {selectedProject && (() => {
            const proj = stateProjectsMasterList.find(p => p.id === selectedProject);
            if (!proj) return null;
            return (
              <div style={{ padding: '14px 18px', borderTop: '1px solid #E2E8F0', background: '#FAFAF9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>{proj.name}</span>
                      <span style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: proj.riskLevel === 'Critical' ? '#FEE2E2' : '#E6F4EA',
                        color: proj.riskLevel === 'Critical' ? '#991B1B' : '#166534'
                      }}>
                        {proj.riskLevel} Risk
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                      {proj.district} · {proj.taluka} · {proj.villages.join(', ')}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '12px' }}>
                      <span><strong>{proj.landRequiredHa} Ha</strong> required</span>
                      <span><strong>{proj.landAcquiredHa} Ha</strong> acquired</span>
                      <span><strong>{proj.totalLandowners}</strong> landowners</span>
                      <span><strong>{proj.estimatedBudget}</strong> budget</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onNavigate && onNavigate('project-detail', proj.id)}
                    style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    View Details <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
