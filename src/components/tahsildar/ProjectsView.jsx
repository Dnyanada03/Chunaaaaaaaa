import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  FolderKanban,
  Search,
  Building2,
  MapPin,
  FileText,
  CreditCard,
  ShieldCheck,
  Eye,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Building,
  UserCheck,
  ChevronRight,
  Send,
  IndianRupee,
  Layers,
  Users,
  Maximize2,
  ArrowRight
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const ProjectsView = () => {
  const {
    projects,
    parcels,
    selectedProjectId,
    setSelectedProjectId,
    selectedParcel,
    setSelectedParcel,
    triggerDigitalSignModal,
    setIsDocViewerOpen,
    setActiveDoc,
    setActiveTab
  } = useSwadesh();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' (All projects photo grid) or 'detail' (Selected project full view)
  const [searchTerm, setSearchTerm] = useState('');
  const [gridSearch, setGridSearch] = useState('');
  const [selectedVillageTab, setSelectedVillageTab] = useState('All');

  // Active project lookup
  const currentIndex = projects.findIndex(p => p.id === selectedProjectId);
  const currentProject = projects[currentIndex >= 0 ? currentIndex : 0];

  // Brief project descriptions lookup map
  const briefDescriptions = {
    "PRJ-MH-2026-101": "High-Speed Access Controlled Expressway Road corridor spanning across revenue villages Wagholi, Avalwadi, Manjari Khurd, and Phursungi in Haveli Taluka. Active field verification for 320 assigned land parcels.",
    "PRJ-MH-2026-102": "National Highway Expansion from 6-lane to 8-lane covering revenue villages Khed Shivapur, Shindewadi, and Golewadi. Includes rights-of-way widening and statutory notice issuance for 185 parcels.",
    "PRJ-MH-2026-140": "Hydro-Reservoir & Canal Right-of-Way Acquisition in Mulshi Taluka spanning Male, Bhadas, and Kolewadi revenue villages. Covers 195.2 Ha of total assigned land area across 210 parcels.",
    "PRJ-MH-2026-088": "Industrial Logistics Corridor & Warehousing Hub acquisition in Khed Taluka spanning Nighoje, Kuruli, and Vasuli villages. Covers 210.5 Ha total area across 450 land parcels."
  };

  // Filter all projects for grid search
  const filteredProjectsGrid = projects.filter(p => {
    const q = gridSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.taluka.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.villages.some(v => v.toLowerCase().includes(q))
    );
  });

  // Filter parcels for the selected project
  const projectParcels = parcels.filter(p => p.projectId === currentProject.id);
  const filteredParcels = projectParcels.filter(p => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.landowner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.surveyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.village.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVillage = selectedVillageTab === 'All' || p.village === selectedVillageTab;
    return matchesSearch && matchesVillage;
  });

  const handleOpenProjectDetail = (projId) => {
    setSelectedProjectId(projId);
    setSelectedVillageTab('All');
    setViewMode('detail');
  };

  // STEP 3: Parcel Detail & Verification Review Page
  if (selectedParcel) {
    const p = selectedParcel;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setSelectedParcel(null)}
          style={{ width: 'fit-content', gap: '6px' }}
        >
          <ArrowLeft size={15} /> Back to Project Overview
        </button>

        {/* Parcel Banner */}
        <div className="page-banner">
          <div className="page-title-group">
            <h1>Land Parcel Record: <span className="mono-code">{p.id}</span> (Survey #{p.surveyNumber})</h1>
            <p>Landowner: {p.landowner} • Revenue Village: {p.village} • Project ID: <span className="mono-code">{p.projectId}</span></p>
          </div>
          <StatusBadge status={p.verificationStatus} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            {/* Section 1: Parcel Basic Details */}
            <div style={{ paddingBottom: '16px', marginBottom: '18px', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0B4726', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                1. Parcel & Land Area Specifications
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', fontSize: '13.5px' }}>
                <div><span style={{ color: '#64748B' }}>Parcel ID:</span> <span className="mono-code">{p.id}</span></div>
                <div><span style={{ color: '#64748B' }}>Survey / Gut No:</span> <span className="mono-code">{p.surveyNumber}</span></div>
                <div><span style={{ color: '#64748B' }}>Revenue Village:</span> <strong>{p.village}</strong></div>
                <div><span style={{ color: '#64748B' }}>Total Parcel Area:</span> <strong>{p.totalAreaHa} Ha</strong></div>
                <div><span style={{ color: '#64748B' }}>Acquired Area:</span> <strong style={{ color: '#0B4726' }}>{p.acquiredAreaHa} Ha ({p.acquiredAreaSqM} sq.m)</strong></div>
                <div><span style={{ color: '#64748B' }}>Sub-Registrar Rate:</span> <strong>₹ {p.subRegistrarRateSqM.toLocaleString('en-IN')}/sq.m</strong></div>
              </div>
            </div>

            {/* Section 2: Document Verification Review */}
            <div style={{ paddingBottom: '16px', marginBottom: '18px', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0B4726', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FileText size={16} /> 2. Document Verification Register</span>
                <StatusBadge status={p.docVerificationStatus} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: "Satbara 7/12 Extract Record", status: "Verified by Talathi" },
                  { name: "8A Land Holding Extract", status: "Verified by Talathi" },
                  { name: "Heirship / Ownership Verification Record", status: p.docVerificationStatus }
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 16px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      background: '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '13.5px', color: '#0F172A' }}>{doc.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>DB Auto-Fetched • Status: {doc.status}</div>
                    </div>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setActiveDoc({
                          title: doc.name,
                          village: p.village,
                          surveyNumber: p.surveyNumber,
                          parcelId: p.id,
                          landowner: p.landowner
                        });
                        setIsDocViewerOpen(true);
                      }}
                    >
                      <Eye size={13} /> Inspect Document
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Bank Details Verification */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0B4726', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CreditCard size={16} /> 3. Bank Account & Direct Benefit Transfer (DBT) Verification</span>
                <StatusBadge status={p.bankVerificationStatus} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13.5px' }}>
                <div><span style={{ color: '#64748B' }}>Landowner Aadhaar No:</span> <span className="mono-code">{p.aadharNo}</span></div>
                <div><span style={{ color: '#64748B' }}>Bank Name:</span> <strong>{p.bankName}</strong></div>
                <div><span style={{ color: '#64748B' }}>Bank Account No:</span> <span className="mono-code">{p.bankAccount}</span></div>
                <div><span style={{ color: '#64748B' }}>IFSC Code:</span> <span className="mono-code">{p.ifsc}</span></div>
                <div><span style={{ color: '#64748B' }}>PFMS Verification:</span> <strong style={{ color: '#1E7E34' }}>{p.pfmsStatus}</strong></div>
                <div><span style={{ color: '#64748B' }}>PFMS Txn Reference:</span> <span className="mono-code">{p.pfmsTxnId}</span></div>
              </div>
            </div>
          </div>

          {/* Tahsildar Approval Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ borderTop: '4px solid #0B4726', padding: '24px' }}>
              <div className="card-header" style={{ marginBottom: '14px', paddingBottom: '8px' }}>
                <div className="card-title" style={{ color: '#0B4726', fontWeight: '700' }}>Tahsildar Verification Authority</div>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px', lineHeight: '1.5' }}>
                Review Surveyor verification records. You can approve with your official Digital Signature or return to Talathi for corrections.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => triggerDigitalSignModal('compensation', p)}
                  style={{ padding: '10px 16px', fontSize: '13.5px' }}
                >
                  <ShieldCheck size={16} /> Digitally Sign & Approve Verification
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => alert(`Case ${p.id} sent back to Talathi for re-verification.`)}
                  style={{ padding: '10px 16px', fontSize: '13.5px' }}
                >
                  <RotateCcw size={16} /> Send Back to Talathi
                </button>
              </div>

              <div style={{ marginTop: '18px', padding: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', fontSize: '12px', color: '#64748B' }}>
                <strong style={{ color: '#0F172A' }}>Audit Register Log:</strong><br />
                Surveyor Verification: 24-Aug-2026<br />
                Talathi Sign-off: 26-Aug-2026<br />
                Sub-Registrar Sync: Active
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: INITIAL VIEW - GALLERY GRID OF ALL PROJECTS WITH PHOTOS & BRIEF DESCRIPTIONS
  if (viewMode === 'grid') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Banner */}
        <div className="page-banner">
          <div className="page-title-group">
            <h1>Land Acquisition Projects & Corridor Registry</h1>
            <p>Select any project card below to view multi-village corridors, landowner registers, and parcel verification workflows.</p>
          </div>
          <div style={{ fontSize: '13px', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '8px', fontWeight: '700' }}>
            {projects.length} Active Infrastructure Corridors
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="card" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '38px', height: '40px', fontSize: '13.5px', borderRadius: '8px' }}
                placeholder="Search projects by name, Project ID, village, district, or corridor type..."
                value={gridSearch}
                onChange={e => setGridSearch(e.target.value)}
              />
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748B' }} />
            </div>

            <div style={{ fontSize: '12.5px', fontWeight: '600', color: '#64748B' }}>
              Showing <strong style={{ color: '#0B4726' }}>{filteredProjectsGrid.length}</strong> of {projects.length} Corridor Projects
            </div>
          </div>
        </div>

        {/* Projects Photo Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredProjectsGrid.map(project => (
            <div
              key={project.id}
              className="card"
              style={{
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
              }}
              onClick={() => handleOpenProjectDetail(project.id)}
            >
              {/* Photo Cover with Status & ID Overlay */}
              <div style={{ position: 'relative', height: '210px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%)'
                }} />

                {/* Top Badges */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
                  <span className="mono-code" style={{
                    background: '#0B4726',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: '800',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    {project.id}
                  </span>
                  <span style={{
                    background: 'rgba(255,255,255,0.92)',
                    color: '#0F172A',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}>
                    {project.taluka} Sub-Division
                  </span>
                </div>

                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <StatusBadge status={project.status} />
                </div>

                {/* Bottom Overlay Info inside Photo */}
                <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px', color: '#FFFFFF' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: '600', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    {project.type}
                  </div>
                </div>
              </div>

              {/* Card Body & Description */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                <div>
                  <h3 style={{ fontSize: '17.5px', fontWeight: '800', color: '#0B4726', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                    {project.name}
                  </h3>
                  {/* Brief Description */}
                  <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.55', margin: '0' }}>
                    {briefDescriptions[project.id] || `Corridor stretch covering revenue villages ${project.villages.join(', ')}. Active field verification and statutory notification for assigned parcels.`}
                  </p>
                </div>

                {/* Key Metrics Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  padding: '12px',
                  borderRadius: '10px'
                }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', display: 'block' }}>Assigned Parcels</span>
                    <strong style={{ fontSize: '13.5px', color: '#0F172A' }}>{project.totalParcels} <span style={{ fontSize: '11px', color: '#1E7E34', fontWeight: '700' }}>({project.verifiedParcels} Verified)</span></strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', display: 'block' }}>Affected Landowners</span>
                    <strong style={{ fontSize: '13.5px', color: '#0F172A' }}>{project.totalLandowners} Owners</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', display: 'block' }}>Corridor Area</span>
                    <strong style={{ fontSize: '13.5px', color: '#0F172A' }}>{project.totalAreaHa} Ha</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', display: 'block' }}>Est. Compensation</span>
                    <strong style={{ fontSize: '13.5px', color: '#1E7E34' }}>{project.estCompensation}</strong>
                  </div>
                </div>

                {/* Village Tags */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '12px' }}>
                  <span style={{ fontWeight: '700', color: '#64748B', fontSize: '11px', textTransform: 'uppercase' }}>Villages:</span>
                  {project.villages.map(v => (
                    <span key={v} style={{ background: '#F1F5F9', color: '#334155', padding: '2px 8px', borderRadius: '4px', fontWeight: '600', fontSize: '11.5px' }}>
                      {v}
                    </span>
                  ))}
                </div>

                {/* CTA Action Footer */}
                <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                  <button
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      padding: '10px',
                      fontSize: '13.5px',
                      fontWeight: '700',
                      gap: '8px'
                    }}
                  >
                    Explore Project Details & Parcels <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP 2: PROJECT DETAILS VIEW (Triggered when user clicks on a project card)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Back Navigation Button */}
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => setViewMode('grid')}
        style={{ width: 'fit-content', gap: '6px' }}
      >
        <ArrowLeft size={15} /> Back to All Corridor Projects
      </button>

      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>{currentProject.name}</h1>
          <p>Project ID: <span className="mono-code" style={{ color: '#FFFFFF', fontWeight: '700' }}>{currentProject.id}</span> • Jurisdiction: {currentProject.taluka} Sub-Division, {currentProject.district} District</p>
        </div>
        <StatusBadge status={currentProject.status} />
      </div>

      {/* Active Project Full Showcase Section */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
        <div style={{ padding: '20px' }}>
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div className="mono-code" style={{ fontSize: '11px', fontWeight: '700', color: '#0B4726', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                PROJECT ID: {currentProject.id}
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0B4726', margin: '2px 0 0 0' }}>
                {currentProject.name}
              </h2>
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', textAlign: 'right' }}>
              Assigned by <strong style={{ color: '#0F172A' }}>Collectorate & Tahsildar Haveli</strong>
            </div>
          </div>

          {/* Project Stock Banner Photo */}
          <div style={{
            width: '100%',
            height: '240px',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid #E2E8F0',
            marginBottom: '16px'
          }}>
            <img
              src={currentProject.image}
              alt={currentProject.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(11, 71, 38, 0.92)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: '700',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}>
              {currentProject.status} • {currentProject.type}
            </div>

            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: '700',
              color: '#0F172A',
              border: '1px solid #E2E8F0'
            }}>
              Est. Compensation: <span style={{ color: '#1E7E34' }}>{currentProject.estCompensation}</span>
            </div>
          </div>

          {/* Summary Banner Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                PARCEL & LANDOWNER REGISTER SUMMARY
              </div>
              <div style={{ fontSize: '14.5px', fontWeight: '700', color: '#0F172A', marginTop: '2px' }}>
                {currentProject.totalParcels} Affected Parcels • {currentProject.totalLandowners} Landowners • {currentProject.totalAreaHa} Ha Total Area
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{
                borderRadius: '8px',
                padding: '9px 18px',
                fontSize: '13px'
              }}
              onClick={() => setActiveTab('notices')}
            >
              <Send size={14} /> Issue Statutory Notice
            </button>
          </div>

          {/* Project Detailed Description */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#0B4726', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              Land Acquisition Corridor Description
            </h4>
            <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.6', margin: '0' }}>
              {briefDescriptions[currentProject.id] || `Corridor stretch spanning across revenue villages ${currentProject.villages.join(', ')} under Haveli & Mulshi Sub-Division.`}
            </p>
          </div>
        </div>
      </div>

      {/* Affected Landowner Directory & Village Tabs */}
      <div className="card" style={{ padding: '20px' }}>
        <div className="card-header" style={{ marginBottom: '14px' }}>
          <div className="card-title" style={{ color: '#0B4726', fontWeight: '700' }}>
            <Building size={16} style={{ color: '#0B4726' }} />
            Village-Wise Landowner & Parcel Directory ({currentProject.name})
          </div>
          <div style={{ position: 'relative', width: '260px' }}>
            <input
              type="text"
              className="form-control"
              style={{ paddingLeft: '32px', fontSize: '12.5px', height: '36px' }}
              placeholder="Search landowner, parcel ID, survey..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '11px', color: '#64748B' }} />
          </div>
        </div>

        {/* Village Segregation Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', overflowX: 'auto' }}>
          <button
            className={`btn btn-sm ${selectedVillageTab === 'All' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedVillageTab('All')}
            style={{ borderRadius: '6px', fontSize: '12px' }}
          >
            All Villages ({currentProject.totalParcels})
          </button>
          {currentProject.villages.map(v => (
            <button
              key={v}
              className={`btn btn-sm ${selectedVillageTab === v ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedVillageTab(v)}
              style={{ borderRadius: '6px', fontSize: '12px' }}
            >
              {v} Village
            </button>
          ))}
        </div>

        {/* Landowner Table */}
        <div className="table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Parcel ID</th>
                <th>Survey Number</th>
                <th>Revenue Village</th>
                <th>Landowner Name</th>
                <th style={{ textAlign: 'right' }}>Acquired Area</th>
                <th>Verification Status</th>
                <th>Notice Status</th>
                <th>Compensation Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredParcels.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>
                    No landowner records match the selected village/search query.
                  </td>
                </tr>
              ) : (
                filteredParcels.map(p => (
                  <tr key={p.id}>
                    <td className="mono-code" style={{ fontWeight: '700', color: '#0B4726' }}>{p.id}</td>
                    <td className="mono-code">{p.surveyNumber}</td>
                    <td>{p.village}</td>
                    <td style={{ fontWeight: '600' }}>{p.landowner}</td>
                    <td style={{ textAlign: 'right', fontWeight: '600' }}>{p.acquiredAreaHa} Ha</td>
                    <td><StatusBadge status={p.verificationStatus} /></td>
                    <td><StatusBadge status={p.noticeStatus} /></td>
                    <td><StatusBadge status={p.compensationStatus} /></td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedParcel(p)}
                        style={{ fontSize: '12px' }}
                      >
                        <Eye size={13} /> Inspect Parcel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsView;
