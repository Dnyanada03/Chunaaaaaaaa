import React, { useState } from 'react';
import { MapPin, Layers, Filter, ChevronRight, Eye } from 'lucide-react';
import { stateProjectsMasterList, stateDistrictSummary } from '../../data/stateMockData';
import StatusBadge from '../common/StatusBadge';

export default function StateGISView({ onNavigate }) {
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeLayers, setActiveLayers] = useState(['boundaries', 'acquired']);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>STATE GIS MAP</h1>
          <p>Geospatial overview of land acquisition projects across Maharashtra</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '16px' }}>
        {/* Left Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* District Filter */}
          <div className="card" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B7280', marginBottom: '8px' }}>
              <Filter size={12} style={{ marginRight: '4px' }} /> District
            </div>
            <select className="form-select" value={selectedDistrict} onChange={e => { setSelectedDistrict(e.target.value); setSelectedProject(null); }} style={{ fontSize: '12.5px' }}>
              <option value="All">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Layers */}
          <div className="card" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B7280', marginBottom: '10px' }}>
              <Layers size={12} style={{ marginRight: '4px' }} /> Map Layers
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
          <div className="card" style={{ padding: '14px 16px', maxHeight: '400px', overflowY: 'auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B7280', marginBottom: '10px' }}>
              Projects ({filteredProjects.length})
            </div>
            {filteredProjects.map(proj => (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px',
                  background: selectedProject === proj.id ? '#E6F4EA' : 'transparent',
                  border: '1px solid', borderColor: selectedProject === proj.id ? '#CEEAD6' : 'transparent',
                  borderRadius: '8px', cursor: 'pointer', marginBottom: '4px',
                  transition: 'background 0.12s ease'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>{proj.name}</div>
                <div style={{ fontSize: '10.5px', color: '#6B7280', marginTop: '1px' }}>
                  {proj.district} · {proj.landRequiredHa} Ha
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
          {/* Map Placeholder */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, #E8F0FE 0%, #F1F5F9 50%, #E6F4EA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{ textAlign: 'center', color: '#6B7280' }}>
              <MapPin size={36} style={{ marginBottom: '12px', color: '#0B4726' }} />
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                State GIS Map — Maharashtra
              </div>
              <div style={{ fontSize: '12px' }}>
                {selectedDistrict !== 'All' ? `${selectedDistrict} District` : 'All Districts'} ·
                {filteredProjects.length} projects ·
                {activeLayers.length} layers active
              </div>
            </div>

            {/* District markers */}
            {stateDistrictSummary.slice(0, 6).map((dist, i) => {
              const positions = [
                { top: '20%', left: '35%' }, { top: '45%', left: '25%' },
                { top: '30%', left: '65%' }, { top: '55%', left: '70%' },
                { top: '70%', left: '40%' }, { top: '35%', left: '50%' }
              ];
              const pos = positions[i] || positions[0];
              return (
                <div key={dist.district} style={{
                  position: 'absolute', ...pos, transform: 'translate(-50%, -50%)',
                  background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px',
                  padding: '6px 10px', fontSize: '10.5px', fontWeight: 600, color: '#374151',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer', zIndex: 2
                }}
                  onClick={() => setSelectedDistrict(dist.district)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={10} style={{ color: dist.atRisk > 0 ? '#C5221F' : '#1E7E34' }} />
                    {dist.district}
                  </div>
                  <div style={{ fontSize: '9px', color: '#9CA3AF', marginTop: '1px' }}>{dist.projects} projects</div>
                </div>
              );
            })}
          </div>

          {/* Selected Project Info */}
          {selectedProject && (() => {
            const proj = stateProjectsMasterList.find(p => p.id === selectedProject);
            if (!proj) return null;
            return (
              <div style={{ padding: '14px 18px', borderTop: '1px solid #E2E8F0', background: '#FAFAF9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{proj.name}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                      {proj.district} · {proj.taluka} · {proj.villages.join(', ')}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '12px' }}>
                      <span><strong>{proj.landRequiredHa} Ha</strong> required</span>
                      <span><strong>{proj.landAcquiredHa} Ha</strong> acquired</span>
                      <span><strong>{proj.totalLandowners}</strong> landowners</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onNavigate && onNavigate('project-detail', proj.id)}
                    style={{ fontSize: '11px' }}
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
