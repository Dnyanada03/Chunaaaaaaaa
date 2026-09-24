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
import {
  MapPin,
  Layers,
  Filter,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Info,
  LocateFixed,
  Crosshair
} from 'lucide-react';
import {
  collectorTalukasProgress,
  collectorVillageProgress,
  collectorProjectsMasterList,
  collectorGISParcels,
  collectorProjectAlignments
} from '../../data/collectorMockData';
import { createCadastralDivIcon } from '../../utils/leafletConfig';

// Map controller for programmatic view changes
function CollectorMapController({ selectedParcel, fitBoundsTrigger, centerCoords }) {
  const map = useMap();
  const isInitialMount = useRef(true);

  // Initial load: center on Pune district
  useEffect(() => {
    map.setView([18.5204, 73.8567], 10);
  }, [map]);

  // Fly to selected parcel when user clicks one
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (selectedParcel?.lat && selectedParcel?.lng) {
      map.flyTo([selectedParcel.lat, selectedParcel.lng], 14, {
        animate: true,
        duration: 1.2
      });
    }
  }, [selectedParcel, map]);

  // Fit all alignments / parcels when trigger fires
  useEffect(() => {
    if (fitBoundsTrigger > 0) {
      const allCoords = [
        ...collectorGISParcels.map(p => [p.lat, p.lng]),
        ...collectorProjectAlignments.flatMap(a => a.coords)
      ];
      if (allCoords.length > 0) {
        map.fitBounds(allCoords, {
          padding: [50, 50],
          maxZoom: 12,
          animate: true
        });
      }
    }
  }, [fitBoundsTrigger, map]);

  return null;
}

