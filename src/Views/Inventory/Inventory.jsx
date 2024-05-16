import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Inventory = () => {

  {/*UseStates*/}
  const [idOwner, setIdOwner] = useState('');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null)
  const navigate = useNavigate();
  

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    setProperties([]); //borrará la lista de propiedades
  };

  const handleIdOwnerChange = (e) => {
    setIdOwner(e.target.value);
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
        <div className="px-72 pt-16 ">

        <form onSubmit={handleSubmit}>

          <h2 className="text-3xl mb-6 font-bold">Generar Inventario</h2>
          <h2 className='border-b border-black pb-5 mb-10'> Registra a un nuevo propietario y comienza a gestionar sus propiedades de manera eficiente</h2>
          
                <div className="flex-1 mb-6 px-40">
                          <label htmlFor="idOwner" className="block text-gray-700 font-bold mb-2">
                            Correo electronico del propietario
                          </label>
                          <input
                            type="text"
                            id="idOwner"
                            className="px-16 py-2 border border-gray-300 rounded"
                            value={idOwner}
                            onChange={handleIdOwnerChange}
                            required
                          />
                          <div className="mt-8">
                            <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">
                              Dirección del propietario
                            </label>
                            <input
                              type="text"
                              id="direccion"
                              className="px-16 py-2 border border-gray-300 rounded"
                              // Agregar la variable y función de estado correspondiente
                              // value={direccion}
                              // onChange={handleDireccionChange}
                              required
                            />
                          </div>

                          <div className="mt-8">
                            <label htmlFor="foto" className="block text-gray-700 font-bold mb-2">
                              Agregar foto
                            </label>
                            <input
                              type="file"
                              id="foto"
                              className="px-16 py-2 border border-gray-300 rounded"
                              // Agregar la variable y función de estado correspondiente
                              // value={foto}
                              // onChange={handleFotoChange}
                              required
                            />
                          </div>
                          <div className="py-4">

                          </div>

                          {properties.length > 0 && (
                          <div className="mt-4 rounded-lg p-6">
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
                              <div className="mt-4  rounded-lg p-6">
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
                              <h2 className="text-2xl mb-6 border-b border-black font-bold">El arrendamiento es</h2>
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
                              <button className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors" type="submit">
                                Continuar a los espacios
                          </button>
                          </div>

                        
              
                </div>
            
          </form>
  
        </div>
      </>
    );
  };
