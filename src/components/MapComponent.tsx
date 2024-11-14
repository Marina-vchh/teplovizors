// src/MapComponent.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { statesData } from '../data';
import CustomSnackbar from './SnackBar';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const MapComponent: React.FC = () => {
  const position: [number, number] = [53.90454, 27.55924];
  const [open, setOpen] = useState(false);

  const handleMarkerClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ width: '400px', height: '400px' }}
    >
      <TileLayer
        url='https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=0dXNtQ2w0v0nX421t7p8'
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {statesData.features.map((state) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        return (
          <Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3 as any,
              color: 'white',
            }}
            positions={coordinates as any}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: '',
                  fillColor: '#BD0026',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: '3',
                  color: 'white',
                  fillColor: '#FD8D3C',
                });
              },
              click: (e) => {},
            }}
          />
        );
      })}
      <CustomSnackbar
        open={true}
        message='You clicked on the marker for Minsk!'
        onClose={handleClose}
      />
    </MapContainer>
  );
};

export default MapComponent;
