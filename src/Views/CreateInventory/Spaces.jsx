import React, { useState, useMutation } from "react";
import { Link, useOutletContext } from "react-router-dom";
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';
import SpacesWindow from "../../Components/SpacesWindow";
import { BrickWall, Info, Trash } from "lucide-react";
import InfoWindow from "../../Components/InfoWindow";
import { useLocation } from "react-router-dom";
import { Sign } from "../../Components/Sign";
import { PlusIcon } from "@heroicons/react/24/outline";



export const Spaces = () => {
  const [ inventory, setInventory ] = useOutletContext();

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

  const { mutate: postSpace, isPending: isPendingOwner } = useMutation({
    mutationKey: ['postSpace'],
    mutationFn: () => getOwner(idOwner),
    onSuccess: (data) => setApiIdOwner(data.idPropietario)
  });

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

  const handleDeleteSpace = (index) => {
    const updatedSpaces = [...spaces];
    updatedSpaces.splice(index, 1); 
    setSpaces(updatedSpaces);
  };

  return (
    <>
      <div className="">
        <nav className="mb-4">
          <Link to="/h/inventory">Inventarios</Link> &gt; <Link to="/h/createInventory">Crear Inventario</Link> &gt; 
          <span className="text-">Espacios</span>
        </nav>
        <nav>
      <div className="flex items-center justify-between">  
        <h2 className="text-3xl font-bold">Espacios <BrickWall className="inline-block" /></h2>
        <div > 
          <InfoWindow
            page={page}
            firstNameInfo={firstNameInfo}
            firstInfo={inventory.owner.correo}
            SecondNameInfo={SecondNameInfo}
            secondInfo={inventory.property.direccion}
            image={inventory.property.imagen}
          />
        </div>
      </div>
    </nav>
        <h2 className='border-b border-black pb-3 mb-10'> Gestiona y crea espacios para la vivienda</h2>
        <div className='px-40'>
          {/* Mostrar todos los espacios */}
        {spaces.map((space, index) => (
                  <div key={index} className='text-xl border-b border-black mb-6 flex items-center justify-between'>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleSearchFeatures(space.name)}
                        className="flex items-center"
                      >
                        {space.name}
                      </button>
                    </div>
                    <div>
                      <button onClick={() => handleDeleteSpace(index)}>
                        <Trash />
                      </button>
                    </div>
                  </div>
                ))}

          {/* Agregar espacio */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PlusIcon className="size-10 mr-3 text-firstColor"/>
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
