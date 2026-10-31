import React, { useState } from 'react';
import {
  FolderKanban,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Sparkles,
  BarChart,
  Calendar,
  XCircle,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Grid,
  List,
  Building,
  Users,
  Send,
  Download,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Printer
} from 'lucide-react';
import {
  collectorProjectsMasterList,
  collectorTalukasProgress,
  collectorVillageProgress
} from '../../data/collectorMockData';

// Stock photo mapping for projects
const projectImages = {
  "PRJ-MH-2026-101": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
  "PRJ-MH-2026-102": "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80",
  "PRJ-MH-2026-140": "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80",
  "PRJ-MH-2026-088": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
};

// Mock landowners list for project corridor detail view with enriched specifications
const mockProjectLandowners = {
  "PRJ-MH-2026-101": [
    { id: "MH-PL-10234", surveyNo: "142/1A", landowner: "Rameshwar Dhondu Patil", village: "Wagholi", taluka: "Haveli", areaHa: 1.45, compensation: "₹ 48.50 Lakhs", status: "Approved", aadhaarNo: "7890 2341 9012", phone: "+91 98220 14892", bankName: "State Bank of India", bankAccount: "30192847561", ifsc: "SBIN0001429", pfmsStatus: "Verified (Ready for DBT)", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 1850 },
    { id: "MH-PL-10235", surveyNo: "142/2B", landowner: "Suresh Balwant Kadam", village: "Wagholi", taluka: "Haveli", areaHa: 0.92, compensation: "₹ 31.20 Lakhs", status: "In Verification", aadhaarNo: "6543 8901 2345", phone: "+91 98501 23984", bankName: "Bank of Baroda", bankAccount: "40928174625", ifsc: "BARB0HAVELI", pfmsStatus: "Bank A/c Verification Pending", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 1850 },
    { id: "MH-PL-10236", surveyNo: "188/4", landowner: "Ganesh Vitthal Shinde", village: "Avalwadi", taluka: "Haveli", areaHa: 2.10, compensation: "₹ 72.80 Lakhs", status: "Approved", aadhaarNo: "9012 3456 7890", phone: "+91 94223 88102", bankName: "HDFC Bank", bankAccount: "501002938475", ifsc: "HDFC0000492", pfmsStatus: "Verified (Ready for DBT)", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 1900 },
    { id: "MH-PL-10237", surveyNo: "94/1C", landowner: "Vilas Ramchandra More", village: "Manjari Khurd", taluka: "Haveli", areaHa: 1.80, compensation: "₹ 60.40 Lakhs", status: "Disbursement Pending", aadhaarNo: "4567 8901 2345", phone: "+91 97640 55192", bankName: "Canara Bank", bankAccount: "10982374652", ifsc: "CNRB0002819", pfmsStatus: "Verified (Ready for DBT)", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 1800 },
    { id: "MH-PL-10238", surveyNo: "210/3", landowner: "Sunita Ananda Deshmukh", village: "Phursungi", taluka: "Haveli", areaHa: 0.75, compensation: "₹ 25.50 Lakhs", status: "Notice Issued", aadhaarNo: "2345 6789 0123", phone: "+91 98902 44109", bankName: "Union Bank of India", bankAccount: "60293847152", ifsc: "UBIN0532819", pfmsStatus: "Verification Initiated", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 1750 }
  ],
  "PRJ-MH-2026-102": [
    { id: "MH-PL-20411", surveyNo: "45/1", landowner: "Anant Govind Joshi", village: "Khed Shivapur", taluka: "Haveli", areaHa: 1.20, compensation: "₹ 42.00 Lakhs", status: "Approved", aadhaarNo: "8901 2345 6789", phone: "+91 98221 00293", bankName: "State Bank of India", bankAccount: "30291847562", ifsc: "SBIN0001429", pfmsStatus: "Verified (Ready for DBT)", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 2100 },
    { id: "MH-PL-20412", surveyNo: "48/2A", landowner: "Prakash Tukaram Jadhav", village: "Shindewadi", taluka: "Haveli", areaHa: 0.85, compensation: "₹ 29.75 Lakhs", status: "Approved", aadhaarNo: "3456 7890 1234", phone: "+91 98502 99182", bankName: "ICICI Bank", bankAccount: "001928475629", ifsc: "ICIC0000182", pfmsStatus: "Verified (Ready for DBT)", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 2100 },
    { id: "MH-PL-20413", surveyNo: "62/3", landowner: "Baburao Shivram Chavan", village: "Golewadi", taluka: "Haveli", areaHa: 1.50, compensation: "₹ 52.50 Lakhs", status: "In Verification", aadhaarNo: "5678 9012 3456", phone: "+91 94220 33819", bankName: "Bank of Maharashtra", bankAccount: "60192837465", ifsc: "MAHB0000291", pfmsStatus: "Verification Pending", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 2100 }
  ],
  "PRJ-MH-2026-140": [
    { id: "MH-PL-30190", surveyNo: "112/1", landowner: "Eknath Mahadev Pawar", village: "Male", taluka: "Mulshi", areaHa: 3.40, compensation: "₹ 1.15 Cr", status: "High Risk Dispute", aadhaarNo: "1234 5678 9012", phone: "+91 97654 22109", bankName: "Axis Bank", bankAccount: "918029384756", ifsc: "UTIB0000392", pfmsStatus: "On Hold (Court Stay)", satbaraStatus: "Litigation Dispute Flagged", subRegistrarRateSqM: 1650 },
    { id: "MH-PL-30191", surveyNo: "114/2B", landowner: "Pandurang S. Gaikwad", village: "Bhadas", taluka: "Mulshi", areaHa: 2.80, compensation: "₹ 95.20 Lakhs", status: "Notice Issued", aadhaarNo: "7890 1234 5678", phone: "+91 98901 66291", bankName: "State Bank of India", bankAccount: "30918274651", ifsc: "SBIN0000842", pfmsStatus: "Verification Initiated", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 1650 }
  ],
  "PRJ-MH-2026-088": [
    { id: "MH-PL-40501", surveyNo: "302/1A", landowner: "Nitin Dattatray Shirole", village: "Nighoje", taluka: "Khed", areaHa: 4.10, compensation: "₹ 1.85 Cr", status: "Approved", aadhaarNo: "9012 8901 2345", phone: "+91 98229 11029", bankName: "State Bank of India", bankAccount: "30819284756", ifsc: "SBIN0000491", pfmsStatus: "Verified (Ready for DBT)", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 2250 },
    { id: "MH-PL-40502", surveyNo: "305/4", landowner: "Mahesh Bhaskar Rane", village: "Kuruli", taluka: "Khed", areaHa: 2.65, compensation: "₹ 1.20 Cr", status: "Disbursement Pending", aadhaarNo: "6789 0123 4567", phone: "+91 98509 33819", bankName: "HDFC Bank", bankAccount: "501009827364", ifsc: "HDFC0000291", pfmsStatus: "Verified (Ready for DBT)", satbaraStatus: "Digitally Verified 7/12 Extract", subRegistrarRateSqM: 2250 }
  ]
};

