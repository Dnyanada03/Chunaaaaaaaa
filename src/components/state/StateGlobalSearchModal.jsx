import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, FolderKanban, MapPin, Users, ChevronRight } from 'lucide-react';
import { stateProjectsMasterList, stateDocuments } from '../../data/stateMockData';

export default function StateGlobalSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const lowerQuery = query.toLowerCase().trim();

  const matchedProjects = lowerQuery
    ? stateProjectsMasterList.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.id.toLowerCase().includes(lowerQuery) ||
        p.authority.toLowerCase().includes(lowerQuery) ||
        p.district.toLowerCase().includes(lowerQuery)
      ).slice(0, 5)
    : [];

  const matchedDocuments = lowerQuery
    ? stateDocuments.filter(d =>
        d.name.toLowerCase().includes(lowerQuery) ||
        d.project.toLowerCase().includes(lowerQuery) ||
        d.department.toLowerCase().includes(lowerQuery)
      ).slice(0, 4)
    : [];

  const hasResults = matchedProjects.length > 0 || matchedDocuments.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ alignItems: 'flex-start', paddingTop: '120px' }}>
      <div
        className="modal-container"
        style={{ maxWidth: '580px', borderRadius: '16px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '14px 18px', borderBottom: '1px solid #E2E8F0'
        }}>
          <Search size={18} style={{ color: '#6B7280', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, documents, districts, officers..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'none',
              fontSize: '14px', fontWeight: 500, color: '#111827'
            }}
          />
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#9CA3AF' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '8px 0' }}>
          {!lowerQuery && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
              Type to search across projects, documents, and districts
            </div>
          )}

          {lowerQuery && !hasResults && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
              No results found for "{query}"
            </div>
          )}

          {/* Projects */}
          {matchedProjects.length > 0 && (
            <>
              <div style={{
                fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px',
                color: '#6B7280', padding: '6px 18px'
              }}>
                Projects
              </div>
              {matchedProjects.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => {
                    onClose();
                    onNavigate && onNavigate('project-detail', proj.id);
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                    padding: '10px 18px', border: 'none', background: 'none', cursor: 'pointer',
                    textAlign: 'left', transition: 'background 0.12s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseOut={e => e.currentTarget.style.background = 'none'}
                >
                  <FolderKanban size={16} style={{ color: '#0B4726', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{proj.name}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>{proj.district} · {proj.authority}</div>
                  </div>
                  <ChevronRight size={14} style={{ color: '#CBD5E1' }} />
                </button>
              ))}
            </>
          )}

          {/* Documents */}
          {matchedDocuments.length > 0 && (
            <>
              <div style={{
                fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px',
                color: '#6B7280', padding: '6px 18px', marginTop: '4px'
              }}>
                Documents
              </div>
              {matchedDocuments.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => {
                    onClose();
                    onNavigate && onNavigate('documents');
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                    padding: '10px 18px', border: 'none', background: 'none', cursor: 'pointer',
                    textAlign: 'left', transition: 'background 0.12s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseOut={e => e.currentTarget.style.background = 'none'}
                >
                  <FileText size={16} style={{ color: '#1A73E8', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{doc.name}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>{doc.project} · {doc.department}</div>
                  </div>
                  <ChevronRight size={14} style={{ color: '#CBD5E1' }} />
                </button>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '8px 18px', borderTop: '1px solid #F1F5F9', fontSize: '10.5px', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Press <kbd style={{ padding: '1px 4px', background: '#F1F5F9', borderRadius: '3px', fontSize: '10px' }}>Esc</kbd> to close
        </div>
      </div>
    </div>
  );
}
