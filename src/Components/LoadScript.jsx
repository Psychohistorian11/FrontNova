// LoadScript.js
import { useEffect } from 'react';
const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const LoadScript = ({ onLoad }) => {
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
      script.async = true;
      script.onload = onLoad;
      document.head.appendChild(script);
    } else {
      onLoad();
    }
  }, [onLoad]);

  return null;
};

export default LoadScript;
