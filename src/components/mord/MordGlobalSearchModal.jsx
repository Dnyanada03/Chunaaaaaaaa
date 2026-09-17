import React, { useState, useEffect } from 'react';
import { Search, X, FolderKanban, Building2, Landmark, FileText, Send, ChevronRight } from 'lucide-react';
import { getAllMordProjects, initialMordDirectives } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';

export default function MordGlobalSearchModal({ isOpen, onClose, onNavigate }) {
  const { projects: contextProjects } = useSwadesh();
  const allProjects = getAllMordProjects(contextProjects);

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingProjects = q
    ? allProjects.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.district.toLowerCase().includes(q) || p.state.toLowerCase().includes(q)).slice(0, 5)
    : [];

  const matchingDirectives = q
    ? initialMordDirectives.filter(d => d.title.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.targetAuthority.toLowerCase().includes(q)).slice(0, 3)
    : [];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(22, 35, 58, 0.65)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '80px',
      zIndex: 1200
    }}>
      <div style={{
        background: '#FFFFFF',
        width: '100%',
        maxWidth: '680px',
        border: '1px solid #D8D5CB',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 18px',
          borderBottom: '1px solid #D8D5CB',
          background: '#FBFAF6'
        }}>
          <Search size={18} style={{ color: '#2F6F62' }} />
          <input
            type="text"
            placeholder="Search national projects, states, ministries, directives, documents (e.g. 'Mumbai', 'Expressway', 'DIR')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              color: '#16233A'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#6B7280',
              cursor: 'pointer',
              padding: '2px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px' }}>
          {!q ? (
            <div style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center', padding: '24px 0' }}>
              Type a search query to search across all national records, corridors, and statutory directives.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Projects Section */}
              {matchingProjects.length > 0 && (
                <div>
                  <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 700, marginBottom: '6px' }}>
                    National Projects ({matchingProjects.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchingProjects.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onNavigate && onNavigate('project-detail', p.id);
                        }}
                        style={{
                          padding: '10px 12px',
                          background: '#FBFAF6',
                          border: '1px solid #D8D5CB',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#2F6F62', fontWeight: 600 }}>{p.id}</span>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#16233A' }}>{p.name}</span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>
                            {p.state} ({p.district}) &nbsp;|&nbsp; {p.category} &nbsp;|&nbsp; Stage: {p.stage}
                          </div>
                        </div>
                        <ChevronRight size={14} style={{ color: '#2F6F62' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Directives Section */}
              {matchingDirectives.length > 0 && (
                <div>
                  <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 700, marginBottom: '6px' }}>
                    Ministerial Directives &amp; Inquiries ({matchingDirectives.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {matchingDirectives.map(d => (
                      <div
                        key={d.id}
                        onClick={() => {
                          onClose();
                          onNavigate && onNavigate('alerts');
                        }}
                        style={{
                          padding: '10px 12px',
                          background: '#FBFAF6',
                          border: '1px solid #D8D5CB',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#8A6A1E', fontWeight: 600 }}>{d.id}</span>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#16233A' }}>{d.title}</span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#6B7280', marginTop: '2px' }}>
                            Target: {d.targetAuthority} &nbsp;|&nbsp; Status: {d.status}
                          </div>
                        </div>
                        <ChevronRight size={14} style={{ color: '#8A6A1E' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingProjects.length === 0 && matchingDirectives.length === 0 && (
                <div style={{ textAlign: 'center', padding: '24px 0', color: '#6B7280', fontSize: '12.5px' }}>
                  No matching records found for "{query}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          background: '#F2F1EC',
          borderTop: '1px solid #D8D5CB',
          padding: '8px 16px',
          fontSize: '11px',
          color: '#6B7280',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Press <strong>ESC</strong> to close</span>
          <span>Spotlight Search across Central &amp; State SWADESH nodes</span>
        </div>
      </div>
    </div>
  );
}
