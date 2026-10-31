import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { Search, X, Folder, MapPin, FileText, User, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const GlobalSearchModal = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    projects,
    parcels,
    objections,
    setActiveTab,
    setSelectedObjection,
    setSelectedParcel,
    setSelectedProjectId
  } = useSwadesh();

  const [query, setQuery] = useState('');

  if (!isGlobalSearchOpen) return null;

  const q = query.trim().toLowerCase();

  // Search matching projects, parcels, objections, landowners
  const matchedProjects = q ? projects.filter(p =>
    p.id.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.district.toLowerCase().includes(q)
  ) : [];

  const matchedParcels = q ? parcels.filter(p =>
    p.id.toLowerCase().includes(q) ||
    p.surveyNumber.toLowerCase().includes(q) ||
    p.landowner.toLowerCase().includes(q) ||
    p.village.toLowerCase().includes(q)
  ) : [];

  const matchedObjections = q ? objections.filter(o =>
    o.id.toLowerCase().includes(q) ||
    o.landowner.toLowerCase().includes(q) ||
    o.parcelId.toLowerCase().includes(q) ||
    o.objectionType.toLowerCase().includes(q)
  ) : [];

  return (
    <div className="modal-overlay" onClick={() => setIsGlobalSearchOpen(false)}>
      <div
        className="modal-container"
        style={{ maxWidth: '720px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Search size={18} />
            <span className="modal-title">SWADESH Global Search</span>
          </div>
          <button className="modal-close-btn" onClick={() => setIsGlobalSearchOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '16px 24px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
          <input
            type="text"
            className="form-control"
            style={{ width: '100%', fontSize: '15px', padding: '10px 14px' }}
            placeholder="Search by Project ID, Village, Parcel ID, Survey No, Landowner Name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="modal-body" style={{ maxHeight: '420px' }}>
          {!q ? (
            <div style={{ textAlign: 'center', color: '#64748B', padding: '40px 20px' }}>
              <Search size={36} style={{ color: '#CBD5E1', marginBottom: '12px' }} />
              <div style={{ fontWeight: '600', fontSize: '14px' }}>Search Revenue Department Records</div>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>
                Enter Project ID (e.g. PRJ-MH-2026-101), Parcel ID (e.g. MH-PL-10234), Survey No (142/1A), or Landowner Name (Ram Patil).
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#005A36', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Folder size={14} /> Projects ({matchedProjects.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchedProjects.map(p => (
                      <div
                        key={p.id}
                        style={{ padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        onClick={() => {
                          setSelectedProjectId(p.id);
                          setActiveTab('projects');
                          setIsGlobalSearchOpen(false);
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', color: '#0F172A' }}>{p.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>ID: {p.id} • {p.totalParcels} Parcels • {p.district}</div>
                        </div>
                        <ArrowRight size={16} style={{ color: '#005A36' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Objections */}
              {matchedObjections.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#DC2626', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={14} /> Objections & Disputes ({matchedObjections.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchedObjections.map(o => (
                      <div
                        key={o.id}
                        style={{ padding: '10px 14px', border: '1px solid #FCA5A5', background: '#FFF5F5', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        onClick={() => {
                          setSelectedObjection(o);
                          setActiveTab('objections');
                          setIsGlobalSearchOpen(false);
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', color: '#991B1B' }}>{o.id}: {o.objectionType}</div>
                          <div style={{ fontSize: '12px', color: '#475569' }}>
                            Landowner: <strong>{o.landowner}</strong> • Parcel {o.parcelId} (Survey {o.surveyNumber}) • {o.village}
                          </div>
                        </div>
                        <StatusBadge status={o.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parcels */}
              {matchedParcels.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#1E40AF', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} /> Land Parcels ({matchedParcels.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchedParcels.map(p => (
                      <div
                        key={p.id}
                        style={{ padding: '10px 14px', border: '1px solid #E2E8F0', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        onClick={() => {
                          setSelectedParcel(p);
                          setActiveTab('projects');
                          setIsGlobalSearchOpen(false);
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', color: '#0F172A' }}>Parcel ID: {p.id} (Survey {p.surveyNumber})</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>
                            Landowner: <strong>{p.landowner}</strong> • Village: {p.village} • Area: {p.acquiredAreaHa} Ha
                          </div>
                        </div>
                        <StatusBadge status={p.verificationStatus} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedProjects.length === 0 && matchedObjections.length === 0 && matchedParcels.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>
                  No matching land acquisition records found for "{query}".
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
