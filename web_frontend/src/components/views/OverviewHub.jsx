import React from 'react';
import {
  FolderKanban,
  Building,
  MapPin,
  Clock,
  IndianRupee,
  AlertTriangle,
  AlertCircle,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import Emblem from '../common/Emblem';

const OverviewHub = ({ onNavigate }) => {
  const leftItems = [
    {
      id: 'projects',
      tab: 'projects',
      value: '12',
      title: 'Active Projects',
      desc: '3 Major Infrastructure Corridors',
      icon: FolderKanban,
      color: '#1E7E34',
      bg: '#E6F4EA'
    },
    {
      id: 'villages',
      tab: 'tasks',
      value: '48',
      title: 'Villages',
      desc: 'Haveli & Khed Taluka Jurisdiction',
      icon: Building,
      color: '#1A73E8',
      bg: '#E8F0FE'
    },
    {
      id: 'parcels',
      tab: 'projects',
      value: '8,450',
      title: 'Affected Land Parcels',
      desc: 'Total Corridor Surveyed Area',
      icon: MapPin,
      color: '#D97706',
      bg: '#FEF3C7'
    },
    {
      id: 'verification',
      tab: 'tasks',
      value: '1,240',
      title: 'Pending Verification',
      desc: 'Talathi Field Inspection Queue',
      icon: Clock,
      color: '#8B5CF6',
      bg: '#F3E8FF'
    }
  ];

  const rightItems = [
    {
      id: 'compensation',
      tab: 'compensation',
      value: '580',
      title: 'Compensation Approved',
      desc: 'PFMS Direct Benefit Transfer',
      icon: IndianRupee,
      color: '#059669',
      bg: '#D1FAE5'
    },
    {
      id: 'objections',
      tab: 'objections',
      value: '320',
      title: 'Under Objection',
      desc: 'Escalated to Tahsildar Bench',
      icon: AlertTriangle,
      color: '#C5221F',
      bg: '#FCE8E6'
    },
    {
      id: 'delayed',
      tab: 'tasks',
      value: '85',
      title: 'Delayed Cases (>15d)',
      desc: 'Resolution Deadline Expired',
      icon: AlertCircle,
      color: '#991B1B',
      bg: '#FEE2E2'
    },
    {
      id: 'notices',
      tab: 'notices',
      value: '745',
      title: 'Statutory Notices',
      desc: '7/12 Extracts & Mutation Issued',
      icon: FileCheck,
      color: '#0284C7',
      bg: '#E0F2FE'
    }
  ];

  return (
    <div className="overview-hub-card">
      <div className="hub-layout">
        {/* Left Column Cards */}
        <div className="hub-column left-column">
          {leftItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="hub-item-card"
                onClick={() => onNavigate(item.tab)}
              >
                <div
                  className="hub-item-icon"
                  style={{ background: item.bg, color: item.color }}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div className="hub-item-content">
                  <div className="hub-item-title-row">
                    <span className="hub-item-value" style={{ color: item.color }}>{item.value}</span>
                    <span className="hub-item-title">{item.title}</span>
                  </div>
                  <span className="hub-item-desc">{item.desc}</span>
                </div>
                <button
                  className="hub-item-btn"
                  style={{ background: item.color }}
                  title={`View ${item.title}`}
                  onClick={(e) => { e.stopPropagation(); onNavigate(item.tab); }}
                >
                  <ChevronRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Center Overview Hub Ring & Platform */}
        <div className="hub-center-container">
          {/* Connector SVGs background */}
          <svg className="hub-connectors-svg" viewBox="0 0 300 420" preserveAspectRatio="none">
            {/* Left Connector Curves */}
            <path d="M 10,45 C 90,45 100,140 150,140" fill="none" stroke="#1E7E34" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <path d="M 10,145 C 90,145 110,170 150,170" fill="none" stroke="#1A73E8" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <path d="M 10,245 C 90,245 110,230 150,230" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <path d="M 10,345 C 90,345 100,260 150,260" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

            {/* Right Connector Curves */}
            <path d="M 290,45 C 210,45 200,140 150,140" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <path d="M 290,145 C 210,145 190,170 150,170" fill="none" stroke="#C5221F" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <path d="M 290,245 C 210,245 190,230 150,230" fill="none" stroke="#991B1B" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <path d="M 290,345 C 210,345 200,260 150,260" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

            {/* Left Dots */}
            <circle cx="10" cy="45" r="4" fill="#1E7E34" />
            <circle cx="10" cy="145" r="4" fill="#1A73E8" />
            <circle cx="10" cy="245" r="4" fill="#D97706" />
            <circle cx="10" cy="345" r="4" fill="#8B5CF6" />

            {/* Right Dots */}
            <circle cx="290" cy="45" r="4" fill="#059669" />
            <circle cx="290" cy="145" r="4" fill="#C5221F" />
            <circle cx="290" cy="245" r="4" fill="#991B1B" />
            <circle cx="290" cy="345" r="4" fill="#0284C7" />
          </svg>

          {/* Radial Hub Circle */}
          <div className="hub-radial-circle">
            <div className="hub-outer-ring">
              <div className="hub-inner-ring">
                <div className="hub-center-core">
                  <div className="hub-sub-text">Land Acquisition Overview</div>
                  <div className="hub-main-text">SWADESH</div>
                  <div className="hub-badge-title">Overview</div>

                </div>
              </div>
            </div>
          </div>

          {/* Pedestal Platform Stand */}
          <div className="hub-pedestal-base">
            <div className="pedestal-ring-1" />
            <div className="pedestal-ring-2" />
            <div className="pedestal-ring-3" />
          </div>
        </div>

        {/* Right Column Cards */}
        <div className="hub-column right-column">
          {rightItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="hub-item-card"
                onClick={() => onNavigate(item.tab)}
              >
                <div
                  className="hub-item-icon"
                  style={{ background: item.bg, color: item.color }}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div className="hub-item-content">
                  <div className="hub-item-title-row">
                    <span className="hub-item-value" style={{ color: item.color }}>{item.value}</span>
                    <span className="hub-item-title">{item.title}</span>
                  </div>
                  <span className="hub-item-desc">{item.desc}</span>
                </div>
                <button
                  className="hub-item-btn"
                  style={{ background: item.color }}
                  title={`View ${item.title}`}
                  onClick={(e) => { e.stopPropagation(); onNavigate(item.tab); }}
                >
                  <ChevronRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewHub;
