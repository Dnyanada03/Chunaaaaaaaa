import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronRight, Download, Send, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getAllMordProjects } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';

export default function MordProjectsView({ onNavigate, initialFilters = {} }) {
  const { projects: contextProjects } = useSwadesh();
  const allProjects = useMemo(() => getAllMordProjects(contextProjects), [contextProjects]);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState(initialFilters?.state || 'All');
  const [selectedMinistry, setSelectedMinistry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedStage, setSelectedStage] = useState(initialFilters?.stage || 'All');
  const [selectedRisk, setSelectedRisk] = useState('All');

  // Unique Filter Options
  const stateOptions = ['All', ...new Set(allProjects.map(p => p.state).filter(Boolean))];
  const ministryOptions = ['All', ...new Set(allProjects.map(p => p.ministry).filter(Boolean))];
  const categoryOptions = ['All', ...new Set(allProjects.map(p => p.category).filter(Boolean))];
  const statusOptions = ['All', 'Ongoing', 'Delayed', 'Under Review', 'Completed'];
  const stageOptions = ['All', 'Proposed', 'Approved', 'SIA', 'Objections', 'Compensation', 'Award', 'Final Mutation', 'Completed'];
  const riskOptions = ['All', 'Critical', 'High', 'Medium', 'Low', 'None'];

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
      // Search matches
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term ||
        p.name.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term) ||
        p.authority.toLowerCase().includes(term) ||
        p.state.toLowerCase().includes(term) ||
        p.district.toLowerCase().includes(term);

      // Filters
      const matchesState = selectedState === 'All' || p.state === selectedState;
      const matchesMinistry = selectedMinistry === 'All' || p.ministry === selectedMinistry;
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || p.status.toLowerCase() === selectedStatus.toLowerCase();
      const matchesStage = selectedStage === 'All' || p.stage.toLowerCase().includes(selectedStage.toLowerCase());
      const matchesRisk = selectedRisk === 'All' || (p.riskLevel && p.riskLevel.toLowerCase() === selectedRisk.toLowerCase());

      return matchesSearch && matchesState && matchesMinistry && matchesCategory && matchesStatus && matchesStage && matchesRisk;
    });
  }, [allProjects, searchTerm, selectedState, selectedMinistry, selectedCategory, selectedStatus, selectedStage, selectedRisk]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedState('All');
    setSelectedMinistry('All');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSelectedStage('All');
    setSelectedRisk('All');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Standard Clean Page Banner */}
      <div className="page-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title-group">
          <h1>National Projects ({filteredProjects.length} Records)</h1>
          <p>Consolidated supervisory inventory across central ministries and state revenue authorities • National Land Acquisition Project Registry</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={resetFilters}
            className="btn btn-secondary btn-sm"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="card" style={{ padding: '16px 20px' }}>
        {/* Top Search Line */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: '#64748B' }} />
            <input
              type="text"
              placeholder="Search by Project Name, ID, Proposing Authority, State or District..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#0F172A',
                background: '#FFFFFF'
              }}
            />
          </div>
        </div>

        {/* Multi-Dimensional Filter Dropdowns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', marginBottom: '5px', fontWeight: 600 }}>
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#0F172A',
                background: '#FFFFFF'
              }}
            >
              {stateOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', marginBottom: '5px', fontWeight: 600 }}>
              Ministry
            </label>
            <select
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#0F172A',
                background: '#FFFFFF'
              }}
            >
              {ministryOptions.map(opt => <option key={opt} value={opt}>{opt.replace('Ministry of ', 'Mo ')}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', marginBottom: '5px', fontWeight: 600 }}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#0F172A',
                background: '#FFFFFF'
              }}
            >
              {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', marginBottom: '5px', fontWeight: 600 }}>
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#0F172A',
                background: '#FFFFFF'
              }}
            >
              {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', marginBottom: '5px', fontWeight: 600 }}>
              Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#0F172A',
                background: '#FFFFFF'
              }}
            >
              {stageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', marginBottom: '5px', fontWeight: 600 }}>
              Risk Level
            </label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#0F172A',
                background: '#FFFFFF'
              }}
            >
              {riskOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* DENSE ENTERPRISE GOVERNMENT TABLE */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ margin: 0, border: 'none', borderRadius: 0 }}>
          <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 14px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, width: '45px', textTransform: 'uppercase' }}>SR</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>PROJECT NAME &amp; DESCRIPTION</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>PROPOSED BY / MINISTRY</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>LOCATION</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>CATEGORY</th>
                <th style={{ padding: '12px 14px', textAlign: 'right', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>LAND (REQ / ACQ)</th>
                <th style={{ padding: '12px 14px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>STAGE</th>
                <th style={{ padding: '12px 14px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>STATUS</th>
                <th style={{ padding: '12px 14px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    No matching projects found for selected filters.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p, index) => {
                  const isDelayed = p.status === 'Delayed';
                  const isCritical = p.riskLevel === 'Critical';

                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: '1px solid #E2E8F0',
                        background: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                        transition: 'background 0.1s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F5F9'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = index % 2 === 0 ? '#FFFFFF' : '#F8FAFC'; }}
                    >
                      {/* SR NO */}
                      <td style={{
                        padding: '12px 10px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '11.5px',
                        color: '#64748B'
                      }}>
                        {String(index + 1).padStart(2, '0')}
                      </td>

                      {/* PROJECT NAME & DESCRIPTION */}
                      <td style={{ padding: '12px 14px', maxWidth: '320px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '11px',
                            color: '#008E4F',
                            fontWeight: 700
                          }}>
                            {p.id}
                          </span>
                          {isCritical && (
                            <span style={{
                              fontSize: '9px',
                              fontFamily: 'var(--font-mono, monospace)',
                              background: '#FEE2E2',
                              color: '#B91C1C',
                              border: '1px solid #FCA5A5',
                              padding: '1px 5px',
                              borderRadius: '4px',
                              fontWeight: 700
                            }}>
                              HIGH RISK
                            </span>
                          )}
                        </div>

                        <div
                          onClick={() => onNavigate && onNavigate('project-detail', p.id)}
                          style={{
                            fontSize: '13.5px',
                            fontWeight: 600,
                            color: '#0F172A',
                            cursor: 'pointer',
                            marginTop: '2px'
                          }}
                        >
                          {p.name}
                        </div>

                        <div style={{
                          fontSize: '11.5px',
                          color: '#64748B',
                          marginTop: '2px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {p.description}
                        </div>
                      </td>

                      {/* PROPOSED BY / MINISTRY */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '12.5px' }}>
                          {p.authority}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>
                          {p.ministry}
                        </div>
                      </td>

                      {/* LOCATION */}
                      <td style={{ padding: '12px 12px' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A' }}>{p.state}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{p.district}</div>
                      </td>

                      {/* CATEGORY */}
                      <td style={{ padding: '12px 12px' }}>
                        <span style={{
                          fontSize: '11px',
                          background: '#E6F4EA',
                          color: '#008E4F',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontWeight: 600
                        }}>
                          {p.category}
                        </span>
                      </td>

                      {/* LAND */}
                      <td style={{ padding: '12px 12px', textAlign: 'right', fontFamily: 'var(--font-mono, monospace)' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A' }}>
                          {p.landRequiredHa} Ha
                        </div>
                        <div style={{ fontSize: '11px', color: '#008E4F', fontWeight: 600 }}>
                          {p.landAcquiredHa} Ha ({p.landRequiredHa ? Math.round((p.landAcquiredHa / p.landRequiredHa) * 100) : 0}%)
                        </div>
                      </td>

                      {/* STAGE */}
                      <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '11px',
                          padding: '3px 8px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '6px',
                          background: '#F1F5F9',
                          color: '#0F172A',
                          fontWeight: 600
                        }}>
                          {p.stage}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor: isDelayed ? '#FCA5A5' : p.status === 'Completed' ? '#86EFAC' : '#FCD34D',
                          background: isDelayed ? '#FEE2E2' : p.status === 'Completed' ? '#E6F4EA' : '#FEF3C7',
                          color: isDelayed ? '#B91C1C' : p.status === 'Completed' ? '#15803D' : '#B45309',
                          fontWeight: 600
                        }}>
                          {p.status}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onNavigate && onNavigate('project-detail', p.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            padding: '4px 10px',
                            fontSize: '11.5px'
                          }}
                        >
                          Inspect <ChevronRight size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', padding: '4px 2px' }}>
        <span>Official Government Data • Sourced from State Revenue Portals &amp; Central Mission Directorates</span>
        <span style={{ fontWeight: 600 }}>Showing {filteredProjects.length} of {allProjects.length} National Projects</span>
      </div>
    </div>
  );
}
