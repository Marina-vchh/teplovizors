// src/MapComponent.tsx
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
} from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import CustomSnackbar from './SnackBar';
import { Box } from '@mui/material';

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

type Props = {
  hasNotification: boolean;
  setHasNotification: any;
}

export const MapComponent: React.FC<Props> = ({ hasNotification, setHasNotification }: Props) => {
  const startPosition = [52.819362, 27.465336];
  const destinationPosition = [52.821004, 27.465398];

  // Define a route
  const route = [startPosition, destinationPosition];

  // Coordinates for a larger highlighted area (5x larger)
  const polygonPositions: LatLngTuple[] = [
    [52.8175, 27.4620],  // Point 1
    [52.8260, 27.4715],  // Point 2
    [52.8315, 27.4650],  // Point 3
    [52.8260, 27.4580],  // Point 4
    [52.8170, 27.4560],  // Point 5
    [52.8175, 27.4620],  // Closing the polygon
  ];

  // Create an infinite line
  const infiniteLine: LatLngTuple[] = [];
  const lineLength = 100; // Length of the line in degrees (adjust as needed)

  // Calculate direction vector
  const dx = destinationPosition[0] - startPosition[0];
  const dy = destinationPosition[1] - startPosition[1];

  // Generate points in both directions
  for (let i = -lineLength; i <= lineLength; i++) {
    const factor = i / lineLength; // Normalize factor
    infiniteLine.push([
      startPosition[0] + factor * dx,
      startPosition[1] + factor * dy,
    ]);
  }

  const handleMarkerClick = () => {
    setHasNotification(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setHasNotification(false);
  };

  return (
    <MapContainer
      center={startPosition as LatLngTuple}
      zoom={15}
      style={{ width: '300px', height: '600px', border: '3px solid black', borderRadius: '30px'}}
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

      {hasNotification &&
        <Polygon positions={polygonPositions} color='#F13C59' fillOpacity={0.5} />
      }

      <CustomSnackbar open={hasNotification} onClose={handleClose} />
    </MapContainer>
  );
};

export default MapComponent;