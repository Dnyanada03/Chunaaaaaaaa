import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Filter,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { initialMordDirectives, getAllMordProjects } from '../../data/mordData';
import { useSwadesh } from '../../context/SwadeshContext';
import MordIssueDirectiveModal from './MordIssueDirectiveModal';

export default function MordAlertsView({ onNavigate }) {
  const { projects: contextProjects } = useSwadesh();
  const allProjects = useMemo(() => getAllMordProjects(contextProjects), [contextProjects]);

  const [activeSubTab, setActiveSubTab] = useState('directives'); // 'directives' | 'alerts'
  const [selectedProjectForDirective, setSelectedProjectForDirective] = useState(null);
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

  const delayedProjects = allProjects.filter(p => p.status === 'Delayed' || p.riskLevel === 'Critical');

  const handleDirectiveIssued = (newDirective) => {
    setDirectivesList(prev => [newDirective, ...prev]);
    const saved = localStorage.getItem('swadesh_mord_directives');
    const list = saved ? JSON.parse(saved) : [];
    localStorage.setItem('swadesh_mord_directives', JSON.stringify([newDirective, ...list]));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div className="page-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="page-title-group">
          <h1>Alerts &amp; Ministerial Directives Console</h1>
          <p>Official show-cause notices, delay explanations, policy guidance directives and system risk signals • Supervisory Oversight &amp; Administrative Interventions</p>
        </div>

        {/* Sub-Tabs */}
        <div style={{
          display: 'flex',
          background: '#F1F5F9',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '3px',
          gap: '4px'
        }}>
          <button
            onClick={() => setActiveSubTab('directives')}
            style={{
              padding: '6px 14px',
              border: activeSubTab === 'directives' ? '1px solid #E2E8F0' : '1px solid transparent',
              background: activeSubTab === 'directives' ? '#FFFFFF' : 'transparent',
              color: activeSubTab === 'directives' ? '#008E4F' : '#64748B',
              fontSize: '12px',
              fontWeight: activeSubTab === 'directives' ? 700 : 500,
              cursor: 'pointer',
              borderRadius: '6px',
              boxShadow: activeSubTab === 'directives' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            Directives &amp; Inquiries ({directivesList.length})
          </button>
          <button
            onClick={() => setActiveSubTab('alerts')}
            style={{
              padding: '6px 14px',
              border: activeSubTab === 'alerts' ? '1px solid #E2E8F0' : '1px solid transparent',
              background: activeSubTab === 'alerts' ? '#FFFFFF' : 'transparent',
              color: activeSubTab === 'alerts' ? '#008E4F' : '#64748B',
              fontSize: '12px',
              fontWeight: activeSubTab === 'alerts' ? 700 : 500,
              cursor: 'pointer',
              borderRadius: '6px',
              boxShadow: activeSubTab === 'alerts' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            System Risk Alerts ({delayedProjects.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: DIRECTIVES & INQUIRIES */}
      {activeSubTab === 'directives' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '13px', color: '#475569' }}>
              Showing {directivesList.length} formal directives issued to State Revenue Secretaries and District Collectors.
            </div>
            <button
              onClick={() => {
                setSelectedProjectForDirective(delayedProjects[0] || allProjects[0]);
                setIsDirectiveModalOpen(true);
              }}
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Send size={13} /> Issue New Directive
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {directivesList.map(dir => (
              <div
                key={dir.id}
                className="card"
                style={{
                  borderLeft: `4px solid ${dir.status === 'Awaiting Response' ? '#DC2626' : '#008E4F'}`,
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#008E4F',
                        background: '#E6F4EA',
                        border: '1px solid #CEEAD6',
                        borderRadius: '4px',
                        padding: '1px 6px'
                      }}>
                        {dir.id}
                      </span>
                      <span style={{
                        fontSize: '10.5px',
                        fontFamily: 'var(--font-mono, monospace)',
                        background: dir.status === 'Awaiting Response' ? '#FEE2E2' : '#E6F4EA',
                        color: dir.status === 'Awaiting Response' ? '#B91C1C' : '#15803D',
                        border: '1px solid',
                        borderColor: dir.status === 'Awaiting Response' ? '#FCA5A5' : '#86EFAC',
                        borderRadius: '4px',
                        padding: '1px 6px',
                        fontWeight: 700
                      }}>
                        {dir.status.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                        Dispatched: {dir.issueDate}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-serif, "Merriweather", Georgia, serif)', fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                      {dir.title}
                    </h3>
                    <div style={{ fontSize: '12.5px', color: '#475569', marginTop: '3px' }}>
                      Project: <strong style={{ color: '#0F172A' }}>{dir.projectName}</strong> ({dir.projectId}) &nbsp;|&nbsp;
                      Recipient Authority: <strong style={{ color: '#0F172A' }}>{dir.targetAuthority}</strong>
                    </div>
                  </div>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onNavigate && onNavigate('project-detail', dir.projectId)}
                  >
                    View Project Case →
                  </button>
                </div>

                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  fontSize: '12.5px',
                  color: '#1E293B',
                  lineHeight: 1.6,
                  margin: '12px 0',
                  whiteSpace: 'pre-line'
                }}>
                  {dir.directiveContent}
                </div>

                {/* State Response if available */}
                {dir.responseReceived ? (
                  <div style={{
                    background: '#E6F4EA',
                    border: '1px solid #86EFAC',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '12.5px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ color: '#15803D' }}>
                        ✓ Formal Explanation Received from {dir.responseReceived.respondedBy}
                      </strong>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', color: '#64748B', fontSize: '11px' }}>
                        {dir.responseReceived.date}
                      </span>
                    </div>
                    <p style={{ color: '#0F172A', margin: '2px 0 0', lineHeight: 1.5 }}>
                      {dir.responseReceived.responseSummary}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748B' }}>
                    <span>Awaiting official compliance response. Statutory window expires in {dir.daysRemaining} days.</span>
                    <span style={{ color: '#DC2626', fontWeight: 600 }}>Response Due: {dir.deadlineDate}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SYSTEM RISK ALERTS */}
      {activeSubTab === 'alerts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {delayedProjects.map(proj => (
            <div
              key={proj.id}
              className="card"
              style={{
                borderLeft: '4px solid #DC2626',
                padding: '18px 20px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '20px',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono, monospace)',
                    background: '#FEE2E2',
                    color: '#B91C1C',
                    border: '1px solid #FCA5A5',
                    borderRadius: '4px',
                    padding: '1px 6px',
                    fontWeight: 700
                  }}>
                    SYSTEM ANALYSIS
                  </span>
                  <strong style={{ fontSize: '14px', color: '#0F172A' }}>
                    {proj.name}
                  </strong>
                  <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono, monospace)', color: '#64748B' }}>
                    [{proj.id}] · {proj.state}
                  </span>
                </div>

                <div style={{ fontSize: '12.5px', color: '#475569', margin: '6px 0' }}>
                  <strong>Bottleneck:</strong> {proj.pendingReason?.reason || 'Idle timeline without movement'} &nbsp;|&nbsp;
                  <strong>Stuck Since:</strong> {proj.pendingReason?.sinceDate || '30 days'} &nbsp;|&nbsp;
                  <strong>Responsible:</strong> {proj.pendingReason?.responsibleAuthority || 'State Authority'}
                </div>

                <div style={{ fontSize: '12px', color: '#008E4F', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} />
                  <span>
                    <strong>Recommended Review:</strong> {proj.aiAnalysis?.recommendedReview || 'Issue Ministerial Directive'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setSelectedProjectForDirective(proj);
                    setIsDirectiveModalOpen(true);
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={12} /> Demand Explanation
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onNavigate && onNavigate('project-detail', proj.id)}
                >
                  Inspect Case
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Directive Dispatch Modal */}
      {selectedProjectForDirective && (
        <MordIssueDirectiveModal
          isOpen={isDirectiveModalOpen}
          onClose={() => {
            setIsDirectiveModalOpen(false);
            setSelectedProjectForDirective(null);
          }}
          project={selectedProjectForDirective}
          onDirectiveIssued={handleDirectiveIssued}
        />
      )}
    </div>
  );
}
