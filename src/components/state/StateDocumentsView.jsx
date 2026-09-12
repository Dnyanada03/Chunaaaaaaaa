import React, { useState, useMemo } from 'react';
import { Search, FileText, Download, Eye, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import { stateDocuments } from '../../data/stateMockData';
import StatusBadge from '../common/StatusBadge';

export default function StateDocumentsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterVerification, setFilterVerification] = useState('All');
  const [selectedDocId, setSelectedDocId] = useState(null);

  const docTypes = [...new Set(stateDocuments.map(d => d.type))];
  const departments = [...new Set(stateDocuments.map(d => d.department))];

  const filteredDocs = useMemo(() => {
    return stateDocuments.filter(d => {
      if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase()) && !d.project.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterType !== 'All' && d.type !== filterType) return false;
      if (filterDepartment !== 'All' && d.department !== filterDepartment) return false;
      if (filterVerification !== 'All' && d.verificationStatus !== filterVerification) return false;
      return true;
    });
  }, [searchQuery, filterType, filterDepartment, filterVerification]);

  const selectedDoc = selectedDocId ? stateDocuments.find(d => d.id === selectedDocId) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DOCUMENT REPOSITORY</h1>
          <p>State-wide project documents, SIA reports, survey maps, and official records</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card" style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
            <input type="text" className="form-control" placeholder="Search documents..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ paddingLeft: '32px', fontSize: '12.5px' }} />
          </div>
          <select className="form-select" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ fontSize: '12.5px' }}>
            <option value="All">All Types</option>
            {docTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="form-select" value={filterDepartment} onChange={e => setFilterDepartment(e.target.value)} style={{ fontSize: '12.5px' }}>
            <option value="All">All Departments</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="form-select" value={filterVerification} onChange={e => setFilterVerification(e.target.value)} style={{ fontSize: '12.5px' }}>
            <option value="All">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '8px' }}>
          Showing {filteredDocs.length} of {stateDocuments.length} documents
        </div>
      </div>

      {/* Documents Table */}
      <div className="table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Project</th>
              <th>Department</th>
              <th>Version</th>
              <th>Uploaded By</th>
              <th>Uploaded At</th>
              <th>Verification</th>
              <th>Signature</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map(doc => (
              <tr key={doc.id}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: '12px', color: '#111827' }}>{doc.name}</div>
                  <div style={{ fontSize: '10px', color: '#9CA3AF' }}>{doc.type}</div>
                </td>
                <td style={{ fontSize: '12px', color: '#4B5563' }}>{doc.project}</td>
                <td style={{ fontSize: '12px' }}>{doc.department}</td>
                <td><span className="mono-code" style={{ fontSize: '12px' }}>v{doc.version}</span></td>
                <td style={{ fontSize: '12px' }}>{doc.uploadedBy}</td>
                <td style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: '#6B7280' }}>{doc.uploadTimestamp}</td>
                <td><StatusBadge status={doc.verificationStatus} /></td>
                <td>
                  {doc.signatureStatus === 'Digitally Signed' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', color: '#1E7E34', background: '#E6F4EA', padding: '2px 7px', borderRadius: '6px' }}>
                      <ShieldCheck size={10} /> Signed
                    </span>
                  ) : (
                    <span style={{ fontSize: '10.5px', color: '#9CA3AF' }}>{doc.signatureStatus}</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-sm btn-secondary" onClick={() => setSelectedDocId(doc.id)} style={{ fontSize: '10.5px' }}>
                    <Eye size={12} /> View
                  </button>
                </td>
              </tr>
            ))}
            {filteredDocs.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>No documents found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Document Detail Panel */}
      {selectedDoc && (
        <div className="card" style={{ borderLeft: '4px solid #0B4726' }}>
          <div className="card-header">
            <span className="card-title"><FileText size={15} /> Document Details</span>
            <button className="btn btn-sm btn-secondary" onClick={() => setSelectedDocId(null)} style={{ fontSize: '11px' }}>Close</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            <InfoRow label="Document Name" value={selectedDoc.name} />
            <InfoRow label="Project" value={selectedDoc.project} />
            <InfoRow label="Type" value={selectedDoc.type} />
            <InfoRow label="Department" value={selectedDoc.department} />
            <InfoRow label="Version" value={`Version ${selectedDoc.version}`} />
            <InfoRow label="Uploaded By" value={selectedDoc.uploadedBy} />
            <InfoRow label="Upload Date" value={selectedDoc.uploadDate} />
            <InfoRow label="Exact Timestamp" value={selectedDoc.uploadTimestamp} />
            <InfoRow label="Verification" value={selectedDoc.verificationStatus} />
            <InfoRow label="Digital Signature" value={selectedDoc.signatureStatus} />
          </div>

          {/* Version History */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#4B5563', marginBottom: '8px' }}>
              Version History
            </div>
            {Array.from({ length: selectedDoc.version }, (_, i) => selectedDoc.version - i).map(v => (
              <div key={v} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 12px', background: v === selectedDoc.version ? '#E6F4EA' : '#FAFAF9',
                border: '1px solid #E2E8F0', borderRadius: '8px', marginBottom: '4px'
              }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>Version {v}</span>
                  {v === selectedDoc.version && <span style={{ fontSize: '10px', color: '#1E7E34', marginLeft: '8px', fontWeight: 600 }}>Current</span>}
                </div>
                <span style={{ fontSize: '10.5px', color: '#6B7280' }}>
                  {v === selectedDoc.version ? selectedDoc.uploadTimestamp : `Earlier version`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ padding: '8px 14px', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: '8px' }}>
      <span style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', minWidth: '130px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{value}</span>
    </div>
  );
}
