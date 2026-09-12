import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  MapPin,
  Calendar,
  User,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Download,
  Eye,
  Activity,
  Users,
  AlertTriangle,
  Map
} from 'lucide-react';
import { stateProjectsMasterList, stateAuditLogs, stateDocuments } from '../../data/stateMockData';
import StatusBadge from '../common/StatusBadge';

export default function StateProjectDetailView({ projectId, onBack }) {
  const [activeDetailTab, setActiveDetailTab] = useState('overview');
  const project = stateProjectsMasterList.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <AlertCircle size={32} style={{ color: '#6B7280', marginBottom: '12px' }} />
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#374151' }}>Project Not Found</div>
        <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>The requested project could not be located.</div>
        <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={onBack}>
          <ArrowLeft size={14} /> Back to Projects
        </button>
      </div>
    );
  }

  const projectDocs = stateDocuments.filter(d => d.project && project.name.includes(d.project.split('—')[0]?.trim().substring(0, 10)));
  const projectAudit = stateAuditLogs.filter(a => a.project && project.name.includes(a.project.split('—')[0]?.trim().substring(0, 10)));

  const detailTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sia', label: 'SIA' },
    { id: 'land-gis', label: 'Land & GIS' },
    { id: 'documents', label: 'Documents' },
    { id: 'compensation', label: 'Compensation & R&R' },
    { id: 'grievances', label: 'Grievances' },
    { id: 'officers', label: 'Officers' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'audit', label: 'Audit Trail' }
  ];

  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case 'Critical': return 'badge-red';
      case 'High': return 'badge-orange';
      case 'Medium': return 'badge-purple';
      case 'Low': return 'badge-green';
      default: return 'badge-blue';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Back + Project Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button className="btn btn-sm btn-secondary" onClick={onBack} style={{ fontSize: '11px' }}>
          <ArrowLeft size={13} /> Back to Projects
        </button>
      </div>

      <div className="page-banner">
        <div className="page-title-group">
          <h1>{project.name}</h1>
          <p>{project.authority} — {project.district} District</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <StatusBadge status={project.status} />
          <span className={`badge ${getRiskBadgeClass(project.riskLevel)}`}>
            <span className="badge-dot"></span>
            {project.riskLevel} Risk
          </span>
        </div>
      </div>

      {/* Detail Tabs */}
      <div style={{
        display: 'flex',
        gap: '2px',
        background: '#F1F5F9',
        borderRadius: '12px',
        padding: '4px',
        overflowX: 'auto'
      }}>
        {detailTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveDetailTab(tab.id)}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '8px',
              background: activeDetailTab === tab.id ? '#0B4726' : 'transparent',
              color: activeDetailTab === tab.id ? '#FFFFFF' : '#475569',
              fontSize: '12.5px',
              fontWeight: activeDetailTab === tab.id ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeDetailTab === 'overview' && <OverviewTab project={project} />}
      {activeDetailTab === 'timeline' && <TimelineTab project={project} />}
      {activeDetailTab === 'audit' && <AuditTab projectAudit={projectAudit} />}
      {activeDetailTab === 'officers' && <OfficersTab project={project} />}
      {activeDetailTab === 'documents' && <DocumentsTab projectDocs={projectDocs} />}
      {activeDetailTab === 'sia' && <SiaTab project={project} />}
      {activeDetailTab === 'land-gis' && <LandGisTab project={project} />}
      {activeDetailTab === 'compensation' && <CompensationTab project={project} />}
      {activeDetailTab === 'grievances' && <GrievancesTab project={project} />}
    </div>
  );
}

/* ---- Tab Subcomponents ---- */

