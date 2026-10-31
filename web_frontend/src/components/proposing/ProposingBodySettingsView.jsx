import React, { useState } from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import {
  Building2, ShieldCheck, User, Key, Bell, CheckCircle2,
  Lock, ChevronRight, Save, Database, Globe, RefreshCw
} from 'lucide-react';

export default function ProposingBodySettingsView() {
  const { proposingOfficer, getExactTimestamp } = useSwadesh();
  const [saveNotice, setSaveNotice] = useState(null);

  // Settings State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [objectionAlerts, setObjectionAlerts] = useState(true);
  const [autoDscVerify, setAutoDscVerify] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveNotice(`Settings and configuration saved successfully. (${getExactTimestamp()})`);
    setTimeout(() => {
      setSaveNotice(null);
    }, 4000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Header & Breadcrumb */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
          <span>Project Authority</span>
          <ChevronRight size={14} />
          <span style={{ fontWeight: 700, color: '#0F172A' }}>Organization Settings & Integrations</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
          Authority Profile & Gateway Configurations
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
          Class-3 digital certificate bindings, state land record APIs, and dispatch preferences
        </p>
      </div>

      {saveNotice && (
        <div style={{
          background: '#DCFCE7',
          border: '1px solid #86EFAC',
          color: '#15803D',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} />
          <span>{saveNotice}</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* SECTION 1: PROPOSING AUTHORITY PROFILE */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Building2 size={20} style={{ color: '#008E4F' }} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Project Proposing Body Profile
              </h3>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Statutory organization details under RFCTLARR Act</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">AUTHORITY NAME</label>
              <input
                type="text"
                className="form-control"
                value={proposingOfficer.authority}
                readOnly
                style={{ background: '#F8FAFC', fontWeight: 600 }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">DEPARTMENT / CELL</label>
              <input
                type="text"
                className="form-control"
                value={proposingOfficer.department}
                readOnly
                style={{ background: '#F8FAFC', fontWeight: 600 }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">HEADQUARTERS LOCATION</label>
              <input
                type="text"
                className="form-control"
                value="2nd Floor, Hoechst House, Nariman Point, Mumbai - 400021"
                readOnly
                style={{ background: '#F8FAFC' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">NODAL DESIGNATED OFFICER</label>
              <input
                type="text"
                className="form-control"
                value={`${proposingOfficer.name} (${proposingOfficer.designation})`}
                readOnly
                style={{ background: '#F8FAFC', fontWeight: 600 }}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: CLASS-3 DSC TOKEN CONFIGURATION */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <ShieldCheck size={20} style={{ color: '#008E4F' }} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Class-3 Digital Signature Certificate (DSC) Binding
              </h3>
              <div style={{ fontSize: '12px', color: '#64748B' }}>IT Act 2000 compliant USB cryptographic hardware token</div>
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#15803D' }}>
                  ACTIVE CERTIFICATE: {proposingOfficer.digitalSignature?.certificateId}
                </div>
                <div style={{ fontSize: '12px', color: '#166534', marginTop: '2px' }}>
                  Issued by: <strong>{proposingOfficer.digitalSignature?.issuedBy}</strong> • Valid Until: <strong>{proposingOfficer.digitalSignature?.validTill}</strong>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, background: '#DCFCE7', color: '#15803D', padding: '3px 8px', borderRadius: '4px' }}>
                STATUS: ACTIVE & VALID
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="autoDsc"
              checked={autoDscVerify}
              onChange={e => setAutoDscVerify(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#008E4F' }}
            />
            <label htmlFor="autoDsc" style={{ fontSize: '13px', color: '#334155', cursor: 'pointer', margin: 0 }}>
              Require hardware e-token PIN entry for every statutory proposal submission and new document version upload
            </label>
          </div>
        </div>

        {/* SECTION 3: SYSTEM INTEGRATIONS */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Database size={20} style={{ color: '#008E4F' }} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                State E-Governance Gateway Integrations
              </h3>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Live data bridges with state land records and treasury servers</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                name: 'Maharashtra Bhulekh (7/12 RoR Records API)',
                desc: 'Automated retrieval of landowner names, mutation entries, and crop surveys',
                status: 'Connected (HTTP 200)',
                ping: '24ms'
              },
              {
                name: 'DILR Cadastral Digital Survey Map Server',
                desc: 'Village Gat boundaries and peg-marking vector layer synchronization',
                status: 'Connected (HTTP 200)',
                ping: '38ms'
              },
              {
                name: 'Public Financial Management System (PFMS) Gateway',
                desc: 'Direct Benefit Transfer (DBT) escrow authorization for land compensation',
                status: 'Connected (HTTP 200)',
                ping: '42ms'
              },
              {
                name: 'Maharashtra BeAMS State Treasury System',
                desc: 'Sanction letter registration and major head budget drawdowns',
                status: 'Connected (HTTP 200)',
                ping: '31ms'
              }
            ].map((gw, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0'
              }}>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>{gw.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{gw.desc}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#16A34A', background: '#DCFCE7', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    ● {gw.status}
                  </span>
                  <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '3px' }}>Latency: {gw.ping}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: NOTIFICATIONS & DISPATCH */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Bell size={20} style={{ color: '#008E4F' }} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Intimation & Alert Preferences
              </h3>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Configured dispatch channels for statutory stage movements</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="emailNotif"
                checked={emailNotifs}
                onChange={e => setEmailNotifs(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#008E4F' }}
              />
              <label htmlFor="emailNotif" style={{ fontSize: '13px', color: '#334155', cursor: 'pointer', margin: 0 }}>
                Send official email dispatch to <strong>vk.sharma@maharail.com</strong> on Collector Gazette publications
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="smsNotif"
                checked={smsNotifs}
                onChange={e => setSmsNotifs(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#008E4F' }}
              />
              <label htmlFor="smsNotif" style={{ fontSize: '13px', color: '#334155', cursor: 'pointer', margin: 0 }}>
                Send priority SMS dispatch to registered mobile on Joint Measurement Survey (JMS) schedule changes
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                id="objectionNotif"
                checked={objectionAlerts}
                onChange={e => setObjectionAlerts(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#008E4F' }}
              />
              <label htmlFor="objectionNotif" style={{ fontSize: '13px', color: '#334155', cursor: 'pointer', margin: 0 }}>
                Immediate dashboard priority flag when Section 15 objection is filed by landowner in Tahsildar bench
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              background: '#008E4F',
              border: 'none',
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Save size={16} />
            Save Configurations
          </button>
        </div>
      </form>
    </div>
  );
}
