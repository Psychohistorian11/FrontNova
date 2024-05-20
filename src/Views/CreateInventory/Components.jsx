import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ComponentsWindow from "../../Components/ComponentsWindow";
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';
import { BedDouble } from "lucide-react";
import InfoWindow from "../../Components/InfoWindow";

export const Components = () => {
  const location = useLocation();
  const { observation, image, spaceName } = location.state || {};
  const firstNameInfo = "Observaciones del mueble";

  const [components, setComponents] = useState([
    { name: 'Cama', image: null, observation: false, showQuality: false },
    { name: 'Estantería', image: null, observation: false, showQuality: false },
    { name: 'Libros', image: null, observation: false, showQuality: false }
  ]);
  const [newComponent, setNewComponent] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddComponent = () => {
    setComponents([...components, { name: newComponent, image: null, observation: false, showQuality: false }]);
    setNewComponent('');
  };

  const handleSearchFeatures = (component) => {
    setSelectedComponent(component);
    setShowModal(true);
  };

  return (
    <>
      <div className="px-72 pt-16 ">
        <nav className="mb-4">
          <Link to="/Inventory">Inventarios</Link> &gt; <Link to="/CreateInventory">Crear Inventario</Link> &gt; <Link to="/Spaces">{spaceName}</Link> &gt; <span>Muebles</span>
        </nav>
        <div className="flex items-center justify-between mb-6">
          <div>
          <h2 className="text-2xl font-bold">Muebles <BedDouble className="inline-block" /></h2>
          <h2 className="font-bold">{spaceName} </h2>
          </div>

          <div>
            <InfoWindow
              page={spaceName}
              firstNameInfo={firstNameInfo}
              firstInfo={observation}
              image={image}
            />
          </div>
        </div>
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
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newComponent.trim()) {
                    handleAddComponent();
                  }
                }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <input
                  type="text"
                  value={newComponent}
                  onChange={(e) => setNewComponent(e.target.value)}
                  placeholder="Agregar Componente"
                  style={{ marginRight: '10px' }} 
                />
              </form>
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

