import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ComponentsWindow from "../../Components/ComponentsWindow";
import { BedDouble, Trash } from "lucide-react";
import InfoWindow from "../../Components/InfoWindow";
import { createForniture, getRoomFornitures, updateForniture } from "../../api/queries";
import Loading from "../../Components/Loading";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LoadingTask } from "../../Components/LoadingTask";
import { PlusIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Sign } from "../../Components/Sign";

export const Components = () => {
  const [ inventory, setInventory ] = useOutletContext();
  const { idSpace } = useParams();
  const navigate = useNavigate();

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const space = inventory.spaces.find(space => space.idHabitacion == idSpace)
  
  useEffect(() => {
    // Redireccionar si el espacio no se encuentra
    if (space === undefined && inventory.property.idPropiedad) {
      navigate('/notfound');
    }
  }, [inventory]);

  
  const components = space?.fornitures ? space.fornitures : []
  
  const firstNameInfo = "Observaciones del mueble";
  
  
  // const [components, setComponents] = useState([
    //   { name: 'Cama', image: null, observation: false, showQuality: false },
    //   { name: 'Estantería', image: null, observation: false, showQuality: false },
    //   { name: 'Libros', image: null, observation: false, showQuality: false }
    // ]);

  const { data: componentsQuery, isLoading } = useQuery({
    queryKey: ['getFornitures'],
    queryFn: () => getRoomFornitures(idSpace),
    enabled: !!space
  })
  
  useEffect(
    () => setInventory(prevInventory => ({
      ...prevInventory,
      spaces: prevInventory.spaces.map(space => {
        if (space.idHabitacion == idSpace){
                return {
                  ...space,
                  fornitures: componentsQuery
                }
              }
              return space
            })

    })), [componentsQuery])
    
  const { mutate: postForniture, isPending: isPendingPost } = useMutation({
      mutationKey: ['postForniture'],
      mutationFn: ({name, description, state, image}) => createForniture(idSpace, name, description, image, state),
      onSuccess: (data) => handleSuccessPost(data)
    });

  const { mutate: putForniture, isPending: isPendingPut } = useMutation({
    mutationKey: ['putForniture'],
    mutationFn: ({idForniture, name, description, state, image}) => updateForniture(idForniture, name, description, image, state),
    onSuccess: (data) => handleSuccessPut(data)
  });
  
  const { mutate: mutateDeleteForniture, isPending: isPendingDelete } = useMutation({
    mutationKey: ['deleteForniture'],
    mutationFn: (idSpace) => deleteRoom(idSpace),
    onSuccess: (data) => handleSuccessDelete(data)
  });
  
  const isPending = isPendingDelete || isPendingPost || isPendingPut

  function handleSuccessDelete(data){
    setInventory(prevInventory => ({
      ...prevInventory,
      spaces: prevInventory.spaces.map(space => {
        if (space.idHabitacion == idSpace){
                return {
                  ...space,
                  fornitures: space.fornitures.filter(forniture => forniture.idMueble != data.idMueble)
                }
              }
              return space
            })
    }))
  }

  function handleSuccessPost(data){
    setInventory(prevInventory => ({
      ...prevInventory,
      spaces: prevInventory.spaces.map(space => {
        if (space.idHabitacion == idSpace){
                return {
                  ...space,
                  fornitures: [...space.fornitures, data]
                }
              }
              return space
            })
    }))
  }

  function handleSuccessPut(data){
    setInventory(prevInventory => ({
      ...prevInventory,
      spaces: prevInventory.spaces.map(space => {
        if (space.idHabitacion == idSpace){
                return {
                  ...space,
                  fornitures: space.fornitures.map(forniture => {
                    if (forniture.idMueble != data.idMueble){
                      return data
                    } else {
                      return forniture
                    }
                  })
                }
              }
              return space
            })
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
  
  const handleDeleteComponent = (idForniture) => {
    // ! Alarma de está seguro?
    mutateDeleteForniture(idForniture)
  };

  if (isLoading || space === undefined){
    return <Loading />
  }
    
    return (
      <>
      <div className="">
        <nav className="mb-1">
          <Link to="/h/inventory">Inmuebles</Link> &gt; 
          <Link to={`/h/inventory/${inventory.property.idPropiedad}`} >Gestionar inmueble</Link> &gt; 
          <Link to={`/h/inventory/${inventory.property.idPropiedad}/spaces`}>{space.nombre}</Link> &gt; 
          <span>Muebles</span>

        </nav>
        <div className="flex items-center justify-between">

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
        <h2 className='border-b border-gray-400 pb-3 mb-10'> Añade componentes a cada espacio y gestiona efectivamente cada integración</h2>

        {/* Mostrar muebles */}
        <div className='px-40'>
          {components?.map((component, index) => (
            <div key={index} className='text-xl border-b border-gray-400 my-4 p-2 flex items-center justify-between'>
              <div className="flex items-cente">
                <button
                  onClick={() => handleSearchFeatures(component)}
                  className="flex items-center"
                >
                <PencilSquareIcon className="size-5 mr-4"/>
                </button>
                {component.nombre}

              </div>
              <button onClick={() => handleDeleteComponent(component.idMueble)}>
                <Trash />
              </button>
            </div>
          ))}

          {/* Agregar mueble */}
          <div onClick={handleAddComponent} className="flex items-center ml-2 mt-3 cursor-pointer">
            <PlusIcon className="size-8 mr-3 text-firstColor"/>
            <span className="mr-3 text-gray-500">Agregar Mueble</span>
          </div>
        </div>

        <div className="absolute bottom-10 right-1/4 mt-auto flex justify-end content-end">
            <Sign/>
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

