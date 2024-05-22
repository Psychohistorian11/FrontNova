import React from 'react'
import Property from '../../Components/Property'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAgentProperties, deleteProperty } from '../../api/queries'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Loading from '../../Components/Loading'
import { RectangleGroupIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import Swal from "sweetalert2"
import { LoadingTask } from '../../Components/LoadingTask'


export const Inventory = () => {
  const authUser = useAuthUser();
  const queryClient = useQueryClient();

  const { data: properties, isLoading} = useQuery({
    queryKey: ['properties'],
    queryFn: () => getAgentProperties(authUser.id)
  });

  const { mutate: mutateDeleteProperty, isPending} = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries(['properties']);
                    
      Swal.fire({
        title: "¡Eliminado!",
        text: "El inventario ha sido eliminado.",
        icon: "success",
        confirmButtonColor: "#0E9594"
      });
    },
  });

  function handleDelete(idProperty) {
    mutateDeleteProperty(idProperty);
  }

  if (isLoading) {
    return <Loading />
  }

  const propertiesElements = properties?.map(property => (
    <Property
      key={property.idPropiedad}
      owner={property.owner}
      image={property.imagen}
      address={property.direccion}
      handleDelete={() => handleDelete(property.idPropiedad)}  // Asegúrate de pasar el id correcto
      linkToDetail={`/h/inventory/${property.idPropiedad}`}
    />
  ));

  if (isPending){
    <LoadingTask />
  }

  return (
    <>
      <div className=''>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>Inventarios</h1>
          <Link to="/h/createInventory" className='py-2 px-3 text-white bg-firstColor rounded flex items-center'>
            <PlusIcon className='size-6 mr-1'/>
            <span className="text-white">Crear Inventario</span>
          </Link>
        </div>
        <h1 className='text-3xl font-bold border-b border-black pb-4'></h1>
        {
          properties?.length === 0 ?
            <div className='absolute inset-x-0 mt-20 flex flex-col items-center justify-center'>
              <RectangleGroupIcon className='size-24' color='#0E9594'/>
              <p className='mt-2 italic text-firstColor'>No has añadido ningún inventario</p>
            </div>
            :
            <div className='grid grid-cols-4 gap-6 mt-10'>
              {propertiesElements}
            </div>
        }
      </div>

      {
        isPending &&
        <LoadingTask />
      }
    
    </> 
  );
}