function OverviewTab({ project }) {
  const fields = [
    { label: 'Project Name', value: project.name },
    { label: 'Project Authority', value: project.authority },
    { label: 'Requiring Body', value: project.authority },
    { label: 'Ministry / Department', value: `${project.ministry} — ${project.department}` },
    { label: 'District', value: project.district },
    { label: 'Taluka', value: project.taluka },
    { label: 'Villages', value: project.villages.join(', ') },
    { label: 'Current Stage', value: project.stage },
    { label: 'Status', value: project.status },
    { label: 'Progress', value: `${project.progress}%` },
    { label: 'Risk Level', value: project.riskLevel },
    { label: 'Project Incharge', value: project.projectIncharge },
    { label: 'District Collector', value: project.districtCollector },
    { label: 'Estimated Budget', value: project.estimatedBudget },
    { label: 'Land Required', value: `${project.landRequiredHa} Ha` },
    { label: 'Land Acquired', value: `${project.landAcquiredHa} Ha (${Math.round(project.landAcquiredHa / project.landRequiredHa * 100)}%)` },
    { label: 'Timeline', value: project.timeline },
    { label: 'Affected Landowners', value: project.totalLandowners.toLocaleString() },
    { label: 'Grievances', value: project.grievances },
    { label: 'Delayed Days', value: project.delayDays > 0 ? `${project.delayDays} days` : 'On Schedule' },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Project Overview</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        {fields.map((f, i) => (
          <div key={i} style={{
            padding: '10px 14px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            gap: '8px'
          }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B7280', minWidth: '140px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              {f.label}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>
              {f.value}
            </span>
          </div>
        ))}
      </div>

      {/* Risk Factors */}
      {project.riskFactors.length > 0 && (
        <div style={{ marginTop: '18px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#C5221F', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={14} /> Risk Factors
          </div>
          {project.riskFactors.map((rf, i) => (
            <div key={i} style={{ padding: '10px 14px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', marginBottom: '8px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#92400E' }}>{rf.factor} — <span style={{ fontWeight: 500 }}>{rf.impact} Impact</span></div>
              <div style={{ fontSize: '12px', color: '#78350F', marginTop: '2px' }}>{rf.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TimelineTab({ project }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title"><Clock size={15} /> Project Timeline</span>
      </div>
      <div style={{ position: 'relative', paddingLeft: '28px' }}>
        {/* Vertical Line */}
        <div style={{ position: 'absolute', left: '10px', top: '0', bottom: '0', width: '2px', background: '#E2E8F0' }} />

        {project.milestones.map((ms, idx) => {
          const isCompleted = ms.status === 'Completed';
          const isInProgress = ms.status === 'In Progress';
          const isPending = ms.status === 'Pending';

          return (
            <div key={idx} style={{ position: 'relative', paddingBottom: idx < project.milestones.length - 1 ? '24px' : '0' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: '-23px',
                top: '4px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: isCompleted ? '#1E7E34' : isInProgress ? '#D97706' : '#E2E8F0',
                border: `2px solid ${isCompleted ? '#1E7E34' : isInProgress ? '#D97706' : '#CBD5E1'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isCompleted && <CheckCircle2 size={10} style={{ color: '#FFF' }} />}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: isCompleted ? '#111827' : isPending ? '#9CA3AF' : '#D97706' }}>
                    {ms.name}
                  </span>
                  <StatusBadge status={ms.status} />
                </div>
                {ms.date !== '-' && (
                  <div style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={11} />
                    {ms.timestamp || ms.date}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AuditTab({ projectAudit }) {
  if (projectAudit.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <Activity size={28} style={{ color: '#CBD5E1', marginBottom: '8px' }} />
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>No audit entries for this project</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title"><Activity size={15} /> Audit Trail</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {projectAudit.map((entry, idx) => (
          <div key={entry.id} style={{ padding: '14px 0', borderBottom: idx < projectAudit.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>{entry.action}</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6B7280' }}>{entry.timestamp}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#4B5563', marginBottom: '4px' }}>
              {entry.officer} — {entry.department}
            </div>
            {entry.remarks && (
              <div style={{ fontSize: '12px', color: '#6B7280', fontStyle: 'italic' }}>{entry.remarks}</div>
            )}
            {entry.previousStatus && entry.previousStatus !== '-' && (
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                Status: {entry.previousStatus} → {entry.newStatus}
              </div>
            )}
            {entry.signatureStatus && entry.signatureStatus !== '-' && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#1E7E34', background: '#E6F4EA', padding: '2px 8px', borderRadius: '6px', marginTop: '4px' }}>
                <ShieldCheck size={11} /> {entry.signatureStatus}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function OfficersTab({ project }) {
  const officers = [
    { role: 'Department', value: project.department },
    { role: 'Project Incharge', value: project.projectIncharge },
    { role: 'District Collector', value: project.districtCollector },
    { role: 'Ministry', value: project.ministry },
    { role: 'Project Authority', value: project.authority }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title"><Users size={15} /> Responsible Officers & Departments</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {officers.map((o, i) => (
          <div key={i} style={{ display: 'flex', padding: '12px 0', borderBottom: i < officers.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.3px', minWidth: '160px' }}>
              {o.role}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{o.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsTab({ projectDocs }) {
  if (projectDocs.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <FileText size={28} style={{ color: '#CBD5E1', marginBottom: '8px' }} />
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>No documents found for this project</div>
        <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>Documents will appear here once uploaded.</div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="gov-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Type</th>
            <th>Version</th>
            <th>Uploaded By</th>
            <th>Date</th>
            <th>Verification</th>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          {projectDocs.map(doc => (
            <tr key={doc.id}>
              <td style={{ fontWeight: 600, fontSize: '12.5px' }}>{doc.name}</td>
              <td style={{ fontSize: '12px' }}>{doc.type}</td>
              <td><span className="mono-code" style={{ fontSize: '12px' }}>v{doc.version}</span></td>
              <td style={{ fontSize: '12px' }}>{doc.uploadedBy}</td>
              <td style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6B7280' }}>{doc.uploadTimestamp}</td>
              <td><StatusBadge status={doc.verificationStatus} /></td>
              <td><StatusBadge status={doc.signatureStatus} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SiaTab({ project }) {
  const isSiaStage = project.stage === 'SIA' || project.milestones.some(m => m.name === 'SIA' && m.status === 'In Progress');
  const siaCompleted = project.milestones.some(m => m.name === 'SIA' && m.status === 'Completed');

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Social Impact Assessment</span>
        {isSiaStage && <span className="badge badge-orange"><span className="badge-dot"></span>In Progress</span>}
        {siaCompleted && <span className="badge badge-green"><span className="badge-dot"></span>Completed</span>}
        {!isSiaStage && !siaCompleted && <span className="badge badge-blue"><span className="badge-dot"></span>Pending</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        <InfoRow label="Project" value={project.name} />
        <InfoRow label="Affected Area" value={`${project.landRequiredHa} Ha`} />
        <InfoRow label="Affected Villages" value={project.villages.join(', ')} />
        <InfoRow label="Affected Landowners" value={project.totalLandowners.toLocaleString()} />
        <InfoRow label="District" value={project.district} />
        <InfoRow label="Taluka" value={project.taluka} />
      </div>
    </div>
  );
}

function LandGisTab({ project }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title"><Map size={15} /> Land & GIS Information</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        <InfoRow label="District" value={project.district} />
        <InfoRow label="Taluka" value={project.taluka} />
        <InfoRow label="Villages" value={project.villages.join(', ')} />
        <InfoRow label="Land Required" value={`${project.landRequiredHa} Ha`} />
        <InfoRow label="Land Acquired" value={`${project.landAcquiredHa} Ha`} />
        <InfoRow label="Acquisition Progress" value={`${Math.round(project.landAcquiredHa / project.landRequiredHa * 100)}%`} />
        <InfoRow label="Affected Landowners" value={project.totalLandowners.toLocaleString()} />
      </div>
      {/* Map placeholder */}
      <div style={{
        marginTop: '18px',
        height: '280px',
        background: '#F1F5F9',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6B7280',
        fontSize: '13px'
      }}>
        <MapPin size={18} style={{ marginRight: '8px' }} />
        GIS Map — {project.district} District, {project.taluka} Taluka
      </div>
    </div>
  );
}

function CompensationTab({ project }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Compensation & R&R</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        <InfoRow label="Estimated Budget" value={project.estimatedBudget} />
        <InfoRow label="Affected Landowners" value={project.totalLandowners.toLocaleString()} />
        <InfoRow label="Land Required" value={`${project.landRequiredHa} Ha`} />
        <InfoRow label="Land Acquired" value={`${project.landAcquiredHa} Ha`} />
        <InfoRow label="Compensation Stage" value={project.milestones.find(m => m.name === 'Compensation')?.status || 'Pending'} />
        <InfoRow label="Payment Stage" value={project.milestones.find(m => m.name === 'Payment')?.status || 'Pending'} />
      </div>
    </div>
  );
}

function GrievancesTab({ project }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title"><AlertTriangle size={15} /> Grievances</span>
        <span className="badge badge-orange"><span className="badge-dot"></span>{project.grievances} Active</span>
      </div>
      {project.grievances === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px', color: '#6B7280' }}>
          <CheckCircle2 size={24} style={{ color: '#1E7E34', marginBottom: '8px' }} />
          <div style={{ fontSize: '13px', fontWeight: 600 }}>No active grievances</div>
        </div>
      ) : (
        <div style={{ padding: '14px 0', color: '#4B5563', fontSize: '13px' }}>
          {project.grievances} active grievances reported for this project.
          {project.riskFactors.filter(rf => rf.factor.toLowerCase().includes('protest') || rf.factor.toLowerCase().includes('gram')).map((rf, i) => (
            <div key={i} style={{ padding: '10px 14px', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', marginTop: '10px' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#92400E' }}>{rf.factor}</div>
              <div style={{ fontSize: '12px', color: '#78350F', marginTop: '2px' }}>{rf.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ padding: '10px 14px', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: '8px' }}>
      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B7280', minWidth: '140px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
        {label}
      </span>
      <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{value}</span>
    </div>
  );
}
