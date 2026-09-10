import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  AlertTriangle, Search, Filter, Eye, ArrowLeft, FileText, CheckCircle2, RotateCcw,
  HelpCircle, ShieldAlert, LayoutGrid, List, MapPin, User, Calendar, Clock, Layers, FileCheck
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const ObjectionListView = () => {
  const { objections, selectedObjection, setSelectedObjection, handleResolveObjection, setIsDocViewerOpen, setActiveDoc } = useSwadesh();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [remarks, setRemarks] = useState('');
  const [actionDoneMsg, setActionDoneMsg] = useState('');

  const filtered = objections.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.landowner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.parcelId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.objectionType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Detailed View for selected objection
  if (selectedObjection) {
    const o = selectedObjection;

    const executeAction = (actionName) => {
      handleResolveObjection(o.id, actionName, remarks);
      setActionDoneMsg(`Official Order Executed: '${actionName}' for Objection ${o.id}. Workflow register updated.`);
      setTimeout(() => {
        setActionDoneMsg('');
      }, 3000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setSelectedObjection(null)}
          style={{ width: 'fit-content', gap: '6px' }}
        >
          <ArrowLeft size={15} /> Back to Objection Register
        </button>

        <div className="page-banner" style={{ background: '#0B4726' }}>
          <div className="page-title-group">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={22} style={{ color: '#FFD700' }} />
              Objection Review & Dispute Verification
            </h1>
            <p>Reference: <span className="mono-code" style={{ color: '#FFFFFF', fontWeight: '700' }}>{o.id}</span> • Parcel ID: <span className="mono-code" style={{ color: '#FFFFFF', fontWeight: '700' }}>{o.parcelId}</span> • Landowner: {o.landowner}</p>
          </div>
          <StatusBadge status={o.status} />
        </div>

        {actionDoneMsg && (
          <div style={{ background: '#E6F4EA', border: '1px solid #CEEAD6', color: '#1E7E34', padding: '12px 16px', borderRadius: '10px', fontWeight: '600', fontSize: '13.5px' }}>
            <CheckCircle2 size={18} style={{ display: 'inline', verticalAlign: '-4px', marginRight: '6px' }} /> {actionDoneMsg}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Main Info Columns - Clean layout without nested boxes */}
          <div className="card" style={{ padding: '24px' }}>
            {/* Section 1: Basic Information */}
            <div style={{ paddingBottom: '18px', marginBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0B4726', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={15} /> 1. Basic Land Record & Project Specifications
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13.5px' }}>
                <div><span style={{ color: '#64748B' }}>Project Name:</span> <strong style={{ color: '#0F172A' }}>{o.projectName}</strong></div>
                <div><span style={{ color: '#64748B' }}>Project ID:</span> <span className="mono-code" style={{ color: '#1A73E8', fontWeight: '700' }}>{o.projectId}</span></div>
                <div><span style={{ color: '#64748B' }}>Revenue Village:</span> <strong style={{ color: '#0F172A' }}>{o.village}</strong></div>
                <div><span style={{ color: '#64748B' }}>Parcel ID:</span> <span className="mono-code">{o.parcelId}</span></div>
                <div><span style={{ color: '#64748B' }}>Survey / Gut No:</span> <span className="mono-code">{o.surveyNumber}</span></div>
                <div><span style={{ color: '#64748B' }}>Primary Landowner:</span> <strong style={{ color: '#0B4726' }}>{o.landowner}</strong></div>
              </div>
            </div>

            {/* Section 2: Reported Dispute Details */}
            <div style={{ paddingBottom: '18px', marginBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#C5221F', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={15} /> 2. Reported Dispute & Objection Particulars
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13.5px', marginBottom: '16px' }}>
                <div><span style={{ color: '#64748B' }}>Objection Category:</span> <strong style={{ color: '#C5221F' }}>{o.objectionType}</strong></div>
                <div><span style={{ color: '#64748B' }}>Raised By:</span> <strong style={{ color: '#334155' }}>{o.raisedBy}</strong></div>
                <div><span style={{ color: '#64748B' }}>Date Raised:</span> <span style={{ color: '#334155' }}>{o.dateRaised}</span></div>
                <div><span style={{ color: '#64748B' }}>Resolution Due Date:</span> <strong style={{ color: o.daysRemaining < 0 ? '#C5221F' : '#D97706' }}>{o.dueDate} ({o.daysRemaining} days remaining)</strong></div>
              </div>

              {/* Clean text instead of nested box-in-box */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontWeight: '700', color: '#64748B', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Official Issue Description:
                </div>
                <div style={{ fontSize: '14px', color: '#1E293B', lineHeight: '1.6' }}>{o.issueDescription}</div>
              </div>

              <div>
                <div style={{ fontWeight: '700', color: '#64748B', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  Talathi / Surveyor Field Inspection Remarks:
                </div>
                <div style={{ fontSize: '14px', color: '#1E293B', lineHeight: '1.6' }}>{o.surveyorRemarks}</div>
              </div>
            </div>

            {/* Section 3: Supporting Documents */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0B4726', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCheck size={15} /> 3. Attached Revenue Evidence & Documents
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {o.supportingDocs.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 0',
                      borderBottom: idx < o.supportingDocs.length - 1 ? '1px solid #F1F5F9' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={16} style={{ color: '#0B4726' }} />
                      <span style={{ fontWeight: '600', fontSize: '13.5px', color: '#0F172A' }}>{doc}</span>
                    </div>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setActiveDoc({
                          title: doc,
                          village: o.village,
                          surveyNumber: o.surveyNumber,
                          parcelId: o.parcelId,
                          landowner: o.landowner,
                          remarks: o.issueDescription
                        });
                        setIsDocViewerOpen(true);
                      }}
                    >
                      <Eye size={13} /> Inspect Document
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tahsildar Executive Bench Action Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ borderTop: '3px solid #0B4726', padding: '24px' }}>
              <div className="card-header" style={{ marginBottom: '16px', paddingBottom: '8px' }}>
                <div className="card-title" style={{ fontSize: '15px', color: '#0B4726', fontWeight: '700' }}>
                  Tahsildar Bench Decision & Order
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: '600', color: '#334155', fontSize: '13px' }}>
                  Tahsildar Official Executive Remarks / Order
                </label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Enter official executive order text..."
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  style={{ borderRadius: '8px', fontSize: '13.5px', padding: '12px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => executeAction('Approve Resolution')}
                  style={{ padding: '10px 16px', fontSize: '13.5px' }}
                >
                  <CheckCircle2 size={16} /> Approve Resolution
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => executeAction('Send Back to Talathi')}
                  style={{ padding: '10px 16px', fontSize: '13.5px' }}
                >
                  <RotateCcw size={16} /> Send Back to Talathi
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => executeAction('Request Additional Information')}
                  style={{ padding: '10px 16px', fontSize: '13.5px' }}
                >
                  <HelpCircle size={16} /> Request Additional Info
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => executeAction('Keep Under Review')}
                  style={{ padding: '10px 16px', fontSize: '13.5px' }}
                >
                  Keep Under Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Register Main View (Screen 5) - Dual View Cards & Table
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>Objection List & Dispute Management Register</h1>
          <p>Cases Received from Surveyor/Talathi Field Workflow Requiring Tahsildar Bench Orders</p>
        </div>
        <div style={{ fontSize: '13px', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '8px', fontWeight: '700' }}>
          {objections.filter(o => o.status !== 'Resolved').length} Active Disputes
        </div>
      </div>

      {/* Controls Header Card */}
      <div className="card" style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '36px', height: '38px', fontSize: '13.5px', borderRadius: '8px' }}
                placeholder="Search by Objection ID, Landowner, Village, Parcel ID, Category..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: '#64748B' }} />
            </div>
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={13} /> STATUS:
            </span>
            {['All', 'New', 'Under Review', 'Sent Back', 'Resolved'].map(st => (
              <button
                key={st}
                className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setStatusFilter(st)}
                style={{ borderRadius: '6px', fontSize: '12px' }}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Layout Toggle: Cards vs Table */}
          <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                background: viewMode === 'cards' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'cards' ? '#0B4726' : '#64748B',
                boxShadow: viewMode === 'cards' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <LayoutGrid size={14} /> Cards
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                background: viewMode === 'table' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'table' ? '#0B4726' : '#64748B',
                boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <List size={14} /> Table
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
          <AlertTriangle size={32} style={{ color: '#94A3B8', marginBottom: '8px' }} />
          <div>No objection cases match the selected search & filter criteria.</div>
        </div>
      ) : viewMode === 'cards' ? (
        /* CLEAN, MINIMAL OBJECTION LIST CARDS (NO BOX-IN-BOX, LOW COLOR NOISE) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(o => (
            <div
              key={o.id}
              style={{
                padding: '18px 22px',
                border: '1px solid #E2E8F0',
                borderLeft: o.status === 'Resolved' ? '4px solid #1E7E34' : '4px solid #C5221F',
                borderRadius: '12px',
                background: '#FFFFFF',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {/* Header Row: Objection ID, Title & Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="mono-code" style={{ fontWeight: '700', color: '#0B4726', fontSize: '13.5px' }}>
                    {o.id}
                  </span>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span style={{ fontWeight: '700', fontSize: '15.5px', color: '#0F172A' }}>
                    {o.objectionType}
                  </span>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span style={{ fontWeight: '600', fontSize: '14.5px', color: '#334155' }}>
                    {o.landowner}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <StatusBadge status={o.status} />
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedObjection(o)}
                    style={{ gap: '6px', borderRadius: '6px', fontSize: '12.5px' }}
                  >
                    <Eye size={13} /> Review Case
                  </button>
                </div>
              </div>

              {/* Minimal Inline Metadata (Village, Parcel, Survey, Raised By, Date, Due) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', fontSize: '12.5px', color: '#64748B', paddingTop: '2px' }}>
                <span>Village: <strong style={{ color: '#1E293B' }}>{o.village}</strong></span>
                <span>•</span>
                <span>Parcel ID: <span className="mono-code" style={{ color: '#1E293B' }}>{o.parcelId}</span></span>
                <span>•</span>
                <span>Survey No: <span className="mono-code" style={{ color: '#1E293B' }}>{o.surveyNumber}</span></span>
                <span>•</span>
                <span>Raised By: <span style={{ color: '#1E293B' }}>{o.raisedBy}</span></span>
                <span>•</span>
                <span>Date: {o.dateRaised}</span>
                <span>•</span>
                <span style={{ color: o.daysRemaining < 0 ? '#C5221F' : '#D97706', fontWeight: '600' }}>
                  Due: {o.dueDate} ({o.daysRemaining}d left)
                </span>
              </div>

              {/* Objection Description (Placed AFTER the village type details per spec) */}
              <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.5', paddingTop: '6px', borderTop: '1px solid #F1F5F9' }}>
                {o.issueDescription}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Data Table View */
        <div className="table-container">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Objection ID</th>
                <th>Project ID</th>
                <th>Village</th>
                <th>Parcel ID</th>
                <th>Landowner Name</th>
                <th>Objection Type</th>
                <th>Raised By</th>
                <th>Date Raised</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td className="mono-code" style={{ fontWeight: '700', color: '#C5221F' }}>{o.id}</td>
                  <td className="mono-code">{o.projectId}</td>
                  <td>{o.village}</td>
                  <td className="mono-code" style={{ fontWeight: '600' }}>{o.parcelId}</td>
                  <td style={{ fontWeight: '600' }}>{o.landowner}</td>
                  <td style={{ fontSize: '12px', color: '#4B5563' }}>{o.objectionType}</td>
                  <td style={{ fontSize: '12px' }}>{o.raisedBy}</td>
                  <td style={{ fontSize: '12px' }}>{o.dateRaised}</td>
                  <td><StatusBadge status={o.status} /></td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedObjection(o)}
                    >
                      <Eye size={13} /> Review Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ObjectionListView;

