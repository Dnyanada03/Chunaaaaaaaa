import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  FileCheck,
  FolderKanban,
  FolderArchive,
  MapPin,
  FileText,
  Layers,
  ChevronDown,
  Bell,
  PenTool,
  BookOpen
} from 'lucide-react';

export default function StateNav({ activeTab, setActiveTab, pendingApprovalsCount = 3 }) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const primaryNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'approvals', label: 'Project Approval', icon: FileCheck, badge: pendingApprovalsCount, badgeType: 'danger' },
    { id: 'documents', label: 'Documents', icon: FolderArchive },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'reports', label: 'Reports & MIS', icon: FileText }
  ];

  const resourceSubItems = [
    { id: 'resources', label: 'Resources', icon: BookOpen, desc: 'Policies, guidelines & templates' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alerts & action items' },
    { id: 'signatures', label: 'Digital Signatures', icon: PenTool, desc: 'Pending signature queue' }
  ];

  const isResourceActive = resourceSubItems.some(item => item.id === activeTab);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="top-nav-bar" aria-label="State Government Navigation">
      <div className="top-nav-container">
        {primaryNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsResourcesOpen(false);
              }}
              className={`top-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={15} />
              <span>{item.label}</span>
              {item.badge ? (
                <span className={`nav-badge ${item.badgeType || ''}`}>
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}

        {/* Resources Dropdown */}
        <div className="top-nav-dropdown-container" ref={dropdownRef}>
          <button
            className={`top-nav-item ${isResourceActive || isResourcesOpen ? 'active' : ''}`}
            onClick={() => setIsResourcesOpen(prev => !prev)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Layers size={15} strokeWidth={1.75} />
            <span>More</span>
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
                RESOURCES & TOOLS
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
}
