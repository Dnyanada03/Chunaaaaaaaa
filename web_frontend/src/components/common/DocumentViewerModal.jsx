import React from 'react';
import { useSwadesh } from '../../context/SwadeshContext';
import { FileText, X, Download, Printer, ShieldCheck } from 'lucide-react';

const DocumentViewerModal = () => {
  const { isDocViewerOpen, setIsDocViewerOpen, activeDoc } = useSwadesh();

  if (!isDocViewerOpen || !activeDoc) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsDocViewerOpen(false)}>
      <div
        className="modal-container"
        style={{ maxWidth: '780px', height: '80vh' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} style={{ color: '#89E9AE' }} />
            <span className="modal-title">{activeDoc.title || "Government Land Document View"}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
              <Printer size={14} /> Print
            </button>
            <button className="modal-close-btn" onClick={() => setIsDocViewerOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="modal-body" style={{ background: '#F8FAFC', padding: '24px' }}>
          {/* Official Document Paper Simulation */}
          <div style={{
            background: 'white',
            border: '2px solid #005A36',
            borderRadius: '14px',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontFamily: "'Courier New', Courier, monospace",
            color: '#0F172A'
          }}>
            {/* Govt Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px double #005A36', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
                GOVERNMENT OF MAHARASHTRA • REVENUE DEPARTMENT
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#005A36', marginTop: '4px' }}>
                {activeDoc.title || "7/12 SATBARA EXTRACT (LAND RECORD RECORD OF RIGHTS)"}
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                DIGITAL REVENUE RECORD VERIFICATION SYSTEM • HAVELI TALUKA PUNE
              </div>
            </div>

            {/* Document Content Data */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px', marginBottom: '20px' }}>
              <div><strong>District:</strong> Pune</div>
              <div><strong>Taluka:</strong> Haveli</div>
              <div><strong>Village (Gaon):</strong> {activeDoc.village || "Wagholi"}</div>
              <div><strong>Survey / Gut No:</strong> {activeDoc.surveyNumber || "142/1A"}</div>
              <div><strong>Parcel ID:</strong> {activeDoc.parcelId || "MH-PL-10234"}</div>
              <div><strong>Land Area:</strong> {activeDoc.area || "1.25 Hectares"}</div>
            </div>

            <div style={{ border: '1px solid #E2E8F0', padding: '12px', background: '#F8FAFC', borderRadius: '10px', marginBottom: '20px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '12px', color: '#005A36' }}>
                RECORDED LANDOWNERS & KUL DETAILS:
              </div>
              <div style={{ fontSize: '13px' }}>
                1. {activeDoc.landowner || "Rameshwar Dhondu Patil"} (Kabjedar Class-1) - Share: 100%<br />
                Mutation Entry No: #4819 (Date: 12-Feb-2024)<br />
                Encumbrance / Bank Loan: Nil (Bank NOC Verified)
              </div>
            </div>

            {activeDoc.remarks && (
              <div style={{ border: '1px dashed #DC2626', padding: '12px', background: '#FFF5F5', borderRadius: '10px', color: '#991B1B', fontSize: '12px' }}>
                <strong>SURVEYOR / TALATHI REMARKS:</strong><br />
                {activeDoc.remarks}
              </div>
            )}

            <div style={{ marginTop: '30px', paddingTop: '16px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '11px' }}>
              <div>
                <ShieldCheck size={16} style={{ color: '#005A36', display: 'inline', verticalAlign: '-3px' }} /> Certified Digital Extract<br />
                QR Verification Hash: SHA256-8891A92B
              </div>
              <div style={{ textAlign: 'right' }}>
                Digitally Verified by:<br />
                <strong>Talathi - Wagholi Division</strong><br />
                Date: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setIsDocViewerOpen(false)}>
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;
