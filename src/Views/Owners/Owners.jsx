import React from 'react'
import { useLoaderData, Link } from 'react-router-dom/dist'
import { PlusIcon, ArrowDownRightIcon } from '@heroicons/react/16/solid'

export function loader() {
  return [
    {
      nombre: "Julio",
      correo: "julio@gmail.com",
      edad: 40,
      genero: "masculino"
    },
    {
      nombre: "María",
      correo: "maria@gmail.com",
      edad: 40,
      genero: "femenino"
    }

]
}

export const Owners = () => {
  const owners = useLoaderData()

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
    <div className='px-72 pt-16'>
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
  )
}
