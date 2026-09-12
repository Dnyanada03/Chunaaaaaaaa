import React, { useState } from 'react';
import { BookOpen, FileText, Users, Scale, ClipboardList, ChevronRight, Download, Eye } from 'lucide-react';

const resourceCategories = [
  {
    id: 'documents', label: 'Documents', icon: FileText,
    items: [
      { name: 'RFCTLARR Act 2013 — Full Text', type: 'PDF', size: '2.4 MB' },
      { name: 'Maharashtra Land Revenue Code 1966', type: 'PDF', size: '1.8 MB' },
      { name: 'IT Act 2000 — Digital Signature Provisions', type: 'PDF', size: '680 KB' }
    ]
  },
  {
    id: 'sia', label: 'SIA', icon: Users,
    items: [
      { name: 'SIA Procedure Manual — Govt. of Maharashtra', type: 'PDF', size: '1.2 MB' },
      { name: 'SIA Agency Empanelment List 2026', type: 'PDF', size: '420 KB' },
      { name: 'SIA Report Template', type: 'DOCX', size: '180 KB' }
    ]
  },
  {
    id: 'rr', label: 'R&R & Compensation', icon: Scale,
    items: [
      { name: 'R&R Package Framework Guidelines', type: 'PDF', size: '1.5 MB' },
      { name: 'Compensation Calculation Formula Reference', type: 'Excel', size: '340 KB' },
      { name: 'Sub-Registrar Rate Card 2026 — All Districts', type: 'Excel', size: '890 KB' }
    ]
  },
  {
    id: 'policies', label: 'Policies / Guidelines', icon: ClipboardList,
    items: [
      { name: 'State Revenue Department Standard Operating Procedures', type: 'PDF', size: '2.1 MB' },
      { name: 'Digital Signature Usage Policy', type: 'PDF', size: '320 KB' },
      { name: 'Document Versioning & Retention Policy', type: 'PDF', size: '240 KB' }
    ]
  },
  {
    id: 'templates', label: 'Templates', icon: FileText,
    items: [
      { name: 'Project Proposal Submission Template', type: 'DOCX', size: '210 KB' },
      { name: 'Section 11 Preliminary Notification Template', type: 'DOCX', size: '150 KB' },
      { name: 'Compensation Award Declaration Template', type: 'DOCX', size: '185 KB' },
      { name: 'Monthly MIS Report Template', type: 'Excel', size: '280 KB' }
    ]
  }
];

export default function StateResourcesView() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const activeCategory = resourceCategories.find(c => c.id === selectedCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="page-banner">
        <div className="page-title-group">
          <h1>RESOURCES</h1>
          <p>Acts, policies, guidelines, templates, and reference documents</p>
        </div>
      </div>

      {!selectedCategory ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {resourceCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="card"
                onClick={() => setSelectedCategory(cat.id)}
                style={{ cursor: 'pointer', padding: '14px 18px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={18} style={{ color: '#0B4726' }} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{cat.label}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>{cat.items.length} items</div>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: '#CBD5E1' }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <button className="btn btn-sm btn-secondary" onClick={() => setSelectedCategory(null)} style={{ marginBottom: '14px', fontSize: '11px' }}>
            ← Back to Categories
          </button>
          <div className="card">
            <div className="card-header">
              <span className="card-title">{activeCategory?.label}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {activeCategory?.items.map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: idx < activeCategory.items.length - 1 ? '1px solid #F1F5F9' : 'none'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{item.type} · {item.size}</div>
                  </div>
                  <button className="btn btn-sm btn-secondary" style={{ fontSize: '10.5px' }}>
                    <Download size={11} /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
