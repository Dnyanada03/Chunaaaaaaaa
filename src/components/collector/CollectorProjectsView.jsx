import React, { useState } from 'react';
import {
  FolderKanban,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Sparkles,
  BarChart,
  Calendar,
  XCircle,
  HelpCircle
} from 'lucide-react';
import {
  collectorProjectsMasterList,
  collectorTalukasProgress,
  collectorVillageProgress
} from '../../data/collectorMockData';

export default function CollectorProjectsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTaluka, setFilterTaluka] = useState('All');
  const [filterVillage, setFilterVillage] = useState('All');
  const [filterStageStatus, setFilterStageStatus] = useState('All');

  // Selected Project Details Modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Filtering Logic
  const filteredProjects = collectorProjectsMasterList.filter(p => {
    if (filterTaluka !== 'All' && !p.talukas.includes(filterTaluka)) return false;
    if (filterStageStatus !== 'All' && p.status !== filterStageStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.proposingBody.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>DISTRICT LAND ACQUISITION MASTER PROJECTS REGISTER</h1>
          <p>Comprehensive District Monitoring, Risk Score Assessment & Milestone Progress Tracking</p>
        </div>
      </div>

      {/* TOP FILTERS AND SEARCH BAR */}
      <div className="card" style={{ padding: '14px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '12px', alignItems: 'center' }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Project Name, ID, or Proposing Body..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          </div>

          {/* Filter Taluka */}
          <div>
            <select className="form-select" value={filterTaluka} onChange={e => setFilterTaluka(e.target.value)}>
              <option value="All">All Talukas ▼</option>
              {collectorTalukasProgress.map(t => (
                <option key={t.id} value={t.taluka}>Taluka {t.taluka}</option>
              ))}
            </select>
          </div>

          {/* Filter Village */}
          <div>
            <select className="form-select" value={filterVillage} onChange={e => setFilterVillage(e.target.value)}>
              <option value="All">All Villages ▼</option>
              {collectorVillageProgress.map((v, i) => (
                <option key={i} value={v.village}>{v.village}</option>
              ))}
            </select>
          </div>

          {/* Filter Stage Status */}
          <div>
            <select className="form-select" value={filterStageStatus} onChange={e => setFilterStageStatus(e.target.value)}>
              <option value="All">All Project Status ▼</option>
              <option value="Ongoing">Ongoing Projects</option>
              <option value="Completed">Completed Projects</option>
            </select>
          </div>
        </div>
      </div>

      {/* PROJECT LIST TABLE */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FolderKanban size={18} style={{ color: '#0B4726' }} />
            DISTRICT PROJECTS ({filteredProjects.length} PROJECTS DISPLAYED)
          </div>
        </div>

        <div className="table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Project Name & Reference ID</th>
                <th>Proposing Body</th>
                <th>Talukas Affected</th>
                <th>Villages Affected</th>
                <th>Timeline</th>
                <th>Current Stage</th>
                <th style={{ textAlign: 'center' }}>Risk Score</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '13.5px' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      ID: <span className="mono-code" style={{ color: '#0B4726', fontWeight: 700 }}>{p.id}</span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 700, color: '#334155' }}>{p.proposingBody}</span></td>
                  <td>{p.talukaCount} Taluka ({p.talukas.join(', ')})</td>
                  <td>{p.villageCount} Villages ({p.villages.join(', ')})</td>
                  <td>{p.timeline}</td>
                  <td>
                    <span className="badge badge-blue" style={{ fontWeight: 700 }}>
                      {p.stage}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {p.riskScore > 60 ? (
                      <span className="badge badge-red" style={{ fontWeight: 800 }}>
                        🔴 HIGH RISK ({p.riskScore}/100)
                      </span>
                    ) : p.riskScore > 30 ? (
                      <span className="badge badge-orange" style={{ fontWeight: 800 }}>
                        🟠 MEDIUM RISK ({p.riskScore}/100)
                      </span>
                    ) : (
                      <span className="badge badge-green" style={{ fontWeight: 800 }}>
                        🟢 LOW RISK ({p.riskScore}/100)
                      </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedProject(p)}
                    >
                      <Eye size={13} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROJECT DETAILS & RISK ASSESSMENT MODAL */}
      {selectedProject && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ maxWidth: '900px' }}>
            <div className="modal-header" style={{ background: '#06371E' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderKanban size={18} />
                <h3 className="modal-title">PROJECT DOSSIER: {selectedProject.name}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                <XCircle size={18} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Project Summary Banner */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{selectedProject.name}</h3>
                  <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                    Project ID: <span className="mono-code" style={{ color: '#0B4726', fontWeight: 700 }}>{selectedProject.id}</span> • Proposing Body: <strong>{selectedProject.proposingBody}</strong>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#334155' }}>{selectedProject.description}</p>
                </div>

                {/* PROJECT RISK SCORE CARD */}
                <div
                  style={{
                    background: selectedProject.riskColor === 'Red' ? '#FCE8E6' : selectedProject.riskColor === 'Orange' ? '#FEF3C7' : '#E6F4EA',
                    border: `2px solid ${selectedProject.riskColor === 'Red' ? '#C5221F' : selectedProject.riskColor === 'Orange' ? '#D97706' : '#1E7E34'}`,
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>OFFICIAL RISK SCORE</div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: selectedProject.riskColor === 'Red' ? '#C5221F' : selectedProject.riskColor === 'Orange' ? '#D97706' : '#1E7E34' }}>
                    {selectedProject.riskScore} <span style={{ fontSize: '14px' }}>/ 100</span>
                  </div>
                  <div className={`badge ${selectedProject.riskColor === 'Red' ? 'badge-red' : selectedProject.riskColor === 'Orange' ? 'badge-orange' : 'badge-green'}`} style={{ marginTop: '4px' }}>
                    {selectedProject.riskLevel}
                  </div>
                </div>
              </div>

              {/* Geographic Coverage */}
              <div style={{ background: '#F1F5F9', padding: '12px', borderRadius: '8px', fontSize: '12px' }}>
                <span style={{ fontWeight: 700, color: '#0B4726' }}>GEOGRAPHIC COVERAGE:</span> Talukas: <strong>{selectedProject.talukas.join(', ')}</strong> | Affected Villages: <strong>{selectedProject.villages.join(', ')}</strong>
              </div>

              {/* PROJECT MILESTONE PROGRESS TIMELINE */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                  PROJECT MILESTONE TIMELINE
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '6px' }}>
                  {selectedProject.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: m.status === 'Completed' ? '#E6F4EA' : m.status === 'In Progress' ? '#FEF3C7' : '#F1F5F9',
                        border: `1px solid ${m.status === 'Completed' ? '#CEEAD6' : m.status === 'In Progress' ? '#FDE68A' : '#CBD5E1'}`,
                        borderRadius: '6px',
                        padding: '8px 4px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontSize: '14px', marginTop: '2px' }}>
                        {m.status === 'Completed' ? '✓' : m.status === 'In Progress' ? '●' : '○'}
                      </div>
                      <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{m.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* REASONING SECTION: WHY IS THIS PROJECT AT ITS CURRENT STAGE? */}
              <div style={{ background: '#F8FAFC', border: '1.5px solid #0B4726', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 800, color: '#0B4726', marginBottom: '10px' }}>
                  <HelpCircle size={16} /> WHY IS THIS PROJECT AT ITS CURRENT STAGE ({selectedProject.stage})?
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedProject.reasonsForStage.map((r, i) => (
                    <div key={i} style={{ fontSize: '12.5px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981', fontWeight: 800 }}>•</span> {r}
                    </div>
                  ))}
                </div>
              </div>

              {/* RISK FACTORS BREAKDOWN */}
              {selectedProject.riskFactors.length > 0 && (
                <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 800, color: '#D97706', marginBottom: '8px' }}>
                    <AlertTriangle size={16} /> MAJOR RISK CONTRIBUTING FACTORS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedProject.riskFactors.map((rf, i) => (
                      <div key={i} style={{ fontSize: '12px', color: '#78350F' }}>
                        <strong>{rf.factor} ({rf.impact} Impact):</strong> {rf.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedProject(null)}>
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
