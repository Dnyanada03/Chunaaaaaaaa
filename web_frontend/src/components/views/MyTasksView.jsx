import React, { useState, useEffect } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { CheckSquare, Filter, Building, AlertCircle, Clock, Eye, ArrowLeft, MapPin, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const MyTasksView = () => {
  const {
    projects,
    villageWiseTaskSummary,
    selectedProjectId,
    setSelectedProjectId,
    selectedVillage,
    setSelectedVillage,
    parcels,
    setSelectedParcel,
    setActiveTab
  } = useSwadesh();

  const [viewingVillageDetail, setViewingVillageDetail] = useState(null);

  // Warning Popup state (Can be triggered manually via banner button)
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);

  const handleDismissModal = () => {
    setShowDeadlineModal(false);
  };

  const selectedProj = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Filter village summary by project
  const villageList = selectedVillage === 'All'
    ? villageWiseTaskSummary
    : villageWiseTaskSummary.filter(v => v.village === selectedVillage);

  // If a village is selected for deep parcel inspection
  if (viewingVillageDetail) {
    const villageParcels = parcels.filter(p => p.village === viewingVillageDetail);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setViewingVillageDetail(null)}
          style={{ width: 'fit-content' }}
        >
          <ArrowLeft size={16} /> Back to Village Task Management
        </button>

        <div className="page-banner">
          <div className="page-title-group">
            <h1>Village Task Management: {viewingVillageDetail}</h1>
            <p>Individual Land Parcel Verification, Notices & Delay Deadlines • {selectedProj.name}</p>
          </div>
        </div>

        {/* Parcels Table */}
        <div className="table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Parcel ID</th>
                <th>Survey Number</th>
                <th>Landowner Name</th>
                <th>Area (Ha)</th>
                <th>Verification Status</th>
                <th>Compensation Status</th>
                <th>Notice Status</th>
                <th>PFMS Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {villageParcels.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>
                    No parcels found for village "{viewingVillageDetail}".
                  </td>
                </tr>
              ) : (
                villageParcels.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: '700' }}>{p.id}</td>
                    <td>{p.surveyNumber}</td>
                    <td style={{ fontWeight: '600' }}>{p.landowner}</td>
                    <td>{p.acquiredAreaHa} Ha</td>
                    <td><StatusBadge status={p.verificationStatus} /></td>
                    <td><StatusBadge status={p.compensationStatus} /></td>
                    <td><StatusBadge status={p.noticeStatus} /></td>
                    <td><StatusBadge status={p.pfmsStatus} /></td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelectedParcel(p);
                          setActiveTab('projects');
                        }}
                      >
                        <Eye size={14} /> Open Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>Tahsildar Tasks & Jurisdiction Dashboard</h1>
          <p>Village-Wise Land Acquisition Verification, Delay Trackers & Progress Management</p>
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setShowDeadlineModal(true)}
          style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          <Clock size={14} /> View Deadline Logic
        </button>
      </div>

      {/* FIRST TIME WARNING POPUP MODAL (Screen 9 Resolution Deadline Logic) */}
      {showDeadlineModal && (
        <div className="modal-overlay" onClick={handleDismissModal}>
          <div
            className="modal-container"
            style={{ maxWidth: '560px' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldAlert size={20} style={{ color: '#FFFFFF' }} />
                <span className="modal-title">Resolution Deadline Tracker & Logic Notice</span>
              </div>
              <button className="modal-close-btn" onClick={handleDismissModal}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ background: '#FFFFFF' }}>
              <div style={{ fontSize: '13px', color: '#1F2937', marginBottom: '16px', lineHeight: '1.5' }}>
                <strong>Official Mandate:</strong> When a Surveyor or Talathi marks a case as delayed or raises an issue requiring Tahsildar action, the system automatically enforces a <strong>15-Day Resolution Deadline Window</strong> (e.g. Objection Raised: 01 Sep 2026 ➔ Due Date: 16 Sep 2026).
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ background: '#E6F4EA', border: '1px solid #CEEAD6', padding: '12px', borderRadius: '10px', color: '#1E7E34' }}>
                  <strong>🟢 Green — Within Time Window:</strong> &gt;7 Days remaining for Talathi/Tahsildar response.
                </div>
                <div style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '12px', borderRadius: '10px', color: '#334155' }}>
                  <strong>⚙️ Slate — Approaching Deadline:</strong> 1 - 6 Days remaining for resolution.
                </div>
                <div style={{ background: '#FCE8E6', border: '1px solid #FAD2CF', padding: '12px', borderRadius: '10px', color: '#C5221F' }}>
                  <strong>🔴 Red — Overdue Case (&gt;15 Days):</strong> Resolution window expired. Auto-escalated to Tahsildar priority queue.
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleDismissModal}
              >
                <CheckCircle2 size={16} /> Acknowledge & Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Jurisdiction Filters */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Filter size={18} style={{ color: '#005A36' }} />
            Jurisdiction & Village Filter Controls
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Select Project ID / Corridor</label>
            <select
              className="form-select"
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} — {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Village</label>
            <select
              className="form-select"
              value={selectedVillage}
              onChange={e => setSelectedVillage(e.target.value)}
            >
              <option value="All">All Villages under Jurisdiction</option>
              {selectedProj.villages.map(v => (
                <option key={v} value={v}>{v} Village</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* VILLAGE-WISE TASK MANAGEMENT TABLE (Screen 8) */}
      <div className="table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Village</th>
              <th>Project Name</th>
              <th>Total Parcels</th>
              <th>Verified</th>
              <th>Pending</th>
              <th>Under Notice</th>
              <th>Comp Due</th>
              <th>Delayed</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {villageList.map((v, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: '700', color: '#005A36' }}>
                  <Building size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
                  {v.village}
                </td>
                <td style={{ fontSize: '12px' }}>{v.project}</td>
                <td style={{ fontWeight: '600' }}>{v.total}</td>
                <td><span style={{ color: '#166534', fontWeight: '700' }}>{v.verified}</span></td>
                <td><span style={{ color: '#E65100', fontWeight: '700' }}>{v.pending}</span></td>
                <td>{v.underNotice}</td>
                <td>{v.compDue}</td>
                <td>
                  <span style={{ color: v.delayed > 0 ? '#DC2626' : '#64748B', fontWeight: '700' }}>
                    {v.delayed} Cases
                  </span>
                </td>
                <td style={{ minWidth: '120px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${v.progress}%`, height: '100%', background: '#005A36' }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700' }}>{v.progress}%</span>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setViewingVillageDetail(v.village)}
                  >
                    <Eye size={14} /> View Village
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasksView;
