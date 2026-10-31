import React, { useState } from 'react';
import { Shield, KeyRound, Lock, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { initialCollectorProfile } from '../../data/collectorMockData';

export default function CollectorLoginView({ onLoginSuccess }) {
  const [collectorId, setCollectorId] = useState(initialCollectorProfile.id);
  const [password, setPassword] = useState('••••••••••••');
  const [district, setDistrict] = useState('Pune District');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess && onLoginSuccess();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #042413 0%, #0B4726 50%, #145E36 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '460px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Header Banner */}
        <div style={{
          background: '#06371E',
          color: '#FFFFFF',
          padding: '24px',
          textAlign: 'center',
          borderBottom: '3px solid #F59E0B'
        }}>
          <div className="official-emblem-seal" style={{ margin: '0 auto 12px auto', width: '54px', height: '54px' }}>
            <span className="emblem-top" style={{ fontSize: '9px' }}>GOVT OF</span>
            <span className="emblem-center" style={{ fontSize: '15px' }}>MH</span>
            <span className="emblem-sub" style={{ fontSize: '7px' }}>REVENUE</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 800, letterSpacing: '0.5px' }}>
            SWADESH
          </h2>
          <div style={{ fontSize: '11px', color: '#FDE68A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>
            DISTRICT COLLECTORATE COMMAND SYSTEM
          </div>
          <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.8)', marginTop: '4px' }}>
            Revenue & Land Acquisition Department • Maharashtra
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ padding: '28px 24px 24px 24px' }}>
          <div style={{ background: '#E6F4EA', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CEEAD6', marginBottom: '20px', fontSize: '12px', color: '#1E7E34', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={16} />
            <span>Highest District Magistrate & Revenue Approval Portal</span>
          </div>

          <div className="form-group">
            <label className="form-label">DISTRICT JURISDICTION</label>
            <select className="form-select" value={district} onChange={e => setDistrict(e.target.value)}>
              <option>Pune District (Collectorate)</option>
              <option>Mumbai Suburban District</option>
              <option>Nagpur District</option>
              <option>Nashik District</option>
              <option>Chhatrapati Sambhajinagar District</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">COLLECTOR GOVT ID / IAS CADRE CODE</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                value={collectorId}
                onChange={e => setCollectorId(e.target.value)}
                style={{ paddingLeft: '36px', fontWeight: 700 }}
                required
              />
              <Shield size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">SECURE PASSWORD / HARDWARE TOKEN PIN</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingLeft: '36px' }}
                required
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: 800, marginTop: '10px', background: '#0B4726', borderRadius: '10px' }}
          >
            Authenticate & Access Collectorate Dashboard <ArrowRight size={16} />
          </button>

          <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '11px', color: '#64748B' }}>
            National Informatics Centre (NIC) Encrypted E-Governance Gateway<br />
            IP Logged for Security Oversight • Class 3 DSC Mandatory
          </div>
        </form>
      </div>
    </div>
  );
}
