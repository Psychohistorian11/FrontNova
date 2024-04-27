import React from 'react';
import { NavBar } from '../../NavBarComponent/NavBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Inventory = () => {

  {/*UseStates*/}
  const [idOwner, setIdOwner] = useState('');
  const [lastSearchedIdOwner, setLastSearchedIdOwner] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null)
  const navigate = useNavigate();
  

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setProperties([]); //borrará la lista de propiedades
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
    ];
    setProperties(simulatedProperties);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Spaces');
  }

  const handleRegisterOwner = () => {
    navigate('/Owners')
  }
  
    return (
      <>
        <NavBar />
        <div className="p-20">

        <form onSubmit={handleSubmit}>

          <h2 className="text-2xl font-montserrat mb-6 font-bold">Generar Inventario</h2>
          <h2 className='border-b border-black mb-10'> Registra a un nuevo propietario y comienza a gestionar sus propiedades de manera eficiente</h2>
          
                <div className="flex-1 mb-6 px-40">
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
                            disabled={!idOwner || (selectedProperty && idOwner === lastSearchedIdOwner)} 
                          >
                            {loading ? 'Buscando...' : 'Buscar viviendas'}
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

                <div className="flex-1">

                          <form onChange={handleRegisterOwner}>
                            <div className="mb-6 px-40">
                              <legend className="text-gray-700 mb-6 ">
                                <a href="#" className="text-firstColor hover:text-secondColor" onClick={(e) => { e.preventDefault(); handleRegisterOwner(); }}>
                                  ¿Debes registrar al propietario?
                                </a>
                              </legend>
                            </div>
                          </form>
                
                          <div className='px-40'>
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
                              <button className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors font-montserrat" type="submit">
                                Continuar a los espacios
                          </button>
                          </div>

                          


              
                </div>
            
          </form>
  
        </div>
      </>
    );
  };

