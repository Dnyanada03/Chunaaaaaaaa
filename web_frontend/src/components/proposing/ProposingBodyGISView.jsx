import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Marker,
  Popup,
  Tooltip,
  useMap
} from 'react-leaflet';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  Layers, MapPin, Search, Filter, ZoomIn, ZoomOut, Maximize2,
  Info, CheckCircle2, AlertTriangle, Eye, Download, ShieldCheck,
  ChevronRight, Compass, Crosshair, FileText, LocateFixed, EyeOff
} from 'lucide-react';
import {
  initialParcelsCadastral,
  proposedCorridorAlignment,
  corridorMilestones
} from '../../data/proposingMockData';
import { createCadastralDivIcon, createChainageIcon } from '../../utils/leafletConfig';

// Helper controller to handle map programmatic zoom / pan actions
function MapController({ selectedParcel, fitBoundsTrigger, centerCorridorTrigger }) {
  const map = useMap();
  const isInitialMount = useRef(true);

  // Initial load: fit entire corridor cleanly
  useEffect(() => {
    if (proposedCorridorAlignment?.length) {
      map.fitBounds(proposedCorridorAlignment, {
        padding: [60, 60],
        maxZoom: 12,
        animate: false
      });
    }
  }, [map]);

  // Fly to selected parcel when clicked or selected by user
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (selectedParcel?.lat && selectedParcel?.lng) {
      map.flyTo([selectedParcel.lat, selectedParcel.lng], 15, {
        animate: true,
        duration: 1.2
      });
    }
  }, [selectedParcel, map]);

  // Fit bounds to entire corridor on demand
  useEffect(() => {
    if (fitBoundsTrigger > 0 && proposedCorridorAlignment?.length) {
      map.fitBounds(proposedCorridorAlignment, {
        padding: [50, 50],
        maxZoom: 14,
        animate: true
      });
    }
  }, [fitBoundsTrigger, map]);

  // Center corridor trigger
  useEffect(() => {
    if (centerCorridorTrigger > 0 && proposedCorridorAlignment?.length) {
      const midIdx = Math.floor(proposedCorridorAlignment.length / 2);
      map.flyTo(proposedCorridorAlignment[midIdx], 12, { animate: true });
    }
  }, [centerCorridorTrigger, map]);

  return null;
}

