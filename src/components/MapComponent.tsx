// src/MapComponent.tsx
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Popup,
  Polyline,
} from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import { statesData } from '../data';
import CustomSnackbar from './SnackBar';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icon for the current position (yellow triangle)
const yellowTriangleIcon = new L.DivIcon({
  className: 'custom-icon',
  html: `<svg width="56" height="69" viewBox="0 0 61 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60.1612 71.445L31.9107 2.23123C31.5743 1.40695 30.4094 1.40019 30.0635 2.22051L0.864314 71.4507C0.529167 72.2454 1.28969 73.0632 2.10652 72.7865L30.6739 63.1105C30.8852 63.0389 31.1144 63.04 31.325 63.1138L58.905 72.7668C59.7183 73.0514 60.4869 72.2428 60.1612 71.445Z" fill="#FCCD29" stroke="#FCCD29"/>
    <path d="M29.0812 6.46673C29.5102 5.468 31 5.77446 31 6.86144V55.4125C31 55.7752 30.8036 56.1094 30.4869 56.286L3.06448 71.5706C2.23082 72.0353 1.28211 71.1794 1.65881 70.3024L29.0812 6.46673Z" fill="url(#paint0_linear_29_199)"/>
    <path d="M32.9235 6.62934C32.5038 5.61942 31 5.91941 31 7.01304V55.4221C31 55.7797 31.1909 56.11 31.5007 56.2885L57.9464 71.5284C58.7744 72.0056 59.7358 71.1608 59.3692 70.2783L32.9235 6.62934Z" fill="url(#paint1_linear_29_199)"/>
    <defs>
    <linearGradient id="paint0_linear_29_199" x1="15.75" y1="2" x2="15.75" y2="73" gradientUnits="userSpaceOnUse">
    <stop stop-color="#EFC428"/>
    <stop offset="1" stop-color="#DCA82E"/>
    </linearGradient>
    <linearGradient id="paint1_linear_29_199" x1="45.75" y1="1.07246e-07" x2="45.75" y2="73" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FFDA2A"/>
    <stop offset="1" stop-color="#FFC012"/>
    </linearGradient>
    </defs>
    </svg>`,
  iconSize: [25, 25],
  iconAnchor: [29, 25], // Adjust to center the triangle
});

// Custom icon for the destination (red marker)
const destinationIcon = new L.Icon({
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/4/4f/Map_marker_icon_red.svg', // Replace with a red marker icon
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -41], // Point from which the popup should open relative to the iconAnchor
});

export const MapComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const startPosition = [52.819362, 27.465336];
  // Destination position
  const destinationPosition = [52.821004, 27.465398];

  // Define a route that moves away from Minsk
  const route = [startPosition, destinationPosition];

  const [currentPosition, setCurrentPosition] = useState(route[0]); // Start at the initial position// Destination position

  // Route coordinates (for demonstration purposes, you can modify as needed)
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [markerPosition, setMarkerPosition] = useState(route[0]);

  const handleMarkerClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const simulateBackendResponse = () => {
      setTimeout(() => {
        const newMessage = 'New data received from the server!';
        setMessage(newMessage);
        setOpen(true);
      }, 5000);
    };

    simulateBackendResponse();
    return () => {};
  }, []);

  return (
    <MapContainer
      center={startPosition as LatLngTuple}
      zoom={13}
      style={{ width: '600px', height: '600px' }}
      attributionControl={false}
    >
      <TileLayer
        url='https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=0dXNtQ2w0v0nX421t7p8' // Replace with your MapTiler API key
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <Marker
        position={startPosition as LatLngTuple}
        icon={yellowTriangleIcon}
        eventHandlers={{ click: handleMarkerClick }}
      >
        <Popup>
          <span>Current Position</span>
        </Popup>
      </Marker>
      <Marker
        position={destinationPosition as LatLngTuple}
        icon={destinationIcon}
        eventHandlers={{ click: handleMarkerClick }}
      >
        <Popup>
          <span>Destination</span>
        </Popup>
      </Marker>

      <Polyline positions={route} color='blue' />
      <CustomSnackbar open={true} message={message} onClose={handleClose} />
    </MapContainer>
  );
};

export default MapComponent;
