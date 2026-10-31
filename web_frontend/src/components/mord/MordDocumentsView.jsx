import React, { useState } from 'react';
import { FolderArchive, Search, Filter, ShieldCheck, Download, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { getAllMordProjects } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';

export default function MordDocumentsView({ onNavigate }) {
  const { projects: contextProjects, setActiveDoc, setIsDocViewerOpen } = useSwadesh();
  const allProjects = getAllMordProjects(contextProjects);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Consolidated documents across national projects
  const allDocuments = [
    { id: 'DOC-NAT-001', name: 'Detailed_Project_Report_PRJ-MH-STATE-2026-001.pdf', project: 'Mumbai Coastal Road (South Extension)', projectId: 'PRJ-MH-STATE-2026-001', type: 'Project Report', version: 2, uploader: 'Shri P. K. Mehta (BMC)', department: 'Brihanmumbai Municipal Corporation', timestamp: '24 Aug 2026 | 04:42:18 PM IST', status: 'Verified', signature: 'Digitally Signed', size: '18.4 MB' },
    { id: 'DOC-NAT-002', name: 'Cadastral_Survey_Map_Haveli_Stretch.pdf', project: 'Pune–Nashik Semi High-Speed Rail Corridor', projectId: 'PRJ-MH-STATE-2026-002', type: 'Survey Map', version: 1, uploader: 'Surveyor P. R. Shinde', department: 'State Revenue Department', timestamp: '18 Aug 2026 | 03:15:00 PM IST', status: 'Verified', signature: 'Digitally Signed', size: '14.2 MB' },
    { id: 'DOC-NAT-003', name: 'SIA_Comprehensive_Appraisal_Report_Samruddhi.pdf', project: 'Nagpur–Mumbai Samruddhi Mahamarg Phase-II', projectId: 'PRJ-MH-STATE-2026-003', type: 'SIA Report', version: 1, uploader: 'Dr. A. K. Sharma', department: 'TISS SIA Cell', timestamp: '02 Sep 2026 | 03:12:18 PM IST', status: 'Verified', signature: 'Digitally Signed', size: '22.8 MB' },
    { id: 'DOC-NAT-004', name: 'Preliminary_Gazette_Sec11_Notification_Pune.pdf', project: 'Pune Ring Road Expressway (East Corridor)', projectId: 'PRJ-MH-STATE-2026-010', type: 'e-Gazette', version: 1, uploader: 'Collectorate Pune', department: 'Revenue & Land Records', timestamp: '10 Jul 2026 | 09:30:12 AM IST', status: 'Published', signature: 'Digitally Signed', size: '4.8 MB' },
    { id: 'DOC-NAT-005', name: 'CRZ_Stage_II_Environmental_Clearance.pdf', project: 'Mumbai Coastal Road (South Extension)', projectId: 'PRJ-MH-STATE-2026-001', type: 'CRZ Clearance', version: 2, uploader: 'Dr. N. K. Patel', department: 'MoEFCC Coastal Cell', timestamp: '05 Sep 2026 | 02:18:30 PM IST', status: 'Pending Review', signature: 'Unsigned Draft', size: '9.1 MB' },
    { id: 'DOC-NAT-006', name: 'PESA_Gram_Sabha_Resolution_Male_Village.pdf', project: 'Mulshi Dam Reservoir & Irrigation Canal Project', projectId: 'PRJ-MH-2026-140', type: 'Gram Sabha Resolution', version: 1, uploader: 'Gram Sevak Male', department: 'Panchayati Raj Dept', timestamp: '22 Aug 2026 | 11:45:00 AM IST', status: 'Logged', signature: 'Manual Seal Attested', size: '3.2 MB' },
    { id: 'DOC-NAT-007', name: 'DPR_Ken_Betwa_Link_National_Project.pdf', project: 'Ken–Betwa River Interlinking National Project', projectId: 'PRJ-NAT-2026-013', type: 'Project Report', version: 3, uploader: 'Shri Bhopal Singh', department: 'National Water Dev Agency', timestamp: '14 May 2026 | 04:10:22 PM IST', status: 'Verified', signature: 'Digitally Signed', size: '34.5 MB' },
    { id: 'DOC-NAT-008', name: 'Statutory_Award_PFMS_Ledger_NH48.pdf', project: 'NH-48 Pune-Satara Highway Corridor Widening', projectId: 'PRJ-MH-2026-102', type: 'PFMS Award', version: 1, uploader: 'SLAO Haveli', department: 'Revenue Department', timestamp: '10 Aug 2026 | 02:15:30 PM IST', status: 'PFMS Verified', signature: 'Digitally Signed', size: '6.5 MB' }
  ];

  const types = ['All', 'Project Report', 'Survey Map', 'SIA Report', 'e-Gazette', 'CRZ Clearance', 'Gram Sabha Resolution', 'PFMS Award'];

  const filteredDocs = allDocuments.filter(d => {
    const matchSearch = !searchTerm || d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.project.toLowerCase().includes(searchTerm.toLowerCase()) || d.projectId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = selectedType === 'All' || d.type === selectedType;
    return matchSearch && matchType;
  });

  const handleViewDoc = (doc) => {
    if (setActiveDoc && setIsDocViewerOpen) {
      setActiveDoc({
        name: doc.name,
        type: doc.type,
        uploadedBy: doc.uploader,
        date: doc.timestamp.split('|')[0].trim(),
        fileSize: doc.size,
        status: doc.status,
        version: doc.version
      });
      setIsDocViewerOpen(true);
    } else {
      alert(`Opening ${doc.name}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Title */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>National Project Documents &amp; Statutory Archives</h1>
          <p>Permanent electronic records with Class-3 digital signatures and immutable audit timestamps across all national projects • Central Document Repository</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card" style={{
        padding: '14px 18px',
        display: 'flex',
        gap: '14px',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: '#64748B' }} />
          <input
            type="text"
            placeholder="Search documents by name, project, or authority..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 34px',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '12.5px',
              color: '#0F172A',
              background: '#FFFFFF'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11.5px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Doc Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '7px 12px',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#0F172A',
              background: '#FFFFFF'
            }}
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Document Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ margin: 0, border: 'none', borderRadius: 0 }}>
          <table className="gov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>DOCUMENT NAME</th>
                <th style={{ padding: '12px 12px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>PROJECT</th>
                <th style={{ padding: '12px 12px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>TYPE</th>
                <th style={{ padding: '12px 10px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>VER</th>
                <th style={{ padding: '12px 12px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>UPLOADED BY</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>TIMESTAMP</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>SIGNATURE</th>
                <th style={{ padding: '12px 12px', textAlign: 'center', fontSize: '11px', color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc, idx) => (
                <tr
                  key={doc.id}
                  style={{
                    borderBottom: '1px solid #E2E8F0',
                    background: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                    transition: 'background 0.1s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F5F9'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'; }}
                >
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0F172A' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileText size={15} style={{ color: '#008E4F', flexShrink: 0 }} />
                      <span>{doc.name}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono, monospace)', marginTop: '2px' }}>
                      {doc.id} · {doc.size}
                    </div>
                  </td>

                  <td style={{ padding: '12px 12px' }}>
                    <div
                      onClick={() => onNavigate && onNavigate('project-detail', doc.projectId)}
                      style={{ color: '#008E4F', fontWeight: 600, cursor: 'pointer', fontSize: '12.5px' }}
                    >
                      {doc.project}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', fontFamily: 'var(--font-mono, monospace)' }}>
                      {doc.projectId}
                    </div>
                  </td>

                  <td style={{ padding: '12px 12px', color: '#475569' }}>
                    {doc.type}
                  </td>

                  <td style={{ padding: '12px 10px', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600 }}>
                    v{doc.version}
                  </td>

                  <td style={{ padding: '12px 12px', color: '#0F172A' }}>
                    <div style={{ fontWeight: 500 }}>{doc.uploader}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{doc.department}</div>
                  </td>

                  <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono, monospace)', fontSize: '11.5px', color: '#475569' }}>
                    {doc.timestamp}
                  </td>

                  <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '10.5px',
                      fontFamily: 'var(--font-mono, monospace)',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      background: doc.signature === 'Digitally Signed' ? '#E6F4EA' : '#FEF3C7',
                      color: doc.signature === 'Digitally Signed' ? '#15803D' : '#B45309',
                      border: '1px solid',
                      borderColor: doc.signature === 'Digitally Signed' ? '#86EFAC' : '#FCD34D',
                      fontWeight: 700
                    }}>
                      {doc.signature}
                    </span>
                  </td>

                  <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleViewDoc(doc)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '11.5px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={13} /> Inspect
                    </button>
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
