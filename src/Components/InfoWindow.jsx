import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

const InfoWindow = ({ page, firstNameInfo, firstInfo, SecondNameInfo, secondInfo, image }) => {
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef(null);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleClickOutside = (event) => {
    if (infoRef.current && !infoRef.current.contains(event.target)) {
      setShowInfo(false);
    }
  };

  useEffect(() => {
    if (showInfo) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInfo]);

  return (
    <>
      <button
        className="m-4 p-4 bg-white text-black rounded-full shadow hover:bg-gray-800 hover:text-white transition-colors"
        onClick={toggleInfo}
      >
        <Info />
      </button>
      {showInfo && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <div className="relative" ref={infoRef}>
            <div className="bg-white p-8 rounded-lg" style={{ width: "800px", maxHeight: "90vh", overflowY: 'auto' }}>
              <h2 className="text-2xl mb-4 font-bold">Información de "{page}"</h2>
              <p>{firstNameInfo}: {firstInfo}</p>
              {SecondNameInfo && <p>{SecondNameInfo}: {secondInfo}</p>}
              {image && (
                <div>
                  <img src={image} alt="Casa" style={{ maxWidth: '50%', marginTop: '10px' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoWindow;
