import React, { useState } from "react";
import { Link } from "react-router-dom";
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';
import SpacesWindow from "../../Components/SpacesWindow";
import { BrickWall, Info } from "lucide-react";
import InfoWindow from "../../Components/InfoWindow";
import { useLocation } from "react-router-dom";
import { Sign } from "../../Components/Sign";

export const Spaces = () => {

  const location = useLocation();
  const { email, address, image } = location.state || {};
  const page = "Inventario";
  const firstNameInfo = "Correo del propietario";
  const SecondNameInfo = "Dirección de la vivienda";

  const [spaces, setSpaces] = useState([
    { name: 'Baño', image: null, observation: false },
    { name: 'Cocina', image: null, observation: false },
    { name: 'Dormitorio', image: null, observation: false }
  ]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [newSpace, setNewSpace] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAddSpace = () => {
    setSpaces([...spaces, { name: newSpace, image: null, observation: false }]);
    setNewSpace('');
  };

  const handleSearchFeatures = (space) => {
    setSelectedSpace(space);
    setShowModal(true);
  };

  return (
    <>
      <div className="">
        <nav className="mb-4">
          <Link to="/Inventory">Inventarios</Link> &gt; <Link to="/CreateInventory">Crear Inventario</Link> &gt; <span>Espacios</span>
        </nav>
        <nav>
      <div className="flex items-center justify-between mb-6">  
        <h2 className="text-2xl font-bold">Espacios <BrickWall className="inline-block" /></h2>
        <div > 
          <InfoWindow
            page={page}
            firstNameInfo={firstNameInfo}
            firstInfo={email}
            SecondNameInfo={SecondNameInfo}
            secondInfo={address}
            image={image}
          />
        </div>
      </div>
    </nav>
        <h2 className='border-b border-black mb-10'> Gestiona y crea espacios para la vivienda</h2>
        <div className='px-40'>
          {spaces.map((space, index) => (
            <div key={index} className='text-xl border-b border-black mb-6'>
              <button
                onClick={() => handleSearchFeatures(space.name)}
                className="flex items-center"
              >
                {space.name}
              </button>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={dropdown_newSpace} alt="description" />
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newSpace.trim()) {
                          handleAddSpace();
                        }
                      }}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <input
                        type="text"
                        value={newSpace}
                        onChange={(e) => setNewSpace(e.target.value)}
                        placeholder="Agregar Espacio "
                        style={{ marginRight: '10px' }} 
                      />
                    </form>
                  </div>

        </div>
        <Sign/>
      </div>

      <SpacesWindow
        spaces={spaces}
        setSpaces={setSpaces}
        selectedSpace={selectedSpace}
        setSelectedSpace={setSelectedSpace}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};
