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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* File Strip / Breadcrumbs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        fontSize: '13px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280' }}>
          <button
            onClick={onBack}
            className="btn btn-secondary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={13} /> NATIONAL PROJECTS
          </button>
          <span style={{ color: '#CBD5E1' }}>/</span>
          <span style={{ color: '#4B5563', fontWeight: 500 }}>{project.state.toUpperCase()}</span>
          <span style={{ color: '#CBD5E1' }}>/</span>
          <span style={{ color: '#4B5563', fontWeight: 500 }}>{project.ministry.replace('Ministry of ', '').toUpperCase()}</span>
          <span style={{ color: '#CBD5E1' }}>/</span>
          <span style={{ color: '#008E4F', fontWeight: 700, fontFamily: '"Roboto Mono", monospace' }}>{project.id}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '11px',
            padding: '4px 10px',
            background: '#ECFDF5',
            color: '#065F46',
            border: '1px solid #A7F3D0',
            borderRadius: '9999px',
            fontWeight: 600,
            letterSpacing: '0.03em'
          }}>
            SUPERVISORY FILE RECORD • MORD
          </span>
        </div>
      </div>

      {/* TOP HERO AREA: PROJECT DETAILS & 3 PHOTOGRAPHS (Prompt Section 11) */}
      <div className="card" style={{
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        borderLeft: isDelayed ? '4px solid #DC2626' : '4px solid #008E4F',
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Project Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{
              fontFamily: '"Roboto Mono", monospace',
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '9999px',
              background: isDelayed ? '#FEF2F2' : '#ECFDF5',
              color: isDelayed ? '#991B1B' : '#065F46',
              border: isDelayed ? '1px solid #FECACA' : '1px solid #A7F3D0',
              fontWeight: 700
            }}>
              {project.status.toUpperCase()}
            </span>

            <span style={{
              fontSize: '11px',
              fontFamily: '"Roboto Mono", monospace',
              padding: '4px 10px',
              borderRadius: '9999px',
              background: '#F1F5F9',
              border: '1px solid #E2E8F0',
              color: '#334155',
              fontWeight: 600
            }}>
              STAGE: {project.stage.toUpperCase()}
            </span>

            <span style={{ fontSize: '12px', color: '#6B7280' }}>
              Created: {project.assignedDate}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Merriweather, Georgia, serif',
            fontSize: '24px',
            fontWeight: 700,
            color: '#111827',
            margin: '0 0 8px',
            lineHeight: 1.3
          }}>
            {project.name}
          </h1>

          <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '14px' }}>
            <strong>Proposed by:</strong> {project.authority} &nbsp;&middot;&nbsp;
            <strong>Ministry:</strong> {project.ministry} &nbsp;&middot;&nbsp;
            <strong>Jurisdiction:</strong> {project.district}, {project.state}
          </div>

          <p style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.6, margin: '0 0 18px', maxWidth: '64ch' }}>
            {project.description}
          </p>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '13px',
            marginBottom: '18px'
          }}>
            <strong style={{ color: '#111827' }}>Public Purpose Category:</strong> {project.publicPurpose}
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              onClick={() => setIsDirectiveModalOpen(true)}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                fontSize: '13px',
                borderRadius: '8px'
              }}
            >
              <Send size={14} />
              Demand Delay Explanation / Issue Directive
            </button>

            <button
              onClick={() => {
                alert(`Official MIS Project Brief generated for ${project.id}. Preparing PDF export...`);
              }}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                fontSize: '13px',
                borderRadius: '8px'
              }}
            >
              <Download size={14} />
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {/* Primary Main Photo */}
            <div style={{
              gridColumn: '1 / -1',
              height: '140px',
              background: '#F1F5F9',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
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
                background: 'rgba(17, 24, 39, 0.8)',
                color: '#FFFFFF',
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: '"Roboto Mono", monospace'
              }}>
                Aerial / Drone Corridor Survey
              </span>
            </div>

            {/* Photo 2 */}
            <div style={{
              height: '85px',
              background: '#F1F5F9',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
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
                background: 'rgba(17, 24, 39, 0.8)',
                color: '#FFFFFF',
                fontSize: '9.5px',
                padding: '1px 6px',
                borderRadius: '3px',
                fontFamily: '"Roboto Mono", monospace'
              }}>
                Boundary Marker
              </span>
            </div>

            {/* Photo 3 */}
            <div style={{
              height: '85px',
              background: '#F1F5F9',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
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
                background: 'rgba(17, 24, 39, 0.8)',
                color: '#FFFFFF',
                fontSize: '9.5px',
                padding: '1px 6px',
                borderRadius: '3px',
                fontFamily: '"Roboto Mono", monospace'
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
        gap: '16px'
      }}>
        <div className="card" style={{ padding: '18px 20px', borderRadius: '12px', borderLeft: '4px solid #4B5563' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em', fontWeight: 600 }}>
            Land Required / Acquired
          </div>
          <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#111827', marginTop: '4px' }}>
            {project.landRequiredHa} Ha <span style={{ fontSize: '13px', fontWeight: 500, color: '#008E4F' }}>/ {project.landAcquiredHa} Ha ({project.landRequiredHa ? Math.round((project.landAcquiredHa / project.landRequiredHa) * 100) : 0}%)</span>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 20px', borderRadius: '12px', borderLeft: '4px solid #008E4F' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em', fontWeight: 600 }}>
            Estimated Cost / Disbursed
          </div>
          <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#111827', marginTop: '4px' }}>
            {project.estimatedBudget} <span style={{ fontSize: '13px', fontWeight: 500, color: '#008E4F' }}>/ {project.disbursedCompensation}</span>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 20px', borderRadius: '12px', borderLeft: '4px solid #1A73E8' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em', fontWeight: 600 }}>
            Affected Landowners / Families
          </div>
          <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#111827', marginTop: '4px' }}>
            {project.totalLandowners} <span style={{ fontSize: '13px', fontWeight: 400, color: '#4B5563' }}>Landowners ({project.affectedFamilies} Families)</span>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 20px', borderRadius: '12px', borderLeft: project.rfctlarrCompliancePct < 85 ? '4px solid #DC2626' : '4px solid #008E4F' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', letterSpacing: '0.04em', fontWeight: 600 }}>
            RFCTLARR Compliance
          </div>
          <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '20px', fontWeight: 700, color: project.rfctlarrCompliancePct < 85 ? '#DC2626' : '#008E4F', marginTop: '4px' }}>
            {project.rfctlarrCompliancePct}% Compliance
          </div>
        </div>
      </div>

      {/* 11.2 PROJECT STATUS TIMELINE & "WHY IS IT PENDING?" */}
      <div className="card" style={{
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        borderLeft: '4px solid #008E4F'
      }}>
        <h4 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>
          Statutory Milestone Timeline
        </h4>

        {/* Timeline Horizontal Line */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: '8px',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '16px',
          marginBottom: '16px'
        }}>
          {statusStages.map((st, idx) => (
            <div key={st.key} style={{ textAlign: 'center' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                margin: '0 auto 6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                background: st.status === 'Completed' ? '#008E4F' : st.status === 'In Progress' ? '#D97706' : '#F1F5F9',
                color: st.status === 'Completed' || st.status === 'In Progress' ? '#FFFFFF' : '#64748B',
                border: '1px solid',
                borderColor: st.status === 'Completed' ? '#008E4F' : st.status === 'In Progress' ? '#D97706' : '#CBD5E1'
              }}>
                {st.status === 'Completed' ? '✓' : idx + 1}
              </div>
              <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#1E293B' }}>
                {st.label}
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                {st.status}
              </div>
            </div>
          ))}
        </div>

        {/* "WHY IS IT PENDING?" ROOT CAUSE BREAKDOWN (Prompt Section 11.2) */}
        {project.pendingReason ? (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: '16px',
            alignItems: 'center'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              background: '#DC2626',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
              <AlertTriangle size={22} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '13px', color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  WHY IS IT PENDING? — {project.pendingReason.stage}
                </strong>
                <span style={{ fontSize: '11px', fontFamily: '"Roboto Mono", monospace', color: '#DC2626', fontWeight: 600 }}>
                  Stuck for {project.pendingReason.idleDays} Days (Since {project.pendingReason.sinceDate})
                </span>
              </div>

              <p style={{ fontSize: '13px', color: '#1F2937', margin: '4px 0 2px' }}>
                <strong>Reason:</strong> {project.pendingReason.reason}
              </p>

              <div style={{ fontSize: '12px', color: '#4B5563' }}>
                <strong>Responsible Authority:</strong> {project.pendingReason.responsibleAuthority}
              </div>
            </div>

            <button
              onClick={() => setIsDirectiveModalOpen(true)}
              className="btn btn-primary"
              style={{
                background: '#DC2626',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: '12px',
                borderRadius: '8px'
              }}
            >
              <Send size={12} /> Demand Explanation
            </button>
          </div>
        ) : (
          <div style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: '12px',
            padding: '12px 18px',
            fontSize: '13px',
            color: '#065F46',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <CheckCircle2 size={18} style={{ color: '#008E4F' }} />
            <span>
              <strong>Project Operating on Schedule:</strong> No administrative bottlenecks or statutory delay queries recorded.
            </span>
          </div>
        )}
      </div>

      {/* BODY GRID: RIGHT-SIDE DETAIL NAVIGATION (Prompt Section 12) + DETAIL PANELS */}
      <div className="card" style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: 0,
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: 0,
        overflow: 'hidden'
      }}>
        {/* Right-Side Navigation Tabs (Prompt Section 12) */}
        <div style={{
          borderRight: '1px solid #E2E8F0',
          background: '#F8FAFC',
          padding: '16px 0'
        }}>
          <div style={{
            fontSize: '11px',
            fontFamily: '"Roboto Mono", monospace',
            textTransform: 'uppercase',
            color: '#64748B',
            fontWeight: 700,
            padding: '0 20px 10px',
            letterSpacing: '0.04em'
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
                  background: isActive ? '#ECFDF5' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #008E4F' : '3px solid transparent',
                  padding: '11px 20px',
                  fontSize: '12.5px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#065F46' : '#475569',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span style={{
                    fontFamily: '"Roboto Mono", monospace',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    background: tab.highlight ? '#FEF3C7' : '#E2E8F0',
                    color: tab.highlight ? '#92400E' : '#475569',
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
        <div style={{ padding: '24px 32px', minHeight: '480px', backgroundColor: '#FFFFFF' }}>
          {/* TAB 1: LOCATION */}
          {activeSideTab === 'loc' && (
            <div>
              <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '18px', color: '#111827', margin: '0 0 4px' }}>
                Location &amp; Cadastral Cadre Information
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px' }}>
                Spatial and revenue jurisdiction breakdown for Project {project.id}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em' }}>Administrative Location</div>
                  <div style={{ fontSize: '13.5px', color: '#1E293B', marginTop: '6px' }}>
                    <strong>State:</strong> {project.state}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#1E293B', marginTop: '4px' }}>
                    <strong>District:</strong> {project.district}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#1E293B', marginTop: '4px' }}>
                    <strong>Taluka / Tehsil:</strong> {project.taluka || 'Haveli'}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em' }}>Revenue Villages Affected ({project.villages?.length || 4})</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                    {project.villages?.map(v => (
                      <span key={v} style={{
                        fontSize: '12px',
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        color: '#1E293B',
                        fontWeight: 500
                      }}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', margin: '0 0 12px' }}>
                Land Parcel Classification
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                fontSize: '12px'
              }}>
                <div style={{ padding: '12px', border: '1px solid #E2E8F0', borderRadius: '10px', background: '#F8FAFC' }}>
                  <span style={{ color: '#64748B' }}>Agricultural Land:</span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>
                    {project.landBreakdown?.agricultural || 0} Ha
                  </div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #E2E8F0', borderRadius: '10px', background: '#F8FAFC' }}>
                  <span style={{ color: '#64748B' }}>Forest Land (MoEF):</span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#D97706', marginTop: '4px' }}>
                    {project.landBreakdown?.forest || 0} Ha
                  </div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #E2E8F0', borderRadius: '10px', background: '#F8FAFC' }}>
                  <span style={{ color: '#64748B' }}>Private NA Land:</span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>
                    {project.landBreakdown?.private || 0} Ha
                  </div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #E2E8F0', borderRadius: '10px', background: '#F8FAFC' }}>
                  <span style={{ color: '#64748B' }}>Government Revenue:</span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>
                    {project.landBreakdown?.government || 0} Ha
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MAP */}
          {activeSideTab === 'map' && (
            <div>
              <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '18px', color: '#111827', margin: '0 0 4px' }}>
                Project Cadastral GIS Overlay
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Survey polygon boundary verified against state land records
              </p>

              <div style={{
                height: '320px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#334155',
                position: 'relative'
              }}>
                <MapPin size={38} style={{ color: '#008E4F', marginBottom: '8px' }} />
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>
                  GIS Map Viewer Active — {project.name}
                </div>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '4px' }}>
                  Coordinates: 18.5204° N, 73.8567° E | Buffer Zone: 30m | Cadastral Parcels: {project.totalLandowners}
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('map')}
                  className="btn btn-primary"
                  style={{
                    marginTop: '14px',
                    padding: '8px 18px',
                    fontSize: '12px',
                    borderRadius: '8px'
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
              <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '18px', color: '#111827', margin: '0 0 4px' }}>
                Authorities &amp; Stakeholder Directory
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 20px' }}>
                Hierarchy of state, district, and project officers responsible for statutory milestones
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em' }}>State Authority</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', marginTop: '4px' }}>
                    {project.stakeholders?.stateAuthority || "Shri Sunil V. Chavan, IAS (Principal Secretary Revenue)"}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    Revenue &amp; Forest Department, Government of {project.state}
                  </div>
                </div>

                <div style={{ padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em' }}>District Collector &amp; Magistrate</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', marginTop: '4px' }}>
                    {project.stakeholders?.districtCollector || "District Collector Office"}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    Collectorate of {project.district}
                  </div>
                </div>

                <div style={{ padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em' }}>Proposing Body In-Charge</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', marginTop: '4px' }}>
                    {project.stakeholders?.projectDirector || "Chief General Manager (Land)"}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    {project.authority}
                  </div>
                </div>

                <div style={{ padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em' }}>Special Land Acquisition Officer (SLAO)</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', marginTop: '4px' }}>
                    {project.stakeholders?.slaoOfficer || "Special Land Acquisition Officer"}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    Taluka {project.taluka || 'Haveli'} Jurisdiction
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS & DSC */}
          {activeSideTab === 'doc' && (
            <div>
              <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '18px', color: '#111827', margin: '0 0 4px' }}>
                Project Documents &amp; Digital Signatures
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Immutable digital records with NIC / eMudhra Class-3 digital signature audit trail
              </p>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                <div className="table-container">
                  <table className="gov-table">
                    <thead>
                      <tr>
                        <th>Document Name</th>
                        <th>Type</th>
                        <th style={{ textAlign: 'center' }}>Ver</th>
                        <th>Uploaded By</th>
                        <th>Exact Timestamp</th>
                        <th style={{ textAlign: 'center' }}>DSC Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: `Detailed_Project_Report_${project.id}.pdf`, type: "Project Report", ver: 2, uploader: project.authority, time: "24 Aug 2026 | 04:42:18 PM IST", dsc: "Digitally Signed" },
                        { name: `Cadastral_Survey_Map_Revenue_${project.district}.pdf`, type: "Cadastral Map", ver: 1, uploader: "State Revenue Dept", time: "18 Aug 2026 | 03:15:00 PM IST", dsc: "Digitally Signed" },
                        { name: `SIA_Appraisal_Committee_Recommendations.pdf`, type: "SIA Appraisal", ver: 1, uploader: "Empaneled Agency", time: "02 Sep 2026 | 11:20:45 AM IST", dsc: "Digitally Signed" },
                        { name: `Preliminary_Notification_Sec11_Gazette.pdf`, type: "e-Gazette", ver: 1, uploader: "Collectorate", time: "10 Jul 2026 | 09:30:12 AM IST", dsc: "Digitally Signed" }
                      ].map((doc, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600, color: '#1E293B' }}>{doc.name}</td>
                          <td style={{ color: '#64748B' }}>{doc.type}</td>
                          <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>v{doc.ver}</td>
                          <td style={{ color: '#334155' }}>{doc.uploader}</td>
                          <td style={{ fontFamily: '"Roboto Mono", monospace', fontSize: '11px', color: '#64748B' }}>{doc.time}</td>
                          <td style={{ textAlign: 'center' }}>
                            <span style={{
                              fontSize: '11px',
                              background: '#ECFDF5',
                              color: '#065F46',
                              border: '1px solid #A7F3D0',
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              fontWeight: 600,
                              fontFamily: '"Roboto Mono", monospace'
                            }}>
                              {doc.dsc}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SIA */}
          {activeSideTab === 'sia' && (
            <div>
              <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '18px', color: '#111827', margin: '0 0 4px' }}>
                Social Impact Assessment (SIA) Findings
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Section 4 &amp; Section 7 statutory appraisal summary
              </p>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 600, letterSpacing: '0.04em' }}>Empaneled SIA Agency</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B', marginTop: '4px' }}>
                      {project.siaSummary?.agency || "Tata Institute of Social Sciences (TISS)"}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Expert Appraisal Score</div>
                    <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#008E4F', marginTop: '2px' }}>
                      {project.siaSummary?.appraisalScore || "8.5 / 10"}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #E2E8F0', fontSize: '13px', color: '#334155' }}>
                  <strong>Public Hearings Held:</strong> {project.siaSummary?.hearingsCompleted || 4} village sessions conducted under video surveillance.
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: R&R */}
          {activeSideTab === 'rnr' && (
            <div>
              <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '18px', color: '#111827', margin: '0 0 4px' }}>
                Rehabilitation &amp; Resettlement (R&R) Scheme
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Section 31 statutory entitlements and displacement package status
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
                marginBottom: '16px'
              }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Displaced Families</div>
                  <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#1E293B', marginTop: '4px' }}>
                    {project.rrSummary?.displacedFamilies || 65}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Housing Units Allotted</div>
                  <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#008E4F', marginTop: '4px' }}>
                    {project.rrSummary?.housingUnitsAllotted || 42}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Pending Allotments</div>
                  <div style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#DC2626', marginTop: '4px' }}>
                    {project.rrSummary?.pendingAllotments || 23}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: GRIEVANCES */}
          {activeSideTab === 'grievance' && (
            <div>
              <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '18px', color: '#111827', margin: '0 0 4px' }}>
                Citizen Grievance Redressal Registry
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 18px' }}>
                Statutory complaints logged by affected landowners and village committees
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{ padding: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Total Grievances</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>{project.grievanceSummary?.total || 18}</div>
                </div>
                <div style={{ padding: '14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#065F46', textTransform: 'uppercase', fontWeight: 600 }}>Resolved</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#008E4F', marginTop: '2px' }}>{project.grievanceSummary?.resolved || 8}</div>
                </div>
                <div style={{ padding: '14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#991B1B', textTransform: 'uppercase', fontWeight: 600 }}>Pending Action</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#DC2626', marginTop: '2px' }}>{project.grievanceSummary?.pending || 10}</div>
                </div>
                <div style={{ padding: '14px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#92400E', textTransform: 'uppercase', fontWeight: 600 }}>Escalated to Collector</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#D97706', marginTop: '2px' }}>{project.grievanceSummary?.escalated || 3}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: DIRECTIVES & INQUIRIES (Prompt requirement: active ministerial inquiries) */}
          {activeSideTab === 'directives' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '18px', color: '#111827', margin: '0 0 2px' }}>
                    Supervisory Directives &amp; Formal Inquiries ({projectDirectives.length})
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                    Traceable ministerial directives issued by MORD Secretary with responses received
                  </p>
                </div>

                <button
                  onClick={() => setIsDirectiveModalOpen(true)}
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    borderRadius: '8px'
                  }}
                >
                  <Send size={13} /> Issue New Directive
                </button>
              </div>

              {projectDirectives.length === 0 ? (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  background: '#F8FAFC',
                  border: '1px dashed #CBD5E1',
                  borderRadius: '12px',
                  color: '#64748B',
                  fontSize: '13px'
                }}>
                  No ministerial directives currently issued for this project.
                  <div style={{ marginTop: '12px' }}>
                    <button
                      onClick={() => setIsDirectiveModalOpen(true)}
                      className="btn btn-secondary"
                      style={{
                        padding: '6px 14px',
                        fontSize: '12px',
                        borderRadius: '6px'
                      }}
                    >
                      Issue Directive / Demand Delay Explanation
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {projectDirectives.map(dir => (
                    <div
                      key={dir.id}
                      style={{
                        border: '1px solid #E2E8F0',
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '18px',
                        borderLeft: '4px solid #008E4F',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              fontFamily: '"Roboto Mono", monospace',
                              fontSize: '11px',
                              padding: '2px 8px',
                              background: '#ECFDF5',
                              color: '#065F46',
                              border: '1px solid #A7F3D0',
                              borderRadius: '4px',
                              fontWeight: 700
                            }}>
                              {dir.id}
                            </span>
                            <span style={{
                              fontSize: '11px',
                              fontFamily: '"Roboto Mono", monospace',
                              background: dir.status === 'Awaiting Response' ? '#FEF2F2' : '#ECFDF5',
                              color: dir.status === 'Awaiting Response' ? '#991B1B' : '#065F46',
                              border: dir.status === 'Awaiting Response' ? '1px solid #FECACA' : '1px solid #A7F3D0',
                              borderRadius: '9999px',
                              padding: '2px 8px',
                              fontWeight: 600
                            }}>
                              {dir.status.toUpperCase()}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B', margin: '6px 0 2px' }}>
                            {dir.title}
                          </h4>
                          <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                            Target Authority: <strong>{dir.targetAuthority}</strong> &nbsp;|&nbsp;
                            Dispatched: <span style={{ fontFamily: 'monospace' }}>{dir.issueDate}</span>
                          </div>
                        </div>
                      </div>

                      <p style={{
                        fontSize: '13px',
                        color: '#334155',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        lineHeight: 1.55,
                        margin: '12px 0',
                        whiteSpace: 'pre-line'
                      }}>
                        {dir.directiveContent}
                      </p>

                      {/* Response from Authority if received */}
                      {dir.responseReceived && (
                        <div style={{
                          background: '#ECFDF5',
                          border: '1px solid #A7F3D0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          marginTop: '10px',
                          fontSize: '12.5px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <strong style={{ color: '#065F46' }}>
                              ✓ Response Received from {dir.responseReceived.respondedBy}
                            </strong>
                            <span style={{ fontFamily: 'monospace', color: '#64748B' }}>
                              {dir.responseReceived.date}
                            </span>
                          </div>
                          <p style={{ color: '#1E293B', margin: '2px 0 0', lineHeight: 1.5 }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h3 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '18px', color: '#111827', margin: 0 }}>
                  System Decision-Support Analysis
                </h3>
                <span style={{
                  fontSize: '10.5px',
                  fontFamily: '"Roboto Mono", monospace',
                  padding: '3px 8px',
                  background: '#FFFBEB',
                  color: '#92400E',
                  border: '1px solid #FDE68A',
                  borderRadius: '9999px',
                  fontWeight: 600
                }}>
                  AI-ASSISTED PREDICTIVE MODEL
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '0 0 18px' }}>
                This is an analytical forecast generated by pattern-matching against 1,200+ historical infrastructure land acquisitions. It does not represent an official statutory determination.
              </p>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ background: '#FFFFFF', padding: '14px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Confidence Rating</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#008E4F', marginTop: '4px' }}>
                      {project.aiAnalysis?.confidence || '88%'}
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '14px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Predicted Delay Risk</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: project.riskLevel === 'Critical' ? '#DC2626' : '#D97706', marginTop: '4px' }}>
                      {project.aiAnalysis?.delayRisk || 'Medium'} Risk
                    </div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '14px', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Forecast Additional Delay</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#DC2626', marginTop: '4px' }}>
                      +{project.aiAnalysis?.predictedAdditionalDelayDays || 30} Days
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                  <strong style={{ fontSize: '13px', color: '#1E293B' }}>Detected Bottleneck Signals:</strong>
                  <ul style={{ margin: '8px 0 16px', paddingLeft: '20px', fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
                    {project.aiAnalysis?.detectedBottlenecks?.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>
                    )) || <li>Zero abnormal bottlenecks detected on active timeline.</li>}
                  </ul>

                  <div style={{
                    background: '#FFFBEB',
                    border: '1px solid #FDE68A',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '12.5px',
                    color: '#92400E'
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
