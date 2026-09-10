import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { ShieldCheck, Lock, User, Building2 } from 'lucide-react';
import Emblem from '../common/Emblem';

const LoginView = () => {
  const { login } = useSwadesh();
  const [officerId, setOfficerId] = useState('TAH-MH-PUNE-042');
  const [password, setPassword] = useState('••••••••');
  const [division, setDivision] = useState('Pune Division');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(officerId, password);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F4F3F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '460px',
        border: '1px solid #D1D5DB',
        overflow: 'hidden'
      }}>
        {/* Header Masthead */}
        <div style={{
          background: '#0B4726',
          color: 'white',
          padding: '26px 24px',
          textAlign: 'center',
          borderBottom: '3px solid #06371E'
        }}>
          {/* State Emblem of India */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Emblem width={46} height={58} color="#FFFFFF" />
          </div>

          <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '2px' }}>
            Ministry of Rural Development
          </div>

          <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '22px', fontWeight: '700', letterSpacing: '0.5px' }}>
            SWADESH <span style={{ opacity: 0.4, fontWeight: 300 }}>|</span> Revenue Department
          </h1>

          <p style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.85)', marginTop: '3px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.8px' }}>
            LAND ACQUISITION MANAGEMENT SYSTEM • GOVERNMENT OF MAHARASHTRA
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#1F2937', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Tahsildar Bench Portal Authentication
          </div>

          <div className="form-group">
            <label className="form-label">Revenue Division</label>
            <div style={{ position: 'relative' }}>
              <select
                className="form-select"
                style={{ width: '100%', paddingLeft: '34px' }}
                value={division}
                onChange={e => setDivision(e.target.value)}
              >
                <option>Pune Division (Haveli / Mulshi / Khed)</option>
                <option>Konkan Division (Thane / Raigad)</option>
                <option>Nashik Division</option>
                <option>Chhatrapati Sambhajinagar Division</option>
                <option>Nagpur Division</option>
              </select>
              <Building2 size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#6B7280' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tahsildar Officer ID</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-control mono-code"
                style={{ width: '100%', paddingLeft: '34px' }}
                value={officerId}
                onChange={e => setOfficerId(e.target.value)}
                required
              />
              <User size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#6B7280' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Security Passcode / e-Token PIN</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-control"
                style={{ width: '100%', paddingLeft: '34px' }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Lock size={15} style={{ position: 'absolute', left: '10px', top: '9px', color: '#6B7280' }} />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '10px', marginTop: '8px', fontSize: '13px', borderRadius: '10px' }}
          >
            <ShieldCheck size={16} /> Authenticate & Access Portal
          </button>

          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '10.5px', color: '#6B7280', borderTop: '1px solid #E5E7EB', paddingTop: '12px' }}>
            Official Revenue Officer Portal • Unauthorized Access Prohibited under IT Act 2000
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
