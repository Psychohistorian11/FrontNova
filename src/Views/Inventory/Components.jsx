import { useState, useRef } from "react";
import { NavBar } from "../../NavBarComponent/NavBar";
import dropdown_number_1 from '../../Assets/dropdown_number_1.png';
import dropdown_number_2 from '../../Assets/dropdown_number_2.png';
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';


export const Components = () => {
    
  const [components, setComponents] = useState([
    { name: 'Cama', image: null, observation: false },
    { name: 'Estanteria', image: null, observation: false },
    { name: 'Libros', image: null, observation: false }
  ]);
  const [newSpace, setNewSpace] = useState('');
  const [features, setFeatures] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);

  const fileInputRef = useRef(null);

  const handleAddComponents = () => {
    setComponents([...components, { name: newSpace, image: null, observation: false }]);
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

  const handleAddQuality = () => {
    
  };

  const handleAddPhoto = (component) => {
    setSelectedComponent(component);
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const updatedComponents = [...components];
    const index = components.findIndex(comp => comp.name === selectedComponent);
    updatedComponents[index].image = file;
    setComponents(updatedComponents);
  };

  return (
    <>
      <NavBar />

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
                        onClick={handleAddQuality}
                        className="flex items-center px-4 py-2 bg-white text-black shadow hover:bg-firstColor transition-colors border border-black w-80 h-10"
                      >
                        <span className="mr-2">+</span>
                        <span>Calidad del inmueble</span>
                      </button>
                    </li>
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
