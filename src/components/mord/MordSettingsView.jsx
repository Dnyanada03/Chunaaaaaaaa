import React from 'react';
import { ShieldCheck, User, Key, Lock, CheckCircle2, History, Database, Building2 } from 'lucide-react';
import { mordOfficerProfile } from '../../data/mordData';

export default function MordSettingsView() {
  return (
    <div style={{
      maxWidth: '1080px',
      margin: '0 auto',
      padding: '24px 28px 80px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B7280', fontWeight: 600 }}>
          Supervisory Administration &amp; Security Controls
        </div>
        <h2 style={{ fontFamily: '"Source Serif Pro", Georgia, serif', fontSize: '24px', fontWeight: 600, margin: '2px 0 0', color: '#16233A' }}>
          MORD Supervisory Profile &amp; Settings
        </h2>
        <p style={{ fontSize: '13px', color: '#3A4A63', margin: '4px 0 0' }}>
          Apex ministerial credentials, Class-3 digital signature certificate tokens, and national audit logging parameters.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Officer Information */}
        <div style={{ background: '#FFFFFF', border: '1px solid #D8D5CB', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid #D8D5CB', paddingBottom: '12px' }}>
            <User size={18} style={{ color: '#2F6F62' }} />
            <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '16px', fontWeight: 600, color: '#16233A', margin: 0 }}>
              Supervisory Officer Profile
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
            <div>
              <span style={{ color: '#6B7280' }}>Officer Name:</span>
              <div style={{ fontWeight: 600, color: '#16233A' }}>{mordOfficerProfile.name}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Designation:</span>
              <div style={{ fontWeight: 600, color: '#16233A' }}>{mordOfficerProfile.designation}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Cadre &amp; Service:</span>
              <div style={{ fontWeight: 500, color: '#16233A' }}>{mordOfficerProfile.cadre}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Ministry &amp; Department:</span>
              <div style={{ fontWeight: 500, color: '#16233A' }}>{mordOfficerProfile.ministry}, {mordOfficerProfile.department}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Office Location:</span>
              <div style={{ color: '#16233A' }}>{mordOfficerProfile.officeAddress}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>NIC Email &amp; Phone:</span>
              <div style={{ fontFamily: 'monospace', color: '#16233A' }}>{mordOfficerProfile.email} | {mordOfficerProfile.phone}</div>
            </div>
          </div>
        </div>

        {/* Class-3 DSC Information */}
        <div style={{ background: '#FFFFFF', border: '1px solid #D8D5CB', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid #D8D5CB', paddingBottom: '12px' }}>
            <ShieldCheck size={18} style={{ color: '#2F6F62' }} />
            <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '16px', fontWeight: 600, color: '#16233A', margin: 0 }}>
              Class-3 DSC Token &amp; Digital Authentication
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
            <div style={{
              background: '#E4EEE9',
              border: '1px solid #2F6F62',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#2F6F62',
              fontWeight: 600
            }}>
              <CheckCircle2 size={16} />
              <span>Digital Certificate Active &amp; Valid for Ministerial Directives</span>
            </div>

            <div>
              <span style={{ color: '#6B7280' }}>Certificate Issuer:</span>
              <div style={{ fontWeight: 600, color: '#16233A' }}>{mordOfficerProfile.signCertIssuer}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>DSC Serial Number:</span>
              <div style={{ fontFamily: 'monospace', fontWeight: 600, color: '#16233A' }}>{mordOfficerProfile.certSerial}</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Cryptographic Key Strength:</span>
              <div style={{ color: '#16233A' }}>RSA 2048-Bit / SHA-256 with eMudhra Hardware Token</div>
            </div>
            <div>
              <span style={{ color: '#6B7280' }}>Supervisory Jurisdiction:</span>
              <div style={{ color: '#16233A' }}>{mordOfficerProfile.jurisdiction}</div>
            </div>
          </div>
        </div>
      </div>

      {/* System Security & Telemetry Parameters */}
      <div style={{ background: '#FFFFFF', border: '1px solid #D8D5CB', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid #D8D5CB', paddingBottom: '12px' }}>
          <Database size={18} style={{ color: '#2F6F62' }} />
          <h3 style={{ fontFamily: '"Source Serif Pro", serif', fontSize: '16px', fontWeight: 600, color: '#16233A', margin: 0 }}>
            Supervisory Telemetry &amp; Alert Thresholds
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '12.5px' }}>
          <div style={{ padding: '12px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
            <div style={{ color: '#6B7280', fontSize: '11px', textTransform: 'uppercase' }}>Stalled Stage Trigger</div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#16233A', marginTop: '2px' }}>&gt; 30 Days Inactive</div>
            <div style={{ color: '#6B7280', fontSize: '11px', marginTop: '2px' }}>Auto-flags in National Dashboard</div>
          </div>

          <div style={{ padding: '12px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
            <div style={{ color: '#6B7280', fontSize: '11px', textTransform: 'uppercase' }}>Directive Statutory SLA</div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#16233A', marginTop: '2px' }}>14 Calendar Days</div>
            <div style={{ color: '#6B7280', fontSize: '11px', marginTop: '2px' }}>Mandatory response from State / DM</div>
          </div>

          <div style={{ padding: '12px', background: '#FBFAF6', border: '1px solid #D8D5CB' }}>
            <div style={{ color: '#6B7280', fontSize: '11px', textTransform: 'uppercase' }}>PFMS Disbursement Threshold</div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#16233A', marginTop: '2px' }}>&lt; 50% Post-Award</div>
            <div style={{ color: '#6B7280', fontSize: '11px', marginTop: '2px' }}>Triggers escrow balance audit alert</div>
          </div>
        </div>
      </div>
    </div>
  );
}
