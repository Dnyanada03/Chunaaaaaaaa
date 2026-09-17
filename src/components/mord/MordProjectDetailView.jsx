import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building,
  Users,
  AlertTriangle,
  Send,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  FileCheck,
  Download,
  Search,
  ChevronRight,
  UserCheck,
  TrendingDown,
  Info
} from 'lucide-react';
import { getAllMordProjects, initialMordDirectives } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';
import MordIssueDirectiveModal from './MordIssueDirectiveModal';

export default function MordProjectDetailView({ projectId, onBack, onNavigate }) {
  const { projects: contextProjects } = useSwadesh();
  const allProjects = useMemo(() => getAllMordProjects(contextProjects), [contextProjects]);

  // Find targeted project
  const project = allProjects.find(p => p.id === projectId) || allProjects[0];

  // Right-side detail tab: 'loc' | 'map' | 'people' | 'doc' | 'sia' | 'rnr' | 'grievance' | 'directives'
  const [activeSideTab, setActiveSideTab] = useState('loc');
  const [isDirectiveModalOpen, setIsDirectiveModalOpen] = useState(false);
  const [directivesList, setDirectivesList] = useState(() => {
    const saved = localStorage.getItem('swadesh_mord_directives');
    if (!saved) return initialMordDirectives;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? [...parsed, ...initialMordDirectives] : initialMordDirectives;
    } catch (e) {
      return initialMordDirectives;
    }
  });

  // Project Directives
  const projectDirectives = directivesList.filter(d => d.projectId === project?.id);

  // Status timeline stages
  const statusStages = [
    { key: 'proposal', label: 'Proposal', status: 'Completed', date: project.assignedDate || '2025-03-15' },
    { key: 'approval', label: 'Approval', status: ['SIA', 'Objections', 'Compensation', 'Award', 'Final Mutation', 'Completed', 'WORK / IMPLEMENTATION', 'LAND ACQUIRED'].some(s => project.stage.toLowerCase().includes(s.toLowerCase())) ? 'Completed' : 'In Progress', date: '2025-06-20' },
    { key: 'sia', label: 'SIA', status: ['Objections', 'Compensation', 'Award', 'Final Mutation', 'Completed', 'LAND ACQUIRED'].some(s => project.stage.toLowerCase().includes(s.toLowerCase())) ? 'Completed' : (project.stage.toLowerCase().includes('sia') ? 'In Progress' : 'Pending'), date: '2025-08-10' },
    { key: 'notification', label: 'Sec 11 Notice', status: ['Objections', 'Compensation', 'Award', 'Final Mutation', 'Completed', 'LAND ACQUIRED'].some(s => project.stage.toLowerCase().includes(s.toLowerCase())) ? 'Completed' : 'Pending', date: '2025-10-01' },
    { key: 'compensation', label: 'Compensation', status: ['Award', 'Final Mutation', 'Completed'].some(s => project.stage.toLowerCase().includes(s.toLowerCase())) ? 'Completed' : (project.stage.toLowerCase().includes('compensation') ? 'In Progress' : 'Pending'), date: '2026-07-15' },
    { key: 'rnr', label: 'R&R Scheme', status: project.stage.toLowerCase().includes('completed') ? 'Completed' : (project.rrSummary?.status?.toLowerCase().includes('settled') ? 'Completed' : 'Pending'), date: '2026-08-20' },
    { key: 'possession', label: 'Possession', status: project.stage.toLowerCase().includes('completed') ? 'Completed' : 'Pending', date: '-' },
    { key: 'mutation', label: 'Final Mutation', status: project.stage.toLowerCase().includes('completed') ? 'Completed' : 'Pending', date: '-' }
  ];

  const handleDirectiveCreated = (newDirective) => {
    setDirectivesList(prev => [newDirective, ...prev]);
    setActiveSideTab('directives');
  };

  if (!project) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Project record not found.</p>
        <button onClick={onBack} className="btn btn-primary">Back to Projects</button>
      </div>
    );
  }

  const isDelayed = project.status === 'Delayed';

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '24px 28px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* File Strip / Breadcrumbs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        fontFamily: '"IBM Plex Mono", monospace',
        color: '#6B7280',
        paddingBottom: '12px',
        marginBottom: '16px',
        borderBottom: '1px solid #D8D5CB'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              color: '#2F6F62',
              fontWeight: 600,
              cursor: 'pointer',
              padding: 0
            }}
          >
            <ArrowLeft size={13} /> NATIONAL PROJECTS
          </button>
          <span>/</span>
          <span>{project.state.toUpperCase()}</span>
          <span>/</span>
          <span>{project.ministry.replace('Ministry of ', '').toUpperCase()}</span>
          <span>/</span>
          <span style={{ color: '#2F6F62', fontWeight: 700 }}>{project.id}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '10.5px',
            padding: '2px 8px',
            background: '#E4EEE9',
            color: '#2F6F62',
            border: '1px solid #2F6F62'
          }}>
            SUPERVISORY FILE RECORD • MORD
          </span>
        </div>
      </div>

      {/* TOP HERO AREA: PROJECT DETAILS & 3 PHOTOGRAPHS (Prompt Section 11) */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D8D5CB',
        padding: '24px',
        marginBottom: '24px',
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Project Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              padding: '2px 8px',
              background: isDelayed ? '#F6E7E2' : '#E4EEE9',
              color: isDelayed ? '#A6432B' : '#2F6F62',
              border: '1px solid',
              fontWeight: 700
            }}>
              {project.status.toUpperCase()}
            </span>

            <span style={{
              fontSize: '11px',
              fontFamily: '"IBM Plex Mono", monospace',
              padding: '2px 8px',
              background: '#FBFAF6',
              border: '1px solid #D8D5CB',
              color: '#16233A',
              fontWeight: 600
            }}>
              STAGE: {project.stage.toUpperCase()}
            </span>

            <span style={{ fontSize: '11.5px', color: '#6B7280' }}>
              Created: {project.assignedDate}
            </span>
          </div>

          <h1 style={{
            fontFamily: '"Source Serif Pro", Georgia, serif',
            fontSize: '26px',
            fontWeight: 700,
            color: '#16233A',
            margin: '0 0 6px',
            lineHeight: 1.25
          }}>
            {project.name}
          </h1>

          <div style={{ fontSize: '13px', color: '#3A4A63', marginBottom: '12px' }}>
            <strong>Proposed by:</strong> {project.authority} &nbsp;&middot;&nbsp;
            <strong>Ministry:</strong> {project.ministry} &nbsp;&middot;&nbsp;
            <strong>Jurisdiction:</strong> {project.district}, {project.state}
          </div>

          <p style={{ fontSize: '13.5px', color: '#16233A', lineHeight: 1.55, margin: '0 0 16px', maxWidth: '64ch' }}>
            {project.description}
          </p>

          <div style={{
            background: '#F2F1EC',
            border: '1px solid #D8D5CB',
            padding: '10px 14px',
            fontSize: '12px',
            marginBottom: '16px'
          }}>
            <strong style={{ color: '#16233A' }}>Public Purpose Category:</strong> {project.publicPurpose}
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              onClick={() => setIsDirectiveModalOpen(true)}
              style={{
                background: '#2F6F62',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 16px',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Send size={13} />
              Demand Delay Explanation / Issue Directive
            </button>

            <button
              onClick={() => {
                alert(`Official MIS Project Brief generated for ${project.id}. Preparing PDF export...`);
              }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D8D5CB',
                color: '#16233A',
                padding: '8px 14px',
                fontSize: '12.5px',
                fontWeight: 500,
                cursor: 'pointer',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Download size={13} />
              Export Case File (PDF)
            </button>
          </div>
        </div>

        {/* Right Area: 3 Project Photographs (Prompt Section 11) */}
        <div>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#6B7280',
            fontWeight: 600,
            marginBottom: '8px'
          }}>
            Verified Site Photographs (3 Views)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {/* Primary Main Photo */}
            <div style={{
              gridColumn: '1 / -1',
              height: '140px',
              background: '#F2F1EC',
              border: '1px solid #D8D5CB',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src={project.images?.[0] || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"}
                alt="Corridor Survey View"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                bottom: '6px',
                left: '6px',
                background: 'rgba(22, 35, 58, 0.75)',
                color: '#FFFFFF',
                fontSize: '10px',
                padding: '1px 6px',
                fontFamily: '"IBM Plex Mono", monospace'
              }}>
                Aerial / Drone Corridor Survey
              </span>
            </div>

            {/* Photo 2 */}
            <div style={{
              height: '85px',
              background: '#F2F1EC',
              border: '1px solid #D8D5CB',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src={project.images?.[1] || "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80"}
                alt="Ground Demarcation"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                bottom: '4px',
                left: '4px',
                background: 'rgba(22, 35, 58, 0.75)',
                color: '#FFFFFF',
                fontSize: '9.5px',
                padding: '1px 4px',
                fontFamily: '"IBM Plex Mono", monospace'
              }}>
                Boundary Marker
              </span>
            </div>

            {/* Photo 3 */}
            <div style={{
              height: '85px',
              background: '#F2F1EC',
              border: '1px solid #D8D5CB',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src={project.images?.[2] || "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80"}
                alt="Cadastral Overlay"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                bottom: '4px',
                left: '4px',
                background: 'rgba(22, 35, 58, 0.75)',
                color: '#FFFFFF',
                fontSize: '9.5px',
                padding: '1px 4px',
                fontFamily: '"IBM Plex Mono", monospace'
              }}>
                R&R Settlement
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI METRIC STRIP */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        background: '#D8D5CB',
        border: '1px solid #D8D5CB',
        marginBottom: '24px'
      }}>
        <div style={{ background: '#FFFFFF', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em' }}>
            Land Required / Acquired
          </div>
          <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '20px', fontWeight: 700, color: '#16233A', marginTop: '2px' }}>
            {project.landRequiredHa} Ha <span style={{ fontSize: '13px', fontWeight: 400, color: '#2F6F62' }}>/ {project.landAcquiredHa} Ha ({project.landRequiredHa ? Math.round((project.landAcquiredHa / project.landRequiredHa) * 100) : 0}%)</span>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em' }}>
            Estimated Cost / Disbursed
          </div>
          <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '20px', fontWeight: 700, color: '#16233A', marginTop: '2px' }}>
            {project.estimatedBudget} <span style={{ fontSize: '13px', fontWeight: 400, color: '#2F6F62' }}>/ {project.disbursedCompensation}</span>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em' }}>
            Affected Landowners / Families
          </div>
          <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '20px', fontWeight: 700, color: '#16233A', marginTop: '2px' }}>
            {project.totalLandowners} <span style={{ fontSize: '13px', fontWeight: 400, color: '#3A4A63' }}>Landowners ({project.affectedFamilies} Families)</span>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em' }}>
            RFCTLARR Compliance
          </div>
          <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '20px', fontWeight: 700, color: project.rfctlarrCompliancePct < 85 ? '#A6432B' : '#2F6F62', marginTop: '2px' }}>
            {project.rfctlarrCompliancePct}% Compliance
          </div>
        </div>
      </div>

      {/* 11.2 PROJECT STATUS TIMELINE & "WHY IS IT PENDING?" */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #D8D5CB',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h4 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '16px', fontWeight: 600, color: '#16233A', margin: '0 0 14px' }}>
          Statutory Milestone Timeline
        </h4>

        {/* Timeline Horizontal Line */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '8px',
          borderBottom: '1px solid #D8D5CB',
          paddingBottom: '14px',
          marginBottom: '14px'
        }}>
          {statusStages.map((st, idx) => (
            <div key={st.key} style={{ textAlign: 'center' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                margin: '0 auto 6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                background: st.status === 'Completed' ? '#2F6F62' : st.status === 'In Progress' ? '#8A6A1E' : '#FBFAF6',
                color: st.status === 'Completed' ? '#FFFFFF' : st.status === 'In Progress' ? '#FFFFFF' : '#6B7280',
                border: '1px solid',
                borderColor: st.status === 'Completed' ? '#2F6F62' : st.status === 'In Progress' ? '#8A6A1E' : '#D8D5CB'
              }}>
                {st.status === 'Completed' ? '✓' : idx + 1}
              </div>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#16233A' }}>
                {st.label}
              </div>
              <div style={{ fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>
                {st.status}
              </div>
            </div>
          ))}
        </div>

        {/* "WHY IS IT PENDING?" ROOT CAUSE BREAKDOWN (Prompt Section 11.2) */}
        {project.pendingReason ? (
          <div style={{
            background: '#F6E7E2',
            border: '1px solid #A6432B',
            padding: '14px 18px',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: '16px',
            alignItems: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#A6432B',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px'
            }}>
              <AlertTriangle size={20} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '13.5px', color: '#A6432B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  WHY IS IT PENDING? — {project.pendingReason.stage}
                </strong>
                <span style={{ fontSize: '11px', fontFamily: '"IBM Plex Mono", monospace', color: '#A6432B' }}>
                  Stuck for {project.pendingReason.idleDays} Days (Since {project.pendingReason.sinceDate})
                </span>
              </div>

              <p style={{ fontSize: '12.5px', color: '#16233A', margin: '4px 0 2px' }}>
                <strong>Reason:</strong> {project.pendingReason.reason}
              </p>

              <div style={{ fontSize: '11.5px', color: '#3A4A63' }}>
                <strong>Responsible Authority:</strong> {project.pendingReason.responsibleAuthority}
              </div>
            </div>

            <button
              onClick={() => setIsDirectiveModalOpen(true)}
              style={{
                background: '#A6432B',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Send size={12} /> Demand Explanation
            </button>
          </div>
        ) : (
          <div style={{
            background: '#E4EEE9',
            border: '1px solid #2F6F62',
            padding: '10px 16px',
            fontSize: '12.5px',
            color: '#2F6F62',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} />
            <span>
              <strong>Project Operating on Schedule:</strong> No administrative bottlenecks or statutory delay queries recorded.
            </span>
          </div>
        )}
      </div>

      {/* BODY GRID: RIGHT-SIDE DETAIL NAVIGATION (Prompt Section 12) + DETAIL PANELS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: 0,
        background: '#FFFFFF',
        border: '1px solid #D8D5CB'
      }}>
        {/* Right-Side Navigation Tabs (Prompt Section 12) */}
        <div style={{
          borderRight: '1px solid #D8D5CB',
          background: '#FBFAF6',
          padding: '16px 0'
        }}>
          <div style={{
            fontSize: '10px',
            fontFamily: '"IBM Plex Mono", monospace',
            textTransform: 'uppercase',
            color: '#6B7280',
            fontWeight: 700,
            padding: '0 18px 8px'
          }}>
            Supervisory Sections
          </div>

          {[
            { id: 'loc', label: '1. LOC (Location & Parcels)', badge: null },
            { id: 'map', label: '2. MAP (GIS Boundary)', badge: null },
            { id: 'people', label: '3. PEOPLE (Authorities)', badge: '4' },
            { id: 'doc', label: '4. DOC (Documents & DSC)', badge: '10' },
            { id: 'sia', label: '5. SIA (Social Impact)', badge: null },
            { id: 'rnr', label: '6. R&R (Resettlement)', badge: null },
            { id: 'grievance', label: '7. GRIEVANCES (Citizens)', badge: project.grievanceSummary?.pending ? `${project.grievanceSummary.pending}` : '0' },
            { id: 'directives', label: '8. DIRECTIVES & INQUIRIES', badge: projectDirectives.length > 0 ? `${projectDirectives.length}` : null, highlight: true },
            { id: 'ai', label: '9. SYSTEM ANALYSIS (AI)', badge: null }
          ].map(tab => {
            const isActive = activeSideTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSideTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  textAlign: 'left',
                  background: isActive ? '#E4EEE9' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #2F6F62' : '3px solid transparent',
                  padding: '10px 18px',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#16233A' : '#3A4A63',
                  cursor: 'pointer'
                }}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '10px',
                    padding: '1px 5px',
                    background: tab.highlight ? '#F2ECDC' : '#FFFFFF',
                    color: tab.highlight ? '#8A6A1E' : '#6B7280',
                    border: '1px solid #D8D5CB',
                    fontWeight: 600
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Content Panel */}
        <div style={{ padding: '24px 28px', minHeight: '440px' }}>
          {/* TAB 1: LOCATION */}
          {activeSideTab === 'loc' && (
            <div>
              <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', color: '#16233A', margin: '0 0 6px' }}>
                Location &amp; Cadastral Cadre Information
              </h3>
              <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 18px' }}>
                Spatial and revenue jurisdiction breakdown for Project {project.id}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
                marginBottom: '20px'
              }}>
                <div style={{ background: '#FBFAF6', border: '1px solid #D8D5CB', padding: '14px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600 }}>Administrative Location</div>
                  <div style={{ fontSize: '13.5px', color: '#16233A', marginTop: '4px' }}>
                    <strong>State:</strong> {project.state}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#16233A', marginTop: '2px' }}>
                    <strong>District:</strong> {project.district}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#16233A', marginTop: '2px' }}>
                    <strong>Taluka / Tehsil:</strong> {project.taluka || 'Haveli'}
                  </div>
                </div>

                <div style={{ background: '#FBFAF6', border: '1px solid #D8D5CB', padding: '14px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600 }}>Revenue Villages Affected ({project.villages?.length || 4})</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {project.villages?.map(v => (
                      <span key={v} style={{
                        fontSize: '11.5px',
                        background: '#FFFFFF',
                        border: '1px solid #D8D5CB',
                        padding: '3px 8px',
                        color: '#16233A'
                      }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: '#16233A', margin: '0 0 10px' }}>
                Land Parcel Classification
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                fontSize: '12px'
              }}>
                <div style={{ padding: '10px', border: '1px solid #D8D5CB', background: '#FBFAF6' }}>
                  <span style={{ color: '#6B7280' }}>Agricultural Land:</span>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                    {project.landBreakdown?.agricultural || 0} Ha
                  </div>
                </div>
                <div style={{ padding: '10px', border: '1px solid #D8D5CB', background: '#FBFAF6' }}>
                  <span style={{ color: '#6B7280' }}>Forest Land (MoEF):</span>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#8A6A1E', marginTop: '2px' }}>
                    {project.landBreakdown?.forest || 0} Ha
                  </div>
                </div>
                <div style={{ padding: '10px', border: '1px solid #D8D5CB', background: '#FBFAF6' }}>
                  <span style={{ color: '#6B7280' }}>Private NA Land:</span>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                    {project.landBreakdown?.private || 0} Ha
                  </div>
                </div>
                <div style={{ padding: '10px', border: '1px solid #D8D5CB', background: '#FBFAF6' }}>
                  <span style={{ color: '#6B7280' }}>Government Revenue:</span>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                    {project.landBreakdown?.government || 0} Ha
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MAP */}
          {activeSideTab === 'map' && (
            <div>
              <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', color: '#16233A', margin: '0 0 6px' }}>
                Project Cadastral GIS Overlay
              </h3>
              <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 16px' }}>
                Survey polygon boundary verified against state land records
              </p>

              <div style={{
                height: '320px',
                background: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #D8D5CB 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, #D8D5CB 28px), #FBFAF6',
                border: '1px solid #D8D5CB',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3A4A63',
                position: 'relative'
              }}>
                <MapPin size={36} style={{ color: '#2F6F62', marginBottom: '8px' }} />
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#16233A' }}>
                  GIS Map Viewer Active — {project.name}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                  Coordinates: 18.5204° N, 73.8567° E | Buffer Zone: 30m | Cadastral Parcels: {project.totalLandowners}
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('map')}
                  style={{
                    marginTop: '12px',
                    background: '#2F6F62',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 14px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    borderRadius: '2px'
                  }}
                >
                  Open in National GIS Map →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PEOPLE / AUTHORITIES */}
          {activeSideTab === 'people' && (
            <div>
              <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', color: '#16233A', margin: '0 0 6px' }}>
                Authorities &amp; Stakeholder Directory
              </h3>
              <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 18px' }}>
                Hierarchy of state, district, and project officers responsible for statutory milestones
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px 16px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
                  <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600 }}>State Authority</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                    {project.stakeholders?.stateAuthority || "Shri Sunil V. Chavan, IAS (Principal Secretary Revenue)"}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                    Revenue &amp; Forest Department, Government of {project.state}
                  </div>
                </div>

                <div style={{ padding: '12px 16px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
                  <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600 }}>District Collector &amp; Magistrate</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                    {project.stakeholders?.districtCollector || "District Collector Office"}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                    Collectorate of {project.district}
                  </div>
                </div>

                <div style={{ padding: '12px 16px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
                  <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600 }}>Proposing Body In-Charge</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                    {project.stakeholders?.projectDirector || "Chief General Manager (Land)"}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                    {project.authority}
                  </div>
                </div>

                <div style={{ padding: '12px 16px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
                  <div style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600 }}>Special Land Acquisition Officer (SLAO)</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                    {project.stakeholders?.slaoOfficer || "Special Land Acquisition Officer"}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                    Taluka {project.taluka || 'Haveli'} Jurisdiction
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS & DSC */}
          {activeSideTab === 'doc' && (
            <div>
              <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', color: '#16233A', margin: '0 0 6px' }}>
                Project Documents &amp; Digital Signatures
              </h3>
              <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 16px' }}>
                Immutable digital records with NIC / eMudhra Class-3 digital signature audit trail
              </p>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#F2F1EC', borderBottom: '1px solid #16233A' }}>
                    <th style={{ textAlign: 'left', padding: '8px 10px', fontSize: '11px', color: '#3A4A63' }}>DOCUMENT NAME</th>
                    <th style={{ textAlign: 'left', padding: '8px 10px', fontSize: '11px', color: '#3A4A63' }}>TYPE</th>
                    <th style={{ textAlign: 'center', padding: '8px 10px', fontSize: '11px', color: '#3A4A63' }}>VER</th>
                    <th style={{ textAlign: 'left', padding: '8px 10px', fontSize: '11px', color: '#3A4A63' }}>UPLOADED BY</th>
                    <th style={{ textAlign: 'left', padding: '8px 10px', fontSize: '11px', color: '#3A4A63' }}>EXACT TIMESTAMP</th>
                    <th style={{ textAlign: 'center', padding: '8px 10px', fontSize: '11px', color: '#3A4A63' }}>DSC STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: `Detailed_Project_Report_${project.id}.pdf`, type: "Project Report", ver: 2, uploader: project.authority, time: "24 Aug 2026 | 04:42:18 PM IST", dsc: "Digitally Signed" },
                    { name: `Cadastral_Survey_Map_Revenue_${project.district}.pdf`, type: "Cadastral Map", ver: 1, uploader: "State Revenue Dept", time: "18 Aug 2026 | 03:15:00 PM IST", dsc: "Digitally Signed" },
                    { name: `SIA_Appraisal_Committee_Recommendations.pdf`, type: "SIA Appraisal", ver: 1, uploader: "Empaneled Agency", time: "02 Sep 2026 | 11:20:45 AM IST", dsc: "Digitally Signed" },
                    { name: `Preliminary_Notification_Sec11_Gazette.pdf`, type: "e-Gazette", ver: 1, uploader: "Collectorate", time: "10 Jul 2026 | 09:30:12 AM IST", dsc: "Digitally Signed" }
                  ].map((doc, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #D8D5CB', background: i % 2 === 0 ? '#FFFFFF' : '#FBFAF6' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 600, color: '#16233A' }}>{doc.name}</td>
                      <td style={{ padding: '8px 10px', color: '#6B7280' }}>{doc.type}</td>
                      <td style={{ padding: '8px 10px', textAlign: 'center', fontFamily: 'monospace' }}>v{doc.ver}</td>
                      <td style={{ padding: '8px 10px', color: '#3A4A63' }}>{doc.uploader}</td>
                      <td style={{ padding: '8px 10px', fontFamily: 'monospace', fontSize: '11px', color: '#6B7280' }}>{doc.time}</td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                        <span style={{
                          fontSize: '10px',
                          background: '#E4EEE9',
                          color: '#2F6F62',
                          border: '1px solid #2F6F62',
                          padding: '1px 6px',
                          fontFamily: 'monospace'
                        }}>
                          {doc.dsc}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 5: SIA */}
          {activeSideTab === 'sia' && (
            <div>
              <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', color: '#16233A', margin: '0 0 6px' }}>
                Social Impact Assessment (SIA) Findings
              </h3>
              <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 16px' }}>
                Section 4 &amp; Section 7 statutory appraisal summary
              </p>

              <div style={{ background: '#FBFAF6', border: '1px solid #D8D5CB', padding: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600 }}>Empaneled SIA Agency</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#16233A', marginTop: '2px' }}>
                      {project.siaSummary?.agency || "Tata Institute of Social Sciences (TISS)"}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Expert Appraisal Score</div>
                    <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', fontWeight: 700, color: '#2F6F62' }}>
                      {project.siaSummary?.appraisalScore || "8.5 / 10"}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #D8D5CB', fontSize: '12.5px', color: '#3A4A63' }}>
                  <strong>Public Hearings Held:</strong> {project.siaSummary?.hearingsCompleted || 4} village sessions conducted under video surveillance.
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: R&R */}
          {activeSideTab === 'rnr' && (
            <div>
              <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', color: '#16233A', margin: '0 0 6px' }}>
                Rehabilitation &amp; Resettlement (R&R) Scheme
              </h3>
              <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 16px' }}>
                Section 31 statutory entitlements and displacement package status
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ background: '#FBFAF6', border: '1px solid #D8D5CB', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Displaced Families</div>
                  <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', fontWeight: 700, color: '#16233A' }}>
                    {project.rrSummary?.displacedFamilies || 65}
                  </div>
                </div>

                <div style={{ background: '#FBFAF6', border: '1px solid #D8D5CB', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Housing Units Allotted</div>
                  <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', fontWeight: 700, color: '#2F6F62' }}>
                    {project.rrSummary?.housingUnitsAllotted || 42}
                  </div>
                </div>

                <div style={{ background: '#FBFAF6', border: '1px solid #D8D5CB', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Pending Allotments</div>
                  <div style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', fontWeight: 700, color: '#A6432B' }}>
                    {project.rrSummary?.pendingAllotments || 23}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: GRIEVANCES */}
          {activeSideTab === 'grievance' && (
            <div>
              <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', color: '#16233A', margin: '0 0 6px' }}>
                Citizen Grievance Redressal Registry
              </h3>
              <p style={{ fontSize: '12.5px', color: '#6B7280', margin: '0 0 16px' }}>
                Statutory complaints logged by affected landowners and village committees
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                marginBottom: '16px'
              }}>
                <div style={{ padding: '10px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Total Grievances</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#16233A' }}>{project.grievanceSummary?.total || 18}</div>
                </div>
                <div style={{ padding: '10px', background: '#E4EEE9', border: '1px solid #2F6F62' }}>
                  <div style={{ fontSize: '11px', color: '#2F6F62' }}>Resolved</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#2F6F62' }}>{project.grievanceSummary?.resolved || 8}</div>
                </div>
                <div style={{ padding: '10px', background: '#F6E7E2', border: '1px solid #A6432B' }}>
                  <div style={{ fontSize: '11px', color: '#A6432B' }}>Pending Action</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#A6432B' }}>{project.grievanceSummary?.pending || 10}</div>
                </div>
                <div style={{ padding: '10px', background: '#F2ECDC', border: '1px solid #8A6A1E' }}>
                  <div style={{ fontSize: '11px', color: '#8A6A1E' }}>Escalated to Collector</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#8A6A1E' }}>{project.grievanceSummary?.escalated || 3}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: DIRECTIVES & INQUIRIES (Prompt requirement: active ministerial inquiries) */}
          {activeSideTab === 'directives' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', color: '#16233A', margin: '0 0 2px' }}>
                    Supervisory Directives &amp; Formal Inquiries ({projectDirectives.length})
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#6B7280', margin: 0 }}>
                    Traceable ministerial directives issued by MORD Secretary with responses received
                  </p>
                </div>

                <button
                  onClick={() => setIsDirectiveModalOpen(true)}
                  style={{
                    background: '#2F6F62',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '7px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Send size={12} /> Issue New Directive
                </button>
              </div>

              {projectDirectives.length === 0 ? (
                <div style={{
                  padding: '36px',
                  textAlign: 'center',
                  background: '#FBFAF6',
                  border: '1px dashed #D8D5CB',
                  color: '#6B7280',
                  fontSize: '13px'
                }}>
                  No ministerial directives currently issued for this project.
                  <div style={{ marginTop: '8px' }}>
                    <button
                      onClick={() => setIsDirectiveModalOpen(true)}
                      style={{
                        background: 'none',
                        border: '1px solid #2F6F62',
                        color: '#2F6F62',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Issue Directive / Demand Delay Explanation
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {projectDirectives.map(dir => (
                    <div
                      key={dir.id}
                      style={{
                        border: '1px solid #D8D5CB',
                        background: '#FBFAF6',
                        padding: '16px',
                        borderLeft: '4px solid #2F6F62'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              fontFamily: '"IBM Plex Mono", monospace',
                              fontSize: '11px',
                              padding: '2px 6px',
                              background: '#E4EEE9',
                              color: '#2F6F62',
                              fontWeight: 700
                            }}>
                              {dir.id}
                            </span>
                            <span style={{
                              fontSize: '10.5px',
                              fontFamily: '"IBM Plex Mono", monospace',
                              background: dir.status === 'Awaiting Response' ? '#F6E7E2' : '#E4EEE9',
                              color: dir.status === 'Awaiting Response' ? '#A6432B' : '#2F6F62',
                              border: '1px solid',
                              padding: '1px 6px',
                              fontWeight: 600
                            }}>
                              {dir.status.toUpperCase()}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#16233A', margin: '4px 0 2px' }}>
                            {dir.title}
                          </h4>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>
                            Target Authority: <strong>{dir.targetAuthority}</strong> &nbsp;|&nbsp;
                            Dispatched: <span style={{ fontFamily: 'monospace' }}>{dir.issueDate}</span>
                          </div>
                        </div>
                      </div>

                      <p style={{
                        fontSize: '12.5px',
                        color: '#16233A',
                        background: '#FFFFFF',
                        border: '1px solid #D8D5CB',
                        padding: '10px 12px',
                        lineHeight: 1.5,
                        margin: '10px 0',
                        whiteSpace: 'pre-line'
                      }}>
                        {dir.directiveContent}
                      </p>

                      {/* Response from Authority if received */}
                      {dir.responseReceived && (
                        <div style={{
                          background: '#E4EEE9',
                          border: '1px solid #2F6F62',
                          padding: '12px 14px',
                          marginTop: '10px',
                          fontSize: '12px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <strong style={{ color: '#2F6F62' }}>
                              ✓ Response Received from {dir.responseReceived.respondedBy}
                            </strong>
                            <span style={{ fontFamily: 'monospace', color: '#6B7280' }}>
                              {dir.responseReceived.date}
                            </span>
                          </div>
                          <p style={{ color: '#16233A', margin: '2px 0 0', lineHeight: 1.45 }}>
                            {dir.responseReceived.responseSummary}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: AI / SYSTEM ANALYSIS */}
          {activeSideTab === 'ai' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '18px', color: '#16233A', margin: 0 }}>
                  System Decision-Support Analysis
                </h3>
                <span style={{
                  fontSize: '10px',
                  fontFamily: '"IBM Plex Mono", monospace',
                  padding: '2px 6px',
                  background: '#F2ECDC',
                  color: '#8A6A1E',
                  border: '1px solid #8A6A1E',
                  fontWeight: 600
                }}>
                  AI-ASSISTED PREDICTIVE MODEL
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 16px' }}>
                This is an analytical forecast generated by pattern-matching against 1,200+ historical infrastructure land acquisitions. It does not represent an official statutory determination.
              </p>

              <div style={{ background: '#FBFAF6', border: '1px solid #D8D5CB', padding: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ background: '#FFFFFF', padding: '10px', border: '1px solid #D8D5CB' }}>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>Confidence Rating</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#2F6F62' }}>
                      {project.aiAnalysis?.confidence || '88%'}
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '10px', border: '1px solid #D8D5CB' }}>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>Predicted Delay Risk</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: project.riskLevel === 'Critical' ? '#A6432B' : '#8A6A1E' }}>
                      {project.aiAnalysis?.delayRisk || 'Medium'} Risk
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '10px', border: '1px solid #D8D5CB' }}>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>Forecast Additional Delay</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#A6432B' }}>
                      +{project.aiAnalysis?.predictedAdditionalDelayDays || 30} Days
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #D8D5CB', paddingTop: '12px' }}>
                  <strong style={{ fontSize: '12.5px', color: '#16233A' }}>Detected Bottleneck Signals:</strong>
                  <ul style={{ margin: '6px 0 12px', paddingLeft: '20px', fontSize: '12px', color: '#3A4A63' }}>
                    {project.aiAnalysis?.detectedBottlenecks?.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                    )) || <li>Zero abnormal bottlenecks detected on active timeline.</li>}
                  </ul>

                  <div style={{
                    background: '#F2ECDC',
                    border: '1px solid #8A6A1E',
                    padding: '10px 14px',
                    fontSize: '12px',
                    color: '#8A6A1E'
                  }}>
                    <strong>Recommended Supervisory Intervention:</strong> {project.aiAnalysis?.recommendedReview || 'Routine monitoring.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ministerial Directive Modal */}
      <MordIssueDirectiveModal
        isOpen={isDirectiveModalOpen}
        onClose={() => setIsDirectiveModalOpen(false)}
        project={project}
        onDirectiveIssued={handleDirectiveCreated}
      />
    </div>
  );
}