export default function CollectorGISView() {
  const [selectedTaluka, setSelectedTaluka] = useState('All');
  const [selectedVillage, setSelectedVillage] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeBaseLayer, setActiveBaseLayer] = useState('cadastral'); // cadastral, satellite, terrain
  const [fitBoundsTrigger, setFitBoundsTrigger] = useState(0);

  // Layer Toggles
  const [layers, setLayers] = useState({
    projectBoundaries: true,
    parcelBoundaries: true,
    parcelMarkers: true
  });

  // Inspected Parcel State
  const [inspectedParcel, setInspectedParcel] = useState(collectorGISParcels[0]);

  // Filter parcels based on dropdowns
  const filteredParcels = useMemo(() => {
    return collectorGISParcels.filter(p => {
      if (selectedTaluka !== 'All' && p.taluka !== selectedTaluka) return false;
      if (selectedVillage !== 'All' && p.village !== selectedVillage) return false;
      if (selectedProject !== 'All' && p.project !== selectedProject) return false;
      if (selectedStatus !== 'All' && p.statusCode !== selectedStatus) return false;
      return true;
    });
  }, [selectedTaluka, selectedVillage, selectedProject, selectedStatus]);

  // Filter alignments
  const filteredAlignments = useMemo(() => {
    return collectorProjectAlignments.filter(a => {
      if (selectedProject !== 'All' && a.project !== selectedProject) return false;
      return true;
    });
  }, [selectedProject]);

  // Base map tile options (100% free, no API keys or watermarks)
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

  const getStatusColor = (statusCode) => {
    if (statusCode === 'Acquired') return '#10B981';
    if (statusCode === 'Disputed') return '#EF4444';
    return '#F59E0B'; // Pending
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DISTRICT GIS & CADASTRAL SPATIAL MAP COMMAND</h1>
          <p>Integrated District GIS Layer Monitoring, Alignment Inspection & Parcel Boundary Overlay — Pune District</p>
        </div>
      </div>

      {/* GIS MAP CONTROLS & FILTERS BAR */}
      <div className="card" style={{ padding: '14px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', alignItems: 'center' }}>
          <div>
            <label className="form-label" style={{ fontSize: '10px' }}>TALUKA FILTER</label>
            <select className="form-select" value={selectedTaluka} onChange={e => setSelectedTaluka(e.target.value)}>
              <option value="All">All District (13 Talukas) ▼</option>
              {collectorTalukasProgress.map(t => (
                <option key={t.id} value={t.taluka}>Taluka {t.taluka}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '10px' }}>VILLAGE FILTER</label>
            <select className="form-select" value={selectedVillage} onChange={e => setSelectedVillage(e.target.value)}>
              <option value="All">All Villages ▼</option>
              {collectorVillageProgress.map((v, i) => (
                <option key={i} value={v.village}>{v.village}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '10px' }}>PROJECT ALIGNMENT</label>
            <select className="form-select" value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
              <option value="All">All Projects ▼</option>
              {collectorProjectsMasterList.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '10px' }}>PROJECT STAGE</label>
            <select className="form-select" value={selectedStage} onChange={e => setSelectedStage(e.target.value)}>
              <option value="All">All Stages ▼</option>
              <option value="SIA">SIA Stage</option>
              <option value="Compensation">Compensation Stage</option>
              <option value="Completed">Completed Stage</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '10px' }}>ACQUISITION STATUS</label>
            <select className="form-select" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
              <option value="All">All Parcels Status ▼</option>
              <option value="Acquired">Acquired 🟢</option>
              <option value="Pending">Pending 🟠</option>
              <option value="Disputed">Disputed 🔴</option>
            </select>
          </div>
        </div>
      </div>

      {/* GIS MAP CANVAS & INSPECTION SIDEBAR */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px' }}>
        {/* Main Interactive Map Container */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative', height: '620px', border: '2px solid #0B4726', display: 'flex', flexDirection: 'column' }}>
          {/* Top GIS Toolbar Header */}
          <div style={{ background: '#06371E', color: '#FFF', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800 }}>
              <Compass size={18} /> PUNE DISTRICT GIS CADASTRAL MAP VIEW
            </div>

            {/* Base Layer Switcher in Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.15)', borderRadius: '6px', padding: '2px' }}>
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

              <div style={{ display: 'flex', gap: '10px', fontSize: '11.5px' }}>
                <span style={{ color: '#A7F3D0' }}>Lat: 18.5204° N, Long: 73.8567° E</span>
                <span style={{ color: '#FDE68A' }}>Parcels: {filteredParcels.length}</span>
              </div>
            </div>
          </div>

          {/* Live Leaflet Map Container */}
          <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 46px)' }}>
            <MapContainer
              center={[18.5204, 73.8567]}
              zoom={10}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
            >
              <CollectorMapController
                selectedParcel={inspectedParcel}
                fitBoundsTrigger={fitBoundsTrigger}
              />

              <TileLayer
                key={activeBaseLayer}
                url={baseMapTiles[activeBaseLayer].url}
                attribution={baseMapTiles[activeBaseLayer].attribution}
                maxZoom={18}
              />

              {/* Project Alignment Lines */}
              {layers.projectBoundaries && filteredAlignments.map(aln => (
                <Polyline
                  key={aln.id}
                  positions={aln.coords}
                  pathOptions={{
                    color: aln.color,
                    weight: aln.weight,
                    dashArray: aln.dashArray,
                    opacity: 0.95
                  }}
                >
                  <Tooltip sticky>
                    <div style={{ fontSize: '11px', fontWeight: 700 }}>{aln.name}</div>
                  </Tooltip>
                  <Popup>
                    <div style={{ padding: '6px' }}>
                      <strong style={{ color: aln.color }}>{aln.name}</strong>
                      <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                        Statutory Right-of-Way Corridor
                      </div>
                    </div>
                  </Popup>
                </Polyline>
              ))}

              {/* Parcel Polygons */}
              {layers.parcelBoundaries && filteredParcels.map(parcel => {
                const isSelected = inspectedParcel?.id === parcel.id;
                const statusColor = getStatusColor(parcel.statusCode);

                return (
                  <Polygon
                    key={`col-poly-${parcel.id}`}
                    positions={parcel.polygon}
                    pathOptions={{
                      color: isSelected ? '#0F172A' : statusColor,
                      weight: isSelected ? 3.5 : 2,
                      fillColor: statusColor,
                      fillOpacity: isSelected ? 0.65 : 0.45,
                      dashArray: parcel.statusCode === 'Disputed' ? '4, 4' : null
                    }}
                    eventHandlers={{
                      click: () => setInspectedParcel(parcel)
                    }}
                  >
                    <Tooltip direction="top">
                      <div style={{ fontSize: '11px', fontWeight: 600 }}>
                        <span style={{ fontWeight: 800 }}>Gat {parcel.surveyNo}</span> • {parcel.village} ({parcel.area})
                      </div>
                    </Tooltip>
                    <Popup>
                      <div style={{ width: '220px', padding: '8px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>
                          Parcel #{parcel.id} (Gat {parcel.surveyNo})
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                          {parcel.village}, Tal. {parcel.taluka}
                        </div>
                        <div style={{ fontSize: '11.5px', marginTop: '6px' }}>
                          <strong>Owner:</strong> {parcel.landowner}
                        </div>
                        <div style={{ fontSize: '11.5px', marginTop: '2px' }}>
                          <strong>Award:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>{parcel.compAmount}</span>
                        </div>
                        <div style={{ marginTop: '6px', fontSize: '10.5px', fontWeight: 700, color: statusColor }}>
                          Status: {parcel.status}
                        </div>
                      </div>
                    </Popup>
                  </Polygon>
                );
              })}

              {/* Gat Markers */}
              {layers.parcelMarkers && filteredParcels.map(parcel => {
                const isSelected = inspectedParcel?.id === parcel.id;
                const statusColor = getStatusColor(parcel.statusCode);

                return (
                  <Marker
                    key={`col-marker-${parcel.id}`}
                    position={[parcel.lat, parcel.lng]}
                    icon={createCadastralDivIcon(parcel.surveyNo, statusColor, isSelected)}
                    eventHandlers={{
                      click: () => setInspectedParcel(parcel)
                    }}
                  />
                );
              })}
            </MapContainer>

            {/* Map Legend Overlay Box */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(8px)',
              color: '#FFF',
              padding: '12px 14px',
              borderRadius: '8px',
              fontSize: '11px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <div style={{ fontWeight: 800, color: '#FDE68A', marginBottom: '2px' }}>PUNE DISTRICT GIS LEGEND</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '16px', height: '3px', background: '#EF4444' }} />
                <span>Pune Ring Road Expressway</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '16px', height: '3px', background: '#3B82F6' }} />
                <span>NH-48 Highway Expansion</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '16px', height: '3px', background: '#8B5CF6' }} />
                <span>Purandar Airport Express</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981' }} />
                <span>Acquired Parcel & Disbursed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B' }} />
                <span>Pending Field Verification</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EF4444' }} />
                <span>Disputed / Court Stay</span>
              </div>
            </div>

            {/* Quick Map Controls Top-Right */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 1000 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setFitBoundsTrigger(t => t + 1)}
                title="Fit All District Alignments & Parcels"
                style={{ padding: '8px', minWidth: '34px', background: 'rgba(255,255,255,0.95)' }}
              >
                <Crosshair size={16} />
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  if (inspectedParcel?.lat && inspectedParcel?.lng) {
                    setInspectedParcel({ ...inspectedParcel });
                  }
                }}
                title="Locate Selected Parcel"
                style={{ padding: '8px', minWidth: '34px', background: 'rgba(255,255,255,0.95)', color: '#008E4F' }}
              >
                <LocateFixed size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* GIS Layer Control & Parcel Inspection Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Layer Toggle Box */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '13px' }}>
                <Layers size={16} style={{ color: '#0B4726' }} /> GIS LAYERS
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={layers.projectBoundaries}
                  onChange={e => setLayers({ ...layers, projectBoundaries: e.target.checked })}
                />
                <span>Project Alignments (Polylines)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={layers.parcelBoundaries}
                  onChange={e => setLayers({ ...layers, parcelBoundaries: e.target.checked })}
                />
                <span>Land Parcel 7/12 Polygons</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={layers.parcelMarkers}
                  onChange={e => setLayers({ ...layers, parcelMarkers: e.target.checked })}
                />
                <span>Gat Number Marker Badges</span>
              </label>
            </div>
          </div>

          {/* Parcel Inspection Panel */}
          <div className="card" style={{ background: '#F8FAFC', border: '1.5px solid #0B4726', flex: 1 }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '12.5px', color: '#0B4726' }}>
                <Info size={15} /> SELECTED PARCEL DETAILS
              </div>
            </div>

            {inspectedParcel ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                <div>
                  <span className="mono-code" style={{ fontSize: '14px', fontWeight: 800, color: '#0B4726' }}>
                    {inspectedParcel.id}
                  </span>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>Survey #{inspectedParcel.surveyNo}</div>
                </div>

                <div>
                  <div style={{ color: '#64748B', fontSize: '10.5px' }}>LANDOWNER</div>
                  <div style={{ fontWeight: 800, color: '#0F172A' }}>{inspectedParcel.landowner}</div>
                </div>

                <div>
                  <div style={{ color: '#64748B', fontSize: '10.5px' }}>LOCATION</div>
                  <div>{inspectedParcel.village} Village, Taluka {inspectedParcel.taluka}</div>
                  <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
                    {inspectedParcel.project}
                  </div>
                </div>

                <div>
                  <div style={{ color: '#64748B', fontSize: '10.5px' }}>AREA</div>
                  <div style={{ fontWeight: 700 }}>{inspectedParcel.area}</div>
                </div>

                <div>
                  <div style={{ color: '#64748B', fontSize: '10.5px' }}>COMPENSATION AWARD</div>
                  <div style={{ fontWeight: 800, color: '#059669', fontSize: '14px' }}>{inspectedParcel.compAmount}</div>
                </div>

                <div
                  className={`badge ${
                    inspectedParcel.statusCode === 'Acquired'
                      ? 'badge-green'
                      : inspectedParcel.statusCode === 'Disputed'
                      ? 'badge-red'
                      : 'badge-orange'
                  }`}
                  style={{ width: 'fit-content', marginTop: '6px' }}
                >
                  {inspectedParcel.status}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#94A3B8' }}>
                Click a parcel on the map to inspect its RoR 7/12 record
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
