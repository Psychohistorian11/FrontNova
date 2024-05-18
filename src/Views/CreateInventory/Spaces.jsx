// Spaces.jsx
import React, { useState } from "react";
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';
import SpacesWindow from "../../Components/SpacesWindow";

export const Spaces = () => {
  const [spaces, setSpaces] = useState([
    { name: 'Baño', image: null, observation: false },
    { name: 'Cocina', image: null, observation: false },
    { name: 'Dormitorio', image: null, observation: false }
  ]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [newSpace, setNewSpace] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAddSpace = () => {
    setSpaces([...spaces, { name: newSpace, image: null, observation: false }]);
    setNewSpace('');
  };

  const handleSearchFeatures = (space) => {
    setSelectedSpace(space);
    setShowModal(true);
  };

  return (
    <>
      <div className="px-72 pt-16">
        <h2 className="text-2xl mb-6 font-bold">Espacios</h2>
        <h2 className='border-b border-black mb-10'> Gestiona y crea espacios para la vivienda</h2>
        <div className='px-40'>
          {spaces.map((space, index) => (
            <div key={index} className='text-xl border-b border-black mb-6'>
              <button
                onClick={() => handleSearchFeatures(space.name)}
                className="flex items-center"
              >
                {space.name}
              </button>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={dropdown_newSpace} alt="description" />
            <input
              type="text"
              value={newSpace}
              onChange={(e) => setNewSpace(e.target.value)}
              placeholder="Agregar Espacio "
            />
            <button
              className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors"
              onClick={handleAddSpace}
            >
              Crear
            </button>
          </div>
        </div>
      </div>

      <SpacesWindow
        spaces={spaces}
        setSpaces={setSpaces}
        selectedSpace={selectedSpace}
        setSelectedSpace={setSelectedSpace}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};
