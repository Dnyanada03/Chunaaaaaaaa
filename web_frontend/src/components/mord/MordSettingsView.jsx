import React from 'react';
import { ShieldCheck, User, Key, Lock, CheckCircle2, History, Database, Building2 } from 'lucide-react';
import { mordOfficerProfile } from '../../data/mordData';

export default function MordSettingsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title */}
      <div className="page-banner">
        <div className="page-title-group">
          <h1>MORD Supervisory Profile &amp; Settings</h1>
          <p>Apex ministerial credentials, Class-3 digital signature certificate tokens, and national audit logging parameters • Supervisory Administration &amp; Security Controls</p>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Officer Information */}
        <div className="card" style={{ padding: '24px' }}>
          <div className="card-header" style={{ marginBottom: '16px', paddingBottom: '12px' }}>
            <div className="card-title" style={{ fontSize: '16px' }}>
              <User size={18} style={{ color: '#008E4F' }} />
              Supervisory Officer Profile
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>Officer Name:</span>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>{mordOfficerProfile.name}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>Designation:</span>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>{mordOfficerProfile.designation}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>Cadre &amp; Service:</span>
              <div style={{ fontWeight: 500, color: '#0F172A' }}>{mordOfficerProfile.cadre}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>Ministry &amp; Department:</span>
              <div style={{ fontWeight: 500, color: '#0F172A' }}>{mordOfficerProfile.ministry}, {mordOfficerProfile.department}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>Office Location:</span>
              <div style={{ color: '#0F172A' }}>{mordOfficerProfile.officeAddress}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>NIC Email &amp; Phone:</span>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', color: '#008E4F', fontWeight: 600 }}>{mordOfficerProfile.email} | {mordOfficerProfile.phone}</div>
            </div>
          </div>
        </div>

        {/* Class-3 DSC Information */}
        <div className="card" style={{ padding: '24px' }}>
          <div className="card-header" style={{ marginBottom: '16px', paddingBottom: '12px' }}>
            <div className="card-title" style={{ fontSize: '16px' }}>
              <ShieldCheck size={18} style={{ color: '#008E4F' }} />
              Class-3 DSC Token &amp; Digital Authentication
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{
              background: '#E6F4EA',
              border: '1px solid #86EFAC',
              borderRadius: '8px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#15803D',
              fontWeight: 600,
              fontSize: '12.5px'
            }}>
              <CheckCircle2 size={16} />
              <span>Digital Certificate Active &amp; Valid for Ministerial Directives</span>
            </div>

            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>Certificate Issuer:</span>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>{mordOfficerProfile.signCertIssuer}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>DSC Serial Number:</span>
              <div style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, color: '#0F172A' }}>{mordOfficerProfile.certSerial}</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>Cryptographic Key Strength:</span>
              <div style={{ color: '#0F172A' }}>RSA 2048-Bit / SHA-256 with eMudhra Hardware Token</div>
            </div>
            <div>
              <span style={{ color: '#64748B', fontSize: '12px' }}>Supervisory Jurisdiction:</span>
              <div style={{ color: '#0F172A' }}>{mordOfficerProfile.jurisdiction}</div>
            </div>
          </div>
        </div>
      </div>

      {/* System Security & Telemetry Parameters */}
      <div className="card" style={{ padding: '24px' }}>
        <div className="card-header" style={{ marginBottom: '16px', paddingBottom: '12px' }}>
          <div className="card-title" style={{ fontSize: '16px' }}>
            <Database size={18} style={{ color: '#008E4F' }} />
            Supervisory Telemetry &amp; Alert Thresholds
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '12.5px' }}>
          <div style={{ padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
            <div style={{ color: '#64748B', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Stalled Stage Trigger</div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#0F172A', marginTop: '4px' }}>&gt; 30 Days Inactive</div>
            <div style={{ color: '#64748B', fontSize: '11.5px', marginTop: '2px' }}>Auto-flags in National Dashboard</div>
          </div>

          <div style={{ padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
            <div style={{ color: '#64748B', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>Directive Statutory SLA</div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#0F172A', marginTop: '4px' }}>14 Calendar Days</div>
            <div style={{ color: '#64748B', fontSize: '11.5px', marginTop: '2px' }}>Mandatory response from State / DM</div>
          </div>

          <div style={{ padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
            <div style={{ color: '#64748B', fontSize: '11px', textTransform: 'uppercase', fontWeight: 600 }}>PFMS Disbursement Threshold</div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#0F172A', marginTop: '4px' }}>&lt; 50% Post-Award</div>
            <div style={{ color: '#64748B', fontSize: '11.5px', marginTop: '2px' }}>Triggers escrow balance audit alert</div>
          </div>
        </div>
      </div>
    </div>
  );
}
