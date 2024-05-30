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
  const [file, setFile] = useState(undefined);
  const [spaceName, setSpaceName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!!selectedSpace) {
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
    const inputFile = event.target.files[0];
    setFile(inputFile);
    setImage(URL.createObjectURL(inputFile));
  };

  const handleCloseWindow = () => {
    setShowModal(false);
  };

  const handleSaveAndClose = () => {
    if (!spaceName || !observation || !file) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (selectedSpace.nombre === '') {
      postSpace({
        name: spaceName,
        description: observation,
        image: file
      });
    } else {
      putSpace({
        idSpace: selectedSpace.idHabitacion,
        name: spaceName,
        description: observation,
        image: file
      });
    }
    setShowModal(false);
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
        <div className="relative">
          <div className="bg-white p-8 rounded-lg" style={{ width: "800px", maxHeight: "90vh", overflowY: 'auto' }}>
            <ul>
            <li className="flex mb-6 w-full p-2">
                        <label className="relative w-full">
                          <input
                            type="text"
                            className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-full"
                            value={spaceName}
                            onChange={(e) => setSpaceName(e.target.value)}
                            placeholder=" "
                            required
                          />
                          <span className="absolute left-0 top-2 px-1 text-lg tracking-wide
                           peer-focus:text-firstColor pointer-events-none duration-200 
                           peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5
                            peer-valid:text-sm bg-white ml-2 text-black">
                            Nombre del espacio
                          </span>
                        </label>
                      </li>



                      <li className="flex mb-6 w-full p-2">
                              <label className="relative w-full">
                                <textarea
                                  className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-full"
                                  value={observation}
                                  onChange={(e) => handleObservations(e.target.value)}
                                  placeholder=" "
                                  required
                                ></textarea>
                                <span className="absolute left-0 top-2 px-1 text-lg tracking-wide
                                 peer-focus:text-firstColor pointer-events-none duration-200
                                  peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5
                                   peer-valid:text-sm bg-white ml-2 text-black">
                                  Observaciones
                                </span>
                              </label>
                            </li>


              <li className="flex justify-start items-center mb-2">
                <button
                  onClick={handleAddImage}
                  className="mt-6 w-full px-4 py-2 bg-white text-firstColor shadow transition-colors border border-firstColor border-dashed"
                >
                  <div className="flex items-center">
                    <span className="text-firstColor mr-2"> + </span>
                    <span className="text-firstColor">
                      {image === '' ? 'Añadir Fotografía' : 'Cambiar fotografía'}
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
            {error && <p className="block text-gray-700 font-bold mb-2 text-xl">{error}</p>}
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
