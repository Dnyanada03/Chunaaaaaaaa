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
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
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
        border: '1px solid #E2E8F0',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          background: '#FFFFFF'
        }}>
          <Search size={20} style={{ color: '#008E4F' }} />
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
              fontSize: '15px',
              fontFamily: 'Inter, sans-serif',
              color: '#0F172A'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '18px' }}>
          {!q ? (
            <div style={{ fontSize: '13px', color: '#64748B', textAlign: 'center', padding: '28px 0' }}>
              Type a search query to search across all national records, corridors, and statutory directives.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Projects Section */}
              {matchingProjects.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.04em' }}>
                    National Projects ({matchingProjects.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {matchingProjects.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onNavigate && onNavigate('project-detail', p.id);
                        }}
                        style={{
                          padding: '12px 14px',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '11px', color: '#008E4F', fontWeight: 700 }}>{p.id}</span>
                            <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A' }}>{p.name}</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                            {p.state} ({p.district}) &nbsp;|&nbsp; {p.category} &nbsp;|&nbsp; Stage: {p.stage}
                          </div>
                        </div>
                        <ChevronRight size={16} style={{ color: '#008E4F' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Directives Section */}
              {matchingDirectives.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.04em' }}>
                    Ministerial Directives &amp; Inquiries ({matchingDirectives.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {matchingDirectives.map(d => (
                      <div
                        key={d.id}
                        onClick={() => {
                          onClose();
                          onNavigate && onNavigate('alerts');
                        }}
                        style={{
                          padding: '12px 14px',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '11px', color: '#D97706', fontWeight: 700 }}>{d.id}</span>
                            <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A' }}>{d.title}</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                            Target: {d.targetAuthority} &nbsp;|&nbsp; Status: {d.status}
                          </div>
                        </div>
                        <ChevronRight size={16} style={{ color: '#D97706' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingProjects.length === 0 && matchingDirectives.length === 0 && (
                <div style={{ textAlign: 'center', padding: '28px 0', color: '#64748B', fontSize: '13px' }}>
                  No matching records found for "{query}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          padding: '10px 18px',
          fontSize: '11.5px',
          color: '#64748B',
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
