import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  FileText, Upload, Download, Eye, Search, Filter, Clock,
  ShieldCheck, AlertTriangle, Plus, ChevronRight, X, FileCheck,
  Building2, Sparkles, History
} from 'lucide-react';

export default function ProposingBodyDocumentsView() {
  const {
    proposingDocuments,
    proposingProjects,
    handleUploadProposingDocument,
    setActiveDoc,
    setIsDocViewerOpen,
    proposingOfficer,
    getExactTimestamp
  } = useSwadesh();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProjectId, setSelectedProjectId] = useState('All');

  // Modals State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [targetDocForVersion, setTargetDocForVersion] = useState(null);

  // New Document Form
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Requisition');
  const [newDocProject, setNewDocProject] = useState(proposingProjects[0]?.id || 'PRJ-MH-2026-101');
  const [newDocFile, setNewDocFile] = useState(null);
  const [newDocRemarks, setNewDocRemarks] = useState('');
  const [signWithDsc, setSignWithDsc] = useState(true);

  // Version Upload Form
  const [versionNumber, setVersionNumber] = useState('V2.0');
  const [versionRemarks, setVersionRemarks] = useState('');
  const [versionFile, setVersionFile] = useState(null);
  const [versionSignWithDsc, setVersionSignWithDsc] = useState(true);

  // Categories list
  const categories = ['All', 'Requisition', 'DPR', 'Alignment & GIS', 'Administrative Approval', 'Board Sanction', 'R&R Plan'];

  const filteredDocs = proposingDocuments.filter(doc => {
    if (selectedCategory !== 'All' && doc.category !== selectedCategory) return false;
    if (selectedProjectId !== 'All' && doc.projectId !== selectedProjectId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return doc.title.toLowerCase().includes(q) ||
             (doc.projectId && doc.projectId.toLowerCase().includes(q)) ||
             (doc.category && doc.category.toLowerCase().includes(q));
    }
    return true;
  });

  const handleOpenVersionModal = (doc) => {
    setTargetDocForVersion(doc);
    // Auto calculate next major or minor version
    const currentVer = doc.version || 'V1.0';
    const match = currentVer.match(/V(\d+)\.(\d+)/);
    if (match) {
      const major = parseInt(match[1]);
      const minor = parseInt(match[2]) + 1;
      setVersionNumber(`V${major}.${minor}`);
    } else {
      setVersionNumber('V2.0');
    }
    setVersionRemarks('');
    setIsVersionModalOpen(true);
  };

  const submitNewDocument = (e) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    const docObj = {
      title: newDocTitle,
      category: newDocCategory,
      projectId: newDocProject,
      version: 'V1.0',
      size: newDocFile ? `${(newDocFile.size / (1024 * 1024)).toFixed(1)} MB` : '4.2 MB',
      fileType: 'PDF',
      remarks: newDocRemarks || 'Initial document upload',
      digitalSignature: signWithDsc ? {
        isSigned: true,
        signatory: proposingOfficer.name,
        timestamp: getExactTimestamp(),
        certId: proposingOfficer.digitalSignature?.certificateId
      } : { isSigned: false }
    };

    handleUploadProposingDocument(docObj);
    setIsUploadModalOpen(false);
    setNewDocTitle('');
    setNewDocRemarks('');
    setNewDocFile(null);
  };

  const submitNewVersion = (e) => {
    e.preventDefault();
    if (!targetDocForVersion) return;

    const updatedDoc = {
      ...targetDocForVersion,
      version: versionNumber,
      size: versionFile ? `${(versionFile.size / (1024 * 1024)).toFixed(1)} MB` : '5.1 MB',
      uploadDate: getExactTimestamp(),
      remarks: versionRemarks || `Updated to ${versionNumber}`,
      digitalSignature: versionSignWithDsc ? {
        isSigned: true,
        signatory: proposingOfficer.name,
        timestamp: getExactTimestamp(),
        certId: proposingOfficer.digitalSignature?.certificateId
      } : { isSigned: false }
    };

    handleUploadProposingDocument(updatedDoc);
    setIsVersionModalOpen(false);
    setTargetDocForVersion(null);
    setVersionRemarks('');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Top Header & Breadcrumbs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
            <span>Project Authority</span>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 700, color: '#0F172A' }}>Document Management & Version Control</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Statutory Document Repository & Version History
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Central repository for requisitions, DPRs, alignment surveys, and approvals with immutable version tracking and Class-3 DSC signatures
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setIsUploadModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #008E4F 0%, #007F7E 100%)',
            border: 'none',
            padding: '10px 18px',
            fontSize: '13.5px',
            fontWeight: 700
          }}
        >
          <Upload size={16} />
          Upload New Document
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        padding: '16px',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '300px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              type="text"
              placeholder="Search by document title, project ID, or reference..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '36px', fontSize: '13px' }}
            />
          </div>

          {/* Project Filter */}
          <select
            className="form-select"
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            style={{ width: '240px', fontSize: '13px' }}
          >
            <option value="All">All Projects</option>
            {proposingProjects.map(p => (
              <option key={p.id} value={p.id}>{p.id} — {p.name.substring(0, 24)}...</option>
            ))}
          </select>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: selectedCategory === cat ? '1px solid #008E4F' : '1px solid #E2E8F0',
                background: selectedCategory === cat ? '#E6F4EA' : '#FFFFFF',
                color: selectedCategory === cat ? '#008E4F' : '#64748B',
                fontSize: '12px',
                fontWeight: selectedCategory === cat ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List / Table */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Document Title & Category</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Project Association</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Version</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Uploaded At / Author</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Class-3 DSC Seal</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length > 0 ? (
                filteredDocs.map(doc => (
                  <tr key={doc.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '8px',
                          background: '#E6F4EA', color: '#008E4F',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <FileText size={18} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13.5px' }}>
                            {doc.title}
                          </div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                            <span style={{
                              fontSize: '11px',
                              background: '#F1F5F9',
                              color: '#475569',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: 600
                            }}>
                              {doc.category}
                            </span>
                            <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>{doc.size || '3.5 MB'} • {doc.fileType || 'PDF'}</span>
                          </div>
                          {doc.remarks && (
                            <div style={{ fontSize: '11.5px', color: '#64748B', fontStyle: 'italic', marginTop: '3px' }}>
                              "{doc.remarks}"
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>
                        {doc.projectId || 'General'}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                        {proposingProjects.find(p => p.id === doc.projectId)?.name?.substring(0, 24) || 'Corridor Requisition'}
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        fontWeight: 800,
                        background: '#EEF2FF',
                        color: '#4338CA',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid #C7D2FE'
                      }}>
                        {doc.version || 'V1.0'}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: '12px', color: '#0F172A', fontWeight: 600 }}>
                        {doc.uploadDate}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        {doc.uploadedBy || proposingOfficer.name}
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      {doc.digitalSignature?.isSigned ? (
                        <div>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#15803D',
                            background: '#DCFCE7',
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}>
                            <ShieldCheck size={13} />
                            Class-3 Signed
                          </span>
                          <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '3px', fontFamily: 'monospace' }}>
                            {doc.digitalSignature.timestamp}
                          </div>
                        </div>
                      ) : (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#B45309',
                          background: '#FEF3C7',
                          padding: '3px 8px',
                          borderRadius: '4px'
                        }}>
                          Pending Sign-off
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setActiveDoc({
                              title: doc.title,
                              date: doc.uploadDate,
                              type: doc.fileType || 'PDF',
                              category: doc.category,
                              authority: 'Maharail',
                              url: '#'
                            });
                            setIsDocViewerOpen(true);
                          }}
                          style={{ padding: '5px 10px', fontSize: '12px' }}
                          title="Preview Document"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          className="btn btn-secondary"
                          onClick={() => handleOpenVersionModal(doc)}
                          style={{
                            padding: '5px 10px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#008E4F',
                            borderColor: '#008E4F'
                          }}
                          title="Upload Newer Version without overwriting"
                        >
                          <History size={14} />
                          <span>New Version</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#94A3B8' }}>
                    No documents found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: UPLOAD NEW DOCUMENT */}
      {isUploadModalOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{
              background: '#F8FAFC',
              padding: '16px 20px',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Upload size={18} style={{ color: '#008E4F' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#0F172A' }}>
                  Upload Statutory Document to Repository
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitNewDocument} style={{ padding: '20px' }}>
              <div className="form-group">
                <label className="form-label">DOCUMENT TITLE / DESIGNATION</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Pune Nashik Semi High Speed Rail - DPR Volume IV"
                  value={newDocTitle}
                  onChange={e => setNewDocTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">DOCUMENT CATEGORY</label>
                  <select
                    className="form-select"
                    value={newDocCategory}
                    onChange={e => setNewDocCategory(e.target.value)}
                  >
                    <option value="Requisition">Requisition</option>
                    <option value="DPR">Detailed Project Report (DPR)</option>
                    <option value="Alignment & GIS">Alignment & GIS Map</option>
                    <option value="Administrative Approval">Administrative Approval</option>
                    <option value="Board Sanction">Board Sanction</option>
                    <option value="R&R Plan">R&R Plan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">PARENT PROJECT</label>
                  <select
                    className="form-select"
                    value={newDocProject}
                    onChange={e => setNewDocProject(e.target.value)}
                  >
                    {proposingProjects.map(p => (
                      <option key={p.id} value={p.id}>{p.id}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">ATTACH FILE (PDF / DWG / ZIP / KMZ)</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={e => setNewDocFile(e.target.files[0])}
                />
              </div>

              <div className="form-group">
                <label className="form-label">INITIAL VERSION REMARKS / SCOPE</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Brief note on document contents and revision scope..."
                  value={newDocRemarks}
                  onChange={e => setNewDocRemarks(e.target.value)}
                />
              </div>

              {/* DSC Sign Checkbox */}
              <div style={{
                background: '#F0FDF4',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #BBF7D0',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <input
                  type="checkbox"
                  id="signDocDsc"
                  checked={signWithDsc}
                  onChange={e => setSignWithDsc(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#008E4F' }}
                />
                <label htmlFor="signDocDsc" style={{ fontSize: '12px', color: '#166534', cursor: 'pointer', margin: 0 }}>
                  Apply Officer Class-3 Digital Signature Token ({proposingOfficer.name})
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: '#008E4F', border: 'none' }}
                >
                  Upload & Seal Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: UPLOAD NEW VERSION (WITHOUT OVERWRITING) */}
      {isVersionModalOpen && targetDocForVersion && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <div style={{
              background: '#F8FAFC',
              padding: '16px 20px',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <History size={18} style={{ color: '#008E4F' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#0F172A' }}>
                  Upload Newer Version without Overwriting
                </h3>
              </div>
              <button
                onClick={() => setIsVersionModalOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitNewVersion} style={{ padding: '20px' }}>
              <div style={{
                background: '#F1F5F9',
                padding: '12px 14px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '12.5px'
              }}>
                <div style={{ color: '#64748B' }}>Target Document:</div>
                <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                  {targetDocForVersion.title}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '11.5px', color: '#64748B' }}>
                  <span>Current Version: <strong>{targetDocForVersion.version}</strong></span>
                  <span>Category: {targetDocForVersion.category}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">INCREMENTED VERSION TAG</label>
                <input
                  type="text"
                  className="form-control mono-code"
                  value={versionNumber}
                  onChange={e => setVersionNumber(e.target.value)}
                  style={{ fontWeight: 700 }}
                  required
                />
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  Previous versions remain preserved in repository audit archives.
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">ATTACH REVISED FILE</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={e => setVersionFile(e.target.files[0])}
                />
              </div>

              <div className="form-group">
                <label className="form-label">CHANGELOG / REVISION REMARKS (MANDATORY)</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Explain why this version is being uploaded (e.g. alignment corrected as per Talathi joint survey)..."
                  value={versionRemarks}
                  onChange={e => setVersionRemarks(e.target.value)}
                  required
                />
              </div>

              <div style={{
                background: '#F0FDF4',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #BBF7D0',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <input
                  type="checkbox"
                  id="versionDscCheck"
                  checked={versionSignWithDsc}
                  onChange={e => setVersionSignWithDsc(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#008E4F' }}
                />
                <label htmlFor="versionDscCheck" style={{ fontSize: '12px', color: '#166534', cursor: 'pointer', margin: 0 }}>
                  Cryptographically seal this version with Class-3 DSC token ({proposingOfficer.name})
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsVersionModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: '#008E4F', border: 'none' }}
                >
                  Save & Publish Version {versionNumber}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
