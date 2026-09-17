import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  FileSpreadsheet,
  Building2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ShieldAlert,
  Save,
  CheckCircle2,
  Plus,
  Trash2
} from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';
import { swadeshCadastralParcels } from '../../data/proposingMockData';

export default function ProposingBodyCreateProposalView({ onNavigate, initialProjectId = null, initialDraftProposal = null }) {
  const { proposingProjects, proposingOfficer, handleCreateProposingProposal } = useSwadesh();

  // Form Section State (1 to 7)
  const [activeSection, setActiveSection] = useState(1);

  // 1. Basic
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialDraftProposal?.projectId || initialProjectId || proposingProjects[0]?.id || 'PRJ-MH-STATE-2026-002'
  );
  const [departmentName, setDepartmentName] = useState(
    initialDraftProposal?.departmentName || proposingOfficer?.department || 'Maharail Land Acquisition Wing, Pune'
  );
  const [variant, setVariant] = useState(
    initialDraftProposal?.variant || 'Package 2 — Main Line Land Acquisition'
  );

  // 2. Proposal Information
  const [proposalName, setProposalName] = useState(
    initialDraftProposal?.name || 'Package 2 — Haveli to Khed Rail Right-of-Way Land Acquisition'
  );
  const [categoryRfctlarr, setCategoryRfctlarr] = useState(
    initialDraftProposal?.categoryRfctlarr || 'Railways & Transport Infrastructure under Schedule 4'
  );
  const [applicableLaws, setApplicableLaws] = useState(
    initialDraftProposal?.applicableLaws || 'RFCTLARR Act 2013 (Section 4 to 8), Railways Act 1989'
  );
  const [totalLandRequiredHa, setTotalLandRequiredHa] = useState(
    initialDraftProposal?.totalLandRequiredHa || '168.4'
  );
  const [implementingAgency, setImplementingAgency] = useState(
    initialDraftProposal?.implementingAgency || proposingOfficer?.authority || 'Maharashtra Rail Infrastructure Dev. Corp. (Maharail)'
  );
  const [executingOrganization, setExecutingOrganization] = useState(
    initialDraftProposal?.executingOrganization || 'Maharail LA Field Division, Pune'
  );
  const [startDate, setStartDate] = useState(initialDraftProposal?.startDate || '2026-09-01');
  const [targetDate, setTargetDate] = useState(initialDraftProposal?.targetDate || '2028-03-31');

  // 3. Geography & GIS
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState(initialDraftProposal?.district || 'Pune');
  const [village, setVillage] = useState(initialDraftProposal?.village || 'Waki & Charholi Budruk');
  const [surveyNumber, setSurveyNumber] = useState(
    initialDraftProposal?.surveyNumbers ? initialDraftProposal.surveyNumbers.join(', ') : '142/1, 142/2, 188/3, 412/1, 412/2'
  );
  const [landType, setLandType] = useState('Private Agricultural & Social Forestry');
  const [ownersTenantsCount, setOwnersTenantsCount] = useState(
    initialDraftProposal?.ownersTenantsCount || '420'
  );
  const [selectedParcels, setSelectedParcels] = useState(
    swadeshCadastralParcels.slice(0, 5)
  );

  // 4. Financial
  const [estimatedCost, setEstimatedCost] = useState(
    initialDraftProposal?.estimatedCost ? initialDraftProposal.estimatedCost.replace(/[^0-9.]/g, '') : '540.0'
  );
  const [advanceDeposit, setAdvanceDeposit] = useState(
    initialDraftProposal?.advanceDeposit ? initialDraftProposal.advanceDeposit.replace(/[^0-9.]/g, '') : '120.0'
  );
  const [sanctionNumber, setSanctionNumber] = useState(
    initialDraftProposal?.sanctionNumber || 'MAHARAIL/LA/2026/SAN-8812'
  );
  const [issuingAuthority, setIssuingAuthority] = useState(
    initialDraftProposal?.issuingAuthority || 'Department of Transport & Finance, Govt. of Maharashtra'
  );
  const [sanctionDate, setSanctionDate] = useState(
    initialDraftProposal?.sanctionDate || '2026-08-14'
  );

  // 5. Timeline Milestones
  const [milestones, setMilestones] = useState(
    initialDraftProposal?.milestones || [
      { name: 'Proposal Preparation & GIS Validation', plannedDate: '2026-08-15', status: 'Completed', remarks: 'Parcels demarcated' },
      { name: 'Submission to State Authority', plannedDate: '2026-09-01', status: 'In Progress', remarks: 'Class-3 DSC sign-off' },
      { name: 'SIA Notification & Expert Appraisal', plannedDate: '2026-11-15', status: 'Pending', remarks: 'Empaneled agency appointment' },
      { name: 'Preliminary Notification (Sec 11)', plannedDate: '2027-01-30', status: 'Pending', remarks: '-' },
      { name: 'Land Survey & Objections (Sec 15)', plannedDate: '2027-04-30', status: 'Pending', remarks: '-' },
      { name: 'Statutory Award Declaration (Sec 23)', plannedDate: '2027-08-31', status: 'Pending', remarks: '-' },
      { name: 'Compensation / DBT Disbursement', plannedDate: '2027-11-30', status: 'Pending', remarks: '-' },
      { name: 'R&R Resettlement Package', plannedDate: '2028-01-31', status: 'Pending', remarks: '-' },
      { name: 'Final Possession & Mutation', plannedDate: '2028-04-30', status: 'Pending', remarks: '-' }
    ]
  );

  // 6. Statutory Clause
  const [isUrgent, setIsUrgent] = useState(initialDraftProposal?.isUrgent || true);
  const [urgencyReason, setUrgencyReason] = useState(
    initialDraftProposal?.urgencyReason || 'Special Infrastructure Mission Fast-Track Corridor — Kumbh Mela 2027 regional transit milestone requirement'
  );
  const [statutoryBasis, setStatutoryBasis] = useState(
    initialDraftProposal?.statutoryBasis || 'Section 40(1) RFCTLARR Act 2013 — Urgency Clause for Rail Infrastructure'
  );

  const selectedProject = proposingProjects.find(p => p.id === selectedProjectId) || proposingProjects[0];

  const buildProposalDataObject = () => {
    return {
      ...(initialDraftProposal || {}),
      projectId: selectedProjectId,
      projectName: selectedProject?.name || 'Infrastructure Project',
      variant,
      name: proposalName,
      categoryRfctlarr,
      applicableLaws,
      totalLandRequiredHa: totalLandRequiredHa,
      implementingAgency,
      executingOrganization,
      startDate,
      targetDate,
      state,
      district,
      talukas: [district === 'Pune' ? 'Haveli' : 'Rural'],
      village,
      surveyNumbers: surveyNumber.split(',').map(s => s.trim()),
      landClassification: landType,
      ownersTenantsCount: parseInt(ownersTenantsCount) || 0,
      estimatedCost: `₹ ${parseFloat(estimatedCost || 0).toFixed(2)} Cr`,
      advanceDeposit: `₹ ${parseFloat(advanceDeposit || 0).toFixed(2)} Cr`,
      sanctionNumber,
      issuingAuthority,
      sanctionDate,
      isUrgent,
      urgencyReason: isUrgent ? urgencyReason : '',
      statutoryBasis: isUrgent ? statutoryBasis : '',
      milestones
    };
  };

  // Action: Save as Draft
  const handleSaveDraftAction = () => {
    const data = buildProposalDataObject();
    handleCreateProposingProposal(data, 'draft');
    onNavigate('proposals');
  };

  // Action: Submit for Pre-Proposal Analysis
  const handlePreProposalAnalysisAction = () => {
    const data = buildProposalDataObject();
    const created = handleCreateProposingProposal(data, 'pre-proposal');
    onNavigate('pre-proposal-report', created.id);
  };

  const sections = [
    { num: 1, title: '1. Basic' },
    { num: 2, title: '2. Proposal Info' },
    { num: 3, title: '3. Geography & GIS' },
    { num: 4, title: '4. Financial' },
    { num: 5, title: '5. Timeline' },
    { num: 6, title: '6. Statutory Clause' },
    { num: 7, title: '7. Review & Submit' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>CREATE PROJECT PROPOSAL VARIANT</h1>
          <p>
            Initiate Land Acquisition Proposal Package under {selectedProject?.name} ({selectedProjectId})
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('proposals')}>
            <ArrowLeft size={14} /> Back to Proposals
          </button>
        </div>
      </div>

      {/* Section Indicator Tabs */}
      <div className="card" style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {sections.map(s => (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveSection(s.num)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeSection === s.num ? '#005A36' : '#F1F5F9',
                color: activeSection === s.num ? '#FFFFFF' : '#475569',
                fontSize: '12px',
                fontWeight: activeSection === s.num ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="card" style={{ padding: '24px 28px' }}>
        {/* SECTION 1: BASIC */}
        {activeSection === 1 && (
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              1. Basic Association
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
              Select parent project entity and define package/variant identity.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Parent Project *</label>
                <select
                  className="form-select"
                  value={selectedProjectId}
                  onChange={e => setSelectedProjectId(e.target.value)}
                >
                  {proposingProjects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Department Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={departmentName}
                  onChange={e => setDepartmentName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Proposal Variant / Component Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Package 2 — Haveli-Khed Main Line Land Acquisition"
                  value={variant}
                  onChange={e => setVariant(e.target.value)}
                  required
                />
                <span style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>
                  Variant specifies which geographical reach, package, or component of the larger project this proposal relates to.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: PROPOSAL INFORMATION */}
        {activeSection === 2 && (
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              2. Proposal Information
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
              Category under RFCTLARR Act 2013 and executive organizational structure.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Full Proposal Title *</label>
                <input
                  type="text"
                  className="form-control"
                  value={proposalName}
                  onChange={e => setProposalName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category under RFCTLARR Act 2013 *</label>
                <select className="form-select" value={categoryRfctlarr} onChange={e => setCategoryRfctlarr(e.target.value)}>
                  <option value="Railways & Transport Infrastructure under Schedule 4">Railways & Transport Infrastructure (Schedule 4)</option>
                  <option value="National & State Highway Corridor">National & State Highway Corridor</option>
                  <option value="Industrial Corridor & SEZ Infrastructure">Industrial Corridor & SEZ Infrastructure</option>
                  <option value="Urban Transit & Smart City Project">Urban Transit & Smart City Project</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Applicable Statutory Laws *</label>
                <input
                  type="text"
                  className="form-control"
                  value={applicableLaws}
                  onChange={e => setApplicableLaws(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Total Land Required for Variant (Ha) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={totalLandRequiredHa}
                  onChange={e => setTotalLandRequiredHa(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Implementing Agency *</label>
                <input
                  type="text"
                  className="form-control"
                  value={implementingAgency}
                  onChange={e => setImplementingAgency(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Implementation Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Completion Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: GEOGRAPHY & GIS */}
        {activeSection === 3 && (
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              3. Geography & Linked Cadastral GIS Parcels
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
              Specific survey numbers and direct link to parent project GIS boundary dataset.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">State</label>
                <input type="text" className="form-control" value={state} readOnly />
              </div>

              <div className="form-group">
                <label className="form-label">District</label>
                <input type="text" className="form-control" value={district} onChange={e => setDistrict(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Affected Village(s)</label>
                <input type="text" className="form-control" value={village} onChange={e => setVillage(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Survey Numbers Included</label>
                <input type="text" className="form-control mono-code" value={surveyNumber} onChange={e => setSurveyNumber(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Land Classification</label>
                <input type="text" className="form-control" value={landType} onChange={e => setLandType(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Affected Landowners / Tenants Count</label>
                <input type="number" className="form-control" value={ownersTenantsCount} onChange={e => setOwnersTenantsCount(e.target.value)} />
              </div>

              {/* GIS Linked Parcels Box */}
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Selected Project Cadastral Parcels Linked to this Variant</label>
                <div style={{
                  background: '#F0FDF4',
                  border: '1.5px solid #86EFAC',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#005A36' }}>
                      {selectedParcels.length} Cadastral Parcels Linked via SWADESH GIS
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '2px' }}>
                      Survey Nos: {selectedParcels.map(p => p.surveyNo).join(', ')} • Total Area: {selectedParcels.reduce((acc, p) => acc + p.areaHa, 0).toFixed(2)} Ha
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => onNavigate('map')}
                    style={{ fontSize: '11px', fontWeight: 700 }}
                  >
                    View on GIS Map →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: FINANCIAL */}
        {activeSection === 4 && (
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              4. Financial Information & Sanction Number
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
              Cost allocation, advance deposit, and formal statutory sanction.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Estimated Variant Cost (₹ in Crores) *</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={estimatedCost}
                  onChange={e => setEstimatedCost(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Advance Escrow Deposit Required (₹ in Crores) *</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={advanceDeposit}
                  onChange={e => setAdvanceDeposit(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Administrative Sanction Order Number *</label>
                <input
                  type="text"
                  className="form-control mono-code"
                  value={sanctionNumber}
                  onChange={e => setSanctionNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sanctioning Authority *</label>
                <input
                  type="text"
                  className="form-control"
                  value={issuingAuthority}
                  onChange={e => setIssuingAuthority(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sanction Date *</label>
                <input
                  type="date"
                  className="form-control"
                  value={sanctionDate}
                  onChange={e => setSanctionDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: TIMELINE & MILESTONES */}
        {activeSection === 5 && (
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              5. Statutory Timeline & Milestones
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
              Track statutory stages from proposal preparation to possession and mutation.
            </p>

            <table className="gov-table">
              <thead>
                <tr>
                  <th>Milestone Stage</th>
                  <th>Target Planned Date</th>
                  <th>Current Status</th>
                  <th>Remarks / Statutory Section</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600, color: '#0F172A', fontSize: '12.5px' }}>
                      {m.name}
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={m.plannedDate}
                        onChange={e => {
                          const val = e.target.value;
                          setMilestones(prev => prev.map((item, i) => i === idx ? { ...item, plannedDate: val } : item));
                        }}
                        style={{ fontSize: '11.5px', padding: '4px 8px' }}
                      />
                    </td>
                    <td>
                      <span className={`badge ${m.status === 'Completed' ? 'badge-green' : m.status === 'In Progress' ? 'badge-orange' : 'badge-blue'}`} style={{ fontSize: '10.5px' }}>
                        {m.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '11.5px', color: '#64748B' }}>
                      {m.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SECTION 6: STATUTORY CLAUSE */}
        {activeSection === 6 && (
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              6. Statutory Urgency Clause (Section 40)
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
              Statutory grounds for urgency invocation. Requires rigorous administrative justification.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>
                    Is this proposal urgent under Section 40 of RFCTLARR Act 2013?
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                    Enables fast-track possession prior to full award declaration, subject to Cabinet approval.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                    <input type="radio" name="urgencyRadio" checked={isUrgent} onChange={() => setIsUrgent(true)} />
                    YES
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                    <input type="radio" name="urgencyRadio" checked={!isUrgent} onChange={() => setIsUrgent(false)} />
                    NO
                  </label>
                </div>
              </div>

              {isUrgent && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Statutory Legal Basis *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={statutoryBasis}
                      onChange={e => setStatutoryBasis(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Detailed Reason & Strategic Urgency Justification *</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={urgencyReason}
                      onChange={e => setUrgencyReason(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 7: REVIEW & ACTIONS */}
        {activeSection === 7 && (
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              7. Proposal Review & Submission Decision
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
              Choose whether to save as an editable Draft or submit for automated AI / System Pre-Proposal Analysis.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px', background: '#F8FAFC' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#005A36', marginBottom: '8px' }}>
                  PROPOSAL SUMMARY: {proposalName}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12px', color: '#334155' }}>
                  <div><strong>Parent Project:</strong> {selectedProject?.name}</div>
                  <div><strong>Variant:</strong> {variant}</div>
                  <div><strong>Total Land:</strong> {totalLandRequiredHa} Ha</div>
                  <div><strong>Estimated Cost:</strong> ₹ {estimatedCost} Cr</div>
                  <div><strong>Advance Deposit:</strong> ₹ {advanceDeposit} Cr</div>
                  <div><strong>Statutory Urgency:</strong> {isUrgent ? 'YES (Sec 40)' : 'NO'}</div>
                </div>
              </div>

              {/* Action Pathways Explanation */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '16px', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>
                    <Save size={16} style={{ color: '#64748B' }} /> OPTION A: SAVE AS DRAFT
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '6px', lineHeight: 1.5 }}>
                    Saves your proposal safely in <strong>Draft</strong> status. You can return and modify any information later. No downstream state authority will treat it as submitted.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleSaveDraftAction}
                    style={{ marginTop: '12px', width: '100%', fontWeight: 700 }}
                  >
                    SAVE PROPOSAL AS DRAFT
                  </button>
                </div>

                <div style={{ border: '2px solid #005A36', borderRadius: '8px', padding: '16px', background: '#F0FDF4' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13.5px', color: '#005A36' }}>
                    <Sparkles size={16} /> OPTION B: SUBMIT FOR PRE-PROPOSAL ANALYSIS
                  </div>
                  <p style={{ fontSize: '12px', color: '#166534', marginTop: '6px', lineHeight: 1.5 }}>
                    Executes preliminary AI models against real historical projects across Maharashtra to evaluate land risk, delay predictions, cost validation, and R&R estimates before final submission.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handlePreProposalAnalysisAction}
                    style={{
                      marginTop: '12px',
                      width: '100%',
                      background: 'linear-gradient(135deg, #008E4F 0%, #006638 100%)',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Sparkles size={14} /> GENERATE PRE-PROPOSAL REPORT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #E2E8F0'
        }}>
          <div>
            {activeSection > 1 ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setActiveSection(prev => prev - 1)}
              >
                <ArrowLeft size={14} /> Previous Section
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onNavigate('proposals')}
              >
                Cancel
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSaveDraftAction}
            >
              SAVE DRAFT
            </button>

            {activeSection < 7 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setActiveSection(prev => prev + 1)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Next Section <ArrowRight size={14} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
