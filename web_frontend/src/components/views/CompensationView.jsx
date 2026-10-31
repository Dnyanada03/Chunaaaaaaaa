import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { Calculator, IndianRupee, Building, ShieldCheck, Eye, ArrowLeft, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const CompensationView = () => {
  const { parcels, triggerDigitalSignModal, setSelectedObjection, objections, setActiveTab } = useSwadesh();
  const [selectedCompParcel, setSelectedCompParcel] = useState(null);

  // SCREEN 19, 20, 21, 22: Individual Compensation Calculation Review
  if (selectedCompParcel) {
    const p = selectedCompParcel;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setSelectedCompParcel(null)}
          style={{ width: 'fit-content' }}
        >
          <ArrowLeft size={15} /> Back to Compensation Register
        </button>

        <div className="page-banner">
          <div className="page-title-group">
            <h1>Compensation Review: {p.landowner} (<span className="mono-code">{p.id}</span>)</h1>
            <p>Auto-Calculated Backend Formula & Sub-Registrar Valuation Sync • {p.projectName}</p>
          </div>
          <StatusBadge status={p.compensationStatus} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div className="card">
            {/* Section 1: Sub-Registrar Office Data */}
            <div style={{ paddingBottom: '14px', marginBottom: '16px', borderBottom: '1px solid #D1D5DB' }}>
              <div style={{ fontFamily: 'Merriweather, serif', fontSize: '14px', fontWeight: '700', color: '#0B4726', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Building size={16} /> 1. Sub-Registrar Office Official Valuation Data</span>
                <span className="badge badge-green">Sub-Registrar Data: RECEIVED</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '13px' }}>
                <div><span style={{ color: '#6B7280' }}>Official Circle Rate:</span> <strong>₹ {p.subRegistrarRateSqM.toLocaleString('en-IN')} / sq.m</strong></div>
                <div><span style={{ color: '#6B7280' }}>Valuation Reference Date:</span> 01-Jan-2026</div>
                <div><span style={{ color: '#6B7280' }}>Data Source API:</span> e-MahaRegistration Sub-Registrar Haveli</div>
                <div><span style={{ color: '#6B7280' }}>Market Value Multiplier:</span> 2.0x (RFCTLARR Act 2013 Rural Scale)</div>
              </div>
            </div>

            {/* Section 2: Auto-Calculated Formula & Asset Details */}
            <div style={{ paddingBottom: '14px', marginBottom: '16px', borderBottom: '1px solid #D1D5DB' }}>
              <div style={{ fontFamily: 'Merriweather, serif', fontSize: '14px', fontWeight: '700', color: '#1A73E8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calculator size={16} /> 2. Land & Standing Asset Compensation Formula Breakdown
              </div>

              {/* Base Land Comp */}
              <div style={{ background: '#F4F3F0', border: '1px solid #D1D5DB', padding: '12px 14px', borderRadius: '10px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', fontWeight: '700' }}>
                  <span>Base Land Compensation ({p.acquiredAreaSqM} sq.m × ₹{p.subRegistrarRateSqM}/sq.m)</span>
                  <span style={{ color: '#0B4726' }}>₹ {p.baseLandCompensation.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Asset Comp */}
              <div style={{ border: '1px solid #D1D5DB', padding: '12px 14px', borderRadius: '10px', marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#1F2937', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Verified Standing Assets Compensation (+):
                </div>
                {p.assets.length === 0 ? (
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>No standing assets recorded on this parcel.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {p.assets.map((ast, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', background: '#F9F8F5', padding: '6px 10px', borderRadius: '8px' }}>
                        <span>{ast.type} ({ast.count} units)</span>
                        <span style={{ fontWeight: '600' }}>₹ {ast.value.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #D1D5DB' }}>
                  <span>Total Asset Compensation</span>
                  <span>₹ {p.assetCompensation.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div style={{ background: '#E8F0FE', border: '1.5px solid #1A73E8', padding: '14px 16px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#1A73E8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      TOTAL CALCULATED COMPENSATION (AUTOMATIC BACKEND AUDIT)
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#4B5563', marginTop: '2px' }}>
                      Base Land Comp + Asset Comp = Total Award
                    </div>
                  </div>
                  <div style={{ fontFamily: 'Merriweather, serif', fontSize: '24px', fontWeight: '900', color: '#1A73E8' }}>
                    ₹ {p.totalCompensation.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Landowner Response Tracking */}
            <div>
              <div style={{ fontFamily: 'Merriweather, serif', fontSize: '14px', fontWeight: '700', color: '#0B4726', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>3. Landowner Response & PFMS Processing Status</span>
                <StatusBadge status={p.landownerResponse} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '13px' }}>
                <div><span style={{ color: '#6B7280' }}>Landowner Response:</span> <StatusBadge status={p.landownerResponse} /></div>
                <div><span style={{ color: '#6B7280' }}>PFMS Payment Disbursement:</span> <StatusBadge status={p.pfmsStatus} /></div>
              </div>

              {p.landownerResponse === 'Under Protest' && (
                <div style={{ background: '#FCE8E6', border: '1px solid #FAD2CF', color: '#C5221F', padding: '10px 14px', borderRadius: '10px', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '12.5px' }}>
                    <AlertTriangle size={15} style={{ display: 'inline', verticalAlign: '-3px' }} /> 
                    Landowner responded <strong>Under Protest</strong>. Case automatically queued in Objection Register.
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      const matchedObj = objections.find(o => o.parcelId === p.id);
                      if (matchedObj) setSelectedObjection(matchedObj);
                      setActiveTab('objections');
                    }}
                  >
                    View Objection Record
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tahsildar Executive Action Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ borderTop: '3px solid #0B4726' }}>
              <div className="card-header">
                <div className="card-title">Compensation Sign-off</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => triggerDigitalSignModal('compensation', p)}
                >
                  <ShieldCheck size={16} /> Digitally Sign & Approve
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => alert(`Compensation calculation for ${p.id} sent back for backend audit.`)}
                >
                  <RotateCcw size={15} /> Send Back for Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 18: Compensation Dashboard View
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>Compensation & Calculation Register</h1>
          <p>Auto-Calculated Backend Compensation Reviews, Sub-Registrar Circle Rates & Landowner Approvals</p>
        </div>
      </div>

      {/* Summary Table */}
      <div className="table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Parcel ID</th>
              <th>Survey No</th>
              <th>Landowner Name</th>
              <th style={{ textAlign: 'right' }}>Acquired Area</th>
              <th style={{ textAlign: 'right' }}>Base Land Comp</th>
              <th style={{ textAlign: 'right' }}>Asset Comp</th>
              <th style={{ textAlign: 'right' }}>Total Compensation</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map(p => (
              <tr key={p.id}>
                <td className="mono-code" style={{ fontWeight: '700', color: '#0B4726' }}>{p.id}</td>
                <td className="mono-code">{p.surveyNumber}</td>
                <td style={{ fontWeight: '600' }}>{p.landowner}</td>
                <td style={{ textAlign: 'right', fontWeight: '600' }}>{p.acquiredAreaHa} Ha</td>
                <td style={{ textAlign: 'right' }}>₹ {p.baseLandCompensation.toLocaleString('en-IN')}</td>
                <td style={{ textAlign: 'right' }}>₹ {p.assetCompensation.toLocaleString('en-IN')}</td>
                <td style={{ textAlign: 'right', fontWeight: '700', color: '#1A73E8' }}>₹ {p.totalCompensation.toLocaleString('en-IN')}</td>
                <td><StatusBadge status={p.compensationStatus} /></td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedCompParcel(p)}
                  >
                    <Eye size={13} /> Review Calculation
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

export default CompensationView;
