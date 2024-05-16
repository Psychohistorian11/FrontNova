import { useState, useRef } from "react";
import dropdown_number_1 from '../../Assets/dropdown_number_1.png';
import dropdown_number_2 from '../../Assets/dropdown_number_2.png';
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';

export const Components = () => {
    
  const [components, setComponents] = useState([
    { name: 'Cama', image: null, observation: false, showQuality: false },
    { name: 'Estanteria', image: null, observation: false, showQuality: false },
    { name: 'Libros', image: null, observation: false, showQuality: false }
  ]);
  const [newSpace, setNewSpace] = useState('');
  const [features, setFeatures] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);

  const fileInputRef = useRef(null);

  const handleAddComponents = () => {
    setComponents([...components, { name: newSpace, image: null, observation: false, showQuality: false }]);
    setNewSpace('');
  };

  const handleSearchFeatures = async (component) => {
    if (features[component]) {
      setFeatures({...features, [component]: null});
    } else {
      const simulatedFeatures = [
        { address: 'Observaciones' },
        { address: 'Añadir Componentes' },
        { address: 'Fotografía' },
      ];
      setFeatures({...features, [component]: simulatedFeatures});
    }
  };

  const handleObservations = (componentIndex) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].observation = !updatedComponents[componentIndex].observation;
    setComponents(updatedComponents);
  };

  const handleAddPhoto = (component) => {
    setSelectedComponent(component);
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Imagen seleccionada:", file);
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
      case 'Muy malo':
        return `${baseClasses} border-red-500 hover:bg-red-500`;
      case 'Malo':
        return `${baseClasses} border-orange-500 hover:bg-orange-500`;
      case 'Regular':
        return `${baseClasses} border-yellow-500 hover:bg-yellow-500`;
      case 'Bueno':
        return `${baseClasses} border-green-500 hover:bg-green-500`;
      case 'Muy bueno':
        return `${baseClasses} border-firstColor hover:bg-firstColor`;
      default:
        return `${baseClasses} border-gray-300 hover:bg-gray-300`;
    }
  };

  return (
    <>
   
      <div className="p-20">
        <h2 className="text-2xl font-montserrat mb-6 font-bold">Componentes</h2>
        <h2 className='border-b border-black mb-10'> Añade componentes a cada espacio y gestiona efectivamente cada integración</h2>
        <div className='px-40'>
          {components.map((component, index) => (
            <div key={index} className='text-xl border-b border-black mb-6'>
              <button 
                onClick={() => handleSearchFeatures(component.name)}
                className="flex items-center"
              >
                <img src={dropdown_number_1} className={`mr-2 ${features[component.name] ? "rotate-90" : dropdown_number_2}`} />
                {component.name}
              </button>
              {features[component.name] && (
                <div className="mt-4 bg-skinColor rounded-lg p-6">
                  <ul>
                    <li className="mb-2">
                      <div>
                        <button 
                          onClick={() => handleObservations(index)}
                          className="flex items-center px-4 py-2 bg-white text-black shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                        >
                          <span className="mr-2">{component.observation ? "-" : "+"}</span>
                          <span>Observaciones</span>
                        </button>
                      </div>
                      <div className="px-16">
                        {component.observation && ( 
                          <input
                            type="text"
                            onChange={(e) => {
                              const updatedComponents = [...components];
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
                        onClick={() => handleAddQuality(index)}
                        className="flex items-center px-4 py-2 bg-white text-black shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                      >
                        <span className="mr-2">+</span>
                        <span>Calidad del inmueble</span>
                      </button>
                    </li>
                    <div className="px-16 mb-2">
                      {component.showQuality && (
                        <div className="mt-2 flex items-center space-x-4">
                          {['Muy malo', 'Malo', 'Regular', 'Bueno', 'Muy bueno'].map((label, index) => (
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
                        onClick={() => handleAddPhoto(component.name)}
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
                    {component.image && (
                      <div>
                        <p>Fotografía seleccionada</p>
                        <img
                          src={URL.createObjectURL(component.image)}
                          alt="Imagen seleccionada"
                          style={{ maxWidth: '25%', marginTop: '10px' }}
                        />
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={dropdown_newSpace} alt="description" />
              <input 
                type="text"
                value={newSpace}
                onChange={(e) => setNewSpace(e.target.value)}
                placeholder="Agregar Componente "
              />
              <button 
                className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors font-montserrat"
                onClick={handleAddComponents}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
