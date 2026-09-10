import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Building2,
  Calendar,
  Eye
} from 'lucide-react';
import {
  collectorAuditLogs,
  collectorTalukasProgress,
  collectorProjectsMasterList
} from '../../data/collectorMockData';

export default function CollectorAuditView() {
  const [filterTaluka, setFilterTaluka] = useState('All');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchOfficer, setSearchOfficer] = useState('');

  const filteredLogs = collectorAuditLogs.filter(log => {
    if (filterRole !== 'All' && log.role !== filterRole) return false;
    if (filterStatus !== 'All' && log.status !== filterStatus) return false;
    if (searchOfficer) {
      const q = searchOfficer.toLowerCase();
      return (
        log.officerName.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.project.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DISTRICT REVENUE PERSONNEL AUDIT & ACCOUNTABILITY REGISTER</h1>
          <p>Oversight & Activity Log Monitoring of Tahsildars, SDOs, Surveyors & Talathis across Pune District</p>
        </div>
      </div>

      {/* AUDIT FILTERS BAR */}
      <div className="card" style={{ padding: '14px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '12px', alignItems: 'center' }}>
          {/* Search Officer */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Officer Name, Action, or Project..."
              value={searchOfficer}
              onChange={e => setSearchOfficer(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          </div>

          {/* Filter Taluka */}
          <div>
            <select className="form-select" value={filterTaluka} onChange={e => setFilterTaluka(e.target.value)}>
              <option value="All">All Talukas ▼</option>
              {collectorTalukasProgress.map(t => (
                <option key={t.id} value={t.taluka}>Taluka {t.taluka}</option>
              ))}
            </select>
          </div>

          {/* Filter Officer Role */}
          <div>
            <select className="form-select" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
              <option value="All">All Officer Roles ▼</option>
              <option value="Tahsildar">Tahsildar</option>
              <option value="Sub-Divisional Officer (SDO)">SDO</option>
              <option value="Senior Surveyor">Senior Surveyor</option>
              <option value="Talathi">Talathi</option>
            </select>
          </div>

          {/* Filter SLA Status */}
          <div>
            <select className="form-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="All">All SLA Status ▼</option>
              <option value="On Time">On Time</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
        </div>
      </div>

      {/* AUDIT LOG TABLE */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ShieldAlert size={18} style={{ color: '#0B4726' }} />
            SYSTEM AUDIT TRAIL LOGS ({filteredLogs.length} RECORDS)
          </div>
        </div>

        <div className="table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Audit ID</th>
                <th>Officer Name</th>
                <th>Designation / Role</th>
                <th>Jurisdiction Unit</th>
                <th>Associated Project</th>
                <th>Action Performed</th>
                <th>Date & Time</th>
                <th style={{ textAlign: 'center' }}>SLA Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td className="mono-code" style={{ fontWeight: 700, color: '#0B4726' }}>{log.id}</td>
                  <td style={{ fontWeight: 700, color: '#0F172A' }}>{log.officerName}</td>
                  <td><span style={{ fontWeight: 600 }}>{log.role}</span></td>
                  <td>{log.jurisdiction}</td>
                  <td style={{ fontWeight: 600 }}>{log.project}</td>
                  <td style={{ color: '#334155' }}>{log.action}</td>
                  <td style={{ fontSize: '11.5px', color: '#64748B' }}>{log.date}</td>
                  <td style={{ textAlign: 'center' }}>
                    {log.status === 'On Time' ? (
                      <span className="badge badge-green">🟢 On Time</span>
                    ) : (
                      <span className="badge badge-red">🔴 Delayed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
