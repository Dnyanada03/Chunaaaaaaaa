import React, { useState } from 'react';
import { Search, X, Folder, Building2, Home, MapPin, User, ArrowRight } from 'lucide-react';
import {
  collectorProjectsMasterList,
  collectorTalukasProgress,
  collectorVillageProgress
} from '../../data/collectorMockData';

export default function CollectorGlobalSearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchLower = query.toLowerCase().trim();

  // Category Grouping
  const matchingProjects = searchLower
    ? collectorProjectsMasterList.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.id.toLowerCase().includes(searchLower) ||
        p.proposingBody.toLowerCase().includes(searchLower)
      )
    : collectorProjectsMasterList.slice(0, 2);

  const matchingTalukas = searchLower
    ? collectorTalukasProgress.filter(t =>
        t.taluka.toLowerCase().includes(searchLower)
      )
    : collectorTalukasProgress.slice(0, 2);

  const matchingVillages = searchLower
    ? collectorVillageProgress.filter(v =>
        v.village.toLowerCase().includes(searchLower) ||
        v.taluka.toLowerCase().includes(searchLower)
      )
    : collectorVillageProgress.slice(0, 2);

  const matchingParcels = searchLower
    ? [
        { id: "MH-PL-10234", surveyNo: "142/1A", village: "Wagholi", landowner: "Rameshwar Dhondu Patil", area: "0.85 Ha" },
        { id: "MH-PL-10235", surveyNo: "142/1B", village: "Wagholi", landowner: "Ganesh Ramchandra Jadhav", area: "1.10 Ha" },
        { id: "MH-PL-10240", surveyNo: "88/2B", village: "Avalwadi", landowner: "Sunita Anant Deshmukh", area: "0.70 Ha" }
      ].filter(p =>
        p.id.toLowerCase().includes(searchLower) ||
        p.surveyNo.toLowerCase().includes(searchLower) ||
        p.village.toLowerCase().includes(searchLower)
      )
    : [
        { id: "MH-PL-10234", surveyNo: "142/1A", village: "Wagholi", landowner: "Rameshwar Dhondu Patil", area: "0.85 Ha" }
      ];

  const matchingLandowners = searchLower
    ? [
        { name: "Rameshwar Dhondu Patil", village: "Wagholi", parcelId: "MH-PL-10234", comp: "₹ 1.35 Cr" },
        { name: "Ganesh Ramchandra Jadhav", village: "Wagholi", parcelId: "MH-PL-10235", comp: "₹ 1.50 Cr" },
        { name: "Sunita Anant Deshmukh", village: "Avalwadi", parcelId: "MH-PL-10240", comp: "₹ 2.45 Cr" }
      ].filter(l =>
        l.name.toLowerCase().includes(searchLower) ||
        l.village.toLowerCase().includes(searchLower)
      )
    : [
        { name: "Rameshwar Dhondu Patil", village: "Wagholi", parcelId: "MH-PL-10234", comp: "₹ 1.35 Cr" }
      ];

  const handleItemClick = (category, item) => {
    onSelectResult && onSelectResult(category, item);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '750px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header" style={{ background: '#06371E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={18} />
            <h3 className="modal-title">DISTRICT COLLECTORATE GLOBAL SEARCH</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '16px 20px' }}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              type="text"
              className="form-control"
              style={{
                fontSize: '15px',
                padding: '12px 16px 12px 42px',
                borderRadius: '10px',
                width: '100%',
                border: '2px solid #0B4726'
              }}
              placeholder="Search projects, villages, parcels or landowners..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6B7280'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Category 1: Projects */}
            {matchingProjects.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#0B4726', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <Folder size={14} /> Projects ({matchingProjects.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {matchingProjects.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleItemClick('projects', p)}
                      style={{
                        padding: '10px 14px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '13px' }}>
                          {p.name} <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#64748B' }}>({p.id})</span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                          Proposing: {p.proposingBody} • Stage: <strong>{p.stage}</strong>
                        </div>
                      </div>
                      <ArrowRight size={14} style={{ color: '#0B4726' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category 2: Talukas */}
            {matchingTalukas.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#0B4726', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <Building2 size={14} /> Talukas ({matchingTalukas.length})
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {matchingTalukas.map(t => (
                    <div
                      key={t.id}
                      onClick={() => handleItemClick('taluka', t)}
                      style={{
                        padding: '10px 12px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>
                        Taluka {t.taluka}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        {t.projects} Projects • {t.completion}% Land Acquired
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category 3: Villages */}
            {matchingVillages.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#0B4726', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <Home size={14} /> Villages ({matchingVillages.length})
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {matchingVillages.map((v, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleItemClick('village', v)}
                      style={{
                        padding: '10px 12px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>
                        Village {v.village} ({v.taluka})
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        Project: {v.project} • {v.landowners} Landowners
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category 4: Parcels */}
            {matchingParcels.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#0B4726', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <MapPin size={14} /> Land Parcels ({matchingParcels.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {matchingParcels.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleItemClick('parcel', p)}
                      style={{
                        padding: '8px 12px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <span className="mono-code" style={{ color: '#0B4726', fontWeight: 700 }}>{p.id}</span> • Survey #{p.surveyNo} • Village: {p.village}
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>Owner: {p.landowner} ({p.area})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category 5: Landowners */}
            {matchingLandowners.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#0B4726', textTransform: 'uppercase', marginBottom: '8px' }}>
                  <User size={14} /> Landowners ({matchingLandowners.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {matchingLandowners.map((l, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleItemClick('landowner', l)}
                      style={{
                        padding: '8px 12px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>
                        {l.name} <span style={{ color: '#64748B', fontSize: '11.5px' }}>({l.village})</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#0B4726', fontWeight: 700 }}>
                        {l.comp} ({l.parcelId})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
          <span>Search categories: Projects | Talukas | Villages | Parcels | Landowners</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
