import { useState } from "react";
import ComponentsWindow from "../../Components/ComponentsWindow";
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';

export const Components = () => {
  const [components, setComponents] = useState([
    { name: 'Cama', image: null, observation: false, showQuality: false },
    { name: 'Estanteria', image: null, observation: false, showQuality: false },
    { name: 'Libros', image: null, observation: false, showQuality: false }
  ]);
  const [newSpace, setNewSpace] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddComponents = () => {
    setComponents([...components, { name: newSpace, image: null, observation: false, showQuality: false }]);
    setNewSpace('');
  };

  const handleSearchFeatures = (component) => {
    setSelectedComponent(component);
    setShowModal(true);
  };

  return (
    <>
      <div className="px-72 pt-16 ">
        <h2 className="text-2xl font-montserrat mb-6 font-bold">Componentes</h2>
        <h2 className='border-b border-black mb-10'> Añade componentes a cada espacio y gestiona efectivamente cada integración</h2>
        <div className='px-40'>
          {components.map((component, index) => (
            <div key={index} className='text-xl border-b border-black mb-6'>
              <button 
                onClick={() => handleSearchFeatures(component.name)}
                className="flex items-center"
              >
                {component.name}
              </button>
            </div>
          ))}
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={dropdown_newSpace} alt="description" />
              <input 
                type="text"
                value={newSpace}
                onChange={(e) => setNewSpace(e.target.value)}
                placeholder="Agregar Componente"
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
      <ComponentsWindow
        components={components}
        setComponents={setComponents}
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};
