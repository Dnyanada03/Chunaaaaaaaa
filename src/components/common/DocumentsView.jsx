import React, { useState } from 'react';
import {
  FolderArchive,
  FileText,
  Search,
  Filter,
  Eye,
  Download,
  Printer,
  Upload,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  X,
  FileCheck,
  FileBadge
} from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';

export default function DocumentsView() {
  const { projects, parcels, setIsDocViewerOpen, setActiveDoc } = useSwadesh();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillageFilter, setSelectedVillageFilter] = useState('All');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState('All');
  
  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDocData, setNewDocData] = useState({
    title: '',
    category: '7/12 Satbara Extract',
    project: 'Pune Ring Road Expressway (East Corridor)',
    village: 'Wagholi',
    surveyNo: '',
    landowner: '',
    remarks: ''
  });

  // Mock Master Document Repository
  const [documentsList, setDocumentsList] = useState([
    {
      id: "DOC-MH-2026-001",
      title: "7/12 Satbara Land Record Extract (Mutation #4819)",
      category: "7/12 Satbara Extract",
      project: "Pune Ring Road Expressway (East Corridor)",
      village: "Wagholi",
      parcelId: "MH-PL-10234",
      surveyNumber: "142/1A",
      landowner: "Rameshwar Dhondu Patil",
      area: "1.25 Hectares",
      dateIssued: "2026-08-12",
      status: "Disputed",
      statusBadge: "badge-red",
      verifiedBy: "Talathi Wagholi",
      remarks: "Civil suit CS-2024-110 pending in Haveli court"
    },
    {
      id: "DOC-MH-2026-002",
      title: "7/12 Satbara Land Record Extract (Clear Title)",
      category: "7/12 Satbara Extract",
      project: "Pune Ring Road Expressway (East Corridor)",
      village: "Wagholi",
      parcelId: "MH-PL-10235",
      surveyNumber: "142/1B",
      landowner: "Ganesh Ramchandra Jadhav",
      area: "2.10 Hectares",
      dateIssued: "2026-08-14",
      status: "Digitally Signed",
      statusBadge: "badge-green",
      verifiedBy: "Tahsildar Haveli",
      remarks: "Title verified clean. PFMS payment complete."
    },
    {
      id: "DOC-MH-2026-003",
      title: "Section 3E Statutory Notice (Land Acquisition)",
      category: "Form 3E Notice",
      project: "Pune Ring Road Expressway (East Corridor)",
      village: "Avalwadi",
      parcelId: "MH-PL-10240",
      surveyNumber: "88/2B",
      landowner: "Sunita Anant Deshmukh",
      area: "0.95 Hectares",
      dateIssued: "2026-08-20",
      status: "Pending Signature",
      statusBadge: "badge-orange",
      verifiedBy: "Senior Surveyor",
      remarks: "Sub-Registrar valuation protest filed"
    },
    {
      id: "DOC-MH-2026-004",
      title: "Sub-Registrar Circle Rate Valuation Award Certificate",
      category: "Valuation & Award",
      project: "NH-48 Highway Corridor Widening",
      village: "Khed Shivapur",
      parcelId: "MH-PL-20988",
      surveyNumber: "210/4",
      landowner: "Vijay Baban Shinde",
      area: "0.78 Hectares",
      dateIssued: "2026-08-25",
      status: "Digitally Signed",
      statusBadge: "badge-green",
      verifiedBy: "Sub-Registrar Haveli",
      remarks: "Aadhaar name mismatch rectified via Gazetted affidavit"
    },
    {
      id: "DOC-MH-2026-005",
      title: "Non-Agricultural (NA) Land Conversion Sanction Order",
      category: "NA Conversion Order",
      project: "Pune Ring Road Expressway (East Corridor)",
      village: "Avalwadi",
      parcelId: "MH-PL-10240",
      surveyNumber: "88/2B",
      landowner: "Sunita Anant Deshmukh",
      area: "0.70 Hectares",
      dateIssued: "2023-11-15",
      status: "Verified Copy",
      statusBadge: "badge-green",
      verifiedBy: "Collectorate Land Branch",
      remarks: "Sanction Order #NA-CONV-2023-889 approved by Collector"
    },
    {
      id: "DOC-MH-2026-006",
      title: "Cadastral Survey & Boundary Polygon Measurement Sheet",
      category: "Surveyor Map",
      project: "Mulshi Dam Reservoir & Irrigation Canal",
      village: "Male",
      parcelId: "MH-PL-30112",
      surveyNumber: "55/1",
      landowner: "Anand Mahadeo Joshi",
      area: "1.80 Hectares",
      dateIssued: "2026-07-30",
      status: "Digitally Signed",
      statusBadge: "badge-green",
      verifiedBy: "Deputy Director Land Records (DDLR)",
      remarks: "DGPS Boundary Survey Verified"
    },
    {
      id: "DOC-MH-2026-007",
      title: "Maharashtra State Gazette Official Notification (Sec 3A)",
      category: "Gazette Notification",
      project: "MIDC Chakan Phase-V Industrial Corridor",
      village: "Nighoje",
      parcelId: "MH-PL-40501",
      surveyNumber: "312/A",
      landowner: "Balasaheb Kadam & Others",
      area: "4.50 Hectares",
      dateIssued: "2025-12-10",
      status: "Published",
      statusBadge: "badge-green",
      verifiedBy: "Govt Printing Press Mumbai",
      remarks: "Gazette Notification #MH-REV-2025-9921"
    }
  ]);

  const docCategories = [
    "All",
    "7/12 Satbara Extract",
    "Form 3E Notice",
    "Valuation & Award",
    "NA Conversion Order",
    "Surveyor Map",
    "Gazette Notification"
  ];

  // Filtering Logic
  const filteredDocuments = documentsList.filter(doc => {
    const matchesCategory = activeCategory === 'All' || doc.category === activeCategory;
    const matchesVillage = selectedVillageFilter === 'All' || doc.village === selectedVillageFilter;
    const matchesProject = selectedProjectFilter === 'All' || doc.project === selectedProjectFilter;
    const matchesQuery = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.landowner.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesVillage && matchesProject && matchesQuery;
  });

  const handleOpenDocPreview = (doc) => {
    setActiveDoc(doc);
    setIsDocViewerOpen(true);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newDoc = {
      id: `DOC-MH-2026-00${documentsList.length + 1}`,
      title: newDocData.title || `${newDocData.category} - Survey #${newDocData.surveyNo}`,
      category: newDocData.category,
      project: newDocData.project,
      village: newDocData.village,
      parcelId: `MH-PL-${Math.floor(10000 + Math.random() * 90000)}`,
      surveyNumber: newDocData.surveyNo || '101/A',
      landowner: newDocData.landowner || 'Verified Landowner',
      area: '1.10 Hectares',
      dateIssued: new Date().toISOString().split('T')[0],
      status: 'Digitally Signed',
      statusBadge: 'badge-green',
      verifiedBy: 'Logged-in Officer',
      remarks: newDocData.remarks || 'Registered via SWADESH Document Vault'
    };

    setDocumentsList([newDoc, ...documentsList]);
    setIsUploadModalOpen(false);
    setNewDocData({
      title: '',
      category: '7/12 Satbara Extract',
      project: 'Pune Ring Road Expressway (East Corridor)',
      village: 'Wagholi',
      surveyNo: '',
      landowner: '',
      remarks: ''
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DIGITAL LAND ACQUISITION DOCUMENT VAULT & REPOSITORY</h1>
          <p>Official Government Repository for 7/12 Extracts, Section 3E Statutory Notices, Valuation Awards & Gazette Records</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsUploadModalOpen(true)}
          style={{ background: '#0B4726', gap: '8px', boxShadow: '0 4px 12px rgba(11,71,38,0.25)' }}
        >
          <Plus size={16} /> Register & Upload Land Document
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        <div className="card" style={{ padding: '16px', background: '#F8FAFC', borderLeft: '4px solid #0B4726' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>TOTAL REGISTERED DOCS</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{documentsList.length} Files</div>
          <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FileBadge size={12} /> 100% Encrypted & Authenticated
          </div>
        </div>

        <div className="card" style={{ padding: '16px', background: '#F8FAFC', borderLeft: '4px solid #10B981' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>DIGITALLY CERTIFIED (DSC)</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
            {documentsList.filter(d => d.status.includes('Signed') || d.status.includes('Verified') || d.status.includes('Published')).length}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Class-3 Officer Signature Hash</div>
        </div>

        <div className="card" style={{ padding: '16px', background: '#F8FAFC', borderLeft: '4px solid #F59E0B' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>AWAITING VERIFICATION</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>
            {documentsList.filter(d => d.status.includes('Pending')).length}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Talathi & Surveyor Sign-off</div>
        </div>

        <div className="card" style={{ padding: '16px', background: '#F8FAFC', borderLeft: '4px solid #EF4444' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>FLAGGED & DISPUTED DOCS</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444', marginTop: '4px' }}>
            {documentsList.filter(d => d.status.includes('Disputed')).length}
          </div>
          <div style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>Under Court / Bench Inquiry</div>
        </div>
      </div>

      {/* FILTER & CATEGORY NAVIGATION BAR */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Top Search & Dropdown Filters */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search document title, Parcel ID (MH-PL-...), Survey #, or Landowner name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            </div>

            <select
              className="form-select"
              value={selectedVillageFilter}
              onChange={e => setSelectedVillageFilter(e.target.value)}
            >
              <option value="All">All Villages Scope ▼</option>
              <option value="Wagholi">Wagholi</option>
              <option value="Avalwadi">Avalwadi</option>
              <option value="Khed Shivapur">Khed Shivapur</option>
              <option value="Male">Male</option>
              <option value="Nighoje">Nighoje</option>
            </select>

            <select
              className="form-select"
              value={selectedProjectFilter}
              onChange={e => setSelectedProjectFilter(e.target.value)}
            >
              <option value="All">All Acquisition Projects ▼</option>
              {projects.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Category Tabs Pill Bar */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
            {docCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  background: activeCategory === cat ? '#0B4726' : '#F1F5F9',
                  color: activeCategory === cat ? '#FFF' : '#475569',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DOCUMENT LIST GRID / CARDS */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FolderArchive size={18} style={{ color: '#0B4726' }} />
            DOCUMENT REPOSITORY ARCHIVE ({filteredDocuments.length} DOCUMENTS FOUND)
          </div>
        </div>

        {filteredDocuments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
            <FileText size={40} style={{ margin: '0 auto 10px auto', opacity: 0.4 }} />
            <div>No matching documents found in repository for current filter parameters.</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {filteredDocuments.map(doc => (
              <div
                key={doc.id}
                style={{
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '12px',
                  padding: '16px',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  gap: '12px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Top Bar: Category Pill & Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      color: '#0B4726',
                      background: '#E6F4EA',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {doc.category}
                    </span>

                    <span className={`badge ${doc.statusBadge}`} style={{ fontSize: '10px' }}>
                      {doc.status}
                    </span>
                  </div>

                  {/* Document Title */}
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0 0', lineHeight: 1.3 }}>
                    {doc.title}
                  </h4>

                  {/* Parcel Details Metadata */}
                  <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', fontSize: '11.5px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div><strong>Parcel ID:</strong> <span className="mono-code">{doc.parcelId}</span> | <strong>Survey #:</strong> {doc.surveyNumber}</div>
                    <div><strong>Landowner:</strong> {doc.landowner}</div>
                    <div><strong>Village:</strong> {doc.village} • <strong>Project:</strong> {doc.project}</div>
                  </div>

                  {doc.remarks && (
                    <div style={{ fontSize: '11px', color: '#64748B', borderLeft: '2px solid #0B4726', paddingLeft: '8px' }}>
                      {doc.remarks}
                    </div>
                  )}
                </div>

                {/* Footer Metadata & Actions */}
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '10.5px', color: '#64748B' }}>
                    Issued: {doc.dateIssued}<br />
                    Auth: <strong>{doc.verifiedBy}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleOpenDocPreview(doc)}
                      title="Preview Document Extract"
                      style={{ padding: '6px 10px' }}
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleOpenDocPreview(doc)}
                      title="Print Document"
                      style={{ padding: '6px 8px' }}
                    >
                      <Printer size={14} />
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => alert(`Downloading official PDF copy for ${doc.title}`)}
                      title="Download PDF File"
                      style={{ background: '#0B4726', padding: '6px 10px' }}
                    >
                      <Download size={14} /> PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* REGISTER / UPLOAD NEW DOCUMENT MODAL */}
      {isUploadModalOpen && (
        <div className="modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div
            className="modal-container"
            style={{ maxWidth: '600px' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header" style={{ background: '#06371E' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Upload size={18} />
                <h3 className="modal-title">REGISTER NEW LAND ACQUISITION DOCUMENT</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsUploadModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit}>
              <div className="modal-body" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">DOCUMENT TITLE / SPECIFICATION</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 7/12 Extract Satbara Notice or NA Sanction Order"
                    value={newDocData.title}
                    onChange={e => setNewDocData({ ...newDocData, title: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">DOCUMENT CATEGORY</label>
                    <select
                      className="form-select"
                      value={newDocData.category}
                      onChange={e => setNewDocData({ ...newDocData, category: e.target.value })}
                    >
                      <option value="7/12 Satbara Extract">7/12 Satbara Extract</option>
                      <option value="Form 3E Notice">Form 3E Notice</option>
                      <option value="Valuation & Award">Valuation & Award</option>
                      <option value="NA Conversion Order">NA Conversion Order</option>
                      <option value="Surveyor Map">Surveyor Map</option>
                      <option value="Gazette Notification">Gazette Notification</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">ACQUISITION PROJECT</label>
                    <select
                      className="form-select"
                      value={newDocData.project}
                      onChange={e => setNewDocData({ ...newDocData, project: e.target.value })}
                    >
                      {projects.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">VILLAGE</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newDocData.village}
                      onChange={e => setNewDocData({ ...newDocData, village: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">SURVEY / GUT NO.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 142/1A"
                      value={newDocData.surveyNo}
                      onChange={e => setNewDocData({ ...newDocData, surveyNo: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">LANDOWNER</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={newDocData.landowner}
                      onChange={e => setNewDocData({ ...newDocData, landowner: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">SURVEYOR & OFFICER REMARKS</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="Enter document verification notes or court decree remarks..."
                    value={newDocData.remarks}
                    onChange={e => setNewDocData({ ...newDocData, remarks: e.target.value })}
                  />
                </div>

                {/* File Upload Zone */}
                <div style={{
                  border: '2px dashed #CBD5E1',
                  borderRadius: '10px',
                  padding: '20px',
                  textAlign: 'center',
                  background: '#F8FAFC',
                  cursor: 'pointer'
                }}>
                  <Upload size={28} style={{ color: '#0B4726', margin: '0 auto 6px auto' }} />
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>
                    Click or drag PDF / Image scan to upload
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                    Accepted Formats: PDF, JPG, PNG (Max 15MB) • Auto-encrypted with SHA256
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsUploadModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: '#0B4726' }}>
                  <ShieldCheck size={16} /> Register & Sign Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
