import React, { useState } from 'react';
import { SwadeshProvider, useSwadesh } from './context/SwadeshContext';

// Common Components
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import GlobalSearchModal from './components/common/GlobalSearchModal';
import DigitalSignModal from './components/common/DigitalSignModal';
import DocumentViewerModal from './components/common/DocumentViewerModal';
import DocumentsView from './components/common/DocumentsView';
import UnifiedLoginView from './components/common/UnifiedLoginView';

// Tahsildar Components
import DashboardView from './components/tahsildar/DashboardView';
import NotificationsView from './components/tahsildar/NotificationsView';
import ObjectionListView from './components/tahsildar/ObjectionListView';
import MyTasksView from './components/tahsildar/MyTasksView';
import ProjectsView from './components/tahsildar/ProjectsView';
import CompensationView from './components/tahsildar/CompensationView';
import StatutoryNoticesView from './components/tahsildar/StatutoryNoticesView';
import FinalMutationView from './components/tahsildar/FinalMutationView';
import ProfileModal from './components/tahsildar/ProfileModal';

// District Collector Components
import CollectorHeader from './components/collector/CollectorHeader';
import CollectorNav from './components/collector/CollectorNav';
import CollectorGlobalSearchModal from './components/collector/CollectorGlobalSearchModal';
import CollectorProfileModal from './components/collector/CollectorProfileModal';

import CollectorDashboardView from './components/collector/CollectorDashboardView';
import CollectorApprovalsView from './components/collector/CollectorApprovalsView';
import CollectorProjectsView from './components/collector/CollectorProjectsView';
import CollectorCompensationView from './components/collector/CollectorCompensationView';
import CollectorAuditView from './components/collector/CollectorAuditView';
import CollectorGISView from './components/collector/CollectorGISView';
import CollectorReportsView from './components/collector/CollectorReportsView';
import CollectorAdminView from './components/collector/CollectorAdminView';

const MainApp = () => {
  const { isAuthenticated, userRole, activeTab } = useSwadesh();

  // Collector Tab State
  const [collectorTab, setCollectorTab] = useState('dashboard');

  // Collector Modals
  const [isCollectorProfileOpen, setIsCollectorProfileOpen] = useState(false);
  const [isCollectorSearchOpen, setIsCollectorSearchOpen] = useState(false);

  // Tahsildar Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Unauthenticated -> Render Unified Login Portal
  if (!isAuthenticated) {
    return <UnifiedLoginView />;
  }

  // 1. District Collector Logged In View
  if (userRole === 'collector') {
    const renderCollectorView = () => {
      switch (collectorTab) {
        case 'dashboard':
          return <CollectorDashboardView onNavigate={(tab) => setCollectorTab(tab)} />;
        case 'approvals':
          return <CollectorApprovalsView />;
        case 'projects':
          return <CollectorProjectsView />;
        case 'compensation':
          return <CollectorCompensationView />;
        case 'audit':
          return <CollectorAuditView />;
        case 'gis':
          return <CollectorGISView />;
        case 'documents':
          return <DocumentsView />;
        case 'reports':
          return <CollectorReportsView />;
        case 'admin':
          return <CollectorAdminView />;
        default:
          return <CollectorDashboardView onNavigate={(tab) => setCollectorTab(tab)} />;
      }
    };

    return (
      <div className="app-container">
        {/* District Collector Header */}
        <CollectorHeader
          activeRole="collector"
          onOpenProfile={() => setIsCollectorProfileOpen(true)}
          onOpenSearch={() => setIsCollectorSearchOpen(true)}
        />

        {/* Top Horizontal Navigation Bar */}
        <CollectorNav
          activeTab={collectorTab}
          setActiveTab={setCollectorTab}
        />

        {/* Main Content Area */}
        <main className="content-area">
          {renderCollectorView()}
        </main>

        {/* Collector Modals & Shared Modals */}
        <CollectorGlobalSearchModal
          isOpen={isCollectorSearchOpen}
          onClose={() => setIsCollectorSearchOpen(false)}
          onSelectResult={(category) => {
            if (category === 'projects') setCollectorTab('projects');
            if (category === 'taluka' || category === 'village') setCollectorTab('dashboard');
            if (category === 'parcel' || category === 'landowner') setCollectorTab('compensation');
          }}
        />
        <CollectorProfileModal
          isOpen={isCollectorProfileOpen}
          onClose={() => setIsCollectorProfileOpen(false)}
        />
        <DocumentViewerModal />
      </div>
    );
  }

  // 2. Tahsildar Logged In View
  const renderTahsildarView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'notifications':
        return <NotificationsView />;
      case 'objections':
        return <ObjectionListView />;
      case 'tasks':
        return <MyTasksView />;
      case 'projects':
        return <ProjectsView />;
      case 'compensation':
        return <CompensationView />;
      case 'notices':
        return <StatutoryNoticesView />;
      case 'mutation':
        return <FinalMutationView />;
      case 'gis':
        return <CollectorGISView />;
      case 'documents':
        return <DocumentsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      <Header onOpenProfile={() => setIsProfileModalOpen(true)} />
      <Sidebar />

      <main className="content-area">
        {renderTahsildarView()}
      </main>

      <GlobalSearchModal />
      <DigitalSignModal />
      <DocumentViewerModal />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <SwadeshProvider>
      <MainApp />
    </SwadeshProvider>
  );
}
