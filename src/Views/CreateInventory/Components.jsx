import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ComponentsWindow from "../../Components/ComponentsWindow";
import dropdown_newSpace from '../../Assets/dropdown_newSpace.png';
import { BedDouble, Trash } from "lucide-react";
import InfoWindow from "../../Components/InfoWindow";
import { getRoomFornitures } from "../../api/queries";
import Loading from "../../Components/Loading";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LoadingTask } from "../../Components/LoadingTask";

export const Components = () => {
  const [ inventory, setInventory ] = useOutletContext();
  const { idSpace } = useParams();
  const navigate = useNavigate();

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
  useEffect(() => {
    if (inventory.spaces.length > 0){
      setSpace(inventory.spaces.find(space => space.idHabitacion == idSpace))
    } else if (!!inventory.property.idPropiedad){
      navigate('notfound')
    }
  }, [idSpace, inventory])

  const { data: components, isLoading } = useQuery({
    queryKey: ['getFornitures'],
    queryFn: () => getRoomFornitures(idSpace),
    enabled: !!inventory.property.idPropiedad,
    onError: (error) => {
      console.error("Ocurrió un error al obtener las habitaciones:", error);
    }
  })

  const { mutate: postForniture, isPending: isPendingPost } = useMutation({
    mutationKey: ['postForniture'],
    mutationFn: ({name, description, image}) => createRoom(inventory.property.idPropiedad, name, description, image),
    onSucces: (data) => handleSucces(data)
  });

  const { mutate: putForniture, isPending: isPendingPut } = useMutation({
    mutationKey: ['putForniture'],
    mutationFn: ({idSpace, name, description, image}) => updateRoom(idSpace, name, description, image),
    onSucces: (data) => handleSucces(data)
  });

  const { mutate: mutateDeleteForniture, isPending: isPendingDelete } = useMutation({
    mutationKey: ['deleteForniture'],
    mutationFn: (idSpace) => deleteRoom(idSpace),
    onSucces: (data) => handleSuccesDelete(data)
  });

  const isPending = isPendingDelete || isPendingPost || isPendingPut

  const handleAddComponent = () => {
    setSelectedComponent({
      nombre: '',
      imagen: '',
      descripcion: ''
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

  return (
    <>
      <div className="">
        <nav className="mb-4">
          <Link to="/h/inventory">Inventarios</Link> &gt; <Link to="/h/createInventory">Crear Inventario</Link> &gt; <Link to="/h/spaces">{spaceName}</Link> &gt; <span>Muebles</span>
        </nav>
        <div className="flex items-center justify-between mb-6">
          <div>
          <h2 className="text-2xl font-bold">Muebles <BedDouble className="inline-block" /></h2>
          <h2 className="font-bold">{spaceName} </h2>
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
          {components.map((component, index) => (
            <div key={index} className='text-xl border-b border-black mb-6 flex items-center justify-between'>
              <button 
                onClick={() => handleSearchFeatures(component)}
                className="flex items-center"
              >
                {component.name}
              </button>
              <button onClick={() => handleDeleteComponent(component.idMueble)}>
                <Trash />
              </button>
            </div>
          ))}

          {/* Agregar mueble */}
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

