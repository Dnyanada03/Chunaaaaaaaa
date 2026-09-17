import React, { useState, useEffect } from 'react';
import MordHeader from './MordHeader';
import MordNav from './MordNav';
import MordDashboardView from './MordDashboardView';
import MordProjectsView from './MordProjectsView';
import MordProjectDetailView from './MordProjectDetailView';
import MordMapView from './MordMapView';
import MordStatesView from './MordStatesView';
import MordMinistriesView from './MordMinistriesView';
import MordTransformationView from './MordTransformationView';
import MordReportsView from './MordReportsView';
import MordDocumentsView from './MordDocumentsView';
import MordAlertsView from './MordAlertsView';
import MordSettingsView from './MordSettingsView';
import MordGlobalSearchModal from './MordGlobalSearchModal';
import DocumentViewerModal from '../common/DocumentViewerModal';

export default function MordApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeProjectFilters, setActiveProjectFilters] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab, projectId = null, extraFilters = {}) => {
    if (tab === 'transformation') {
      setSelectedProjectId(null);
      setActiveTab('dashboard');
      setTimeout(() => {
        const el = document.getElementById('swadesh-transformation-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    if (projectId) {
      setSelectedProjectId(projectId);
      setActiveTab('project-detail');
      return;
    }
    if (extraFilters && Object.keys(extraFilters).length > 0) {
      setActiveProjectFilters(extraFilters);
    }
    setSelectedProjectId(null);
    setActiveTab(tab);
  };

  const renderActiveView = () => {
    if (activeTab === 'project-detail' && selectedProjectId) {
      return (
        <MordProjectDetailView
          projectId={selectedProjectId}
          onBack={() => {
            setSelectedProjectId(null);
            setActiveTab('projects');
          }}
          onNavigate={handleNavigate}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <MordDashboardView onNavigate={handleNavigate} />;
      case 'projects':
        return <MordProjectsView onNavigate={handleNavigate} initialFilters={activeProjectFilters} />;
      case 'map':
        return <MordMapView onNavigate={handleNavigate} />;
      case 'states':
        return <MordStatesView onNavigate={handleNavigate} />;
      case 'ministries':
        return <MordMinistriesView onNavigate={handleNavigate} />;
      case 'transformation':
        return <MordDashboardView onNavigate={handleNavigate} />;
      case 'reports':
        return <MordReportsView onNavigate={handleNavigate} />;
      case 'documents':
        return <MordDocumentsView onNavigate={handleNavigate} />;
      case 'alerts':
        return <MordAlertsView onNavigate={handleNavigate} />;
      case 'settings':
        return <MordSettingsView onNavigate={handleNavigate} />;
      default:
        return <MordDashboardView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F2F1EC',
      color: '#16233A',
      fontFamily: 'Inter, -apple-system, sans-serif'
    }}>
      {/* Official Government of India Header */}
      <MordHeader
        onOpenProfile={() => setActiveTab('settings')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
        unreadDirectivesCount={2}
      />

      {/* Horizontal National Supervisory Navigation */}
      <MordNav
        activeTab={activeTab === 'project-detail' ? 'projects' : activeTab}
        setActiveTab={(tab) => {
          setSelectedProjectId(null);
          setActiveTab(tab);
        }}
        unreadDirectives={2}
      />

      {/* Main Viewport */}
      <main>
        {renderActiveView()}
      </main>

      {/* Global Spotlight Search Modal */}
      <MordGlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Common Document Viewer Modal for inspecting documents */}
      <DocumentViewerModal />
    </div>
  );
}
