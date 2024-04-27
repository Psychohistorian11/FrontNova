import React, { useState } from 'react';
import { NavBar } from '../../NavBarComponent/NavBar';

export const Spaces = () => {
  const [spaces, setSpaces] = useState(['Baño','Cocina','Dormitorio']);
  const [newSpace, setNewSpace] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleAddSpace = () => {
    setSpaces([...spaces, newSpace]);
    setNewSpace('');
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setProperties([]); //borrará la lista de propiedades
  };

  const handleSearchProperties = async(space) => {
    // Simulación de la búsqueda de propiedades
    const simulatedProperties = [
      { address: 'Calle 123' },
      { address: 'Avenida Siempreviva 742' },
      { address: 'Plaza Springfield 456' },
    ];
    setProperties(simulatedProperties);
  };

  return (
    <>
      <NavBar />
      <div className="p-20">
        <h2 className="text-2xl font-montserrat mb-6 font-bold">Espacios</h2>
        <h2 className='border-b border-black mb-10'> Gestiona y crea espacios para la vivienda</h2>
        <div className='px-40'>
          {spaces.map((space, index) => (
            <div key={index} className='text-2xl border-b border-black mb-6'>
              <a href="#"  onClick={() => handleSearchProperties(space)}>
                {space}
              </a>
              {properties.length > 0 && (
            <div className="mt-4 bg-skinColor rounded-lg p-6">
              <h3 className="text-xl font-bold">Propiedades del Propietario:</h3>
              <ul>
                {properties.map((property, index) => (
                  <li key={index} className="flex justify-start items-center mb-2">
                    <span className="flex-1">{property.address}</span>
                    <button 
                      onClick={() => handleSelectProperty(property)}
                      className="px-4 py-2 bg-firstColor text-white rounded-full shadow hover:bg-secondColor transition-colors"
                    >
                      +
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}    
            </div>
          ))}
          <div>
                <input
                    type="text"
                    value={newSpace}
                    onChange={(e) => setNewSpace(e.target.value)}
                    placeholder="Nombre del nuevo espacio"
                />
                <div>
                <button 
                onClick={handleAddSpace}>Agregar espacio
                </button>
                </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
