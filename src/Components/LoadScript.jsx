// LoadScript.js
import { useEffect } from 'react';

const LoadScript = ({ onLoad }) => {
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAu9jFYl_nlbh6ROkpBg7pcNUzDN7Q50do`;
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
