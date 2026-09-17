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
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '24px 28px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280', fontWeight: 600 }}>
            National Land Acquisition Project Registry
          </div>
          <h2 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '2px 0 0', color: '#16233A' }}>
            National Projects ({filteredProjects.length} Records)
          </h2>
          <p style={{ fontSize: '13px', color: '#3A4A63', margin: '4px 0 0' }}>
            Consolidated supervisory inventory across central ministries and state revenue authorities.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={resetFilters}
            style={{
              background: '#FFFFFF',
              border: '1px solid #D8D5CB',
              padding: '7px 14px',
              fontSize: '12px',
              color: '#3A4A63',
              cursor: 'pointer',
              borderRadius: '2px'
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D8D5CB',
        padding: '16px 20px',
        marginBottom: '20px'
      }}>
        {/* Top Search Line */}
        <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: '#6B7280' }} />
            <input
              type="text"
              placeholder="Search by Project Name, ID, Proposing Authority, State or District..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                border: '1px solid #D8D5CB',
                borderRadius: '2px',
                fontSize: '13px',
                color: '#16233A'
              }}
            />
          </div>
        </div>

        {/* Multi-Dimensional Filter Dropdowns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '10px'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', marginBottom: '4px', fontWeight: 600 }}>
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #D8D5CB',
                borderRadius: '2px',
                fontSize: '12px',
                color: '#16233A',
                background: '#FFFFFF'
              }}
            >
              {stateOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', marginBottom: '4px', fontWeight: 600 }}>
              Ministry
            </label>
            <select
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #D8D5CB',
                borderRadius: '2px',
                fontSize: '12px',
                color: '#16233A',
                background: '#FFFFFF'
              }}
            >
              {ministryOptions.map(opt => <option key={opt} value={opt}>{opt.replace('Ministry of ', 'Mo ')}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', marginBottom: '4px', fontWeight: 600 }}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #D8D5CB',
                borderRadius: '2px',
                fontSize: '12px',
                color: '#16233A',
                background: '#FFFFFF'
              }}
            >
              {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', marginBottom: '4px', fontWeight: 600 }}>
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #D8D5CB',
                borderRadius: '2px',
                fontSize: '12px',
                color: '#16233A',
                background: '#FFFFFF'
              }}
            >
              {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', marginBottom: '4px', fontWeight: 600 }}>
              Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #D8D5CB',
                borderRadius: '2px',
                fontSize: '12px',
                color: '#16233A',
                background: '#FFFFFF'
              }}
            >
              {stageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#6B7280', marginBottom: '4px', fontWeight: 600 }}>
              Risk Level
            </label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #D8D5CB',
                borderRadius: '2px',
                fontSize: '12px',
                color: '#16233A',
                background: '#FFFFFF'
              }}
            >
              {riskOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* DENSE ENTERPRISE GOVERNMENT TABLE */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D8D5CB',
        overflowX: 'auto'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
          <thead>
            <tr style={{ background: '#F2F1EC', borderBottom: '1px solid #16233A' }}>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600, width: '45px' }}>SR</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>PROJECT NAME &amp; DESCRIPTION</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>PROPOSED BY / MINISTRY</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>LOCATION</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>CATEGORY</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>LAND (REQ / ACQ)</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>STAGE</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>STATUS</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '11px', color: '#3A4A63', fontWeight: 600 }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
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
                      borderBottom: '1px solid #D8D5CB',
                      background: index % 2 === 0 ? '#FFFFFF' : '#FBFAF6',
                      transition: 'background 0.1s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#F2F1EC'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = index % 2 === 0 ? '#FFFFFF' : '#FBFAF6'; }}
                  >
                    {/* SR NO */}
                    <td style={{
                      padding: '12px 10px',
                      textAlign: 'center',
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11.5px',
                      color: '#6B7280'
                    }}>
                      {String(index + 1).padStart(2, '0')}
                    </td>

                    {/* PROJECT NAME & DESCRIPTION */}
                    <td style={{ padding: '12px 14px', maxWidth: '320px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '10.5px',
                          color: '#2F6F62',
                          fontWeight: 600
                        }}>
                          {p.id}
                        </span>
                        {isCritical && (
                          <span style={{
                            fontSize: '9px',
                            fontFamily: '"IBM Plex Mono", monospace',
                            background: '#F6E7E2',
                            color: '#A6432B',
                            border: '1px solid #A6432B',
                            padding: '0 4px',
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
                          color: '#16233A',
                          cursor: 'pointer',
                          marginTop: '2px'
                        }}
                      >
                        {p.name}
                      </div>

                      <div style={{
                        fontSize: '11.5px',
                        color: '#6B7280',
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
                      <div style={{ fontWeight: 500, color: '#16233A', fontSize: '12.5px' }}>
                        {p.authority}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '1px' }}>
                        {p.ministry}
                      </div>
                    </td>

                    {/* LOCATION */}
                    <td style={{ padding: '12px 12px' }}>
                      <div style={{ fontWeight: 600, color: '#16233A' }}>{p.state}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280' }}>{p.district}</div>
                    </td>

                    {/* CATEGORY */}
                    <td style={{ padding: '12px 12px' }}>
                      <span style={{
                        fontSize: '11px',
                        background: '#E4EEE9',
                        color: '#2F6F62',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        fontWeight: 500
                      }}>
                        {p.category}
                      </span>
                    </td>

                    {/* LAND */}
                    <td style={{ padding: '12px 12px', textAlign: 'right', fontFamily: '"IBM Plex Mono", monospace' }}>
                      <div style={{ fontWeight: 600, color: '#16233A' }}>
                        {p.landRequiredHa} Ha
                      </div>
                      <div style={{ fontSize: '11px', color: '#2F6F62' }}>
                        {p.landAcquiredHa} Ha ({p.landRequiredHa ? Math.round((p.landAcquiredHa / p.landRequiredHa) * 100) : 0}%)
                      </div>
                    </td>

                    {/* STAGE */}
                    <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '10.5px',
                        padding: '3px 8px',
                        border: '1px solid #D8D5CB',
                        background: '#FBFAF6',
                        color: '#16233A',
                        fontWeight: 600
                      }}>
                        {p.stage}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '10.5px',
                        padding: '3px 8px',
                        border: '1px solid',
                        borderColor: isDelayed ? '#A6432B' : p.status === 'Completed' ? '#2F6F62' : '#8A6A1E',
                        background: isDelayed ? '#F6E7E2' : p.status === 'Completed' ? '#E4EEE9' : '#F2ECDC',
                        color: isDelayed ? '#A6432B' : p.status === 'Completed' ? '#2F6F62' : '#8A6A1E',
                        fontWeight: 600
                      }}>
                        {p.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                      <button
                        onClick={() => onNavigate && onNavigate('project-detail', p.id)}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #2F6F62',
                          color: '#2F6F62',
                          padding: '4px 10px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          borderRadius: '2px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                      >
                        Inspect <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#6B7280' }}>
        <span>Official Government Data • Sourced from State Revenue Portals &amp; Central Mission Directorates</span>
        <span>Showing {filteredProjects.length} of {allProjects.length} National Projects</span>
      </div>
    </div>
  );
}
