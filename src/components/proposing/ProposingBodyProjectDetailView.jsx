import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Download,
  PlusCircle,
  ExternalLink,
  Layers,
  Map,
  Users,
  IndianRupee,
  Activity
} from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';
import { swadeshCadastralParcels } from '../../data/proposingMockData';

export default function ProposingBodyProjectDetailView({ projectId, onBack, onNavigate }) {
  const { proposingProjects, proposingProposals, proposingDocuments, proposingAuditLogs } = useSwadesh();

  const [activeTab, setActiveTab] = useState('overview');

  const project = proposingProjects.find(p => p.id === projectId) || proposingProjects[0];

  if (!project) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <AlertCircle size={32} style={{ color: '#D97706', marginBottom: '10px' }} />
        <div style={{ fontSize: '15px', fontWeight: 700 }}>Project Record Not Found</div>
        <button className="btn btn-secondary btn-sm" onClick={onBack} style={{ marginTop: '12px' }}>
          <ArrowLeft size={14} /> Back to Projects
        </button>
      </div>
    );
  }

  // Filter linked proposals, documents, audit trail
  const linkedProposals = proposingProposals.filter(p => p.projectId === project.id);
  const linkedDocs = proposingDocuments.filter(d => d.projectId === project.id);
  const linkedAudit = proposingAuditLogs.filter(a => a.projectId === project.id);

  const tabs = [
    { id: 'overview', label: 'Portfolio Overview' },
    { id: 'documents', label: `Creation Documents (${linkedDocs.length})` },
    { id: 'proposals', label: `Proposals / Variants (${linkedProposals.length})` },
    { id: 'authorities', label: 'Stakeholder Authorities' },
    { id: 'parcels', label: 'Landowners & Parcels' },
    { id: 'map', label: 'GIS Boundary Map' },
    { id: 'finance', label: 'Finance & Sanctions' },
    { id: 'audit', label: 'Audit Trail' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack} style={{ fontSize: '11px' }}>
          <ArrowLeft size={13} /> Back to Projects
        </button>
      </div>

      {/* 41. PROJECT HERO BAND */}
      <div className="card" style={{ padding: '22px 26px', borderLeft: '5px solid #005A36' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: '24px', alignItems: 'start' }}>
          {/* Project Image */}
          <div style={{
            width: '140px',
            height: '110px',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#0F172A',
            border: '1px solid #CBD5E1',
            flexShrink: 0
          }}>
            <img
              src={project.image}
              alt={project.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Core Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="mono-code" style={{ fontSize: '11px', color: '#005A36', fontWeight: 800, background: '#E6F4EA', padding: '2px 8px', borderRadius: '4px' }}>
                {project.id}
              </span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                Proposed By: <strong>{project.authority}</strong>
              </span>
              {project.financialYear && (
                <span className="badge badge-neutral" style={{ fontSize: '10.5px' }}>
                  FY {project.financialYear}
                </span>
              )}
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '6px 0' }}>
              {project.name}
            </h1>

            <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, margin: 0, maxWidth: '80ch' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', gap: '18px', fontSize: '12px', color: '#64748B', marginTop: '10px' }}>
              <div><MapPin size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> {project.district} District</div>
              <div><Clock size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> Approval: {project.creationTimestamp || '20 Aug 2026'}</div>
              <div><ShieldCheck size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> DSC: {project.digitalSignatureStatus}</div>
            </div>
          </div>

          {/* Status Badge & Actions */}
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
            <span className="badge badge-green" style={{ fontSize: '12px', padding: '5px 12px' }}>
              {project.status}
            </span>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              Stage: <strong>{project.stage}</strong>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onNavigate('create-proposal', project.id)}
              style={{
                marginTop: '10px',
                background: '#005A36',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700
              }}
            >
              <PlusCircle size={14} /> ADD PROPOSAL VARIANT
            </button>
          </div>
        </div>

        {/* High-Level Overview Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginTop: '18px',
          paddingTop: '16px',
          borderTop: '1px solid #E2E8F0'
        }}>
          <div>
            <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>TOTAL LAND SCOPE</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-serif)' }}>
              {project.landRequiredHa} Ha
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>ESTIMATED BUDGET</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-serif)' }}>
              {project.estimatedBudget}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>PROGRESS STATUS</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#005A36', fontFamily: 'var(--font-serif)' }}>
              {project.progress}% Complete
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10.5px', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>RISK CLASSIFICATION</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: project.riskLevel === 'Critical' ? '#991B1B' : '#D97706', fontFamily: 'var(--font-serif)' }}>
              {project.riskLevel} Risk
            </div>
          </div>
        </div>
      </div>

      {/* 42. PROJECT SIDE PANEL & SUB-VIEWS */}
      <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: '16px' }}>
        {/* Side Tabs Navigation */}
        <div className="card" style={{ padding: '8px 0', alignSelf: 'start' }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 800,
            color: '#64748B',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            padding: '8px 16px 4px 16px'
          }}>
            PROJECT NAVIGATION
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    border: 'none',
                    borderLeft: `3px solid ${isActive ? '#005A36' : 'transparent'}`,
                    background: isActive ? '#F0FDF4' : 'transparent',
                    color: isActive ? '#005A36' : '#475569',
                    fontSize: '12.5px',
                    fontWeight: isActive ? 700 : 500,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.12s ease'
                  }}
                >
                  <span>{tab.label}</span>
                  <ChevronRight size={13} style={{ opacity: isActive ? 1 : 0.4 }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel View Content */}
        <div className="card" style={{ padding: '22px 24px', minHeight: '440px' }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                Executive Portfolio Overview
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
                Key structural attributes and administrative assignments.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '12.5px' }}>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <strong>Public Purpose:</strong><br />
                  <span style={{ color: '#475569' }}>{project.publicPurposeCategory}</span>
                </div>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <strong>Project Type:</strong><br />
                  <span style={{ color: '#475569' }}>{project.projectType} • {project.projectCategory}</span>
                </div>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <strong>Jurisdiction Taluka & Villages:</strong><br />
                  <span style={{ color: '#475569' }}>{project.taluka} Taluka • {project.villages ? project.villages.join(', ') : 'All'}</span>
                </div>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <strong>Project Incharge / SLAO:</strong><br />
                  <span style={{ color: '#475569' }}>{project.projectIncharge}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 43. CREATION DOCUMENTS */}
          {activeTab === 'documents' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', fontFamily: 'var(--font-serif)' }}>
                    Project Creation & Verification Documents
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Uploaded reports, feasibility studies, and Class-3 signed sanctions.
                  </div>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onNavigate('documents')}
                  style={{ fontSize: '11px' }}
                >
                  Document Central →
                </button>
              </div>

              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Type</th>
                    <th>Version</th>
                    <th>Uploaded By</th>
                    <th>Exact Timestamp</th>
                    <th>Signature Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {linkedDocs.map(doc => (
                    <tr key={doc.id}>
                      <td style={{ fontWeight: 600, color: '#0F172A' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FileText size={15} style={{ color: '#005A36' }} />
                          {doc.name}
                        </div>
                      </td>
                      <td style={{ fontSize: '11.5px', color: '#475569' }}>{doc.type}</td>
                      <td>
                        <span className="badge badge-purple" style={{ fontSize: '10.5px' }}>v{doc.version}</span>
                      </td>
                      <td style={{ fontSize: '11.5px' }}>{doc.uploadedBy}</td>
                      <td style={{ fontSize: '11px', color: '#005A36', fontWeight: 600 }}>{doc.exactTimestamp}</td>
                      <td>
                        <span className="badge badge-green" style={{ fontSize: '10.5px' }}>{doc.digitalSignatureStatus}</span>
                      </td>
                      <td>
                        <button className="btn btn-secondary btn-sm" style={{ padding: '2px 8px', fontSize: '10.5px' }}>
                          <Download size={11} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {linkedDocs.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#64748B' }}>
                        No documents recorded for this project yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: 44. PROJECT PROPOSALS / VARIANTS */}
          {activeTab === 'proposals' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', fontFamily: 'var(--font-serif)' }}>
                    Proposal Packages & Variants Under this Project
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Click any package variant to open detailed proposal stages and PFMS ledger.
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onNavigate('create-proposal', project.id)}
                  style={{ background: '#005A36', fontSize: '11.5px', fontWeight: 700 }}
                >
                  <PlusCircle size={14} /> New Proposal Variant
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {linkedProposals.map(prop => (
                  <div
                    key={prop.id}
                    onClick={() => onNavigate('proposal-detail', prop.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      background: '#F8FAFC',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="mono-code" style={{ fontSize: '11px', color: '#005A36', fontWeight: 800 }}>
                          {prop.id}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>
                          {prop.name}
                        </span>
                        <span className="badge badge-blue" style={{ fontSize: '10.5px' }}>
                          {prop.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '3px' }}>
                        Variant: <strong>{prop.variant}</strong> • Stage: {prop.submissionStage} • Submitted: {prop.submissionTimestamp}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                          {prop.totalLandRequiredHa} Ha
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          {prop.estimatedCost}
                        </div>
                      </div>
                      <ChevronRight size={16} style={{ color: '#94A3B8' }} />
                    </div>
                  </div>
                ))}

                {linkedProposals.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '30px', color: '#64748B', background: '#F8FAFC', borderRadius: '8px' }}>
                    No proposal packages initiated yet. Click "New Proposal Variant" above to create one.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: AUTHORITIES */}
          {activeTab === 'authorities' && (
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                Stakeholder Authority Governance Bench
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
                Multi-stakeholder authorities involved in the end-to-end acquisition workflow.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ padding: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10.5px', color: '#005A36', fontWeight: 800, textTransform: 'uppercase' }}>PROPOSING BODY</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>{project.authority}</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>Officer: {project.signerName || 'Shri V. K. Sharma'}</div>
                  <div style={{ fontSize: '11px', color: '#166534', marginTop: '4px' }}>Upstream Initiator</div>
                </div>

                <div style={{ padding: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10.5px', color: '#1A73E8', fontWeight: 800, textTransform: 'uppercase' }}>STATE CABINET MINISTRY</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>Revenue & Forest Department</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>Officer: Shri Sunil V. Chavan, IAS (PS)</div>
                  <div style={{ fontSize: '11px', color: '#1E40AF', marginTop: '4px' }}>State Approval Authority</div>
                </div>

                <div style={{ padding: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10.5px', color: '#D97706', fontWeight: 800, textTransform: 'uppercase' }}>DISTRICT COLLECTORATE</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>{project.district} Collectorate Office</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>Collector: {project.districtCollector || 'Dr. Rajesh V. Deshmukh, IAS'}</div>
                  <div style={{ fontSize: '11px', color: '#92400E', marginTop: '4px' }}>Acquisition Competent Authority</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PARCELS */}
          {activeTab === 'parcels' && (
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                Survey Parcels & Recorded Landowners
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
                Directly cross-linked to SWADESH cadastral land records repository.
              </p>

              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Survey / Gut No</th>
                    <th>Village</th>
                    <th>Taluka</th>
                    <th>Landowner (7/12 Extract)</th>
                    <th>Area (Ha)</th>
                    <th>Classification</th>
                  </tr>
                </thead>
                <tbody>
                  {swadeshCadastralParcels.map(pl => (
                    <tr key={pl.id}>
                      <td style={{ fontWeight: 700 }} className="mono-code">{pl.surveyNo}</td>
                      <td>{pl.village}</td>
                      <td>{pl.taluka}</td>
                      <td style={{ fontWeight: 600 }}>{pl.landowner}</td>
                      <td>{pl.areaHa} Ha</td>
                      <td style={{ fontSize: '11.5px' }}>{pl.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 6: MAP */}
          {activeTab === 'map' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', fontFamily: 'var(--font-serif)' }}>
                    GIS Cadastral Alignment Map
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Project corridor boundary overlay with 7/12 land parcel coordinates.
                  </div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('map')}>
                  Full GIS Command Map →
                </button>
              </div>

              <div style={{
                height: '320px',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                border: '1.5px solid #CBD5E1',
                background: '#1E293B'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80"
                  alt="GIS Map"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  color: '#FFFFFF',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '11px'
                }}>
                  <div style={{ fontWeight: 700, color: '#86EFAC' }}>{project.name}</div>
                  <div>Coordinates: Lat 18.5204° N, Long 73.8567° E • Haveli-Khed Corridor</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FINANCE */}
          {activeTab === 'finance' && (
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                Budgetary Allocations & Sanction Registry
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
                Financial breakdown and PFMS escrow fund authorization.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                  <div style={{ fontSize: '10.5px', color: '#64748B' }}>SANCTIONED PROJECT BUDGET</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{project.estimatedBudget}</div>
                </div>
                <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                  <div style={{ fontSize: '10.5px', color: '#64748B' }}>FINANCIAL YEAR</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#005A36', marginTop: '2px' }}>FY {project.financialYear || '2026–27'}</div>
                </div>
                <div style={{ padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                  <div style={{ fontSize: '10.5px', color: '#64748B' }}>COMMITTED AWARDS & R&R</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#1A73E8', marginTop: '2px' }}>₹ 1,020.00 Cr</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
                Statutory Project Audit Trail
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
                Immutable event record with Class-3 digital signature hash and exact IST timestamps.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {linkedAudit.map(log => (
                  <div
                    key={log.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                        {log.action}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '2px' }}>
                        Officer: <strong>{log.user}</strong> ({log.department})
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                        {log.remarks}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: '#005A36', fontWeight: 700 }}>
                        {log.timestamp}
                      </div>
                      <span className="badge badge-green" style={{ fontSize: '10px', marginTop: '4px' }}>
                        {log.signatureStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
