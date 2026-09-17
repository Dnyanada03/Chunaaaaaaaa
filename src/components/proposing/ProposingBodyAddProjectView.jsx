import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Building2,
  Calendar,
  MapPin,
  Upload,
  User,
  ShieldCheck,
  Map,
  Plus,
  Trash2,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';
import { swadeshCadastralParcels } from '../../data/proposingMockData';
import ProposingBodyDigitalSignModal from './ProposingBodyDigitalSignModal';

export default function ProposingBodyAddProjectView({ onNavigate }) {
  const { proposingOfficer, handleCreateProposingProject, getExactTimestamp } = useSwadesh();

  // Wizard Step State (1 to 7)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);

  // Form State: 1. Basic Information
  const [projectName, setProjectName] = useState('');
  const [requiringBody, setRequiringBody] = useState(proposingOfficer?.authority || 'Maharashtra Rail Infrastructure Development Corporation (Maharail)');
  const [projectType, setProjectType] = useState('Single State'); // 'Interstate' | 'Single State' | 'Central'
  const [projectTypeCategory, setProjectTypeCategory] = useState('Railway Transport Infrastructure');
  const [publicPurposeCategory, setPublicPurposeCategory] = useState('Strategic Public Transport Corridor & Freight Connectivity');
  const [projectDescription, setProjectDescription] = useState('');

  // Form State: 2. Justification
  const [purpose, setPurpose] = useState('');
  const [benefits, setBenefits] = useState('');
  const [landRequiredHa, setLandRequiredHa] = useState('');
  const [timeRequiredMonths, setTimeRequiredMonths] = useState('24');

  // Form State: 3. Financial Information
  const [estimatedCost, setEstimatedCost] = useState('');
  const [proposalDate, setProposalDate] = useState(new Date().toISOString().split('T')[0]);
  const [financialYear, setFinancialYear] = useState('2026–27');

  // Automatically calculate Financial Year from Proposal Date (Indian FY: April to March)
  useEffect(() => {
    if (proposalDate) {
      const d = new Date(proposalDate);
      const year = d.getFullYear();
      const month = d.getMonth() + 1; // 1-indexed (1 = Jan, 4 = Apr)
      let fy = '';
      if (month >= 4) {
        fy = `${year}–${(year + 1).toString().slice(-2)}`;
      } else {
        fy = `${year - 1}–${year.toString().slice(-2)}`;
      }
      setFinancialYear(fy);
    }
  }, [proposalDate]);

  // Form State: 4. Land & GIS
  const [landMethod, setLandMethod] = useState('gis'); // 'gis' | 'upload'
  const [selectedDistrict, setSelectedDistrict] = useState('Pune');
  const [selectedTaluka, setSelectedTaluka] = useState('Haveli');
  const [selectedVillage, setSelectedVillage] = useState('Charholi Budruk');
  const [availableParcels, setAvailableParcels] = useState(swadeshCadastralParcels);
  const [selectedParcels, setSelectedParcels] = useState(
    swadeshCadastralParcels.filter(p => p.selected)
  );

  // Auto-calculate land required if GIS parcels selected
  useEffect(() => {
    if (landMethod === 'gis' && selectedParcels.length > 0) {
      const sum = selectedParcels.reduce((acc, p) => acc + p.areaHa, 0).toFixed(2);
      if (!landRequiredHa || parseFloat(landRequiredHa) === 0) {
        setLandRequiredHa(sum);
      }
    }
  }, [selectedParcels, landMethod]);

  // Form State: 5. Documents
  const [documents, setDocuments] = useState([
    {
      id: 'DOC-NEW-01',
      name: 'Detailed Project Report (DPR).pdf',
      type: 'Project Detail Report',
      version: 1,
      uploadedBy: proposingOfficer?.name || 'Shri V. K. Sharma',
      department: proposingOfficer?.authority || 'Maharail',
      uploadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      exactTimestamp: getExactTimestamp(),
      status: 'Ready for Signature',
      fileSize: '14.5 MB'
    },
    {
      id: 'DOC-NEW-02',
      name: 'Preliminary Feasibility Study.pdf',
      type: 'Feasibility Report',
      version: 1,
      uploadedBy: proposingOfficer?.name || 'Shri V. K. Sharma',
      department: proposingOfficer?.authority || 'Maharail',
      uploadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      exactTimestamp: getExactTimestamp(),
      status: 'Ready for Signature',
      fileSize: '8.2 MB'
    }
  ]);

  // Form State: 6. Officer Details
  const [officerName, setOfficerName] = useState(proposingOfficer?.name || 'Shri V. K. Sharma');
  const [officerDesignation, setOfficerDesignation] = useState(proposingOfficer?.designation || 'Chief General Manager (Land)');
  const [officerDepartment, setOfficerDepartment] = useState(proposingOfficer?.authority || 'Maharail');
  const [officerContact, setOfficerContact] = useState(proposingOfficer?.phone || '+91 22 2288 3491');
  const [officerEmail, setOfficerEmail] = useState(proposingOfficer?.email || 'vksharma.cgm@maharail.com');

  // Parcel Toggle in GIS selector
  const toggleParcelSelection = (parcel) => {
    const isSelected = selectedParcels.some(p => p.id === parcel.id);
    if (isSelected) {
      setSelectedParcels(prev => prev.filter(p => p.id !== parcel.id));
    } else {
      setSelectedParcels(prev => [...prev, parcel]);
    }
  };

  // Compute total selected GIS area
  const totalSelectedGisArea = selectedParcels.reduce((acc, p) => acc + p.areaHa, 0).toFixed(2);

  // Handle Save as Draft
  const handleSaveDraft = () => {
    const draftData = {
      name: projectName || 'Untitled Draft Project',
      authority: requiringBody,
      ministry: 'Transport & Infrastructure',
      department: officerDepartment,
      projectType,
      projectCategory: projectTypeCategory,
      publicPurposeCategory,
      description: projectDescription,
      district: selectedDistrict,
      taluka: selectedTaluka,
      villages: [...new Set(selectedParcels.map(p => p.village))],
      landRequiredHa: landRequiredHa || totalSelectedGisArea,
      estimatedBudget: estimatedCost ? `₹ ${estimatedCost} Cr` : '₹ 0.00 Cr',
      financialYear,
      proposalDate,
      totalLandowners: selectedParcels.length * 2,
      timeline: `${timeRequiredMonths} Months`,
      documents
    };

    const saved = handleCreateProposingProject(draftData, true);
    onNavigate('projects');
  };

  // Triggered when Class-3 DSC signing completes
  const handleDigitalSigningComplete = (signCert) => {
    setIsSignModalOpen(false);

    const projectData = {
      name: projectName,
      authority: requiringBody,
      ministry: 'Transport & Infrastructure',
      department: officerDepartment,
      projectType,
      projectCategory: projectTypeCategory,
      publicPurposeCategory,
      description: projectDescription,
      district: selectedDistrict,
      taluka: selectedTaluka,
      villages: [...new Set(selectedParcels.map(p => p.village))],
      landRequiredHa: landRequiredHa || totalSelectedGisArea,
      estimatedBudget: `₹ ${estimatedCost} Cr`,
      financialYear,
      proposalDate,
      totalLandowners: selectedParcels.length * 2,
      timeline: `${timeRequiredMonths} Months`,
      documents,
      signerName: signCert.signer
    };

    const created = handleCreateProposingProject(projectData, false, signCert);
    onNavigate('project-detail', created.id);
  };

  const steps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Justification' },
    { num: 3, label: 'Financial' },
    { num: 4, label: 'Land & GIS' },
    { num: 5, label: 'Documents' },
    { num: 6, label: 'Officer Details' },
    { num: 7, label: 'Review & Sign' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>CREATE NEW LAND ACQUISITION PROJECT</h1>
          <p>
            Official E-Governance Project Initiation Form • RFCTLARR Act 2013 Compliance
          </p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('projects')}>
          <ArrowLeft size={14} /> Back to Projects
        </button>
      </div>

      {/* Stepper Progress Bar */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {steps.map((step, idx) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <React.Fragment key={step.num}>
                <div
                  onClick={() => setCurrentStep(step.num)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    opacity: isCurrent || isCompleted ? 1 : 0.6
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isCompleted ? '#008E4F' : isCurrent ? '#005A36' : '#E2E8F0',
                    color: isCurrent || isCompleted ? '#FFFFFF' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {isCompleted ? '✓' : step.num}
                  </div>
                  <span style={{
                    fontSize: '12.5px',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? '#005A36' : '#334155'
                  }}>
                    {step.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: '2px',
                    background: currentStep > step.num ? '#008E4F' : '#E2E8F0',
                    margin: '0 8px'
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content Shell */}
      <div className="card" style={{ padding: '24px 28px' }}>
        {/* STEP 1: BASIC INFORMATION */}
        {currentStep === 1 && (
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              1. Basic Project Information
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '20px' }}>
              Standard institutional specifications of the infrastructure project.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Project Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Pune–Nashik Semi High-Speed Rail Corridor"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Requiring Body / Department *</label>
                <input
                  type="text"
                  className="form-control"
                  value={requiringBody}
                  onChange={e => setRequiringBody(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Type Jurisdiction *</label>
                <select className="form-select" value={projectType} onChange={e => setProjectType(e.target.value)}>
                  <option value="Single State">Single State (Maharashtra)</option>
                  <option value="Interstate">Interstate (Connecting Multiple States)</option>
                  <option value="Central">Central Govt. Undertaking</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Project Type Category *</label>
                <select className="form-select" value={projectTypeCategory} onChange={e => setProjectTypeCategory(e.target.value)}>
                  <option value="Railway Transport Infrastructure">Railway Transport Infrastructure</option>
                  <option value="Access-Controlled Expressway">Access-Controlled Expressway</option>
                  <option value="Metro Rail Corridor">Metro Rail Corridor</option>
                  <option value="Industrial SEZ / Logistics Park">Industrial SEZ / Logistics Park</option>
                  <option value="Port & Maritime Infrastructure">Port & Maritime Infrastructure</option>
                  <option value="Irrigation Canal & Reservoir">Irrigation Canal & Reservoir</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Public Purpose Category (RFCTLARR Sec 2) *</label>
                <select className="form-select" value={publicPurposeCategory} onChange={e => setPublicPurposeCategory(e.target.value)}>
                  <option value="Strategic Public Transport Corridor & Freight Connectivity">Strategic Public Transport Corridor & Freight Connectivity</option>
                  <option value="Industrial Corridor & Manufacturing Node">Industrial Corridor & Manufacturing Node</option>
                  <option value="Water Supply & Agricultural Irrigation Project">Water Supply & Agricultural Irrigation Project</option>
                  <option value="Urban Infrastructure & Decongestion">Urban Infrastructure & Decongestion</option>
                  <option value="Rural Road & National Highway Connectivity">Rural Road & National Highway Connectivity</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Comprehensive Project Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Provide executive summary of alignment, strategic necessity, and intended public outcome..."
                  value={projectDescription}
                  onChange={e => setProjectDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: JUSTIFICATION */}
        {currentStep === 2 && (
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              2. Project Justification & Physical Scope
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '20px' }}>
              Statutory purpose, anticipated public benefits, and total footprint.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Statutory Public Purpose *</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="e.g. Reduce commuter transit time, connect rural agro-clusters to markets, enhance freight mobility..."
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Anticipated Public & Regional Benefits</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Direct and indirect economic, environmental, and employment benefits..."
                  value={benefits}
                  onChange={e => setBenefits(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Total Land Required (Hectares) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="e.g. 380.5"
                  value={landRequiredHa}
                  onChange={e => setLandRequiredHa(e.target.value)}
                  required
                />
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  Auto-updated if GIS parcels are selected in Step 4.
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Total Time Required to Implement (Months) *</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 24"
                  value={timeRequiredMonths}
                  onChange={e => setTimeRequiredMonths(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: FINANCIAL INFORMATION */}
        {currentStep === 3 && (
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              3. Financial Information & Automatic Financial Year Detection
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '20px' }}>
              Budgetary allocation and automatic statutory Indian Financial Year calculation.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Estimated Project Cost (₹ in Crores) *</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  placeholder="e.g. 1250.0"
                  value={estimatedCost}
                  onChange={e => setEstimatedCost(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Proposal *</label>
                <input
                  type="date"
                  className="form-control"
                  value={proposalDate}
                  onChange={e => setProposalDate(e.target.value)}
                  required
                />
              </div>

              {/* Automatic Financial Year Detection Box */}
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Financial Year (Automatically Derived)</label>
                <div style={{
                  background: '#F0FDF4',
                  border: '1.5px solid #86EFAC',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>
                      STATUTORY FINANCIAL YEAR
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#005A36', fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
                      FY {financialYear}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '2px' }}>
                      Automatically computed from proposal date ({proposalDate}) based on Indian Fiscal Cycle (01 April – 31 March).
                    </div>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: '11px' }}>
                    Auto-Computed ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: LAND & GIS */}
        {currentStep === 4 && (
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              4. Land Requirements & SWADESH GIS Mapping
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '16px' }}>
              Select cadastral survey parcels directly using the integrated SWADESH GIS engine or upload land alignment maps.
            </p>

            {/* Method Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
              <button
                type="button"
                onClick={() => setLandMethod('gis')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: landMethod === 'gis' ? '2px solid #005A36' : '1px solid #CBD5E1',
                  background: landMethod === 'gis' ? '#F0FDF4' : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#005A36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} /> OPTION B: USE SWADESH GIS (RECOMMENDED)
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                  Interactive cadastral parcel selection, survey number validation & automatic area tally.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLandMethod('upload')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: landMethod === 'upload' ? '2px solid #005A36' : '1px solid #CBD5E1',
                  background: landMethod === 'upload' ? '#F0FDF4' : '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#005A36', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Upload size={16} /> OPTION A: UPLOAD LAND MAP DOCUMENT
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                  Upload verified geo-referenced KML, Shapefile, or signed survey boundary sheet.
                </div>
              </button>
            </div>

            {landMethod === 'gis' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Jurisdiction Selectors */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div>
                    <label className="form-label">Select State</label>
                    <input type="text" className="form-control" value="Maharashtra" readOnly />
                  </div>
                  <div>
                    <label className="form-label">Select District</label>
                    <select className="form-select" value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
                      <option value="Pune">Pune District</option>
                      <option value="Thane">Thane District</option>
                      <option value="Nagpur">Nagpur District</option>
                      <option value="Nashik">Nashik District</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Select Taluka</label>
                    <select className="form-select" value={selectedTaluka} onChange={e => setSelectedTaluka(e.target.value)}>
                      <option value="Haveli">Haveli Taluka</option>
                      <option value="Khed">Khed Taluka</option>
                      <option value="Mulshi">Mulshi Taluka</option>
                    </select>
                  </div>
                </div>

                {/* Cadastral Parcel Selection Grid */}
                <div style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: '#F8FAFC',
                    padding: '10px 14px',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>
                      Available 7/12 Cadastral Survey Parcels in {selectedTaluka}
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#005A36', fontWeight: 700 }}>
                      Selected Area: {totalSelectedGisArea} Ha ({selectedParcels.length} Parcels)
                    </span>
                  </div>

                  <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                    <table className="gov-table" style={{ margin: 0 }}>
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>Select</th>
                          <th>Survey / Gut No</th>
                          <th>Village</th>
                          <th>Landowner (7/12 Extract)</th>
                          <th>Area (Ha)</th>
                          <th>Land Classification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {availableParcels.map(parcel => {
                          const isSelected = selectedParcels.some(p => p.id === parcel.id);
                          return (
                            <tr key={parcel.id} style={{ background: isSelected ? '#F0FDF4' : 'transparent' }}>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleParcelSelection(parcel)}
                                />
                              </td>
                              <td style={{ fontWeight: 700 }} className="mono-code">{parcel.surveyNo}</td>
                              <td>{parcel.village}</td>
                              <td>{parcel.landowner}</td>
                              <td style={{ fontWeight: 600 }}>{parcel.areaHa} Ha</td>
                              <td style={{ fontSize: '11.5px' }}>{parcel.type}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                border: '2px dashed #CBD5E1',
                borderRadius: '8px',
                padding: '30px',
                textAlign: 'center',
                background: '#F8FAFC'
              }}>
                <Upload size={32} style={{ color: '#005A36', marginBottom: '8px' }} />
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>
                  Upload Cadastral Survey Alignment Map
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Supported formats: KML, GeoJSON, Shapefile (.zip), or High-Resolution Signed PDF (Max 50MB)
                </div>
                <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: '12px' }}>
                  Select File from Computer
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: DOCUMENTS */}
        {currentStep === 5 && (
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              5. Project Creation Documents & Verification
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '16px' }}>
              Upload mandatory project sanction documents with full audit timestamping and version control.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {documents.map((doc, idx) => (
                <div
                  key={doc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    background: '#F8FAFC'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileText size={20} style={{ color: '#005A36' }} />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>{doc.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        Type: <strong>{doc.type}</strong> • Version: <strong>v{doc.version}</strong> • Size: {doc.fileSize} • Uploaded by: {doc.uploadedBy}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#005A36', marginTop: '2px', fontWeight: 600 }}>
                        Exact Timestamp: {doc.exactTimestamp}
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-green" style={{ fontSize: '11px' }}>
                    {doc.status}
                  </span>
                </div>
              ))}

              {/* Upload Box */}
              <div style={{
                border: '1px dashed #008E4F',
                borderRadius: '8px',
                padding: '16px',
                background: '#F0FDF4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Upload size={18} style={{ color: '#005A36' }} />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#005A36' }}>
                      Upload Additional Document (PPP Agreement, Admin Sanction, or Land NOC)
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      Every document upload is recorded with exact IST timestamp and versioning.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    const newDoc = {
                      id: `DOC-NEW-${Date.now().toString().slice(-4)}`,
                      name: 'Administrative Sanction Order.pdf',
                      type: 'Administrator Approval',
                      version: 1,
                      uploadedBy: proposingOfficer?.name || 'Shri V. K. Sharma',
                      department: proposingOfficer?.authority || 'Maharail',
                      uploadDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                      exactTimestamp: getExactTimestamp(),
                      status: 'Ready for Signature',
                      fileSize: '3.4 MB'
                    };
                    setDocuments(prev => [...prev, newDoc]);
                  }}
                  style={{ fontSize: '11.5px', fontWeight: 600 }}
                >
                  <Plus size={14} /> Add Sanction File
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: OFFICER DETAILS */}
        {currentStep === 6 && (
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              6. Proposing Officer & Authorized Signatory
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '20px' }}>
              Responsible officer credentials associated with project initiation.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Officer Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={officerName}
                  onChange={e => setOfficerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Official Designation *</label>
                <input
                  type="text"
                  className="form-control"
                  value={officerDesignation}
                  onChange={e => setOfficerDesignation(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Department / Agency *</label>
                <input
                  type="text"
                  className="form-control"
                  value={officerDepartment}
                  onChange={e => setOfficerDepartment(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cadre / Identification Code</label>
                <input
                  type="text"
                  className="form-control mono-code"
                  value={proposingOfficer?.govtId || "MH-MR-CGM-2006-019"}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label className="form-label">Official Email ID *</label>
                <input
                  type="email"
                  className="form-control"
                  value={officerEmail}
                  onChange={e => setOfficerEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Official Contact Number *</label>
                <input
                  type="text"
                  className="form-control"
                  value={officerContact}
                  onChange={e => setOfficerContact(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: REVIEW & DIGITAL SIGNATURE */}
        {currentStep === 7 && (
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
              7. Review & Official Digital Signature Sign-Off
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '20px' }}>
              Final statutory verification. Project is NOT officially created until signed with Class-3 DSC token.
            </p>

            {/* Review Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Section 1 & 2 */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#005A36', textTransform: 'uppercase' }}>
                    PROJECT & SCOPE SPECIFICATIONS
                  </span>
                  <button type="button" onClick={() => setCurrentStep(1)} style={{ background: 'none', border: 'none', color: '#005A36', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>
                    Edit
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12.5px' }}>
                  <div><strong>Name:</strong> {projectName || 'Untitled'}</div>
                  <div><strong>Authority:</strong> {requiringBody}</div>
                  <div><strong>Type:</strong> {projectType}</div>
                  <div><strong>Category:</strong> {projectTypeCategory}</div>
                  <div><strong>Total Land:</strong> {landRequiredHa || totalSelectedGisArea} Ha</div>
                  <div><strong>Duration:</strong> {timeRequiredMonths} Months</div>
                </div>
              </div>

              {/* Section 3 & 4 */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#005A36', textTransform: 'uppercase' }}>
                    FINANCIAL & GIS PARCELS
                  </span>
                  <button type="button" onClick={() => setCurrentStep(3)} style={{ background: 'none', border: 'none', color: '#005A36', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>
                    Edit
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12.5px' }}>
                  <div><strong>Estimated Cost:</strong> ₹ {estimatedCost || '0.00'} Cr</div>
                  <div><strong>Proposal Date:</strong> {proposalDate}</div>
                  <div><strong>Financial Year:</strong> FY {financialYear}</div>
                  <div><strong>District:</strong> {selectedDistrict}</div>
                  <div><strong>Taluka:</strong> {selectedTaluka}</div>
                  <div><strong>GIS Parcels:</strong> {selectedParcels.length} selected ({totalSelectedGisArea} Ha)</div>
                </div>
              </div>

              {/* Section 5 & 6 */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#005A36', textTransform: 'uppercase' }}>
                    DOCUMENTS & SIGNING OFFICER
                  </span>
                  <button type="button" onClick={() => setCurrentStep(5)} style={{ background: 'none', border: 'none', color: '#005A36', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>
                    Edit
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12.5px' }}>
                  <div><strong>Documents:</strong> {documents.length} verified files</div>
                  <div><strong>Proposing Officer:</strong> {officerName}</div>
                  <div><strong>Designation:</strong> {officerDesignation}</div>
                </div>
              </div>

              {/* Mandatory Digital Signature Callout */}
              <div style={{
                background: '#FEF3C7',
                border: '1.5px solid #FDE68A',
                borderRadius: '8px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <ShieldCheck size={22} style={{ color: '#B45309', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '12px', color: '#92400E', lineHeight: 1.5 }}>
                  <strong>MANDATORY STATUTORY REQUIREMENT (SECTION 18):</strong><br />
                  The project is <strong>NOT officially created</strong> merely by completing this form. Clicking <em>"Digitally Sign & Create Project"</em> will open the Class-3 Digital Signature verification dialog. If you cancel or close the dialog, this project will remain saved safely in your <strong>Drafts</strong> repository.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '28px',
          paddingTop: '16px',
          borderTop: '1px solid #E2E8F0'
        }}>
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                <ArrowLeft size={14} /> Previous Step
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onNavigate('projects')}
              >
                Cancel
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSaveDraft}
              title="Save project draft and return to list"
            >
              SAVE DRAFT
            </button>

            {currentStep < 7 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setCurrentStep(prev => prev + 1)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Next Step <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsSignModalOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #008E4F 0%, #006638 100%)',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ShieldCheck size={16} />
                DIGITALLY SIGN & CREATE PROJECT
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Class-3 DSC Digital Sign Modal */}
      <ProposingBodyDigitalSignModal
        isOpen={isSignModalOpen}
        onClose={() => setIsSignModalOpen(false)}
        projectData={{
          name: projectName || 'Untitled Project',
          authority: requiringBody,
          district: selectedDistrict,
          landRequiredHa: landRequiredHa || totalSelectedGisArea,
          estimatedBudget: `₹ ${estimatedCost || '0'} Cr`,
          financialYear
        }}
        onSigningComplete={handleDigitalSigningComplete}
      />
    </div>
  );
}
