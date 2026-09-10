import React, { useState, useRef, useEffect } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  LayoutDashboard,
  Bell,
  AlertTriangle,
  CheckSquare,
  FolderKanban,
  Calculator,
  FileText,
  FileCheck2,
  MapPin,
  FolderArchive,
  Layers,
  ChevronDown
} from 'lucide-react';

const Sidebar = () => {
  const { activeTab, setActiveTab, objections, notifications } = useSwadesh();
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pendingObjectionsCount = objections.filter(o => o.status !== 'Resolved').length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Primary top navbar items
  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifCount },
    { id: 'objections', label: 'Objection List', icon: AlertTriangle, badge: pendingObjectionsCount, badgeDanger: true },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'notices', label: 'Statutory Notices', icon: FileText },
    { id: 'mutation', label: 'Final Mutation', icon: FileCheck2 }
  ];

  // Resources dropdown items
  const resourceSubItems = [
    { id: 'compensation', label: 'Compensation Calculation', icon: Calculator, desc: 'PFMS direct compensation calculator & awards' },
    { id: 'gis', label: 'GIS and Map', icon: MapPin, desc: 'Cadastral spatial map & alignment inspection' },
    { id: 'documents', label: 'Document Vault', icon: FolderArchive, desc: '7/12 Satbara, Form 3E & Gazette repository' }
  ];

  const isResourceActive = resourceSubItems.some(item => item.id === activeTab);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResourcesClick = () => {
    // Only toggle the dropdown menu without navigating to any page
    setIsResourcesOpen(prev => !prev);
  };

  return (
    <nav className="top-nav-bar" aria-label="Tahsildar Main Navigation">
      <div className="top-nav-container">
        {/* Main Nav Items */}
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              className={`top-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setIsResourcesOpen(false);
              }}
              title={item.label}
            >
              <Icon size={15} strokeWidth={1.75} style={{ flexShrink: 0 }} />
              <span>{item.label}</span>

              {item.badge !== undefined && item.badge > 0 && (
                <span className={`nav-badge ${item.badgeDanger ? 'danger' : ''}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Resources Dropdown Tab */}
        <div className="top-nav-dropdown-container" ref={dropdownRef}>
          <button
            className={`top-nav-item ${isResourceActive || isResourcesOpen ? 'active' : ''}`}
            onClick={handleResourcesClick}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Layers size={15} strokeWidth={1.75} />
            <span>Resources</span>
            <ChevronDown
              size={13}
              style={{
                transition: 'transform 0.2s ease',
                transform: isResourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>

          {isResourcesOpen && (
            <div className="top-nav-dropdown-menu">
              <div style={{
                fontSize: '10px',
                fontWeight: 800,
                color: '#0B4726',
                letterSpacing: '0.6px',
                padding: '4px 10px 6px 10px',
                borderBottom: '1px solid #E2E8F0',
                textTransform: 'uppercase'
              }}>
                RESOURCES & SYSTEM TOOLS
              </div>

              {resourceSubItems.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = activeTab === sub.id;

                return (
                  <button
                    key={sub.id}
                    className={`top-nav-dropdown-item ${isSubActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(sub.id);
                      setIsResourcesOpen(false);
                    }}
                  >
                    <SubIcon size={16} style={{ color: isSubActive ? '#FFF' : '#0B4726', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: isSubActive ? 700 : 600 }}>{sub.label}</span>
                      <span style={{ fontSize: '10px', opacity: isSubActive ? 0.9 : 0.65, fontWeight: 400 }}>{sub.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
