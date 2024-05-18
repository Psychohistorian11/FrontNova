import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ShowMap from '../../Components/ShowMap';

export const CreateInventory = () => {
  const [idOwner, setIdOwner] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleIdOwnerChange = (e) => {
    setIdOwner(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setShowMap(true);
  };

  const handleAddImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Spaces');
  };

  const handleRegisterOwner = () => {
    navigate('/Owners');
  };

  const confirmAddress = () => {
    setShowMap(false);
    setIsAddressConfirmed(true);
  };

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
                value={address}
                onChange={handleAddressChange}
                required
              />

                {showMap && (
                        <ShowMap address={address} onConfirm={confirmAddress} />
                      )}
            </div>
                  
            <div className="mt-8">
              <label className="block text-gray-700 font-bold mb-2">
                Fotografía de la vivienda
              </label>
              <div className="flex justify-start items-center mb-2">
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="flex items-center px-4 py-2 bg-white text-firstColor shadow transition-colors border border-firstColor border-dashed w-80 h-10"
                >
                  <span className="text-firstColor mr-2">+</span>
                  <span className="text-firstColor">Añadir </span>
                </button>
                <input
                  type="file"
                  id="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
              
              {selectedImage && (
                <div className="mt-4">
                  <img src={selectedImage} alt="Selected" className="w-40 h-40 object-cover rounded" />
                </div>
              )}

            </div>
          </div>

          

          <div className="flex-1">
            <form onChange={handleRegisterOwner}>
              <div className="mb-6 px-40">
                <legend className="text-gray-700 mb-6">
                  <a href="#" className="text-firstColor hover:text-secondColor" onClick={(e) => { e.preventDefault(); handleRegisterOwner(); }}>
                    ¿Debes registrar al propietario?
                  </a>
                </legend>
              </div>
            </form>

            <div className='px-40'>
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
