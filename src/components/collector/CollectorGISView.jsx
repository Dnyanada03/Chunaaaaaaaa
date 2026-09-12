import React, { useState } from 'react';
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
  Info
} from 'lucide-react';
import {
  collectorTalukasProgress,
  collectorVillageProgress,
  collectorProjectsMasterList
} from '../../data/collectorMockData';

export default function CollectorGISView() {
  const [selectedTaluka, setSelectedTaluka] = useState('All');
  const [selectedVillage, setSelectedVillage] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');

  // Layer Toggles
  const [layers, setLayers] = useState({
    projectBoundaries: true,
    talukaBoundaries: true,
    villageBoundaries: true,
    parcelBoundaries: true,
    forestBuffer: true
  });

  // Inspected Parcel State
  const [inspectedParcel, setInspectedParcel] = useState({
    id: "MH-PL-10234",
    surveyNo: "142/1A",
    village: "Wagholi",
    taluka: "Haveli",
    landowner: "Rameshwar Dhondu Patil",
    area: "0.85 Ha",
    status: "Compensation Under Dispute",
    compAmount: "₹ 1,35,00,000"
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DISTRICT GIS & CADASTRAL SPATIAL MAP COMMAND</h1>
          <p>Integrated District GIS Layer Monitoring, Alignment Inspection & Parcel Boundary Overlay</p>
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
            <select className="form-select">
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
        <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative', height: '560px', border: '2px solid #0B4726' }}>
          {/* Top GIS Toolbar Header */}
          <div style={{ background: '#06371E', color: '#FFF', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800 }}>
              <Compass size={18} /> PUNE DISTRICT GIS CADASTRAL MAP VIEW
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11.5px' }}>
              <span style={{ color: '#A7F3D0' }}>Lat: 18.5204° N, Long: 73.8567° E</span>
              <span style={{ color: '#FDE68A' }}>Scale: 1:25,000</span>
            </div>
          </div>

          {/* Map Graphic Layer */}
          <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 40px)', background: '#1E293B' }}>
            <img
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1600&q=80"
              alt="District GIS Map"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.1)' }}
            />

            {/* Simulated GIS Project Boundary Lines & Overlays */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {/* Ring Road Alignment (Red Dash Line) */}
              {layers.projectBoundaries && (
                <path
                  d="M 50 120 Q 250 80, 450 220 T 750 380"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="4"
                  strokeDasharray="8 4"
                />
              )}
              {/* Highway Widening Alignment (Blue Solid Line) */}
              {layers.projectBoundaries && (
                <path
                  d="M 100 480 Q 300 350, 600 200 T 850 100"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="4"
                />
              )}
            </svg>

            {/* Map Legend Overlay Box */}
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(15, 23, 42, 0.9)', color: '#FFF', padding: '12px', borderRadius: '8px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontWeight: 800, color: '#FDE68A', marginBottom: '2px' }}>MAP LEGEND</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '3px', background: '#EF4444' }} /> Proposed Expressway Alignment</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '3px', background: '#3B82F6' }} /> National Highway Expansion</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} /> Acquired Parcel (8,420 Ha)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} /> Pending Field Verification</div>
            </div>

            {/* Zoom Controls */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button className="btn btn-secondary btn-sm" style={{ padding: '8px', minWidth: '34px' }}><ZoomIn size={16} /></button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '8px', minWidth: '34px' }}><ZoomOut size={16} /></button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '8px', minWidth: '34px' }}><Maximize2 size={16} /></button>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={layers.projectBoundaries} onChange={e => setLayers({ ...layers, projectBoundaries: e.target.checked })} />
                Project Alignments
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={layers.talukaBoundaries} onChange={e => setLayers({ ...layers, talukaBoundaries: e.target.checked })} />
                Taluka Boundaries
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={layers.villageBoundaries} onChange={e => setLayers({ ...layers, villageBoundaries: e.target.checked })} />
                Village Gaothan Boundaries
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={layers.parcelBoundaries} onChange={e => setLayers({ ...layers, parcelBoundaries: e.target.checked })} />
                Land Parcel 7/12 Polygons
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
              </div>

              <div>
                <div style={{ color: '#64748B', fontSize: '10.5px' }}>AREA</div>
                <div style={{ fontWeight: 700 }}>{inspectedParcel.area}</div>
              </div>

              <div>
                <div style={{ color: '#64748B', fontSize: '10.5px' }}>COMPENSATION AWARD</div>
                <div style={{ fontWeight: 800, color: '#059669', fontSize: '14px' }}>{inspectedParcel.compAmount}</div>
              </div>

              <div className="badge badge-orange" style={{ width: 'fit-content', marginTop: '6px' }}>
                {inspectedParcel.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
