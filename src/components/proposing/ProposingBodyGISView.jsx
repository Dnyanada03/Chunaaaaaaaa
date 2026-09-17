import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  Layers, MapPin, Search, Filter, ZoomIn, ZoomOut, Maximize2,
  Info, CheckCircle2, AlertTriangle, Eye, Download, ShieldCheck,
  ChevronRight, Compass, Crosshair, FileText
} from 'lucide-react';
import { initialParcelsCadastral } from '../../data/proposingMockData';

export default function ProposingBodyGISView({ onNavigate }) {
  const { proposingProjects, proposingProposals } = useSwadesh();
  const [selectedProjectId, setSelectedProjectId] = useState(proposingProjects[0]?.id || 'PRJ-MH-2026-101');
  const [selectedPackage, setSelectedPackage] = useState('all');
  const [selectedParcel, setSelectedParcel] = useState(initialParcelsCadastral[0]);
  const [activeLayer, setActiveLayer] = useState('cadastral'); // cadastral, satellite, terrain
  const [showEncumbrances, setShowEncumbrances] = useState(true);
  const [showJMSBoundary, setShowJMSBoundary] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const currentProject = proposingProjects.find(p => p.id === selectedProjectId) || proposingProjects[0];

  const filteredParcels = initialParcelsCadastral.filter(p => {
    if (selectedPackage !== 'all' && p.package !== selectedPackage) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.surveyNo.toLowerCase().includes(q) ||
             p.village.toLowerCase().includes(q) ||
             p.landType.toLowerCase().includes(q);
    }
    return true;
  });

  const totalAreaHa = initialParcelsCadastral.reduce((sum, p) => sum + p.areaHa, 0).toFixed(2);
  const totalCostCr = initialParcelsCadastral.reduce((sum, p) => sum + p.estimatedComp, 0).toFixed(2);

  return (
    <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Top Header & Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
            <span>Project Authority</span>
            <ChevronRight size={14} />
            <span style={{ fontWeight: 700, color: '#0F172A' }}>Cadastral GIS Land Acquisition Portal</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Cadastral GIS Alignment & Parcel Intelligence
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            High-resolution village cadastral maps with DILR Gat numbers, RoR 7/12 records, and acquisition corridor pegging
          </p>
        </div>

        {/* Project Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>ACTIVE PROJECT:</label>
          <select
            className="form-select"
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            style={{ minWidth: '260px', fontWeight: 700 }}
          >
            {proposingProjects.map(prj => (
              <option key={prj.id} value={prj.id}>
                {prj.id} — {prj.name.length > 30 ? prj.name.substring(0, 30) + '...' : prj.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>TOTAL CORRIDOR AREA</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{totalAreaHa} Ha</div>
          <div style={{ fontSize: '11.5px', color: '#008E4F', fontWeight: 600 }}>100% Peg-Marked</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>TOTAL SURVEY PARCELS</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{initialParcelsCadastral.length} Gat Nos.</div>
          <div style={{ fontSize: '11.5px', color: '#64748B' }}>Across 4 Revenue Villages</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>JMS COMPLETED</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563EB', marginTop: '2px' }}>64.2%</div>
          <div style={{ fontSize: '11.5px', color: '#64748B' }}>9 of 14 Parcels Jointly Surveyed</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px 18px', borderRadius: '10px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>ESTIMATED OUTLAY</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#008E4F', marginTop: '2px' }}>₹{totalCostCr} Cr</div>
          <div style={{ fontSize: '11.5px', color: '#64748B' }}>Centralized Award Deposit</div>
        </div>
      </div>

      {/* Main Map + Sidebar Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '20px',
        height: '750px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
      }}>
        {/* Left: GIS Map Viewport */}
        <div style={{ position: 'relative', height: '100%', background: '#1E293B', overflow: 'hidden' }}>
          {/* Map Controls Top Bar */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            pointerEvents: 'none'
          }}>
            {/* Search Box on Map */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '8px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              width: '320px',
              pointerEvents: 'auto'
            }}>
              <Search size={16} style={{ color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search Survey / Gat No. or Village..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '12.5px'
                }}
              />
            </div>

            {/* Layer Switchers */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '8px',
              padding: '4px',
              display: 'flex',
              gap: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              pointerEvents: 'auto'
            }}>
              {['cadastral', 'satellite', 'terrain'].map(layer => (
                <button
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: activeLayer === layer ? '#008E4F' : 'transparent',
                    color: activeLayer === layer ? '#FFFFFF' : '#475569',
                    textTransform: 'capitalize'
                  }}
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Simulated Map Canvas */}
          <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            background: activeLayer === 'satellite'
              ? 'radial-gradient(circle at 50% 50%, #1e3a2b 0%, #0f1f18 100%)'
              : activeLayer === 'terrain'
              ? 'linear-gradient(135deg, #dcfce7 0%, #cbd5e1 100%)'
              : 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Grid Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }} />

            {/* Corridor Alignment Strip */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="railCorridor" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#008E4F" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* ROW Corridor Buffer */}
              <path
                d="M 50 200 Q 350 120 650 380 T 1150 480"
                fill="none"
                stroke="rgba(0, 142, 79, 0.25)"
                strokeWidth="110"
                strokeLinecap="round"
              />

              {/* Railway Track / Alignment Centerline */}
              <path
                d="M 50 200 Q 350 120 650 380 T 1150 480"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="4"
                strokeDasharray="12 6"
              />

              {/* Chainage Markers */}
              <text x="80" y="170" fill="#FDE68A" fontSize="11" fontWeight="bold">CH 0+000 (Hadapsar)</text>
              <text x="400" y="160" fill="#FDE68A" fontSize="11" fontWeight="bold">CH 14+500 (Uruli)</text>
              <text x="700" y="420" fill="#FDE68A" fontSize="11" fontWeight="bold">CH 28+200 (Yawat)</text>
              <text x="1050" y="470" fill="#FDE68A" fontSize="11" fontWeight="bold">CH 42+000 (Daund)</text>
            </svg>

            {/* Interactive Cadastral Parcels on Map */}
            <div style={{ position: 'absolute', inset: 0 }}>
              {filteredParcels.map((parcel, idx) => {
                // Layout coordinates across the curved corridor
                const leftPos = 120 + (idx % 5) * 160 + (Math.floor(idx / 5) * 40);
                const topPos = 160 + Math.sin(idx * 0.8) * 120 + (idx * 24);
                const isSelected = selectedParcel?.id === parcel.id;

                return (
                  <div
                    key={parcel.id}
                    onClick={() => setSelectedParcel(parcel)}
                    style={{
                      position: 'absolute',
                      left: `${Math.min(leftPos, 820)}px`,
                      top: `${Math.min(topPos, 560)}px`,
                      width: '110px',
                      height: '75px',
                      background: isSelected
                        ? 'rgba(0, 142, 79, 0.85)'
                        : parcel.landType.includes('Government')
                        ? 'rgba(59, 130, 246, 0.65)'
                        : parcel.encumbrance === 'None / Clear'
                        ? 'rgba(34, 197, 94, 0.55)'
                        : 'rgba(245, 158, 11, 0.65)',
                      border: isSelected
                        ? '3px solid #FFFFFF'
                        : '1.5px solid rgba(255, 255, 255, 0.7)',
                      borderRadius: '8px',
                      padding: '6px',
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 8px 20px rgba(0,0,0,0.5)' : '0 2px 6px rgba(0,0,0,0.2)',
                      zIndex: isSelected ? 20 : 5,
                      color: '#FFFFFF'
                    }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'monospace' }}>
                      Gat {parcel.surveyNo}
                    </div>
                    <div style={{ fontSize: '9.5px', opacity: 0.9 }}>
                      {parcel.village}
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{parcel.areaHa} Ha</span>
                      <span>₹{parcel.estimatedComp} Cr</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Legend Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              background: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(8px)',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              fontSize: '11px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 10
            }}>
              <div style={{ fontWeight: 800, color: '#FDE68A', marginBottom: '2px' }}>CADASTRAL GIS LEGEND</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', background: '#22C55E', borderRadius: '3px' }} />
                <span>Agricultural Private Land (Clear)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', background: '#3B82F6', borderRadius: '3px' }} />
                <span>Government / Gaothan Land</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', background: '#F59E0B', borderRadius: '3px' }} />
                <span>Encumbered / Multiple Co-Sharers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '20px', height: '3px', background: '#F59E0B', borderBottom: '1px dashed #FFFFFF' }} />
                <span>Proposed Alignment Centerline (ROW)</span>
              </div>
            </div>

            {/* Map Nav Zoom Controls */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              zIndex: 10
            }}>
              <button style={{ padding: '8px 10px', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: '1px solid #E2E8F0' }}>
                <ZoomIn size={16} />
              </button>
              <button style={{ padding: '8px 10px', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: '1px solid #E2E8F0' }}>
                <ZoomOut size={16} />
              </button>
              <button style={{ padding: '8px 10px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <Crosshair size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Selected Parcel Details Inspector */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          overflowY: 'auto'
        }}>
          {selectedParcel ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    color: '#008E4F',
                    background: '#E6F4EA',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    PARCEL ID: {selectedParcel.id}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0 0' }}>
                    Survey Gat No. {selectedParcel.surveyNo}
                  </h3>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '12px',
                  background: selectedParcel.encumbrance === 'None / Clear' ? '#DCFCE7' : '#FEF3C7',
                  color: selectedParcel.encumbrance === 'None / Clear' ? '#15803D' : '#B45309'
                }}>
                  {selectedParcel.encumbrance}
                </span>
              </div>

              {/* Geographic Breadcrumbs */}
              <div style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '16px' }}>
                <strong>{selectedParcel.village}</strong>, Taluka {selectedParcel.taluka}, Dist. Pune
              </div>

              {/* Property Attributes Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                background: '#F8FAFC',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>LAND TYPE</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {selectedParcel.landType}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>ACQUISITION AREA</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {selectedParcel.areaHa} Hectares
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CO-SHARERS (7/12)</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {selectedParcel.owners} Landowners
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>EST. COMPENSATION</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#008E4F', marginTop: '2px' }}>
                    ₹{selectedParcel.estimatedComp} Cr
                  </div>
                </div>
              </div>

              {/* Statutory Readiness Checklist */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                  STATUTORY REQUISITION READINESS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { label: 'Mahabhulekh 7/12 RoR Digitally Extracted', done: true },
                    { label: 'DILR Cadastral Gat Peg-Marking Verified', done: true },
                    { label: 'Joint Measurement Survey (JMS) Form Sheet', done: selectedParcel.encumbrance === 'None / Clear' },
                    { label: 'Encumbrance / Dispute Clearance', done: selectedParcel.encumbrance === 'None / Clear' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: item.done ? '#15803D' : '#94A3B8' }}>
                      <CheckCircle2 size={14} style={{ color: item.done ? '#16A34A' : '#CBD5E1' }} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landowner Record Sneak Peek */}
              <div style={{
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '12px',
                background: '#FAFAFA'
              }}>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  PRIMARY TITLE HOLDER (RoR Extract)
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>
                  Shri Dashrath Narayan Patil & Others
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Account No: 4092 • Land Class: Jirayat Agricultural
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
              <Layers size={32} style={{ margin: '0 auto 12px auto', display: 'block', color: '#CBD5E1' }} />
              <p style={{ fontSize: '13px', margin: 0 }}>Click on any Gat parcel on the map to inspect ownership, area, and compensation details.</p>
            </div>
          )}

          {/* Bottom Action */}
          <div style={{ paddingTop: '16px', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate && onNavigate('create-proposal')}
              style={{ width: '100%', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <FileText size={15} />
              Include in New Proposal Requisition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
