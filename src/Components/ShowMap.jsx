import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import LoadScript from './LoadScript';

const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const ShowMap = ({ address, onConfirm }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(15);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const marker = useRef(null); 

  useEffect(() => {
    if (scriptLoaded && address) {
      geocodeAddress(address);
    }
  }, [scriptLoaded, address]);

  const geocodeAddress = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        setMapCenter({ lat: location.lat(), lng: location.lng() });

        if (marker.current) {
          marker.current.setMap(null); 
        }
        

        marker.current = new window.google.maps.Marker({
          position: { lat: location.lat(), lng: location.lng() },
          map: window.map,
          title: 'Dirección Seleccionada'
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return (
    <div className="mt-8 px-40">
      <LoadScript onLoad={() => setScriptLoaded(true)} />
      {scriptLoaded && (
        <>
          <div style={{ height: '500px', width: '150%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: {googleApiKey} }}
              center={mapCenter}
              zoom={mapZoom}
              onGoogleApiLoaded={({map}) => { window.map = map; }} 
            />
          </div>
          <button
            type="button"
            onClick={onConfirm}
            className="mt-4 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors"
          >
            Esta dirección es correcta?
          </button>
        </>
      )}
    </div>
  );
};

export default ShowMap;
