import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { FileCheck2, CheckCircle2, ShieldCheck, Eye, ArrowLeft, Send, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const FinalMutationView = () => {
  const { parcels, triggerDigitalSignModal } = useSwadesh();
  const [selectedMutationParcel, setSelectedMutationParcel] = useState(null);

  // Filter parcels eligible or undergoing mutation
  const mutationParcels = parcels.filter(p => p.mutationStep >= 3 || p.mutationStatus.includes('Mutation') || p.mutationStatus.includes('Eligible'));

  // SCREEN 28, 29, 30: Final Mutation Review & Visual Status Tracker
  if (selectedMutationParcel) {
    const p = selectedMutationParcel;

    const trackerSteps = [
      { step: 1, label: "Verification Completed", desc: "Talathi Inspection", status: "completed" },
      { step: 2, label: "Compensation Approved", desc: "Tahsildar Award", status: "completed" },
      { step: 3, label: "Payment Completed", desc: "PFMS Disbursement", status: "completed" },
      { step: 4, label: "Final Mutation Approved", desc: "Tahsildar Bench Order", status: p.mutationStep >= 4 ? "completed" : "current" },
      { step: 5, label: "Notification Sent to Talathi", desc: "Dispatched to Talathi Portal", status: p.mutationStep >= 5 ? "completed" : (p.mutationStep === 4 ? "current" : "pending") },
      { step: 6, label: "Mutation Updated", desc: "7/12 Extract Record Updated", status: p.mutationStep >= 6 ? "completed" : "pending" },
      { step: 7, label: "Case Completed", desc: "Acquisition Archive Locked", status: p.mutationStep >= 6 ? "completed" : "pending" }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setSelectedMutationParcel(null)}
          style={{ width: 'fit-content' }}
        >
          <ArrowLeft size={15} /> Back to Final Mutation Register
        </button>

        <div className="page-banner">
          <div className="page-title-group">
            <h1>Final Mutation Executive Review & Approval</h1>
            <p>Case Reference: <span className="mono-code" style={{ color: '#FFFFFF' }}>{p.id}</span> • Landowner: {p.landowner} • Village: {p.village}</p>
          </div>
          <StatusBadge status={p.mutationStatus} />
        </div>

        {/* SCREEN 30: MUTATION STATUS VISUAL TRACKER */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <FileCheck2 size={16} style={{ color: '#0B4726' }} />
              Final Mutation Workflow Multi-Step Progress Tracker
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', margin: '12px 0', overflowX: 'auto' }}>
            {trackerSteps.map((s) => (
              <div
                key={s.step}
                style={{
                  flex: 1,
                  minWidth: '125px',
                  background: s.status === 'completed' ? '#E6F4EA' : (s.status === 'current' ? '#E8F0FE' : '#F9F8F5'),
                  border: s.status === 'completed' ? '1px solid #CEEAD6' : (s.status === 'current' ? '1.5px solid #1A73E8' : '1px solid #D1D5DB'),
                  borderRadius: '10px',
                  padding: '10px',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '9.5px', fontWeight: '800', color: s.status === 'completed' ? '#1E7E34' : (s.status === 'current' ? '#1A73E8' : '#6B7280'), textTransform: 'uppercase' }}>
                  STEP {s.step}
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#1F2937', marginTop: '2px' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SCREEN 28: ELIGIBILITY AUDIT & APPROVAL */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Land Record Mutation Eligibility Audit</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '13px', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid #D1D5DB' }}>
              <div><span style={{ color: '#6B7280' }}>Project ID:</span> <span className="mono-code">{p.projectId}</span></div>
              <div><span style={{ color: '#6B7280' }}>Project Name:</span> <strong>{p.projectName}</strong></div>
              <div><span style={{ color: '#6B7280' }}>Landowner Name:</span> <strong>{p.landowner}</strong></div>
              <div><span style={{ color: '#6B7280' }}>Survey / Gut No:</span> <span className="mono-code">{p.surveyNumber}</span></div>
              <div><span style={{ color: '#6B7280' }}>Parcel Area:</span> <strong>{p.acquiredAreaHa} Ha</strong></div>
              <div><span style={{ color: '#6B7280' }}>Revenue Village:</span> <strong>{p.village}</strong></div>
            </div>

            {/* Criteria Check Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: "Field & Document Verification", status: "Verified & Approved", ok: true },
                { title: "Compensation Calculation & Award", status: `₹ ${p.totalCompensation.toLocaleString('en-IN')} Approved`, ok: true },
                { title: "Objections / Active Disputes", status: "No Active Objection (Clear Title)", ok: true },
                { title: "PFMS Direct Bank Disbursement", status: `${p.pfmsStatus} (${p.pfmsTxnId})`, ok: true }
              ].map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    background: '#F9F8F5',
                    border: '1px solid #D1D5DB',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: '#1E7E34' }} />
                    <span style={{ fontWeight: '600', fontSize: '13px' }}>{c.title}</span>
                  </div>
                  <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#1E7E34' }}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SCREEN 29: TAHSILDAR FINAL MUTATION DIGITAL SIGN-OFF */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ borderTop: '3px solid #0B4726' }}>
              <div className="card-header">
                <div className="card-title">Tahsildar Final Order</div>
              </div>

              <p style={{ fontSize: '12px', color: '#4B5563', marginBottom: '14px' }}>
                Executing digital approval will issue an automatic <strong>Final Mutation Notification to the Talathi</strong> to update 7/12 land records.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => triggerDigitalSignModal('mutation', p)}
                >
                  <ShieldCheck size={16} /> Digitally Sign & Approve Final Mutation
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => alert(`Case ${p.id} sent back for re-audit.`)}
                >
                  <RotateCcw size={15} /> Send Back
                </button>
              </div>

              <div style={{ marginTop: '16px', padding: '10px', background: '#E6F4EA', border: '1px solid #CEEAD6', borderRadius: '10px', fontSize: '11px', color: '#1E7E34' }}>
                <strong>Talathi Notification Sync:</strong><br />
                Upon digital sign-off, system dispatches instant automated payload to Talathi portal (Eliminating duplicate data entry).
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 27: Final Mutation Dashboard View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>Final Mutation Register</h1>
          <p>Eligible Land Parcel Mutation Orders, Digital Signatures & Automated Talathi Notifications</p>
        </div>
      </div>

      <div className="table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Parcel ID</th>
              <th>Survey No</th>
              <th>Landowner Name</th>
              <th>Revenue Village</th>
              <th style={{ textAlign: 'right' }}>Acquired Area</th>
              <th>Verification</th>
              <th>Compensation</th>
              <th>Objection Status</th>
              <th>Mutation Eligibility</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mutationParcels.map(p => (
              <tr key={p.id}>
                <td className="mono-code" style={{ fontWeight: '700', color: '#0B4726' }}>{p.id}</td>
                <td className="mono-code">{p.surveyNumber}</td>
                <td style={{ fontWeight: '600' }}>{p.landowner}</td>
                <td>{p.village}</td>
                <td style={{ textAlign: 'right', fontWeight: '600' }}>{p.acquiredAreaHa} Ha</td>
                <td><StatusBadge status={p.verificationStatus} /></td>
                <td><StatusBadge status={p.compensationStatus} /></td>
                <td><span style={{ color: '#1E7E34', fontWeight: '700', fontSize: '11.5px' }}>No Objection (Clear)</span></td>
                <td><StatusBadge status={p.mutationStatus} /></td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedMutationParcel(p)}
                  >
                    <Eye size={13} /> Review Mutation
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

export default FinalMutationView;
