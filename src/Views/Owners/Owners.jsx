import React from 'react'
import { useLoaderData, Link } from 'react-router-dom/dist'
import { PlusIcon, ArrowDownRightIcon } from '@heroicons/react/16/solid'
import { getOwners } from '../../api'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useQuery } from '@tanstack/react-query'


export function loader() {
  return null
  //   return [
  //     {
  //       nombre: "Julio",
  //       correo: "julio@gmail.com",
  //       edad: 40,
  //       genero: "masculino"
  //     },
  //     {
  //       nombre: "María",
  //       correo: "maria@gmail.com",
  //       edad: 40,
  //       genero: "femenino"
  //     }

  // ]

}

export const Owners = () => {
  // const { id } = useAuthUser();

  const { data: owners, isLoading } = useQuery({
    queryKey: ['owners'],
    queryFn: () => getOwners(1)
  })

  if (isLoading){
    return <p>Loading...</p>
  }

  const ownersElements = owners.map(owner => (
    <tr>
      <td className='px-6 py-4 whitespace-nowrap'>{owner.nombre}</td>
      <td className='px-6 py-4 whitespace-nowrap'>{owner.correo}</td>
      <td className='px-6 py-4 whitespace-nowrap '>
        <Link className='flex'>
          <ArrowDownRightIcon className='size-6 mr-1'/> 
          <span >Ver propiedades</span>
        </Link>
      </td>
    </tr>
  ))

  return (
    <div>
      <div className='mx-60 mt-10 px-10 py-7 bg-white rounded-xl border border-gray-300 shadow-lg'>
        <div className='flex mb-8 justify-between'>
          <h2 className='text-3xl font-bold '>Propietarios</h2>
          <Link className='py-2 px-3 text-white bg-firstColor rounded flex items-center'>
            <PlusIcon className='size-6 mr-1'/>
            <span className="text-white">Nuevo propietario</span></Link>
        </div>
        <table class="table min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Nombre</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Correo</th>
              <th className='px-6 py-3 tracking-wider w-1/5'></th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {ownersElements}
          </tbody>
        </table>
      </div>
    </div>

  )
}