export default function ProposingBodyGISView({ onNavigate }) {
  const { proposingProjects, proposingProposals } = useSwadesh();
  const [selectedProjectId, setSelectedProjectId] = useState(proposingProjects[0]?.id || 'PRJ-MH-2026-101');
  const [selectedPackage, setSelectedPackage] = useState('all');
  const [selectedParcel, setSelectedParcel] = useState(initialParcelsCadastral[0]);
  const [activeLayer, setActiveLayer] = useState('cadastral'); // cadastral, satellite, terrain
  const [showEncumbrances, setShowEncumbrances] = useState(true);
  const [showCorridorBuffer, setShowCorridorBuffer] = useState(true);
  const [showGatLabels, setShowGatLabels] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [fitBoundsTrigger, setFitBoundsTrigger] = useState(0);
  const [centerCorridorTrigger, setCenterCorridorTrigger] = useState(0);

  const currentProject = proposingProjects.find(p => p.id === selectedProjectId) || proposingProjects[0];

  const filteredParcels = useMemo(() => {
    return initialParcelsCadastral.filter(p => {
      if (selectedPackage !== 'all' && p.package !== selectedPackage) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.surveyNo.toLowerCase().includes(q) ||
          p.village.toLowerCase().includes(q) ||
          p.landType.toLowerCase().includes(q) ||
          p.taluka.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedPackage, searchQuery]);

  const totalAreaHa = initialParcelsCadastral.reduce((sum, p) => sum + p.areaHa, 0).toFixed(2);
  const totalCostCr = initialParcelsCadastral.reduce((sum, p) => sum + p.estimatedComp, 0).toFixed(2);

  // Determine status color for each parcel
  const getParcelColor = (parcel) => {
    if (parcel.landType?.includes('Government') || parcel.landType?.includes('Forest') || parcel.landType?.includes('Gairan')) {
      return '#2563EB'; // Royal Blue for Govt
    }
    if (parcel.encumbrance !== 'None / Clear' && showEncumbrances) {
      return '#F59E0B'; // Amber for Encumbered / Multiple Co-sharers
    }
    return '#16A34A'; // Emerald Green for Clear Agricultural
  };

  // Base Map Tile configurations (100% free, no API keys or watermarks)
  const tileLayers = {
    cadastral: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri, Maxar, Earthstar Geographics, GIS User Community',
      maxZoom: 18
    },
    terrain: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri, HERE, DeLorme, Intermap, increment P Corp., GEBCO, USGS',
      maxZoom: 18
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Top Header & Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
            <span>Project Authority</span>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 700, color: '#0F172A' }}>Cadastral GIS Land Acquisition Portal</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Cadastral GIS Alignment & Parcel Intelligence
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Interactive Leaflet spatial engine: village cadastral maps with DILR Gat numbers, RoR 7/12 records, and acquisition corridor pegging
          </p>
        </div>

        {/* Project Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>ACTIVE PROJECT:</label>
          <select
            className="form-select"
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            style={{ minWidth: '260px', fontWeight: 700 }}
          >
            {proposingProjects.map(prj => (
              <option key={prj.id} value={prj.id}>
                {prj.id} — {prj.name.length > 30 ? prj.name.substring(0, 30) + '...' : prj.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>TOTAL CORRIDOR AREA</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{totalAreaHa} Ha</div>
          <div style={{ fontSize: '11.5px', color: '#008E4F', fontWeight: 600 }}>100% Peg-Marked</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>TOTAL SURVEY PARCELS</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{initialParcelsCadastral.length} Gat Nos.</div>
          <div style={{ fontSize: '11.5px', color: '#64748B' }}>Across 5 Revenue Talukas</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>JMS COMPLETED</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563EB', marginTop: '2px' }}>64.2%</div>
          <div style={{ fontSize: '11.5px', color: '#64748B' }}>9 of 14 Parcels Jointly Surveyed</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>ESTIMATED OUTLAY</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#008E4F', marginTop: '2px' }}>₹{totalCostCr} Cr</div>
          <div style={{ fontSize: '11.5px', color: '#64748B' }}>Centralized Award Deposit</div>
        </div>
      </div>

      {/* Package Filter & Sub-bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        padding: '10px 16px',
        borderRadius: '10px 10px 0 0',
        border: '1px solid #E2E8F0',
        borderBottom: 'none',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={14} /> FILTER PACKAGE:
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['all', 'Package 1A', 'Package 1B', 'Package 2', 'Package 3'].map(pkg => (
              <button
                key={pkg}
                onClick={() => setSelectedPackage(pkg)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: selectedPackage === pkg ? '#008E4F' : '#CBD5E1',
                  background: selectedPackage === pkg ? '#E6F4EA' : '#FFFFFF',
                  color: selectedPackage === pkg ? '#006638' : '#64748B',
                  cursor: 'pointer'
                }}
              >
                {pkg === 'all' ? 'All Packages (14)' : pkg}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#475569', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={showCorridorBuffer}
              onChange={e => setShowCorridorBuffer(e.target.checked)}
            />
            Corridor Buffer (ROW)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#475569', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={showGatLabels}
              onChange={e => setShowGatLabels(e.target.checked)}
            />
            Gat Markers
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#475569', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={showEncumbrances}
              onChange={e => setShowEncumbrances(e.target.checked)}
            />
            Encumbrance Alerts
          </label>
        </div>
      </div>

      {/* Main Map + Sidebar Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        height: '750px',
        background: '#FFFFFF',
        borderRadius: '0 0 12px 12px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
      }}>
        {/* Left: GIS Map Viewport with Leaflet */}
        <div style={{ position: 'relative', height: '100%', background: '#0F172A', overflow: 'hidden' }}>
          {/* Map Controls Floating Top Bar */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            pointerEvents: 'none'
          }}>
            {/* Search Box on Map */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '8px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
              width: '320px',
              pointerEvents: 'auto',
              border: '1px solid #CBD5E1'
            }}>
              <Search size={16} style={{ color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search Survey / Gat No, Village, or Taluka..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '12.5px',
                  color: '#0F172A'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Base Layer Switchers & Fit Corridor Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                padding: '4px',
                display: 'flex',
                gap: '4px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                border: '1px solid #CBD5E1'
              }}>
                {['cadastral', 'satellite', 'terrain'].map(layer => (
                  <button
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      background: activeLayer === layer ? '#008E4F' : 'transparent',
                      color: activeLayer === layer ? '#FFFFFF' : '#475569',
                      textTransform: 'capitalize',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {layer}
                  </button>
                ))}
              </div>

              {/* Fit Entire Corridor Button */}
              <button
                onClick={() => setFitBoundsTrigger(t => t + 1)}
                title="Fit entire acquisition corridor in view"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                  border: '1px solid #CBD5E1',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
              >
                <Compass size={14} style={{ color: '#008E4F' }} />
                <span>Fit Corridor</span>
              </button>
            </div>
          </div>

          {/* Interactive Leaflet Map Container */}
          <MapContainer
            center={[18.82, 73.92]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
          >
            <MapController
              selectedParcel={selectedParcel}
              fitBoundsTrigger={fitBoundsTrigger}
              centerCorridorTrigger={centerCorridorTrigger}
            />

            {/* Base Tile Layer */}
            <TileLayer
              key={activeLayer}
              url={tileLayers[activeLayer].url}
              attribution={tileLayers[activeLayer].attribution}
              maxZoom={tileLayers[activeLayer].maxZoom}
            />

            {/* Alignment Corridor ROW Buffer (Wide semi-transparent polyline) */}
            {showCorridorBuffer && (
              <Polyline
                positions={proposedCorridorAlignment}
                pathOptions={{
                  color: '#008E4F',
                  weight: 36,
                  opacity: 0.18,
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              />
            )}

            {/* Proposed Alignment Centerline */}
            <Polyline
              positions={proposedCorridorAlignment}
              pathOptions={{
                color: '#F59E0B',
                weight: 4,
                dashArray: '10, 8',
                opacity: 0.95
              }}
            >
              <Tooltip sticky>Proposed Rail / Highway Acquisition Centerline (Pune Corridor)</Tooltip>
            </Polyline>

            {/* Corridor Milestones */}
            {corridorMilestones.map((milestone, idx) => (
              <Marker
                key={`milestone-${idx}`}
                position={[milestone.lat, milestone.lng]}
                icon={createChainageIcon(milestone.label)}
              >
                <Popup>
                  <div style={{ padding: '6px 8px', fontSize: '12px' }}>
                    <strong style={{ color: '#0F172A' }}>{milestone.label}</strong>
                    <div style={{ color: '#64748B', marginTop: '4px' }}>Corridor Alignment Chainage Peg</div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Cadastral Parcel Polygons */}
            {filteredParcels.map(parcel => {
              const isSelected = selectedParcel?.id === parcel.id;
              const parcelColor = getParcelColor(parcel);

              return (
                <Polygon
                  key={`poly-${parcel.id}`}
                  positions={parcel.polygon}
                  pathOptions={{
                    color: isSelected ? '#0F172A' : parcelColor,
                    weight: isSelected ? 3.5 : 2,
                    fillColor: parcelColor,
                    fillOpacity: isSelected ? 0.65 : 0.4,
                    dashArray: parcel.encumbrance !== 'None / Clear' ? '4, 4' : null
                  }}
                  eventHandlers={{
                    click: () => setSelectedParcel(parcel)
                  }}
                >
                  <Tooltip direction="top" opacity={0.95}>
                    <div style={{ fontSize: '11px', fontWeight: 600 }}>
                      <span style={{ fontWeight: 800 }}>Gat {parcel.surveyNo}</span> • {parcel.village} ({parcel.areaHa} Ha)
                    </div>
                  </Tooltip>
                  <Popup>
                    <div style={{ width: '240px', padding: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          fontFamily: 'monospace',
                          color: '#008E4F',
                          background: '#E6F4EA',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          Gat {parcel.surveyNo}
                        </span>
                        <span style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '10px',
                          background: parcel.encumbrance === 'None / Clear' ? '#DCFCE7' : '#FEF3C7',
                          color: parcel.encumbrance === 'None / Clear' ? '#15803D' : '#B45309'
                        }}>
                          {parcel.encumbrance === 'None / Clear' ? 'Clear' : 'Encumbered'}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                        {parcel.village}, Tal. {parcel.taluka}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        {parcel.landType}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '8px', background: '#F8FAFC', padding: '6px', borderRadius: '6px' }}>
                        <div>
                          <div style={{ fontSize: '10px', color: '#64748B' }}>AREA</div>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{parcel.areaHa} Ha</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '10px', color: '#64748B' }}>COMPENSATION</div>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#008E4F' }}>₹{parcel.estimatedComp} Cr</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedParcel(parcel)}
                        style={{
                          width: '100%',
                          marginTop: '8px',
                          padding: '6px',
                          background: '#008E4F',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Inspect in Detail Sidebar →
                      </button>
                    </div>
                  </Popup>
                </Polygon>
              );
            })}

            {/* Cadastral Gat Marker Badges */}
            {showGatLabels && filteredParcels.map(parcel => {
              const isSelected = selectedParcel?.id === parcel.id;
              const parcelColor = getParcelColor(parcel);

              return (
                <Marker
                  key={`marker-${parcel.id}`}
                  position={[parcel.lat, parcel.lng]}
                  icon={createCadastralDivIcon(parcel.surveyNo, parcelColor, isSelected)}
                  eventHandlers={{
                    click: () => setSelectedParcel(parcel)
                  }}
                />
              );
            })}
          </MapContainer>

          {/* Map Legend Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(8px)',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#FFFFFF',
            fontSize: '11px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 1000,
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontWeight: 800, color: '#FDE68A', marginBottom: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span>CADASTRAL GIS LEGEND</span>
              <span style={{ fontSize: '9.5px', color: '#94A3B8', fontWeight: 600 }}>
                {filteredParcels.length} Parcels
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: '#22C55E', borderRadius: '3px' }} />
              <span>Agricultural Private Land (Clear)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: '#3B82F6', borderRadius: '3px' }} />
              <span>Government / Social Forestry Land</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: '#F59E0B', borderRadius: '3px' }} />
              <span>Encumbered / Multiple Co-Sharers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '20px', height: '3px', background: '#F59E0B', borderBottom: '1px dashed #FFFFFF' }} />
              <span>Proposed Alignment Centerline (ROW)</span>
            </div>
          </div>

          {/* Map Nav Zoom & Center Controls */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            zIndex: 1000,
            border: '1px solid #CBD5E1'
          }}>
            <button
              onClick={() => {
                if (selectedParcel?.lat && selectedParcel?.lng) {
                  setFitBoundsTrigger(t => t + 1);
                }
              }}
              title="Reset Corridor View"
              style={{
                padding: '8px 10px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0F172A'
              }}
            >
              <Crosshair size={16} />
            </button>
            <button
              onClick={() => {
                if (selectedParcel?.lat && selectedParcel?.lng) {
                  // Fly to selected parcel
                  setSelectedParcel({ ...selectedParcel });
                }
              }}
              title="Locate Selected Parcel"
              style={{
                padding: '8px 10px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#008E4F'
              }}
            >
              <LocateFixed size={16} />
            </button>
          </div>
        </div>

        {/* Right: Selected Parcel Details Inspector */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          overflowY: 'auto'
        }}>
          {selectedParcel ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    color: '#008E4F',
                    background: '#E6F4EA',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    PARCEL ID: {selectedParcel.id}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0 0' }}>
                    Survey Gat No. {selectedParcel.surveyNo}
                  </h3>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '12px',
                  background: selectedParcel.encumbrance === 'None / Clear' ? '#DCFCE7' : '#FEF3C7',
                  color: selectedParcel.encumbrance === 'None / Clear' ? '#15803D' : '#B45309'
                }}>
                  {selectedParcel.encumbrance}
                </span>
              </div>

              {/* Geographic Breadcrumbs */}
              <div style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '16px' }}>
                <strong>{selectedParcel.village}</strong>, Taluka {selectedParcel.taluka}, Dist. {selectedParcel.district}
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                  Coordinates: {selectedParcel.lat.toFixed(4)}° N, {selectedParcel.lng.toFixed(4)}° E • {selectedParcel.package}
                </div>
              </div>

              {/* Property Attributes Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                background: '#F8FAFC',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>LAND TYPE</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {selectedParcel.landType}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>ACQUISITION AREA</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {selectedParcel.areaHa} Hectares
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CO-SHARERS (7/12)</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {selectedParcel.owners} Landowners
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>EST. COMPENSATION</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#008E4F', marginTop: '2px' }}>
                    ₹{selectedParcel.estimatedComp} Cr
                  </div>
                </div>
              </div>

              {/* Statutory Readiness Checklist */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                  STATUTORY REQUISITION READINESS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { label: 'Mahabhulekh 7/12 RoR Digitally Extracted', done: true },
                    { label: 'DILR Cadastral Gat Peg-Marking Verified', done: true },
                    { label: 'Joint Measurement Survey (JMS) Form Sheet', done: selectedParcel.encumbrance === 'None / Clear' },
                    { label: 'Encumbrance / Dispute Clearance', done: selectedParcel.encumbrance === 'None / Clear' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: item.done ? '#15803D' : '#94A3B8' }}>
                      <CheckCircle2 size={14} style={{ color: item.done ? '#16A34A' : '#CBD5E1' }} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landowner Record Sneak Peek */}
              <div style={{
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '12px',
                background: '#FAFAFA'
              }}>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  PRIMARY TITLE HOLDER (RoR Extract)
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>
                  Shri Dashrath Narayan Patil & Others
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Account No: 4092 • Land Class: {selectedParcel.landType}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
              <Layers size={32} style={{ margin: '0 auto 12px auto', display: 'block', color: '#CBD5E1' }} />
              <p style={{ fontSize: '13px', margin: 0 }}>Click on any Gat parcel on the map to inspect ownership, area, and compensation details.</p>
            </div>
          )}

          {/* Bottom Action */}
          <div style={{ paddingTop: '16px', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate && onNavigate('create-proposal')}
              style={{ width: '100%', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <FileText size={15} />
              Include in New Proposal Requisition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
