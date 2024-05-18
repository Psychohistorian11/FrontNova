// SpacesWindow.jsx
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SpacesWindow = ({
  spaces,
  setSpaces,
  selectedSpace,
  setSelectedSpace,
  showModal,
  setShowModal,
}) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleObservations = (observation) => {
    const updatedSpaces = [...spaces];
    const index = updatedSpaces.findIndex(space => space.name === selectedSpace);
    updatedSpaces[index].observation = observation;
    setSpaces(updatedSpaces);
  };

  const handleAddComponents = () => {
    navigate('/Components');
  };

  const handleAddImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const updatedSpaces = [...spaces];
    const index = updatedSpaces.findIndex(space => space.name === selectedSpace);
    updatedSpaces[index].image = file;
    setSpaces(updatedSpaces);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedSpace(null);
  };

  const handleSaveAndClose = () => {
    handleModalClose();
  };

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <div className="relative">
            <div className="bg-white p-8 rounded-lg" style={{ width: "800px", maxHeight: "90vh", overflowY: 'auto' }}>
              <h2 className="text-2xl mb-4 font-bold">{selectedSpace}</h2>
              <ul>
                <li className="mb-2">
                  <div>
                    <button
                      onClick={() => handleObservations(!spaces.find(s => s.name === selectedSpace).observation)}
                      className="flex items-center px-4 py-2 bg-white text-black shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                    >
                      <span className="mr-2">{spaces.find(s => s.name === selectedSpace).observation ? "-" : "+"}</span>
                      <span>Observaciones</span>
                    </button>
                  </div>
                  {spaces.find(s => s.name === selectedSpace).observation && (
                    <div className="px-16">
                      <input
                        type="text"
                        onChange={(e) => handleObservations(e.target.value)}
                        className="mt-2 text-sm w-full p-2 border border-black"
                        placeholder="Escribe tus observaciones aquí"
                      />
                    </div>
                  )}
                </li>
                <li className="flex justify-start items-center mb-2">
                  <button
                    onClick={handleAddComponents}
                    className="flex items-center px-4 py-2 bg-white text-black  shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                  >
                    <span className="mr-2"> + </span>
                    <span>Añadir Componentes</span>
                  </button>
                </li>
                <li className="flex justify-start items-center mb-2">
                  <button
                    onClick={() => handleAddImage(selectedSpace)}
                    className="flex items-center px-4 py-2 bg-white text-firstColor shadow transition-colors border border-firstColor border-dashed w-80 h-10"
                  >
                    <span className="text-firstColor mr-2">+</span>
                    <span className="text-firstColor">Añadir Fotografía</span>
                  </button>
                  <input
                    type="file"
                    id="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </li>
                {spaces.find(s => s.name === selectedSpace).image && (
                  <div>
                    <p>Imagen seleccionada</p>
                    <img
                      src={URL.createObjectURL(spaces.find(s => s.name === selectedSpace).image)}
                      alt="Imagen seleccionada"
                      style={{ maxWidth: '25%', marginTop: '10px' }}
                    />
                  </div>
                )}
              </ul>
              <div className="flex justify-end mt-4">
                <button
                  className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors"
                  onClick={handleSaveAndClose}
                >
                  Guardar y Cerrar
                </button>
              </div>
            </div>
            <button
              className="absolute top-2 right-0 m-4 p-4 bg-white text-black rounded-full shadow hover:bg-gray-800 hover:text-white transition-colors"
              onClick={handleModalClose}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SpacesWindow;
