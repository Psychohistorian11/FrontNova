import { useMutation } from '@tanstack/react-query';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUrlApi } from '../api/axiosConfig';


const SpacesWindow = ({
  selectedSpace,
  postSpace,
  putSpace,
  setShowModal
}) => {

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [observation, setObservation] = useState('');
  const [image, setImage] = useState(undefined);
  const [file, setFile ] = useState(undefined);
  const [spaceName, setSpaceName] = useState('');

  useEffect(() => {
    if (!!selectedSpace){
      setSpaceName(selectedSpace.nombre);
      setImage(selectedSpace.imagen === '' ? null : `${imageUrlApi}/${selectedSpace.imagen}`);
      setObservation(selectedSpace.descripcion);
    }
  }, [selectedSpace]);

  const handleObservations = (observation) => {
    setObservation(observation);
  };

  const handleAddImage = () => fileInputRef.current.click();
  const handleFileChange = async (event) => {
    const inputFile = event.target.files[0]
    setFile(inputFile);
    
    setImage(URL.createObjectURL(inputFile));
  };

  
  const handleCloseWindow = () => {
    setShowModal(false);
  };

  const handleSaveAndClose = () => {
    if (selectedSpace.nombre === ''){
      postSpace({
        name: spaceName, 
        description: observation, 
        image: file})
    } else {
      putSpace({
        idSpace: selectedSpace.idHabitacion, 
        name: spaceName, 
        description: observation, 
        image: file})
    }
    setShowModal(false); 
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
        <div className="relative">
          <div className="bg-white p-8 rounded-lg" style={{ width: "800px", maxHeight: "90vh", overflowY: 'auto' }}>
            <ul>
              <li className='w-full space-x-5 mb-5'>
                <label className='font-semibold text-2xl'>Nombre</label>
                <input className="text-xl mb-4 pl-4 w-3/4 font-medium border border-gray-400 rounded" 
                value={spaceName} 
                onChange={(e) => setSpaceName(e.target.value)}
                placeholder='Nombre'/>

              </li>

              <li className="mb-2 ">
                  <label className='text-xl'>Observaciones</label>
                  <textarea 
                    className="mt-2 max-h-32 text-base resize-none w-full pl-4 border border-gray-400 rounded"
                    value={observation}
                    type="text"
                    onChange={(e) => handleObservations(e.target.value)}
                    placeholder="Escribe tus observaciones aquí"
                  ></textarea>
              </li>

              <li className="flex justify-start items-center mb-2">
                <button
                  onClick={handleAddImage}
                  className="mt-6 w-full px-4 py-2 bg-white text-firstColor shadow transition-colors border border-firstColor border-dashed"
                >
                  <div className="flex items-center">
                    <span className="text-firstColor mr-2">+</span>
                    <span className="text-firstColor">
                      {image === '' ? 'Añadir Fotografía': 'Cambiar fotografía'}
                    </span>
                  </div>
                  {!!image && 
                      <img
                        src={image}
                        alt="Imagen seleccionada"
                        style={{ maxWidth: '25%', marginTop: '10px' }}
                      />
                  }
                </button>
                <input
                  type="file"
                  id="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </li>
            </ul>
            <div className="flex justify-end mt-8">
              <button
                className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors"
                onClick={handleSaveAndClose}
              >
                Guardar y Cerrar
              </button>
            </div>
          </div>
          <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={handleCloseWindow}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
      </div>
    </>
  );
};

export default SpacesWindow;
