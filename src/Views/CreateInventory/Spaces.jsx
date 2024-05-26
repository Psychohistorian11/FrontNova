import React, { useState  } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import SpacesWindow from "../../Components/SpacesWindow";
import { BrickWall, Trash } from "lucide-react";
import InfoWindow from "../../Components/InfoWindow";
import { Sign } from "../../Components/Sign";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { createRoom, deleteRoom, updateRoom } from "../../api/queries";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { LoadingTask } from "../../Components/LoadingTask";


export const Spaces = () => {
  const [ inventory, setInventory ] = useOutletContext();
  const spaces = inventory.spaces;
  const { id } = useParams();

  // const [ spaces, setSpaces ] = useState(inventory.spaces)

  const [ selectedSpace, setSelectedSpace] = useState(null);
  const [ showModal, setShowModal ] = useState(false);

  const page = "Inventario";
  const firstNameInfo = "Correo del propietario";
  const SecondNameInfo = "Dirección de la vivienda";

  // const [spaces, setSpaces] = useState([
  //   { name: 'Baño', image: null, observation: false },
  //   { name: 'Cocina', image: null, observation: false },
  //   { name: 'Dormitorio', image: null, observation: false }
  // ]);

  const { mutate: postSpace, isPending: isPendingPost } = useMutation({
    mutationKey: ['postSpace'],
    mutationFn: ({name, description, image}) => createRoom(id, name, description, image),
    onSuccess: (data) => handleSuccessPost(data)
  });

  const { mutate: putSpace, isPending: isPendingPut } = useMutation({
    mutationKey: ['putSpace'],
    mutationFn: ({idSpace, name, description, image}) => updateRoom(idSpace, name, description, image),
    onSuccess: (data) => handleSuccessPut(data)
  });

  const { mutate: mutateDeleteSpace, isPending: isPendingDelete } = useMutation({
    mutationKey: ['deleteSpace'],
    mutationFn: (idSpace) => deleteRoom(idSpace),
    onSuccess: (data) => handleSuccessDelete(data)
  });

  const isPending = isPendingPost || isPendingPut || isPendingDelete

  function handleSuccessDelete(data){
    console.log(data)
    setInventory(prevInventory => ({
      ...prevInventory,
      spaces: prevInventory.spaces.filter(space => space.idHabitacion != data.idHabitacion)
    }))
  }

  function handleSuccessPost(data){
    console.log(data)
    setInventory(prevInventory => ({
      ...prevInventory,
      spaces: [...prevInventory.spaces, data]
    }))
  }

  function handleSuccessPut(data){
    setInventory(prevInventory => ({
      ...prevInventory,
      spaces: prevInventory.spaces.map(space => {
        if(space.idHabitacion === data.idHabitacion){
          return data
        } else{
          return space
        }})
    }))
  }

  const handleSearchFeatures = (space) => {
    setSelectedSpace(space);
    setShowModal(true);
  };
  const handleNewSpace = () => {
    setSelectedSpace({
      nombre: '',
      imagen: '',
      descripcion: ''
    });
    setShowModal(true);
  }

  return (
    <>
      <>
        <nav className="mb-1">
          <Link to="/h/inventory">Inventarios</Link> &gt; <Link to="/h/createInventory">Crear Inventario</Link> &gt; 
          <span className="">Espacios</span>
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
        <h2 className='border-b border-gray-400 pb-3 mb-10'> Gestiona los inventarios de cada espacio de la vivienda</h2>
        <div className='px-40 flex flex-col mb-20'>

          {/* Mostrar todos los espacios */}
          {spaces?.map((space, index) => (
                  <div key={index} className='flex items-center text-xl pl-4 border-b border-gray-400 p-2 my-4 justify-between'>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleSearchFeatures(space)}
                        className="flex items-center"
                      >
                      <PencilSquareIcon className="size-5 mr-4"/>
                      </button>
                        {space.nombre}
                    </div>
                    <div className="flex items-center space-x-8">
                      {/* Ver muebles */}
                      <Link to={`${space.idHabitacion}`} className="py-1 px-3 rounded-full text-sm border text-firstColor border-firstColor hover:bg-firstColor hover:text-white">
                        Ver muebles
                      </Link>
                      {/* Eliminar */}
                      <button onClick={() => mutateDeleteSpace(space.idHabitacion)}>
                        <Trash />
                      </button>
                    </div>
                  </div>
                ))}

          {/* Agregar espacio */}
          <div onClick={handleNewSpace} className="flex items-center ml-2 mt-3 cursor-pointer">
            <PlusIcon className="size-8 mr-3 text-firstColor"/>
            <span className="mr-3 text-gray-500">Agregar espacio</span>
          </div>
          
          <div className="absolute bottom-10 right-1/4 mt-auto flex justify-end content-end">
            <Sign/>
          </div>
        </div>

        
      </>

      { showModal && 
        <SpacesWindow
          selectedSpace={selectedSpace}
          postSpace={postSpace}
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
