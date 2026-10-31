import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronRight,
  ArrowUpDown,
  MapPin
} from 'lucide-react';
import { stateProjectsMasterList } from '../../data/stateMockData';
import StatusBadge from '../common/StatusBadge';

export default function StateProjectsView({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [filterStage, setFilterStage] = useState('All');
  const [filterRisk, setFilterRisk] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState('lastUpdated');
  const [sortDir, setSortDir] = useState('desc');

  const districts = [...new Set(stateProjectsMasterList.map(p => p.district))];
  const stages = [...new Set(stateProjectsMasterList.map(p => p.stage))];
  const riskLevels = ['None', 'Low', 'Medium', 'High', 'Critical'];

  const filteredProjects = useMemo(() => {
    let list = stateProjectsMasterList.filter(p => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.authority.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterDistrict !== 'All' && p.district !== filterDistrict) return false;
      if (filterStage !== 'All' && p.stage !== filterStage) return false;
      if (filterRisk !== 'All' && p.riskLevel !== filterRisk) return false;
      if (filterStatus !== 'All' && p.status !== filterStatus) return false;
      return true;
    });

    list.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [searchQuery, filterDistrict, filterStage, filterRisk, filterStatus, sortField, sortDir]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case 'Critical': return 'badge-red';
      case 'High': return 'badge-orange';
      case 'Medium': return 'badge-purple';
      case 'Low': return 'badge-green';
      default: return 'badge-blue';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>STATE LAND ACQUISITION PROJECTS</h1>
          <p>Monitoring all land acquisition projects across the State of Maharashtra</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFF', border: '1px solid rgba(255,255,255,0.4)' }}>
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search project name, authority, ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '12.5px' }}
            />
          </div>
          <select className="form-select" value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)} style={{ fontSize: '12.5px', minWidth: '140px' }}>
            <option value="All">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="form-select" value={filterStage} onChange={e => setFilterStage(e.target.value)} style={{ fontSize: '12.5px', minWidth: '140px' }}>
            <option value="All">All Stages</option>
            {stages.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="form-select" value={filterRisk} onChange={e => setFilterRisk(e.target.value)} style={{ fontSize: '12.5px', minWidth: '120px' }}>
            <option value="All">All Risk Levels</option>
            {riskLevels.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select className="form-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ fontSize: '12.5px', minWidth: '120px' }}>
            <option value="All">All Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Under Review">Under Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '8px' }}>
          Showing {filteredProjects.length} of {stateProjectsMasterList.length} projects
        </div>
      </div>

      {/* Projects Table */}
      <div className="table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('name')}>
                Project <ArrowUpDown size={11} style={{ opacity: 0.5 }} />
              </th>
              <th>Authority</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('district')}>
                District <ArrowUpDown size={11} style={{ opacity: 0.5 }} />
              </th>
              <th>Current Stage</th>
              <th>Progress</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('riskScore')}>
                Risk <ArrowUpDown size={11} style={{ opacity: 0.5 }} />
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('lastUpdated')}>
                Last Updated <ArrowUpDown size={11} style={{ opacity: 0.5 }} />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(proj => (
              <tr key={proj.id}>
                <td>
                  <div style={{ fontWeight: 600, color: '#111827', fontSize: '12.5px' }}>{proj.name}</div>
                  <div className="mono-code" style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>{proj.id}</div>
                </td>
                <td style={{ fontSize: '12px', color: '#4B5563' }}>{proj.authority}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px' }}>
                    <MapPin size={12} style={{ color: '#6B7280' }} />
                    {proj.district}
                  </div>
                </td>
                <td><StatusBadge status={proj.stage} /></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '60px', height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${proj.progress}%`, height: '100%', background: proj.progress >= 75 ? '#1E7E34' : proj.progress >= 40 ? '#D97706' : '#1A73E8', borderRadius: '3px' }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{proj.progress}%</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${getRiskBadgeClass(proj.riskLevel)}`} style={{ fontSize: '10.5px' }}>
                    <span className="badge-dot"></span>
                    {proj.riskLevel}
                  </span>
                </td>
                <td style={{ fontSize: '12px', color: '#6B7280' }}>{proj.lastUpdated}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => onNavigate && onNavigate('project-detail', proj.id)}
                    style={{ fontSize: '11px' }}
                  >
                    View <ChevronRight size={12} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '40px 20px', color: '#6B7280' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>No projects found</div>
                  <div style={{ fontSize: '12px' }}>Try adjusting your filters or search query.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
