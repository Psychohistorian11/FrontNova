import React from 'react';
import { NavBar } from '../../NavBarComponent/NavBar';
import { useState } from 'react';

export const Inventory = () => {
  const [idOwner, setIdOwner] = useState('');
  const [lastSearchedIdOwner, setLastSearchedIdOwner] = useState(null); // Nuevo estado
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null)

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setProperties([]); // Esto borrará la lista de propiedades
  };

  const handleIdOwnerChange = (e) => {
    setIdOwner(e.target.value);
  };

  const handleSearchProperties = async() => {
    setLoading(true);
    setLastSearchedIdOwner(idOwner); // Actualiza el último idOwner buscado
    // Simulación de la búsqueda de propiedades
    const simulatedProperties = [
      { address: 'Calle 123' },
      { address: 'Avenida Siempreviva 742' },
      { address: 'Plaza Springfield 456' },
      // ... más direcciones
    ];
    // Establecer las propiedades simuladas en el estado
    setProperties(simulatedProperties);
    setLoading(false);
  };
  
    return (
      <>
        <NavBar />
        <div className="p-20">
          <h2 className="text-2xl font-montserrat mb-6 border-b border-black font-bold">Generar inventario</h2>
          
            <div className="flex-1 mb-6">
              <label htmlFor="idOwner" className="block text-gray-700 font-bold mb-2">
                Identificador del propietario
              </label>
              <input
                type="text"
                id="idOwner"
                className="px-16 py-2 border border-gray-300 rounded"
                value={idOwner}
                onChange={handleIdOwnerChange}
                required
              />
                <div className="py-4">
                  <button 
                  onClick={handleSearchProperties}
                  className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors font-montserrat"
                  type="button"
                  disabled={!idOwner || (selectedProperty && idOwner === lastSearchedIdOwner)} // Deshabilita el botón si idOwner es una cadena vacía o si ya se ha seleccionado una propiedad para el mismo idOwner
                >
                  {loading ? 'Buscando...' : 'Buscar Viviendas'}
                </button>

                </div>

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
                {selectedProperty && (
                  <div className="mt-4 bg-skinColor rounded-lg p-6">
                    <label className="text-xl font-bold">Dirección Seleccionada:</label>
                    <p className="mt-2">{selectedProperty.address}</p>
                  </div>
                )}

            </div>
  
            {/* Columna derecha: Registro de propietario y marcadores de muebles */}
            <div className="flex-1">
              {/* Registro de propietario */}
              <div className="mb-6">
                <legend className="text-gray-700 mb-6">¿Debes registrar al propietario?</legend>
                {/* ... */}
              </div>
  
              <div>
                  <h2 className="text-2xl font-montserrat mb-6 border-b border-black font-bold">El arrendamiento es</h2>
                    <fieldset className="block mb-4">
                  <label className="inline-flex items-center">
                    <input type="radio" className="form-radio" name="furniture" value="Con muebles" />
                    <span className="ml-2">Con muebles</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input type="radio" className="form-radio" name="furniture" value="Sin muebles" />
                    <span className="ml-2">Sin muebles</span>
                  </label>
                </fieldset>
              </div>
              <button className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors font-montserrat" type="submit">
            Siguiente
          </button>
            </div>
            
          
  
        </div>
      </>
    );
  };

