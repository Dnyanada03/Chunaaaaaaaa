import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FolderKanban, FileSpreadsheet, FileText, MapPin, ChevronRight } from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';
import { swadeshCadastralParcels } from '../../data/proposingMockData';

export default function ProposingBodyGlobalSearchModal({ isOpen, onClose, onNavigate }) {
  const { proposingProjects, proposingProposals, proposingDocuments } = useSwadesh();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results
  const matchingProjects = q ? proposingProjects.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q) ||
    (p.district && p.district.toLowerCase().includes(q))
  ).slice(0, 4) : [];

  const matchingProposals = q ? proposingProposals.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q) ||
    (p.variant && p.variant.toLowerCase().includes(q))
  ).slice(0, 4) : [];

  const matchingDocs = q ? proposingDocuments.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.type.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const matchingParcels = q ? swadeshCadastralParcels.filter(p =>
    p.surveyNo.toLowerCase().includes(q) ||
    p.village.toLowerCase().includes(q) ||
    p.landowner.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const hasResults = matchingProjects.length > 0 || matchingProposals.length > 0 || matchingDocs.length > 0 || matchingParcels.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '640px', padding: 0, overflow: 'hidden' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Search size={18} style={{ color: '#005A36' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search projects, proposals, documents, survey numbers... (ESC to close)"
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '15px',
              fontFamily: 'inherit',
              color: '#0F172A'
            }}
          />
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 20px' }}>
          {!query ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748B', fontSize: '13px' }}>
              Type a project ID (e.g. <code>PRJ-MH</code>), proposal variant, document name, or survey number...
            </div>
          ) : !hasResults ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748B', fontSize: '13px' }}>
              No matching records found for "{query}".
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Projects */}
              {matchingProjects.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#005A36', textTransform: 'uppercase', marginBottom: '8px' }}>
                    PROJECTS ({matchingProjects.length})
                  </div>
                  {matchingProjects.map(proj => (
                    <div
                      key={proj.id}
                      onClick={() => {
                        onNavigate('project-detail', proj.id);
                        onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: '#F8FAFC',
                        marginBottom: '6px',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>{proj.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          <span className="mono-code">{proj.id}</span> • {proj.district} District • {proj.landRequiredHa} Ha
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ color: '#94A3B8' }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Proposals */}
              {matchingProposals.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#005A36', textTransform: 'uppercase', marginBottom: '8px' }}>
                    PROPOSALS & VARIANTS ({matchingProposals.length})
                  </div>
                  {matchingProposals.map(prop => (
                    <div
                      key={prop.id}
                      onClick={() => {
                        onNavigate('proposal-detail', prop.id);
                        onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: '#F8FAFC',
                        marginBottom: '6px',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>{prop.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          <span className="mono-code">{prop.id}</span> • {prop.variant} • Status: <strong>{prop.status}</strong>
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ color: '#94A3B8' }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Documents */}
              {matchingDocs.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#005A36', textTransform: 'uppercase', marginBottom: '8px' }}>
                    DOCUMENTS ({matchingDocs.length})
                  </div>
                  {matchingDocs.map(doc => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        onNavigate('documents');
                        onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: '#F8FAFC',
                        marginBottom: '6px',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={16} style={{ color: '#005A36' }} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '13px' }}>{doc.name}</div>
                          <div style={{ fontSize: '10.5px', color: '#64748B' }}>
                            Version {doc.version} • {doc.uploadDate} • {doc.digitalSignatureStatus}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ color: '#94A3B8' }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Parcels */}
              {matchingParcels.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#005A36', textTransform: 'uppercase', marginBottom: '8px' }}>
                    SURVEY PARCELS ({matchingParcels.length})
                  </div>
                  {matchingParcels.map(pl => (
                    <div
                      key={pl.id}
                      onClick={() => {
                        onNavigate('map');
                        onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: '#F8FAFC',
                        marginBottom: '6px',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '13px' }}>Survey #{pl.surveyNo} — {pl.village}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          Landowner: {pl.landowner} • Area: {pl.areaHa} Ha • {pl.type}
                        </div>
                      </div>
                      <ChevronRight size={14} style={{ color: '#94A3B8' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
