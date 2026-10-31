import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Vite/Webpack asset URLs for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom styled DivIcon generator for Cadastral Survey Gat parcels
export function createCadastralDivIcon(surveyNo, color = '#008E4F', isSelected = false) {
  return L.divIcon({
    className: 'custom-cadastral-marker',
    html: `
      <div style="
        display: flex;
        align-items: center;
        gap: 4px;
        background: ${isSelected ? '#0F172A' : '#FFFFFF'};
        color: ${isSelected ? '#FDE68A' : '#0F172A'};
        border: 2px solid ${color};
        padding: 3px 7px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 800;
        font-family: monospace;
        white-space: nowrap;
        box-shadow: ${isSelected ? '0 0 0 3px rgba(245, 158, 11, 0.45), 0 4px 10px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.18)'};
        transform: translate(-50%, -50%);
        pointer-events: auto;
        cursor: pointer;
        transition: all 0.2s ease;
      ">
        <span style="
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${color};
          display: inline-block;
        "></span>
        <span>Gat ${surveyNo}</span>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

// Custom Chainage Milestone Marker
export function createChainageIcon(chainageLabel) {
  return L.divIcon({
    className: 'custom-chainage-marker',
    html: `
      <div style="
        background: rgba(15, 23, 42, 0.9);
        color: #FDE68A;
        border: 1px solid #F59E0B;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transform: translate(-50%, -100%);
      ">
        📍 ${chainageLabel}
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}
