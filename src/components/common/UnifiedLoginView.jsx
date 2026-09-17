import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { ShieldCheck, Lock, User, Building2, Shield, ArrowRight, CheckCircle2, Layers, Landmark } from 'lucide-react';
import Emblem from './Emblem';
import { initialCollectorProfile } from '../../data/collectorMockData';
import { initialOfficerProfile } from '../../data/mockData';
import { stateOfficerProfile } from '../../data/stateMockData';
import { proposingOfficerProfile } from '../../data/proposingMockData';
import { mordOfficerProfile } from '../../data/mordData';

export default function UnifiedLoginView() {
  const { login } = useSwadesh();
  const [selectedRole, setSelectedRole] = useState('collector'); // 'collector' | 'tahsildar' | 'state' | 'proposing_body' | 'mord'

  // Collector Form State
  const [collectorId, setCollectorId] = useState(initialCollectorProfile.id);
  const [collectorPass, setCollectorPass] = useState('••••••••••••');
  const [district, setDistrict] = useState('Pune District');

  // Tahsildar Form State
  const [tahsildarId, setTahsildarId] = useState(initialOfficerProfile.id);
  const [tahsildarPass, setTahsildarPass] = useState('••••••••');
  const [division, setDivision] = useState('Pune Division (Haveli / Mulshi / Khed)');

  // State Form State
  const [stateOfficerId, setStateOfficerId] = useState(stateOfficerProfile.id);
  const [statePass, setStatePass] = useState('••••••••••••');
  const [stateJurisdiction, setStateJurisdiction] = useState('State of Maharashtra');

  // Proposing Body Form State
  const [proposingId, setProposingId] = useState(proposingOfficerProfile.id);
  const [proposingPass, setProposingPass] = useState('••••••••••••');
  const [proposingAuthority, setProposingAuthority] = useState('Maharashtra Rail Infrastructure Dev. Corp. (Maharail)');

  // MORD Form State
  const [mordId, setMordId] = useState(mordOfficerProfile.id);
  const [mordPass, setMordPass] = useState('••••••••••••');
  const [mordJurisdiction, setMordJurisdiction] = useState('Ministry of Rural Development (DoLR), Government of India');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === 'collector') {
      login('collector', collectorId, collectorPass);
    } else if (selectedRole === 'tahsildar') {
      login('tahsildar', tahsildarId, tahsildarPass);
    } else if (selectedRole === 'state') {
      login('state', stateOfficerId, statePass);
    } else if (selectedRole === 'proposing_body') {
      login('proposing_body', proposingId, proposingPass);
    } else if (selectedRole === 'mord') {
      login('mord', mordId, mordPass);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #008E4F 0%, #008766 50%, #007F7E 100%)',
      padding: '24px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '660px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Header Masthead */}
        <div style={{
          background: 'linear-gradient(135deg, #006638 0%, #005C5B 100%)',
          color: '#FFFFFF',
          padding: '28px 24px 20px 24px',
          textAlign: 'center',
          borderBottom: '4px solid #F59E0B'
        }}>
          {/* Emblem Seal */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Emblem width={46} height={58} color="#FFFFFF" />
          </div>

          <div style={{ fontSize: '10.5px', color: '#FDE68A', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '2px' }}>
            MINISTRY OF RURAL DEVELOPMENT • GOVT OF MAHARASHTRA
          </div>

          <h1 style={{ fontFamily: 'Merriweather, Georgia, serif', fontSize: '24px', fontWeight: '800', letterSpacing: '0.5px' }}>
            SWADESH
          </h1>

          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', marginTop: '4px', letterSpacing: '0.5px' }}>
            INTEGRATED LAND ACQUISITION MANAGEMENT E-GOVERNANCE GATEWAY
          </p>
        </div>

        {/* PORTAL ROLE SELECTION TABS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          background: '#F1F5F9',
          borderBottom: '1px solid #CBD5E1',
          padding: '6px',
          gap: '4px'
        }}>
          <button
            type="button"
            onClick={() => setSelectedRole('collector')}
            style={{
              padding: '10px 4px',
              border: 'none',
              borderRadius: '8px',
              background: selectedRole === 'collector' ? 'linear-gradient(135deg, #008E4F 0%, #007F7E 100%)' : 'transparent',
              color: selectedRole === 'collector' ? '#FFF' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Shield size={14} style={{ color: selectedRole === 'collector' ? '#FDE68A' : '#008E4F' }} />
              Collector
            </div>
            <span style={{ fontSize: '9px', opacity: 0.85, fontWeight: 500 }}>
              DM Command
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('tahsildar')}
            style={{
              padding: '10px 4px',
              border: 'none',
              borderRadius: '8px',
              background: selectedRole === 'tahsildar' ? 'linear-gradient(135deg, #008E4F 0%, #007F7E 100%)' : 'transparent',
              color: selectedRole === 'tahsildar' ? '#FFF' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Building2 size={14} style={{ color: selectedRole === 'tahsildar' ? '#FDE68A' : '#008E4F' }} />
              Tahsildar
            </div>
            <span style={{ fontSize: '9px', opacity: 0.85, fontWeight: 500 }}>
              Taluka Bench
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('state')}
            style={{
              padding: '10px 4px',
              border: 'none',
              borderRadius: '8px',
              background: selectedRole === 'state' ? 'linear-gradient(135deg, #008E4F 0%, #007F7E 100%)' : 'transparent',
              color: selectedRole === 'state' ? '#FFF' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} style={{ color: selectedRole === 'state' ? '#FDE68A' : '#008E4F' }} />
              State Govt
            </div>
            <span style={{ fontSize: '9px', opacity: 0.85, fontWeight: 500 }}>
              Cabinet Ministry
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('proposing_body')}
            style={{
              padding: '10px 4px',
              border: 'none',
              borderRadius: '8px',
              background: selectedRole === 'proposing_body' ? 'linear-gradient(135deg, #008E4F 0%, #007F7E 100%)' : 'transparent',
              color: selectedRole === 'proposing_body' ? '#FFF' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Layers size={14} style={{ color: selectedRole === 'proposing_body' ? '#FDE68A' : '#008E4F' }} />
              Project Body
            </div>
            <span style={{ fontSize: '9px', opacity: 0.85, fontWeight: 500 }}>
              Proposing Auth
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('mord')}
            style={{
              padding: '10px 4px',
              border: 'none',
              borderRadius: '8px',
              background: selectedRole === 'mord' ? 'linear-gradient(135deg, #16233A 0%, #2F6F62 100%)' : 'transparent',
              color: selectedRole === 'mord' ? '#FFF' : '#475569',
              fontWeight: 700,
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Landmark size={14} style={{ color: selectedRole === 'mord' ? '#FDE68A' : '#16233A' }} />
              MORD
            </div>
            <span style={{ fontSize: '9px', opacity: 0.85, fontWeight: 500 }}>
              National Apex
            </span>
          </button>
        </div>

        {/* AUTHENTICATION FORM */}
        <form onSubmit={handleLoginSubmit} style={{ padding: '24px' }}>
          {selectedRole === 'collector' ? (
            <div>
              <div style={{
                background: '#E6F4EA',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #CEEAD6',
                marginBottom: '18px',
                fontSize: '12px',
                color: '#1E7E34',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Shield size={16} />
                <span>Logging in as <strong>District Collector & DM (Shri. Rajesh Deshmukh)</strong></span>
              </div>

              <div className="form-group">
                <label className="form-label">DISTRICT JURISDICTION</label>
                <select className="form-select" value={district} onChange={e => setDistrict(e.target.value)}>
                  <option>Pune District (Collectorate)</option>
                  <option>Mumbai Suburban District</option>
                  <option>Nagpur District</option>
                  <option>Nashik District</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">COLLECTOR GOVT ID / IAS CADRE CODE</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control mono-code"
                    value={collectorId}
                    onChange={e => setCollectorId(e.target.value)}
                    style={{ paddingLeft: '36px', fontWeight: 700 }}
                    required
                  />
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">SECURE PASSCODE / HARDWARE TOKEN PIN</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="form-control"
                    value={collectorPass}
                    onChange={e => setCollectorPass(e.target.value)}
                    style={{ paddingLeft: '36px' }}
                    required
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>
            </div>
          ) : selectedRole === 'tahsildar' ? (
            <div>
              <div style={{
                background: '#EFF6FF',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #BFDBFE',
                marginBottom: '18px',
                fontSize: '12px',
                color: '#1E40AF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Building2 size={16} />
                <span>Logging in as <strong>Tahsildar Bench Officer (Dr. Arvind R. Patil)</strong></span>
              </div>

              <div className="form-group">
                <label className="form-label">REVENUE DIVISION & TALUKA</label>
                <select className="form-select" value={division} onChange={e => setDivision(e.target.value)}>
                  <option>Pune Division (Haveli / Mulshi / Khed)</option>
                  <option>Konkan Division (Thane / Raigad)</option>
                  <option>Nashik Division</option>
                  <option>Chhatrapati Sambhajinagar Division</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">TAHSILDAR OFFICER GOVT ID</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control mono-code"
                    value={tahsildarId}
                    onChange={e => setTahsildarId(e.target.value)}
                    style={{ paddingLeft: '36px', fontWeight: 700 }}
                    required
                  />
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">DIGITAL SIGNATURE PIN / E-TOKEN</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="form-control"
                    value={tahsildarPass}
                    onChange={e => setTahsildarPass(e.target.value)}
                    style={{ paddingLeft: '36px' }}
                    required
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>
            </div>
          ) : selectedRole === 'state' ? (
            <div>
              <div style={{
                background: '#FEF3C7',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #FDE68A',
                marginBottom: '18px',
                fontSize: '12px',
                color: '#92400E',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={16} />
                <span>Logging in as <strong>Principal Secretary, Revenue ({stateOfficerProfile.name.split(',')[0]})</strong></span>
              </div>

              <div className="form-group">
                <label className="form-label">STATE JURISDICTION</label>
                <select className="form-select" value={stateJurisdiction} onChange={e => setStateJurisdiction(e.target.value)}>
                  <option>State of Maharashtra</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">STATE OFFICER ID / IAS CADRE CODE</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control mono-code"
                    value={stateOfficerId}
                    onChange={e => setStateOfficerId(e.target.value)}
                    style={{ paddingLeft: '36px', fontWeight: 700 }}
                    required
                  />
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">SECURE PASSCODE / CLASS-3 DSC PIN</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="form-control"
                    value={statePass}
                    onChange={e => setStatePass(e.target.value)}
                    style={{ paddingLeft: '36px' }}
                    required
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                background: '#E6F4EA',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #CEEAD6',
                marginBottom: '18px',
                fontSize: '12px',
                color: '#1E7E34',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={16} />
                <span>Logging in as <strong>{proposingOfficerProfile.name} ({proposingOfficerProfile.designation})</strong></span>
              </div>

              <div className="form-group">
                <label className="form-label">PROPOSING BODY / STATUTORY AUTHORITY</label>
                <select className="form-select" value={proposingAuthority} onChange={e => setProposingAuthority(e.target.value)}>
                  <option>Maharashtra Rail Infrastructure Dev. Corp. (Maharail)</option>
                  <option>Maharashtra State Road Dev. Corp. (MSRDC)</option>
                  <option>National Highways Authority of India (NHAI - RO Mumbai)</option>
                  <option>Mumbai Metropolitan Region Dev. Authority (MMRDA)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">OFFICER CADRE ID / EMPLOYEE CODE</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control mono-code"
                    value={proposingId}
                    onChange={e => setProposingId(e.target.value)}
                    style={{ paddingLeft: '36px', fontWeight: 700 }}
                    required
                  />
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">CLASS-3 DSC HARDWARE TOKEN PASSCODE</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="form-control"
                    value={proposingPass}
                    onChange={e => setProposingPass(e.target.value)}
                    style={{ paddingLeft: '36px' }}
                    required
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>
            </div>
          )}

          {selectedRole === 'mord' && (
            <div>
              <div style={{
                background: '#E4EEE9',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #2F6F62',
                marginBottom: '18px',
                fontSize: '12px',
                color: '#2F6F62',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Landmark size={16} />
                <span>Logging in as <strong>{mordOfficerProfile.name} ({mordOfficerProfile.designation})</strong></span>
              </div>

              <div className="form-group">
                <label className="form-label">APEX MINISTRY / JURISDICTION</label>
                <input
                  type="text"
                  className="form-control"
                  value={mordJurisdiction}
                  readOnly
                  style={{ background: '#F8FAFC', fontWeight: 600, color: '#16233A' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">NATIONAL SUPERVISORY CADRE ID</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control mono-code"
                    value={mordId}
                    onChange={e => setMordId(e.target.value)}
                    style={{ paddingLeft: '36px', fontWeight: 700 }}
                    required
                  />
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">CLASS-3 DSC HARDWARE TOKEN PASSCODE</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className="form-control"
                    value={mordPass}
                    onChange={e => setMordPass(e.target.value)}
                    style={{ paddingLeft: '36px' }}
                    required
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 800,
              marginTop: '10px',
              background: selectedRole === 'mord' ? 'linear-gradient(135deg, #16233A 0%, #2F6F62 100%)' : 'linear-gradient(135deg, #008E4F 0%, #008766 50%, #007F7E 100%)',
              border: 'none',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <ShieldCheck size={18} />
            Authenticate & Access {selectedRole === 'collector' ? 'Collectorate' : selectedRole === 'tahsildar' ? 'Tahsildar' : selectedRole === 'state' ? 'State Government' : selectedRole === 'mord' ? 'MORD National Supervisory' : 'Project Authority'} Portal
            <ArrowRight size={16} />
          </button>

          <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '10.5px', color: '#64748B', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
            National Informatics Centre (NIC) Encrypted Gateway<br />
            Class-3 DSC Authentication Mandatory • Unauthorized Access Prohibited under IT Act 2000
          </div>
        </form>
      </div>
    </div>
  );
}