export default function CollectorProjectsView() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (Gallery Cards), 'table' (Master Table), or 'detail' (Full Project Showcase)
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTaluka, setFilterTaluka] = useState('All');
  const [filterVillage, setFilterVillage] = useState('All');
  const [filterStageStatus, setFilterStageStatus] = useState('All');

  // Selected Active Project for Full Corridor Showcase View
  const [activeProject, setActiveProject] = useState(collectorProjectsMasterList[0]);
  const [selectedVillageTab, setSelectedVillageTab] = useState('All');
  const [landownerSearch, setLandownerSearch] = useState('');

  // Landowner Detail Modal State
  const [selectedLandownerRecord, setSelectedLandownerRecord] = useState(null);

  // Filtering Logic for Master List
  const filteredProjects = collectorProjectsMasterList.filter(p => {
    if (filterTaluka !== 'All' && !p.talukas.includes(filterTaluka)) return false;
    if (filterStageStatus !== 'All' && p.status !== filterStageStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.proposingBody.toLowerCase().includes(q) ||
        p.villages.some(v => v.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Open Full Showcase View for a Project
  const handleOpenProjectDetail = (proj) => {
    setActiveProject(proj);
    setSelectedVillageTab('All');
    setLandownerSearch('');
    setViewMode('detail');
  };

  // Landowners for active project
  const currentLandowners = mockProjectLandowners[activeProject?.id] || mockProjectLandowners["PRJ-MH-2026-101"];
  const filteredLandowners = currentLandowners.filter(l => {
    const matchesSearch =
      l.landowner.toLowerCase().includes(landownerSearch.toLowerCase()) ||
      l.id.toLowerCase().includes(landownerSearch.toLowerCase()) ||
      l.surveyNo.toLowerCase().includes(landownerSearch.toLowerCase()) ||
      l.village.toLowerCase().includes(landownerSearch.toLowerCase());
    const matchesVillage = selectedVillageTab === 'All' || l.village === selectedVillageTab;
    return matchesSearch && matchesVillage;
  });

  // =========================================================================
  // VIEW MODE 3: FULL PROJECT CORRIDOR SHOWCASE DETAIL VIEW
  // =========================================================================
  if (viewMode === 'detail' && activeProject) {
    const projImg = projectImages[activeProject.id] || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80";

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Back Button */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setViewMode('grid')}
          style={{ width: 'fit-content', gap: '8px', fontWeight: 700 }}
        >
          <ArrowLeft size={16} /> Back to All Infrastructure Projects
        </button>

        {/* Page Title Banner */}
        <div className="page-banner">
          <div className="page-title-group">
            <h1>{activeProject.name}</h1>
            <p>
              Project ID: <span className="mono-code" style={{ color: '#FFFFFF', fontWeight: 800 }}>{activeProject.id}</span>
              {' • '}Proposing Body: <strong>{activeProject.proposingBody}</strong>
            </p>
          </div>
          <div className={`badge ${activeProject.riskColor === 'Red' ? 'badge-red' : activeProject.riskColor === 'Orange' ? 'badge-orange' : 'badge-green'}`} style={{ fontSize: '13px', padding: '6px 14px', fontWeight: 800 }}>
            RISK SCORE: {activeProject.riskScore}/100 ({activeProject.riskLevel})
          </div>
        </div>

        {/* Hero Stock Photo Banner & Core Specs */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', borderRadius: '16px' }}>
          <div style={{ position: 'relative', height: '260px', width: '100%' }}>
            <img
              src={projImg}
              alt={activeProject.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)'
            }} />

            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
              <span className="mono-code" style={{ background: '#008E4F', color: '#FFF', padding: '4px 12px', borderRadius: '8px', fontWeight: 800, fontSize: '12px' }}>
                {activeProject.id}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.92)', color: '#0F172A', padding: '4px 12px', borderRadius: '8px', fontWeight: 700, fontSize: '12px' }}>
                Stage: {activeProject.stage}
              </span>
            </div>

            <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 6px 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  {activeProject.name}
                </h2>
                <div style={{ fontSize: '13px', opacity: 0.95, display: 'flex', gap: '16px' }}>
                  <span>Coverage: <strong>{activeProject.talukaCount} Taluka ({activeProject.talukas.join(', ')})</strong></span>
                  <span>Affected Villages: <strong>{activeProject.villageCount} Villages</strong></span>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.95)', color: '#0F172A', padding: '8px 16px', borderRadius: '10px', textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>ESTIMATED BUDGET</div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#008E4F' }}>{activeProject.estCompensation}</div>
              </div>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '20px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
            <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>TIMELINE</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{activeProject.timeline}</div>
            </div>
            <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>AFFECTED VILLAGES</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#008E4F', marginTop: '4px' }}>{activeProject.villageCount} Villages ({activeProject.villages.join(', ')})</div>
            </div>
            <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>CURRENT STAGE</div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{activeProject.stage}</div>
            </div>
            <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>OFFICIAL RISK LEVEL</div>
              <div style={{ fontSize: '14.5px', fontWeight: 900, color: activeProject.riskColor === 'Red' ? '#C5221F' : activeProject.riskColor === 'Orange' ? '#D97706' : '#1E7E34', marginTop: '4px' }}>
                {activeProject.riskLevel} ({activeProject.riskScore}/100)
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Risk Analysis */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Left: Project Overview & Milestone Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>
                LAND ACQUISITION CORRIDOR SPECIFICATION
              </h3>
              <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                {activeProject.description}
              </p>
              <div style={{ background: 'rgba(0, 142, 79, 0.04)', borderLeft: '4px solid #008E4F', padding: '14px 18px', borderRadius: '10px', fontSize: '13px', color: '#1E293B', lineHeight: 1.5 }}>
                <strong style={{ color: '#008E4F', display: 'block', marginBottom: '4px', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Proposing Authority & Officer:</strong>
                {activeProject.proposingBody} (Chief General Manager Land Division)
              </div>
            </div>

            {/* Milestone Progress Timeline */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0' }}>
                STATUTORY MILESTONE PROGRESS TIMELINE
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '8px' }}>
                {activeProject.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: m.status === 'Completed' ? '#E6F4EA' : m.status === 'In Progress' ? '#FEF3C7' : '#F1F5F9',
                      border: `1px solid ${m.status === 'Completed' ? '#CEEAD6' : m.status === 'In Progress' ? '#FDE68A' : '#CBD5E1'}`,
                      borderRadius: '8px',
                      padding: '10px 6px',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: '15px', marginTop: '4px', fontWeight: 800, color: m.status === 'Completed' ? '#008E4F' : m.status === 'In Progress' ? '#D97706' : '#94A3B8' }}>
                      {m.status === 'Completed' ? '✓' : m.status === 'In Progress' ? '●' : '○'}
                    </div>
                    <div style={{ fontSize: '9px', color: '#475569', marginTop: '4px' }}>{m.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Risk Analysis & Reasoning Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ padding: '24px', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 800, color: '#008E4F', marginBottom: '12px' }}>
                <HelpCircle size={18} /> STAGE DIAGNOSIS & REASONING
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeProject.reasonsForStage.map((r, i) => (
                  <div key={i} style={{ fontSize: '12.5px', color: '#334155', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.45 }}>
                    <span style={{ color: '#008E4F', fontWeight: 800, marginTop: '2px' }}>•</span> {r}
                  </div>
                ))}
              </div>
            </div>

            {activeProject.riskFactors.length > 0 && (
              <div className="card" style={{ padding: '20px', background: '#FEF3C7', border: '1px solid #FDE68A' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 800, color: '#D97706', marginBottom: '10px' }}>
                  <AlertTriangle size={18} /> CONTRIBUTING RISK FACTORS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeProject.riskFactors.map((rf, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#78350F', lineHeight: 1.4 }}>
                      <strong>{rf.factor} ({rf.impact} Impact):</strong> {rf.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Affected Village & Landowner Directory Table */}
        <div className="card" style={{ padding: '24px' }}>
          <div className="card-header" style={{ marginBottom: '18px', paddingBottom: '14px', flexWrap: 'wrap', gap: '14px' }}>
            <div className="card-title" style={{ fontSize: '15.5px', fontWeight: 800, color: '#0F172A' }}>
              <Building size={18} style={{ color: '#008E4F' }} />
              AFFECTED LANDOWNERS & PARCEL DIRECTORY ({activeProject.name})
            </div>

            <div style={{ position: 'relative', width: '300px' }}>
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '34px', fontSize: '13px', height: '38px', borderRadius: '8px' }}
                placeholder="Search landowner name, parcel ID, survey..."
                value={landownerSearch}
                onChange={e => setLandownerSearch(e.target.value)}
              />
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '12px', color: '#64748B' }} />
            </div>
          </div>

          {/* Village Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${selectedVillageTab === 'All' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedVillageTab('All')}
              style={{ fontWeight: 700 }}
            >
              All Villages ({activeProject.villageCount})
            </button>
            {activeProject.villages.map(v => (
              <button
                key={v}
                className={`btn btn-sm ${selectedVillageTab === v ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedVillageTab(v)}
                style={{ fontWeight: 700 }}
              >
                Village {v}
              </button>
            ))}
          </div>

          {/* Landowner Directory Table */}
          <div className="table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Parcel ID & Survey No</th>
                  <th>Landowner Name</th>
                  <th>Village</th>
                  <th>Acquired Area</th>
                  <th>Estimated Compensation</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLandowners.map(l => (
                  <tr key={l.id}>
                    <td>
                      <div className="mono-code" style={{ color: '#008E4F', fontWeight: 700, fontSize: '13px' }}>{l.id}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>Survey #{l.surveyNo}</div>
                    </td>
                    <td><strong style={{ color: '#0F172A', fontSize: '13.5px' }}>{l.landowner}</strong></td>
                    <td>{l.village}</td>
                    <td><strong>{l.areaHa} Ha</strong></td>
                    <td><strong style={{ color: '#008E4F' }}>{l.compensation}</strong></td>
                    <td>
                      <span className={`badge ${l.status === 'Approved' ? 'badge-green' : l.status.includes('Risk') ? 'badge-red' : 'badge-orange'}`} style={{ fontWeight: 700 }}>
                        {l.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedLandownerRecord(l)}
                        style={{ fontWeight: 700 }}
                      >
                        <Eye size={13} /> View Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* LANDOWNER OFFICIAL REVENUE RECORD MODAL */}
        {selectedLandownerRecord && (
          <div className="modal-overlay" style={{ zIndex: 1100 }}>
            <div className="modal-container" style={{ maxWidth: '850px', borderRadius: '16px' }}>
              <div className="modal-header" style={{ background: '#008E4F', padding: '18px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <UserCheck size={20} style={{ color: '#FFF' }} />
                  <div>
                    <h3 className="modal-title" style={{ fontSize: '16.5px', color: '#FFF', margin: 0 }}>
                      LANDOWNER OFFICIAL REVENUE RECORD: {selectedLandownerRecord.landowner}
                    </h3>
                    <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.85)', marginTop: '2px' }}>
                      Parcel ID: {selectedLandownerRecord.id} • Survey #{selectedLandownerRecord.surveyNo} • Village: {selectedLandownerRecord.village}
                    </div>
                  </div>
                </div>
                <button className="modal-close-btn" onClick={() => setSelectedLandownerRecord(null)} style={{ color: '#FFF' }}>
                  <XCircle size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Landowner Personal & Bank Record */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, color: '#008E4F', textTransform: 'uppercase', marginBottom: '12px' }}>
                    <Users size={16} /> 1. Landowner Identity & Bank Account Specifications
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', fontSize: '13px' }}>
                    <div><span style={{ color: '#64748B' }}>Full Name:</span> <strong style={{ color: '#0F172A' }}>{selectedLandownerRecord.landowner}</strong></div>
                    <div><span style={{ color: '#64748B' }}>Aadhaar Number:</span> <span className="mono-code">{selectedLandownerRecord.aadhaarNo || "7890 2341 9012"}</span></div>
                    <div><span style={{ color: '#64748B' }}>Contact Phone:</span> <strong>{selectedLandownerRecord.phone || "+91 98220 14892"}</strong></div>
                    <div><span style={{ color: '#64748B' }}>Bank Name:</span> <strong>{selectedLandownerRecord.bankName || "State Bank of India"}</strong></div>
                    <div><span style={{ color: '#64748B' }}>Account Number:</span> <span className="mono-code">{selectedLandownerRecord.bankAccount || "30192847561"}</span></div>
                    <div><span style={{ color: '#64748B' }}>IFSC Code:</span> <span className="mono-code">{selectedLandownerRecord.ifsc || "SBIN0001429"}</span></div>
                    <div><span style={{ color: '#64748B' }}>PFMS DBT Status:</span> <strong style={{ color: '#1E7E34' }}>{selectedLandownerRecord.pfmsStatus || "Verified (Ready for DBT)"}</strong></div>
                    <div><span style={{ color: '#64748B' }}>Ownership Share:</span> <strong>100% Sole Title Holder</strong></div>
                  </div>
                </div>

                {/* Parcel & Land Area Specifications */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, color: '#008E4F', textTransform: 'uppercase', marginBottom: '12px' }}>
                    <MapPin size={16} /> 2. Land Parcel & Survey Specifications
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', fontSize: '13px' }}>
                    <div><span style={{ color: '#64748B' }}>Parcel Reference ID:</span> <span className="mono-code" style={{ color: '#008E4F', fontWeight: 700 }}>{selectedLandownerRecord.id}</span></div>
                    <div><span style={{ color: '#64748B' }}>Survey / Gut Number:</span> <span className="mono-code">{selectedLandownerRecord.surveyNo}</span></div>
                    <div><span style={{ color: '#64748B' }}>Village / Taluka:</span> <strong>{selectedLandownerRecord.village}, {selectedLandownerRecord.taluka || "Haveli"} Taluka</strong></div>
                    <div><span style={{ color: '#64748B' }}>Acquired Area:</span> <strong style={{ color: '#008E4F' }}>{selectedLandownerRecord.areaHa} Ha ({((selectedLandownerRecord.areaHa || 1) * 10000).toLocaleString('en-IN')} sq.m)</strong></div>
                    <div><span style={{ color: '#64748B' }}>Sub-Registrar Circle Rate:</span> <strong>₹ {selectedLandownerRecord.subRegistrarRateSqM || 1850}/sq.m</strong></div>
                    <div><span style={{ color: '#64748B' }}>7/12 Extract Status:</span> <strong style={{ color: '#1E7E34' }}>{selectedLandownerRecord.satbaraStatus || "Digitally Verified"}</strong></div>
                  </div>
                </div>

                {/* Compensation Breakdown Card */}
                <div style={{ background: 'rgba(0, 142, 79, 0.05)', border: '1.5px solid #008E4F', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#008E4F', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        TOTAL CALCULATED FINANCIAL COMPENSATION AWARD
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>
                        {selectedLandownerRecord.compensation}
                      </div>
                    </div>
                    <span className={`badge ${selectedLandownerRecord.status === 'Approved' ? 'badge-green' : selectedLandownerRecord.status.includes('Risk') ? 'badge-red' : 'badge-orange'}`} style={{ fontSize: '13px', padding: '6px 14px', fontWeight: 800 }}>
                      STATUS: {selectedLandownerRecord.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  <Printer size={15} /> Print Record
                </button>
                <button className="btn btn-primary" onClick={() => setSelectedLandownerRecord(null)} style={{ background: '#008E4F', border: 'none', fontWeight: 700 }}>
                  Close Landowner Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW MODES 1 & 2: CORRIDOR GALLERY (GRID) AND MASTER TABLE VIEW
  // =========================================================================
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Masthead Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DISTRICT LAND ACQUISITION MASTER PROJECTS REGISTER</h1>
          <p>Comprehensive Infrastructure Corridor Registry, Risk Assessment & Milestone Progress Tracking</p>
        </div>
        <div style={{ fontSize: '13px', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '8px', fontWeight: 800 }}>
          {collectorProjectsMasterList.length} Active District Corridors
        </div>
      </div>

      {/* TOP CONTROLS BAR: SEARCH, FILTERS & VIEW TOGGLE SWITCH */}
      <div className="card" style={{ padding: '16px 20px', borderRadius: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          {/* Left: Search & Filter Dropdowns */}
          <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '320px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Project Name, ID, Proposing Body, or Village..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '36px', height: '40px', borderRadius: '8px' }}
              />
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            </div>

            <select className="form-select" value={filterTaluka} onChange={e => setFilterTaluka(e.target.value)} style={{ width: '160px', height: '40px', borderRadius: '8px' }}>
              <option value="All">All Talukas ▼</option>
              {collectorTalukasProgress.map(t => (
                <option key={t.id} value={t.taluka}>Taluka {t.taluka}</option>
              ))}
            </select>

            <select className="form-select" value={filterStageStatus} onChange={e => setFilterStageStatus(e.target.value)} style={{ width: '180px', height: '40px', borderRadius: '8px' }}>
              <option value="All">All Status ▼</option>
              <option value="Ongoing">Ongoing Projects</option>
              <option value="Completed">Completed Projects</option>
            </select>
          </div>

          {/* Right: View Mode Toggle Buttons (Grid vs Table) */}
          <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12.5px',
                fontWeight: 700,
                border: 'none',
                background: viewMode === 'grid' ? '#008E4F' : 'transparent',
                color: viewMode === 'grid' ? '#FFF' : '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Grid size={14} /> Gallery Cards View
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12.5px',
                fontWeight: 700,
                border: 'none',
                background: viewMode === 'table' ? '#008E4F' : 'transparent',
                color: viewMode === 'table' ? '#FFF' : '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <List size={14} /> Master Table View
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: CORRIDOR GALLERY CARDS GRID VIEW */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '22px' }}>
          {filteredProjects.map(project => {
            const coverImage = projectImages[project.id] || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80";

            return (
              <div
                key={project.id}
                className="card"
                style={{
                  padding: '0',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onClick={() => handleOpenProjectDetail(project)}
              >
                {/* Photo Cover Header */}
                <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={coverImage}
                    alt={project.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 60%)'
                  }} />

                  {/* Top Badges */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                    <span className="mono-code" style={{ background: '#008E4F', color: '#FFF', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                      {project.id}
                    </span>
                  </div>

                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span className={`badge ${project.riskColor === 'Red' ? 'badge-red' : project.riskColor === 'Orange' ? 'badge-orange' : 'badge-green'}`} style={{ fontWeight: 800 }}>
                      {project.riskLevel} ({project.riskScore})
                    </span>
                  </div>

                  <div style={{ position: 'absolute', bottom: '10px', left: '12px', color: '#FFF', fontSize: '12px', fontWeight: 700 }}>
                    Stage: {project.stage}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', lineHeight: 1.35 }}>
                      {project.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.45 }}>
                      Proposing Body: <strong style={{ color: '#1E293B' }}>{project.proposingBody}</strong>
                    </div>
                  </div>

                  {/* Metrics Strip */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px 12px', borderRadius: '10px' }}>
                    <div>
                      <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Est. Budget</span>
                      <strong style={{ fontSize: '13.5px', color: '#008E4F', display: 'block', marginTop: '2px' }}>{project.estCompensation}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Villages</span>
                      <strong style={{ fontSize: '13.5px', color: '#0F172A', display: 'block', marginTop: '2px' }}>{project.villageCount} Villages</strong>
                    </div>
                  </div>

                  {/* Village Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: '#64748B', fontSize: '10.5px', textTransform: 'uppercase' }}>Villages:</span>
                    {project.villages.slice(0, 3).map(v => (
                      <span key={v} style={{ background: '#F1F5F9', color: '#334155', padding: '2px 7px', borderRadius: '10px', fontWeight: 600, fontSize: '11px' }}>
                        {v}
                      </span>
                    ))}
                    {project.villages.length > 3 && (
                      <span style={{ color: '#64748B', fontSize: '11px', fontWeight: 600 }}>+{project.villages.length - 3} more</span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                    <button
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        padding: '9px 14px',
                        fontSize: '13px',
                        fontWeight: 700,
                        gap: '6px',
                        background: 'var(--color-primary-gradient)',
                        border: 'none'
                      }}
                    >
                      Explore Project Details <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: MASTER REGISTER TABLE VIEW */}
      {/* ========================================================================= */}
      {viewMode === 'table' && (
        <div className="card" style={{ padding: '20px' }}>
          <div className="card-header" style={{ marginBottom: '14px' }}>
            <div className="card-title" style={{ fontSize: '15px', fontWeight: 800 }}>
              <FolderKanban size={18} style={{ color: '#008E4F' }} />
              DISTRICT PROJECTS REGISTER ({filteredProjects.length} PROJECTS)
            </div>
          </div>

          <div className="table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Project ID</th>
                  <th>Proposing Body</th>
                  <th>Talukas Affected</th>
                  <th>Villages Affected</th>
                  <th>Timeline</th>
                  <th>Current Stage</th>
                  <th style={{ textAlign: 'center' }}>Risk Score</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(p => (
                  <tr key={p.id}>
                    <td><strong style={{ color: '#0F172A', fontSize: '13.5px' }}>{p.name}</strong></td>
                    <td><span className="mono-code" style={{ color: '#008E4F', fontWeight: 700 }}>{p.id}</span></td>
                    <td><span style={{ fontWeight: 600, color: '#334155' }}>{p.proposingBody}</span></td>
                    <td>{p.talukaCount} Taluka ({p.talukas.join(', ')})</td>
                    <td>{p.villageCount} Villages ({p.villages.join(', ')})</td>
                    <td>{p.timeline}</td>
                    <td>
                      <span className="badge badge-blue" style={{ fontWeight: 700 }}>
                        {p.stage}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className={`badge ${p.riskColor === 'Red' ? 'badge-red' : p.riskColor === 'Orange' ? 'badge-orange' : 'badge-green'}`} style={{ fontWeight: 800 }}>
                        {p.riskLevel} ({p.riskScore})
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleOpenProjectDetail(p)}
                        style={{ fontWeight: 700 }}
                      >
                        <Eye size={13} /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
