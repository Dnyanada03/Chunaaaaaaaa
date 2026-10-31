import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  PlusCircle,
  ChevronRight,
  MapPin,
  Building2,
  Calendar,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';

export default function ProposingBodyProjectsView({ onNavigate }) {
  const { proposingProjects } = useSwadesh();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortField, setSortField] = useState('lastUpdated');
  const [sortDir, setSortDir] = useState('desc');

  const districts = [...new Set(proposingProjects.map(p => p.district).filter(Boolean))];
  const categories = [...new Set(proposingProjects.map(p => p.projectCategory).filter(Boolean))];

  const statusOptions = [
    'All',
    'Created',
    'Under Approval',
    'Acquisition Ongoing',
    'Completed',
    'Draft'
  ];

  const filteredProjects = useMemo(() => {
    let list = proposingProjects.filter(p => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name?.toLowerCase().includes(q);
        const matchId = p.id?.toLowerCase().includes(q);
        const matchAuth = p.authority?.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchAuth) return false;
      }
      if (filterDistrict !== 'All' && p.district !== filterDistrict) return false;
      if (filterStatus !== 'All' && p.status !== filterStatus) return false;
      if (filterCategory !== 'All' && p.projectCategory !== filterCategory) return false;
      return true;
    });

    list.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [proposingProjects, searchQuery, filterDistrict, filterStatus, filterCategory, sortField, sortDir]);

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

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'badge-green';
      case 'Acquisition Ongoing': return 'badge-blue';
      case 'Under Approval': return 'badge-orange';
      case 'Created': return 'badge-purple';
      case 'Draft': return 'badge-neutral';
      default: return 'badge-blue';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>PROJECT PORTFOLIO DIRECTORY</h1>
          <p>
            Complete Registry of Infrastructure Projects Initiated by Your Authority
          </p>
        </div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onNavigate('add-project')}
          style={{
            background: '#FFFFFF',
            color: '#005A36',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <PlusCircle size={15} /> CREATE NEW PROJECT
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search project name, ID, authority..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '12.5px' }}
            />
          </div>

          {/* District Filter */}
          <select
            className="form-select"
            value={filterDistrict}
            onChange={e => setFilterDistrict(e.target.value)}
            style={{ fontSize: '12.5px', minWidth: '140px' }}
          >
            <option value="All">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          {/* Status Filter */}
          <select
            className="form-select"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{ fontSize: '12.5px', minWidth: '150px' }}
          >
            <option value="All">All Statuses</option>
            {statusOptions.filter(s => s !== 'All').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            className="form-select"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            style={{ fontSize: '12.5px', minWidth: '160px' }}
          >
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '8px' }}>
          Showing {filteredProjects.length} of {proposingProjects.length} projects
        </div>
      </div>

      {/* Enterprise Projects Table */}
      <div className="table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('name')}>
                Project Details <ArrowUpDown size={11} style={{ opacity: 0.5 }} />
              </th>
              <th>Category</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('district')}>
                District <ArrowUpDown size={11} style={{ opacity: 0.5 }} />
              </th>
              <th>Stage</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Land (Ha)</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSort('riskScore')}>
                Risk <ArrowUpDown size={11} style={{ opacity: 0.5 }} />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map(proj => (
              <tr key={proj.id}>
                <td>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>
                    {proj.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                    <span className="mono-code">{proj.id}</span> • {proj.authority}
                  </div>
                </td>
                <td style={{ fontSize: '11.5px', color: '#475569' }}>
                  {proj.projectCategory || proj.type}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                    <MapPin size={12} style={{ color: '#64748B' }} />
                    {proj.district}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#0F172A' }}>
                    {proj.stage}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(proj.status)}`} style={{ fontSize: '10.5px' }}>
                    {proj.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '50px', height: '5px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${proj.progress}%`,
                        height: '100%',
                        background: proj.progress >= 70 ? '#008E4F' : proj.progress >= 30 ? '#D97706' : '#1A73E8',
                        borderRadius: '3px'
                      }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700 }}>{proj.progress}%</span>
                  </div>
                </td>
                <td style={{ fontWeight: 600, fontSize: '12px' }}>
                  {proj.landRequiredHa} Ha
                </td>
                <td>
                  <span className={`badge ${getRiskBadgeClass(proj.riskLevel)}`} style={{ fontSize: '10.5px' }}>
                    {proj.riskLevel || 'Low'}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => onNavigate('project-detail', proj.id)}
                    style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    Portfolio <ChevronRight size={12} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredProjects.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '40px 20px', color: '#64748B' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>No projects found</div>
                  <div style={{ fontSize: '12px' }}>Try adjusting your search query or filters.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
