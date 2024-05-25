import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ComponentsWindow from "../../Components/ComponentsWindow";
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';
import { BedDouble, Trash } from "lucide-react";
import InfoWindow from "../../Components/InfoWindow";
import { createForniture, getRoomFornitures, updateForniture } from "../../api/queries";
import Loading from "../../Components/Loading";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LoadingTask } from "../../Components/LoadingTask";
import { PlusIcon } from "@heroicons/react/24/outline";

export const Components = () => {
  const [ inventory, setInventory ] = useOutletContext();
  const { idSpace } = useParams();
  const navigate = useNavigate();

  // const components = 

  const page = "Espacio";
  const firstNameInfo = "Observaciones del mueble";

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [space, setSpace] = useState({})

  // const [components, setComponents] = useState([
  //   { name: 'Cama', image: null, observation: false, showQuality: false },
  //   { name: 'Estantería', image: null, observation: false, showQuality: false },
  //   { name: 'Libros', image: null, observation: false, showQuality: false }
  // ]);

  // Traerse la info del espacio, si no existe es 404
  // useEffect(() => {
  //   if (inventory.spaces.length > 0){
  //     setSpace(inventory.spaces.find(space => space.idHabitacion == idSpace))
  //   } else if (!!inventory.property.idPropiedad){
  //     navigate('notfound')
  //   }
  // }, [idSpace, inventory])

  const { data: components, isLoading } = useQuery({
    queryKey: ['getFornitures'],
    queryFn: () => getRoomFornitures(idSpace),
    onSucces: (data) => console.log(data),
    onError: (error) => {
      console.error("Ocurrió un error al obtener las habitaciones:", error);
      navigate('notfound')
    }
  })

  const { mutate: postForniture, isPending: isPendingPost } = useMutation({
    mutationKey: ['postForniture'],
    mutationFn: ({name, description, state, image}) => createForniture(idSpace, name, description, image, state),
    onSucces: (data) => handleSucces(data)
  });

  const { mutate: putForniture, isPending: isPendingPut } = useMutation({
    mutationKey: ['putForniture'],
    mutationFn: ({idForniture, name, description, state, image}) => updateForniture(idForniture, name, description, image, state),
    onSucces: (data) => handleSucces(data)
  });

  const { mutate: mutateDeleteForniture, isPending: isPendingDelete } = useMutation({
    mutationKey: ['deleteForniture'],
    mutationFn: (idSpace) => deleteRoom(idSpace),
    onSucces: (data) => handleSuccesDelete(data)
  });

  const isPending = isPendingDelete || isPendingPost || isPendingPut

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

  const handleAddComponent = () => {
    setSelectedComponent({
      nombre: '',
      imagen: '',
      descripcion: '',
      estado: ''
    });
    setShowModal(true);
  };

  const handleSearchFeatures = (component) => {
    setSelectedComponent(component);
    setShowModal(true);
  };

  const handleDeleteComponent = (index) => {
    // setComponents(updatedComponents);
  };

  if (isLoading){
    return <Loading />
  }

  // if (fetchStatus === "idle"){
  //   return <p>Not fetching...</p>
  // }

  return (
    <>
      <div className="">
        <nav className="mb-4">
          <Link to="/h/inventory">Inventarios</Link> &gt; <Link to="/h/createInventory">Crear Inventario</Link> &gt; <Link to="/h/spaces">{space.nombre}</Link> &gt; <span>Muebles</span>
        </nav>
        <div className="flex items-center justify-between mb-6">
          <div>
          <h2 className="text-2xl font-bold">Muebles <BedDouble className="inline-block" /></h2>
          <h2 className="font-bold">{space.nombre} </h2>
          </div>

          <div>
            <InfoWindow
              page={space.nombre}
              firstNameInfo={firstNameInfo}
              firstInfo={space.descripcion}
              image={space.imagen}
            />
          </div>
        </div>
        <h2 className='border-b border-black mb-10'> Añade componentes a cada espacio y gestiona efectivamente cada integración</h2>

        {/* Mostrar muebles */}
        <div className='px-40'>
          {components?.map((component, index) => (
            <div key={index} className='text-xl border-b border-black mb-6 flex items-center justify-between'>
              <button 
                onClick={() => handleSearchFeatures(component)}
                className="flex items-center"
              >
                {component.nombre}
              </button>
              <button onClick={() => handleDeleteComponent(component.idMueble)}>
                <Trash />
              </button>
            </div>
          ))}

          {/* Agregar mueble */}
          <div onClick={handleAddComponent} className="flex items-center ml-2 mt-3 cursor-pointer">
            <PlusIcon className="size-8 mr-3 text-firstColor"/>
            <span className="mr-3 text-gray-500">Agregar espacio</span>
          </div>
        </div>
      </div>



      {
        showModal &&
        <ComponentsWindow
          selectedComponent={selectedComponent}
          postForniture={postForniture}
          putForniture={putForniture}
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

