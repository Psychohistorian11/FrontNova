import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SpacesWindow from "../../Components/SpacesWindow";
import { BrickWall, Info, Trash } from "lucide-react";
import InfoWindow from "../../Components/InfoWindow";
import { useLocation } from "react-router-dom";
import { Sign } from "../../Components/Sign";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createRoom, deleteRoom, getPropertyRooms, updateRoom } from "../../api/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingTask } from "../../Components/LoadingTask";


export const Spaces = () => {
  const [ inventory, setInventory ] = useOutletContext();

  const [ selectedSpace, setSelectedSpace] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ isNew, setIsNew ] = useState(false);

  const location = useLocation();
  const page = "Inventario";
  const firstNameInfo = "Correo del propietario";
  const SecondNameInfo = "Dirección de la vivienda";

  // const [spaces, setSpaces] = useState([
  //   { name: 'Baño', image: null, observation: false },
  //   { name: 'Cocina', image: null, observation: false },
  //   { name: 'Dormitorio', image: null, observation: false }
  // ]);

  const { data: spaces, isLoading } = useQuery({
    queryKey: ['getRooms'],
    queryFn: () => getPropertyRooms(inventory.property.idPropiedad),
    enabled: !!inventory.property.idPropiedad,
    onError: (error) => {
      console.error("Ocurrió un error al obtener las habitaciones:", error);
    }
  })

  const { mutate: postSpace, isPending: isPendingPost } = useMutation({
    mutationKey: ['postSpace'],
    mutationFn: ({name, description, image}) => createRoom(inventory.property.idPropiedad, name, description, image),
    onSucces: (data) => handleSucces(data)
  });

  const { mutate: putSpace, isPending: isPendingPut } = useMutation({
    mutationKey: ['putSpace'],
    mutationFn: ({idSpace, name, description, image}) => updateRoom(idSpace, name, description, image),
    onSucces: (data) => handleSucces(data)
  });

  const { mutate: mutateDeleteSpace, isPending: isPendingDelete } = useMutation({
    mutationKey: ['deleteSpace'],
    mutationFn: (idSpace) => deleteRoom(idSpace),
    onSucces: (data) => handleSuccesDelete(data)
  });

  const isPending = isPendingPost || isPendingPut || isPendingDelete

  function handleSuccesDelete(data){
    setInventory(inventory => ({
      ...inventory,
      spaces: inventory.spaces.map(space => space.idHabitacion != data.idHabitacion)
    }))
  }

  function handleSucces(data){
    setInventory(inventory => ({
      ...inventory,
      spaces: inventory.spaces.filter(space => space.idHabitacion === data.idHabitacion)
    }))
  }

  useEffect(() => {
    if (spaces){
      setInventory(inventory => ({
        ...inventory,
        spaces: spaces
      }))
    }
  }, [spaces])

  // const handleAddSpace = () => {
  //   setSpaces([...spaces, { name: newSpace, image: null, observation: false }]);
  //   setNewSpace('');
  // };

  const handleSearchFeatures = (space) => {
    setIsNew(false);
    setSelectedSpace(space);
    setShowModal(true);
  };

  // const handleDeleteSpace = (index) => {
  //   const updatedSpaces = [...spaces];
  //   updatedSpaces.splice(index, 1); 
  //   setSpaces(updatedSpaces);
  // };

  const handleNewSpace = () => {
    setSelectedSpace({
      nombre: '',
      imagen: '',
      descripcion: ''
    });
    setIsNew(true);
    setShowModal(true);
  }


  if (isLoading){
    return <Loading />
  }

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
        {spaces?.map((space, index) => (
                  <div key={index} className='text-xl border-b border-black mb-6 flex items-center justify-between'>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleSearchFeatures(space)}
                        className="flex items-center"
                      >
                        {space.nombre}
                      </button>
                    </div>
                    <div>
                      <button onClick={() => mutateDeleteSpace(space.idHabitacion)}>
                        <Trash />
                      </button>
                    </div>
                  </div>
                ))}

          {/* Agregar espacio */}
          <button onClick={handleNewSpace} style={{ display: 'flex', alignItems: 'center' }}>
            <PlusIcon className="size-10 mr-3 text-firstColor"/>
            <span className="mr-3 text-gray-500">Agregar espacio</span>
          </button>

        </div>
        <Sign/>
      </div>

      { showModal && 
        <SpacesWindow
          selectedSpace={selectedSpace}
          postSpace={postSpace}
          isNew={isNew}
          putSpace={putSpace}
          setShowModal={setShowModal}
        />
      }

      {
        isPending &&
        <LoadingTask />
      }
    </>
  );
};
