// ComponentsWindow.jsx
import React, { useRef } from 'react';

const ComponentsWindow = ({
  components,
  setComponents,
  selectedComponent,
  setSelectedComponent,
  showModal,
  setShowModal
}) => {
  const fileInputRef = useRef(null);

  const handleObservations = (componentIndex) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].observation = !updatedComponents[componentIndex].observation;
    setComponents(updatedComponents);
  };

  const handleAddPhoto = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const updatedComponents = [...components];
    const index = components.findIndex(comp => comp.name === selectedComponent);
    updatedComponents[index].image = file;
    setComponents(updatedComponents);
  };

  const handleAddQuality = (index) => {
    const updatedComponents = [...components];
    updatedComponents[index].showQuality = !updatedComponents[index].showQuality;
    setComponents(updatedComponents);
  };

  const handleSelectQuality = (label) => {
    console.log(`Calidad seleccionada: ${label}`);
  };

  const getMarkerClasses = (label) => {
    let baseClasses = 'w-10 h-10 rounded-full border-2 bg-white hover:bg-opacity-100 transition-colors';
    switch (label) {
      case 'Pésimo':
        return `${baseClasses} border-red-500 hover:bg-red-500`;
      case 'Malo':
        return `${baseClasses} border-orange-500 hover:bg-orange-500`;
      case 'Regular':
        return `${baseClasses} border-yellow-500 hover:bg-yellow-500`;
      case 'Bueno':
        return `${baseClasses} border-green-500 hover:bg-green-500`;
      case 'Excelente':
        return `${baseClasses} border-firstColor hover:bg-firstColor`;
      default:
        return `${baseClasses} border-gray-300 hover:bg-gray-300`;
    }
  };

  const handleSaveAndClose = () => handleCloseWindow();

  const handleCloseWindow = () => {
    setShowModal(false);
    setSelectedComponent(null);
  };

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <div className="relative">
            <div className="bg-white p-8 rounded-lg" style={{ width: "800px", maxHeight: "90vh", overflowY: 'auto' }}>
              <h2 className="text-2xl mb-4 font-bold">{selectedComponent}</h2>
              <ul>
                <li className="mb-2">
                  <div>
                    <button 
                      onClick={() => handleObservations(components.findIndex(comp => comp.name === selectedComponent))}
                      className="flex items-center px-4 py-2 bg-white text-black shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                    >
                      <span className="mr-2">{components.find(comp => comp.name === selectedComponent).observation ? "-" : "+"}</span>
                      <span>Observaciones</span>
                    </button>
                  </div>
                  <div className="px-16">
                    {components.find(comp => comp.name === selectedComponent).observation && (
                      <input
                        type="text"
                        onChange={(e) => {
                          const updatedComponents = [...components];
                          const index = components.findIndex(comp => comp.name === selectedComponent);
                          updatedComponents[index].observation = e.target.value;
                          setComponents(updatedComponents);
                        }}
                        className="mt-2 text-sm w-full p-2 border border-black"
                        placeholder="Escribe tus observaciones aquí"
                      />
                    )}
                  </div>
                </li>
                <li className="flex justify-start items-center mb-2">
                  <button 
                    onClick={() => handleAddQuality(components.findIndex(comp => comp.name === selectedComponent))}
                    className="flex items-center px-4 py-2 bg-white text-black shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                  >
                    <span className="mr-2">+</span>
                    <span>Calidad del inmueble</span>
                  </button>
                </li>
                <div className="px-16 mb-2">
                  {components.find(comp => comp.name === selectedComponent).showQuality && (
                    <div className="mt-2 flex items-center space-x-4">
                      {['Pésimo', 'Malo', 'Regular', 'Bueno', 'Excelente'].map((label, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <button 
                            onClick={() => handleSelectQuality(label)}
                            className={getMarkerClasses(label)}
                          />
                          <span className="text-xs">{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <li className="flex justify-start items-center mb-2">
                  <button 
                    onClick={handleAddPhoto}
                    className="flex items-center px-4 py-2 bg-white text-firstColor shadow transition-colors border border-firstColor border-dashed w-80 h-10"
                  >
                    <span className="text-firstColor mr-2">+</span>
                    <span className="text-firstColor">Añadir fotografía</span>
                  </button>
                  <input
                    type="file"
                    id="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </li>
                {components.find(comp => comp.name === selectedComponent).image && (
                  <div>
                    <p>Fotografía seleccionada</p>
                    <img
                      src={URL.createObjectURL(components.find(comp => comp.name === selectedComponent).image)}
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
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={handleCloseWindow}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ComponentsWindow;
