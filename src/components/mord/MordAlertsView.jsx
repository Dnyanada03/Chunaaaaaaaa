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
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '24px 28px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280', fontWeight: 600 }}>
            Supervisory Oversight &amp; Administrative Interventions
          </div>
          <h2 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '2px 0 0', color: '#16233A' }}>
            Alerts &amp; Ministerial Directives Console
          </h2>
          <p style={{ fontSize: '13px', color: '#3A4A63', margin: '4px 0 0' }}>
            Official show-cause notices, delay explanations, policy guidance directives and system risk signals.
          </p>
        </div>

        {/* Sub-Tabs */}
        <div style={{
          display: 'flex',
          background: '#FFFFFF',
          border: '1px solid #D8D5CB',
          padding: '3px'
        }}>
          <button
            onClick={() => setActiveSubTab('directives')}
            style={{
              padding: '6px 14px',
              border: 'none',
              background: activeSubTab === 'directives' ? '#2F6F62' : 'transparent',
              color: activeSubTab === 'directives' ? '#FFFFFF' : '#3A4A63',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '2px'
            }}
          >
            Directives &amp; Inquiries ({directivesList.length})
          </button>
          <button
            onClick={() => setActiveSubTab('alerts')}
            style={{
              padding: '6px 14px',
              border: 'none',
              background: activeSubTab === 'alerts' ? '#2F6F62' : 'transparent',
              color: activeSubTab === 'alerts' ? '#FFFFFF' : '#3A4A63',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '2px'
            }}
          >
            System Risk Alerts ({delayedProjects.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: DIRECTIVES & INQUIRIES */}
      {activeSubTab === 'directives' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: '#3A4A63' }}>
              Showing {directivesList.length} formal directives issued to State Revenue Secretaries and District Collectors.
            </div>
            <button
              onClick={() => {
                setSelectedProjectForDirective(delayedProjects[0] || allProjects[0]);
                setIsDirectiveModalOpen(true);
              }}
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
              <Send size={13} /> Issue New Directive
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {directivesList.map(dir => (
              <div
                key={dir.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D8D5CB',
                  borderLeft: `4px solid ${dir.status === 'Awaiting Response' ? '#A6432B' : '#2F6F62'}`,
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#2F6F62',
                        background: '#E4EEE9',
                        padding: '1px 6px'
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
                        fontWeight: 700
                      }}>
                        {dir.status.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '11px', color: '#6B7280' }}>
                        Dispatched: {dir.issueDate}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '16px', fontWeight: 600, color: '#16233A', margin: 0 }}>
                      {dir.title}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#3A4A63', marginTop: '2px' }}>
                      Project: <strong>{dir.projectName}</strong> ({dir.projectId}) &nbsp;|&nbsp;
                      Recipient Authority: <strong>{dir.targetAuthority}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('project-detail', dir.projectId)}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #D8D5CB',
                      padding: '5px 12px',
                      fontSize: '11.5px',
                      color: '#16233A',
                      cursor: 'pointer',
                      borderRadius: '2px'
                    }}
                  >
                    View Project Case →
                  </button>
                </div>

                <div style={{
                  background: '#FBFAF6',
                  border: '1px solid #D8D5CB',
                  padding: '12px 14px',
                  fontSize: '12.5px',
                  color: '#16233A',
                  lineHeight: 1.55,
                  margin: '10px 0',
                  whiteSpace: 'pre-line'
                }}>
                  {dir.directiveContent}
                </div>

                {/* State Response if available */}
                {dir.responseReceived ? (
                  <div style={{
                    background: '#E4EEE9',
                    border: '1px solid #2F6F62',
                    padding: '12px 16px',
                    fontSize: '12.5px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <strong style={{ color: '#2F6F62' }}>
                        ✓ Formal Explanation Received from {dir.responseReceived.respondedBy}
                      </strong>
                      <span style={{ fontFamily: 'monospace', color: '#6B7280' }}>
                        {dir.responseReceived.date}
                      </span>
                    </div>
                    <p style={{ color: '#16233A', margin: '2px 0 0', lineHeight: 1.45 }}>
                      {dir.responseReceived.responseSummary}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: '#6B7280' }}>
                    <span>Awaiting official compliance response. Statutory window expires in {dir.daysRemaining} days.</span>
                    <span style={{ color: '#A6432B', fontWeight: 600 }}>Response Due: {dir.deadlineDate}</span>
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
              style={{
                background: '#FFFFFF',
                border: '1px solid #D8D5CB',
                borderLeft: '4px solid #A6432B',
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
                    fontFamily: '"IBM Plex Mono", monospace',
                    background: '#F6E7E2',
                    color: '#A6432B',
                    border: '1px solid #A6432B',
                    padding: '1px 6px',
                    fontWeight: 700
                  }}>
                    SYSTEM ANALYSIS
                  </span>
                  <strong style={{ fontSize: '14px', color: '#16233A' }}>
                    {proj.name}
                  </strong>
                  <span style={{ fontSize: '11.5px', fontFamily: 'monospace', color: '#6B7280' }}>
                    [{proj.id}] · {proj.state}
                  </span>
                </div>

                <div style={{ fontSize: '12.5px', color: '#3A4A63', margin: '6px 0' }}>
                  <strong>Bottleneck:</strong> {proj.pendingReason?.reason || 'Idle timeline without movement'} &nbsp;|&nbsp;
                  <strong>Stuck Since:</strong> {proj.pendingReason?.sinceDate || '30 days'} &nbsp;|&nbsp;
                  <strong>Responsible:</strong> {proj.pendingReason?.responsibleAuthority || 'State Authority'}
                </div>

                <div style={{ fontSize: '12px', color: '#2F6F62', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} />
                  <span>
                    <strong>Recommended Review:</strong> {proj.aiAnalysis?.recommendedReview || 'Issue Ministerial Directive'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    setSelectedProjectForDirective(proj);
                    setIsDirectiveModalOpen(true);
                  }}
                  style={{
                    background: '#2F6F62',
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

                <button
                  onClick={() => onNavigate && onNavigate('project-detail', proj.id)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #D8D5CB',
                    color: '#16233A',
                    padding: '8px 12px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    borderRadius: '2px'
                  }}
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
