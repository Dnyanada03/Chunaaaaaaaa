import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { FileText, Send, Printer, ShieldCheck, Eye, ArrowLeft, CheckCircle2, Phone, Edit3 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const StatutoryNoticesView = () => {
  const { parcels, triggerDigitalSignModal } = useSwadesh();
  const [selectedNoticeParcel, setSelectedNoticeParcel] = useState(null);
  const [editableHearingDate, setEditableHearingDate] = useState('2026-09-25');
  const [editableRemarks, setEditableRemarks] = useState('Landowner requested to present original 7/12 extract & bank NOC at Haveli Tahsildar Court.');

  // SCREEN 25 & 26: Official Notice Preview & Print Approval Page
  if (selectedNoticeParcel) {
    const p = selectedNoticeParcel;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setSelectedNoticeParcel(null)}
          style={{ width: 'fit-content' }}
        >
          <ArrowLeft size={15} /> Back to Statutory Notice Register
        </button>

        <div className="page-banner">
          <div className="page-title-group">
            <h1>Official Government Statutory Notice Generation</h1>
            <p>Notice Ref: <span className="mono-code" style={{ color: '#FFFFFF' }}>{p.noticeRefNo}</span> • Landowner: {p.landowner} • Parcel ID: <span className="mono-code">{p.id}</span></p>
          </div>
          <StatusBadge status={p.noticeStatus} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Main Notice Preview Document (SCREEN 25) */}
          <div className="card" style={{ background: '#F4F3F0' }}>
            <div className="card-header">
              <div className="card-title">
                <FileText size={16} style={{ color: '#0B4726' }} />
                Official Maharashtra Revenue Department Notice Form 3E
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
                <Printer size={13} /> Print Notice Form
              </button>
            </div>

            {/* Official Notice Document Paper Simulation */}
            <div style={{
              background: 'white',
              border: '2px solid #0B4726',
              borderRadius: '12px',
              padding: '30px',
              fontFamily: "'Times New Roman', Times, serif",
              color: '#1F2937',
              lineHeight: '1.6'
            }}>
              {/* Header Emblem */}
              <div style={{ textAlign: 'center', borderBottom: '2px double #0B4726', paddingBottom: '14px', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
                  GOVERNMENT OF MAHARASHTRA • REVENUE DEPARTMENT
                </div>
                <div style={{ fontSize: '11px', color: '#4B5563' }}>
                  OFFICE OF THE TAHSILDAR & EXECUTIVE MAGISTRATE, HAVELI DIVISION, PUNE
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0B4726', marginTop: '8px' }}>
                  FORM 3E — STATUTORY LAND ACQUISITION NOTICE
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>
                  Notice Ref No: <strong className="mono-code">{p.noticeRefNo}</strong> • Date: {p.noticeDate || new Date().toLocaleDateString()}
                </div>
              </div>

              {/* Notice Content */}
              <div style={{ fontSize: '13.5px' }}>
                <p><strong>To,</strong><br />
                Shri/Smt: <strong>{p.landowner}</strong><br />
                Resident of Village: <strong>{p.village}</strong>, Taluka: Haveli, District: Pune<br />
                Aadhaar Ref: <span className="mono-code">{p.aadharNo}</span></p>

                <br />
                <p style={{ textIndent: '30px' }}>
                  Notice is hereby given under Section 3E of the National Highways / Land Acquisition Act that the land parcel described in the schedule below is required for the public infrastructure project titled <strong>"{p.projectName}"</strong> (Project ID: <span className="mono-code">{p.projectId}</span>).
                </p>

                {/* Land Schedule Table */}
                <div style={{ margin: '16px 0', border: '1px solid #0B4726', padding: '10px', background: '#F9F8F5', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '12px', color: '#0B4726', textTransform: 'uppercase' }}>
                    SCHEDULE OF AFFECTED LAND PARCEL:
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                    <tbody>
                      <tr><td style={{ padding: '3px' }}><strong>Parcel ID:</strong> <span className="mono-code">{p.id}</span></td><td style={{ padding: '3px' }}><strong>Survey/Gut No:</strong> <span className="mono-code">{p.surveyNumber}</span></td></tr>
                      <tr><td style={{ padding: '3px' }}><strong>Acquired Area:</strong> {p.acquiredAreaHa} Hectares ({p.acquiredAreaSqM} sq.m)</td><td style={{ padding: '3px' }}><strong>Village:</strong> {p.village}</td></tr>
                      <tr><td style={{ padding: '3px' }}><strong>Total Determined Compensation:</strong></td><td style={{ padding: '3px', fontWeight: 'bold', color: '#1A73E8' }}>₹ {p.totalCompensation.toLocaleString('en-IN')}</td></tr>
                    </tbody>
                  </table>
                </div>

                <p style={{ textIndent: '30px' }}>
                  You are hereby directed to present yourself or your authorized representative before the undersigned Tahsildar Court on <strong>{editableHearingDate}</strong> along with original land extract records, bank passbook, and identity proof.
                </p>

                <div style={{ marginTop: '14px', background: '#FEF7E0', padding: '8px 12px', borderLeft: '3px solid #E37400', fontSize: '11.5px' }}>
                  <strong>Special Directions:</strong> {editableRemarks}
                </div>
              </div>

              {/* Signature Block */}
              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '11px' }}>
                <div>
                  <ShieldCheck size={18} style={{ color: '#0B4726', display: 'inline', verticalAlign: '-3px' }} />
                  <strong>Digitally Sealed Official Government Document</strong><br />
                  Digital Sign Ref: <span className="mono-code">DS-MH-REV-2026-8841</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid #000', paddingBottom: '2px', width: '160px', fontWeight: 'bold' }}>
                    Dr. Arvind R. Patil
                  </div>
                  <strong>Tahsildar & Executive Magistrate</strong><br />
                  Haveli Sub-Division, Pune
                </div>
              </div>
            </div>
          </div>

          {/* Permitted Field Controls & Sign-off */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <Edit3 size={15} /> Edit Permitted Notice Fields
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hearing / Appearance Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={editableHearingDate}
                  onChange={e => setEditableHearingDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Special Notice Directions</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={editableRemarks}
                  onChange={e => setEditableRemarks(e.target.value)}
                />
              </div>
            </div>

            <div className="card" style={{ borderTop: '3px solid #0B4726' }}>
              <div className="card-header">
                <div className="card-title">Notice Approval & Dispatch</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Physical Print Status:</span>
                  <span style={{ fontWeight: '700', color: '#1E7E34' }}>Ready for Printing</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>SMS Portal Delivery:</span>
                  <span style={{ fontWeight: '700', color: '#1A73E8' }}>Dispatched via MahaGov Gateway</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => triggerDigitalSignModal('notice', p)}
              >
                <ShieldCheck size={16} /> Digitally Sign & Approve Notice
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 23: Statutory Notice List View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>Statutory Notice Management Register</h1>
          <p>Automated Notice Generation, Government Templates & Landowner Delivery Tracking</p>
        </div>
      </div>

      <div className="table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Notice Ref No</th>
              <th>Parcel ID</th>
              <th>Survey No</th>
              <th>Landowner Name</th>
              <th>Revenue Village</th>
              <th>Notice Type</th>
              <th>Notice Date</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map(p => (
              <tr key={p.id}>
                <td className="mono-code" style={{ fontWeight: '700', color: '#0B4726' }}>{p.noticeRefNo}</td>
                <td className="mono-code">{p.id}</td>
                <td className="mono-code">{p.surveyNumber}</td>
                <td style={{ fontWeight: '600' }}>{p.landowner}</td>
                <td>{p.village}</td>
                <td style={{ fontSize: '12px' }}>Section 3E Statutory Notice</td>
                <td style={{ fontSize: '12px' }}>{p.noticeDate}</td>
                <td><StatusBadge status={p.noticeStatus} /></td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedNoticeParcel(p)}
                  >
                    <Eye size={13} /> Preview Notice
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

export default StatutoryNoticesView;
