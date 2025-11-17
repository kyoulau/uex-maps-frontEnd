// src/components/MapDisplay.tsx
import React from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from '@react-google-maps/api';
import { type Contato } from './../types/types';


interface MapDisplayProps {
  contacts: Contato[];
  selectedContact: Contato | null;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: -25.435351,
  lng: -49.276179,
};

const MapDisplay: React.FC<MapDisplayProps> = ({
  contacts,
  selectedContact,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY || '',
  });

  const center = selectedContact
    ? { lat: selectedContact.latitude, lng: selectedContact.longitude }
    : defaultCenter;

  const zoom = selectedContact ? 15 : 10;

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
    >
      {/*
        *
        *  faz um loop na lista de 'contacts'
        * e renderiza um <Marker> para cada um,
        * usando a latitude e longitude do cotato.
        *
      */}
      {contacts.map((contact) => (
        <Marker
          key={contact.id}
          position={{ lat: contact.latitude, lng: contact.longitude }}
          title={contact.nome}
        />
      ))}
    </GoogleMap>
  ) : (
    <>Carregando Mapa...</>
  );
};

export default MapDisplay;