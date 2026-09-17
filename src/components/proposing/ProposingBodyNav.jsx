import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  FileSpreadsheet,
  FolderArchive,
  MapPin,
  FileText,
  Layers,
  ChevronDown,
  Bell,
  Settings,
  Sparkles
} from 'lucide-react';
import { useSwadesh } from '../../context/SwadeshContext';

export default function ProposingBodyNav({ activeTab, setActiveTab }) {
  const { proposingProjects, proposingProposals } = useSwadesh();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeProjectsCount = proposingProjects ? proposingProjects.length : 12;
  const activeProposalsCount = proposingProposals ? proposingProposals.length : 3;

  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban, badge: activeProjectsCount },
    { id: 'add-project', label: 'Add Project', icon: PlusCircle, isAction: true },
    { id: 'proposals', label: 'Proposals', icon: FileSpreadsheet, badge: activeProposalsCount },
    { id: 'documents', label: 'Documents', icon: FolderArchive },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'reports', label: 'Reports & MIS', icon: FileText }
  ];

  const moreSubItems = [
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Statutory updates & alerts' },
    { id: 'settings', label: 'Settings & Admin', icon: Settings, desc: 'Organization profile & integrations' }
  ];

  const isMoreActive = moreSubItems.some(item => item.id === activeTab);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="top-nav-bar" aria-label="Project Authority Navigation">
      <div className="top-nav-container">
        {primaryNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMoreOpen(false);
              }}
              className={`top-nav-item ${isActive ? 'active' : ''} ${item.isAction ? 'nav-action-highlight' : ''}`}
              style={item.isAction ? {
                background: isActive ? '#006638' : 'rgba(0, 142, 79, 0.12)',
                color: isActive ? '#FFF' : '#005A36',
                fontWeight: 700
              } : {}}
            >
              <Icon size={15} />
              <span>{item.label}</span>
              {item.badge ? (
                <span className={`nav-badge ${item.id === 'proposals' ? 'neutral' : ''}`}>
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}

        {/* More Options Dropdown */}
        <div className="top-nav-dropdown-container" ref={dropdownRef}>
          <button
            className={`top-nav-item ${isMoreActive || isMoreOpen ? 'active' : ''}`}
            onClick={() => setIsMoreOpen(prev => !prev)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Layers size={15} strokeWidth={1.75} />
            <span>More</span>
            <ChevronDown
              size={13}
              style={{
                transition: 'transform 0.2s ease',
                transform: isMoreOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>

          {isMoreOpen && (
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
                PROPOSING AUTHORITY SYSTEM
              </div>

              {moreSubItems.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = activeTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    className={`top-nav-dropdown-item ${isSubActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(sub.id);
                      setIsMoreOpen(false);
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
}
