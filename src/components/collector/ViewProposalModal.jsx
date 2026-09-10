import React, { useState } from 'react';
import {
  FileText,
  X,
  Printer,
  Download,
  Building,
  Scale,
  UserCheck,
  Folder,
  MapPin,
  Coins,
  Map,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileCheck,
  Eye,
  Sliders
} from 'lucide-react';

export default function ViewProposalModal({ isOpen, onClose, proposal }) {
  const [activeDocTab, setActiveDocTab] = useState('all');
  const [mapMode, setMapMode] = useState('side-by-side');
  const [overlayAlpha, setOverlayAlpha] = useState(50);

  if (!isOpen || !proposal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '1000px', height: '90vh', background: '#F8FAFC' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header" style={{ background: '#06371E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={22} style={{ color: '#FDE68A' }} />
            <div>
              <h3 className="modal-title" style={{ fontSize: '16px', letterSpacing: '0.5px' }}>
                RECEIPT OF OFFICIAL STATUTORY PROJECT PROPOSAL REPORT
              </h3>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
                Proposal ID: {proposal.id} • Proposing Body: {proposal.proposingBody}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
              <Printer size={14} /> Print Dossier
            </button>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Paper Content Body */}
        <div className="modal-body" style={{ padding: '24px', overflowY: 'auto' }}>
          {/* Document Masthead Paper Card */}
          <div style={{
            background: '#FFFFFF',
            border: '2px solid #0B4726',
            borderRadius: '14px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            marginBottom: '20px'
          }}>
            {/* Header Stamp */}
            <div style={{ textAlign: 'center', borderBottom: '2px double #0B4726', paddingBottom: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0B4726', letterSpacing: '1px', textTransform: 'uppercase' }}>
                GOVERNMENT OF MAHARASHTRA • REVENUE & LAND ACQUISITION DEPARTMENT
              </div>
              <h2 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                PROJECT PROPOSAL DOSSIER & LAND ACQUISITION REQUISITION
              </h2>
              <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                Received under Rule 4(1) of LARR Rules • Submitted to Office of the District Collectorate Pune
              </div>
            </div>

            {/* 12 STRUCTURED SECTIONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* SECTION 1: PROJECT REPORT & SUMMARY */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  <FileText size={16} /> 1. PROJECT REPORT & STATUTORY SPECIFICATION
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12.5px' }}>
                  <div><strong>Proposal Reference ID:</strong> <span className="mono-code" style={{ color: '#0B4726', fontWeight: 700 }}>{proposal.id}</span></div>
                  <div><strong>Submission Date:</strong> {proposal.submissionDate}</div>
                  <div><strong>Report Status:</strong> <span className="badge badge-orange">{proposal.status}</span></div>
                  <div><strong>Urgency Classification:</strong> <span className="badge badge-purple">{proposal.urgencyLevel}</span></div>
                </div>
              </div>

              {/* SECTION 2: PROPOSING INFORMATION */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  <Building size={16} /> 2. PROPOSING INFORMATION & NODAL AUTHORITY
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12.5px' }}>
                  <div><strong>Proposing Body / Department:</strong><br /><strong style={{ color: '#0F172A' }}>{proposal.proposingBody}</strong></div>
                  <div><strong>Nodal Officer Name:</strong><br />{proposal.proposingOfficer}</div>
                  <div><strong>Officer Govt Identity Code:</strong><br /><span className="mono-code">MH-GOVT-DEPT-8841</span></div>
                  <div><strong>Official Contact Email:</strong><br />cgm.land@maharail.gov.in</div>
                </div>
              </div>

              {/* SECTION 3 & 4: SECTOR & APPLICABLE LAW */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* SECTION 3: SECTOR */}
                <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                    <Folder size={16} /> 3. INFRASTRUCTURE SECTOR
                  </div>
                  <div style={{ fontSize: '12.5px' }}>
                    <div><strong>Primary Sector:</strong> {proposal.projectType}</div>
                    <div style={{ marginTop: '4px' }}><strong>Category:</strong> Public Infrastructure Right-of-Way (RoW)</div>
                  </div>
                </div>

                {/* SECTION 4: APPLICABLE LAW */}
                <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                    <Scale size={16} /> 4. APPLICABLE STATUTORY LAW
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#1E293B', fontWeight: 600 }}>
                    Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR 2013) & Maharashtra Land Revenue Code 1966
                  </div>
                </div>
              </div>

              {/* SECTION 5: REQUIRING BODY AND HEAD NAME */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  <UserCheck size={16} /> 5. REQUIRING BODY & HEAD OF INSTITUTION
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12.5px' }}>
                  <div><strong>Requiring Body Name:</strong><br /><strong>{proposal.proposingBody}</strong></div>
                  <div><strong>Head of Institution Name & Designation:</strong><br /><strong>Shri Rajesh Kumar Jaiswal, Managing Director & Head of Institution</strong></div>
                </div>
              </div>

              {/* SECTION 6: PROJECT DETAILS */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  <FileCheck size={16} /> 6. PROJECT DETAILS & SCOPE METRICS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '12px', textAlign: 'center' }}>
                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                    <div style={{ color: '#64748B', fontSize: '10px' }}>LAND REQUIRED</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#0B4726' }}>{proposal.landRequiredHa} Ha</div>
                    <div style={{ fontSize: '9.5px', color: '#64748B' }}>{(proposal.landRequiredHa * 10000).toLocaleString()} sq.m</div>
                  </div>

                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                    <div style={{ color: '#64748B', fontSize: '10px' }}>AFFECTED PARCELS</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{proposal.affectedParcelsCount}</div>
                    <div style={{ fontSize: '9.5px', color: '#64748B' }}>Survey Polygons</div>
                  </div>

                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                    <div style={{ color: '#64748B', fontSize: '10px' }}>AFFECTED LANDOWNERS</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>{proposal.affectedLandownersCount}</div>
                    <div style={{ fontSize: '9.5px', color: '#64748B' }}>Registered Khatadars</div>
                  </div>

                  <div style={{ background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                    <div style={{ color: '#64748B', fontSize: '10px' }}>EXECUTION DURATION</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B' }}>{proposal.timeline}</div>
                  </div>
                </div>
              </div>

              {/* SECTION 7: PURPOSE & PUBLIC UTILITY */}
              <div style={{ background: '#E6F4EA', border: '1px solid #CEEAD6', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1E7E34', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  🎯 7. PUBLIC PURPOSE STATEMENT & STRATEGIC JUSTIFICATION
                </div>
                <p style={{ fontSize: '13px', color: '#0F172A', lineHeight: 1.5, margin: 0 }}>
                  {proposal.purpose}
                </p>
              </div>

              {/* SECTION 8: PROJECT AREA LOCATION AND ALL */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  <MapPin size={16} /> 8. PROJECT AREA LOCATION, TALUKAS & VILLAGES
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12.5px' }}>
                  <div>
                    <strong>District Jurisdiction:</strong> Pune District (Pune Division)<br />
                    <strong>Talukas ({proposal.talukaCount}):</strong> {proposal.talukas.join(', ')}
                  </div>
                  <div>
                    <strong>Affected Villages ({proposal.villageCount}):</strong> {proposal.villages.join(', ')}<br />
                    <strong>Coordinates Bound:</strong> Lat: 18.5204° N | Long: 73.8567° E
                  </div>
                </div>
              </div>

              {/* SECTION 9: FINANCE ESTIMATED BUDGET */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  <Coins size={16} /> 9. FINANCIAL ESTIMATED ACQUISITION BUDGET
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', background: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>Total Estimated Financial Requisition:</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#0B4726' }}>{proposal.estimatedCost}</span>
                </div>

                <div style={{ fontSize: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #CBD5E1' }}>
                    <thead>
                      <tr style={{ background: '#F1F5F9' }}>
                        <th style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'left' }}>Budget Component</th>
                        <th style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right' }}>Share %</th>
                        <th style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right' }}>Estimated Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px' }}>Base Land Compensation (Sub-Registrar Circle Rate x Solatium 2x)</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right' }}>68%</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right', fontWeight: 700 }}>₹ 850.00 Cr</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px' }}>Tree, Structural & Irrigation Asset Solatium</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right' }}>15%</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right', fontWeight: 700 }}>₹ 187.50 Cr</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px' }}>Rehabilitation & Resettlement (R&R) Fund</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right' }}>12%</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right', fontWeight: 700 }}>₹ 150.00 Cr</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px' }}>Administrative, SLAO & Revenue Charges</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right' }}>5%</td>
                        <td style={{ border: '1px solid #CBD5E1', padding: '6px', textAlign: 'right', fontWeight: 700 }}>₹ 62.50 Cr</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 10: GIS MAP-BASED STATE MAP (PROPOSED VS STATE REVENUE MAPS) */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase' }}>
                    <Map size={16} /> 10. GIS MAP-BASED STATE REVENUE MAP VERIFICATION
                  </div>
                  <div style={{ display: 'flex', background: '#E2E8F0', borderRadius: '6px', padding: '2px' }}>
                    <button
                      onClick={() => setMapMode('side-by-side')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: mapMode === 'side-by-side' ? '#0B4726' : 'transparent',
                        color: mapMode === 'side-by-side' ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      Side-by-Side
                    </button>
                    <button
                      onClick={() => setMapMode('overlay')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: mapMode === 'overlay' ? '#0B4726' : 'transparent',
                        color: mapMode === 'overlay' ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      Overlay Mode
                    </button>
                  </div>
                </div>

                {mapMode === 'side-by-side' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ border: '2px solid #3B82F6', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ background: '#3B82F6', color: '#FFF', padding: '4px 10px', fontSize: '11px', fontWeight: 800 }}>
                        PROPOSED ALIGNMENT MAP (Proposing Body)
                      </div>
                      <img src={proposal.proposedMapUrl} alt="Proposed Map" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    </div>

                    <div style={{ border: '2px solid #059669', borderRadius: '8px', overflow: 'hidden' }}>
                      <div style={{ background: '#059669', color: '#FFF', padding: '4px 10px', fontSize: '11px', fontWeight: 800 }}>
                        OFFICIAL STATE REVENUE CADASTRAL GIS MAP
                      </div>
                      <img src={proposal.officialGisMapUrl} alt="Official Map" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    </div>
                  </div>
                ) : (
                  <div style={{ border: '2px solid #8B5CF6', borderRadius: '8px', overflow: 'hidden', position: 'relative', height: '250px' }}>
                    <img src={proposal.officialGisMapUrl} alt="Base Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <img src={proposal.proposedMapUrl} alt="Overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: overlayAlpha / 100, mixBlendMode: 'difference' }} />
                  </div>
                )}

                <div style={{ marginTop: '10px', background: '#FEF3C7', border: '1px solid #FDE68A', padding: '10px', borderRadius: '6px', fontSize: '11.5px', color: '#78350F' }}>
                  <strong>GIS Boundary Discrepancies ({proposal.boundaryDiscrepancies.length}):</strong>
                  {proposal.boundaryDiscrepancies.map((d, i) => (
                    <div key={i} style={{ marginTop: '2px' }}>• <strong>{d.parcel}:</strong> {d.details}</div>
                  ))}
                </div>
              </div>

              {/* SECTION 11: DOCUMENTS */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B4726', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  <Folder size={16} /> 11. ATTACHED PROPOSAL DOSSIER DOCUMENTS (5 FILES)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                  {[
                    { name: proposal.proposalDoc || "PRJ_PROPOSAL_REPORT_DPR_2026.pdf", type: "Detailed Project Report (DPR Vol I & II)", size: "18.4 MB", date: proposal.submissionDate },
                    { name: "State_Cabinet_Approval_Sanction_Order_2026.pdf", type: "State Cabinet Approval Order", size: "4.2 MB", date: proposal.submissionDate },
                    { name: "Cadastral_Surveyor_Blueprint_Map_Sheet.pdf", type: "Surveyor Boundary Blueprint", size: "12.8 MB", date: proposal.submissionDate },
                    { name: "Bank_NOC_Fund_Guarantee_Certificate.pdf", type: "Fund Availability Guarantee", size: "2.1 MB", date: proposal.submissionDate },
                    { name: "Environmental_PreAssessment_Sanction.pdf", type: "MoEFCC Environmental Pre-Clearance", size: "5.6 MB", date: proposal.submissionDate }
                  ].map((doc, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={16} style={{ color: '#0B4726' }} />
                        <div>
                          <strong style={{ color: '#0F172A' }}>{doc.name}</strong>
                          <div style={{ fontSize: '10.5px', color: '#64748B' }}>{doc.type} • {doc.size}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => alert(`Opening ${doc.name}`)} style={{ padding: '4px 8px' }}><Eye size={12} /> View</button>
                        <button className="btn btn-primary btn-sm" onClick={() => alert(`Downloading ${doc.name}`)} style={{ background: '#0B4726', padding: '4px 8px' }}><Download size={12} /> Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 12: ANALYSIS */}
              <div style={{ background: 'linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%)', border: '1.5px solid #8B5CF6', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B21A8', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  <Sparkles size={16} /> 12. TECHNICAL CELL & AI ANALYSIS SUMMARY
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '10px', fontSize: '11.5px', textAlign: 'center' }}>
                  <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid #E9D5FF' }}>
                    <div style={{ color: '#6B21A8' }}>SUITABILITY SCORE</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#1E7E34' }}>92 / 100</div>
                  </div>
                  <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid #E9D5FF' }}>
                    <div style={{ color: '#6B21A8' }}>ENVIRONMENTAL RISK</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#D97706' }}>Medium Risk</div>
                  </div>
                  <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid #E9D5FF' }}>
                    <div style={{ color: '#6B21A8' }}>SOCIO-ECONOMIC IMPACT</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0B4726' }}>High Utility</div>
                  </div>
                  <div style={{ background: '#FFF', padding: '8px', borderRadius: '6px', border: '1px solid #E9D5FF' }}>
                    <div style={{ color: '#6B21A8' }}>LITIGATION RISK</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#10B981' }}>Low (No Injunctions)</div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#334155', background: '#FFF', padding: '10px', borderRadius: '6px', border: '1px solid #E9D5FF' }}>
                  <strong>Collectorate Technical Cell Recommendation:</strong> Proposal meets all criteria under Section 4 of LARR 2013. Recommended for Collector SIA Approval and initiation of Social Impact Assessment.
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
