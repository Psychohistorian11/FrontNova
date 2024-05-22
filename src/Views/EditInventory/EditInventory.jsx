import React, { useState } from 'react';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import { User, UserPlusIcon } from 'lucide-react';
import { FolderPlus, Mail, Waypoints, BookImage } from 'lucide-react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useQuery } from '@tanstack/react-query';
import { getProperty, getPropertyOwner, getPropertyRooms } from '../../api/queries';
import Loading from '../../Components/Loading';
import { useEffect } from 'react';
import { useQueries } from '@tanstack/react-query';
import { imageUrlApi } from '../../api/axiosConfig';


export const EditInventory = () => {
  const [inventory, setInventory] = useOutletContext();
  const [idOwner, setIdOwner] = useState('');
  const [address, setAddress] = useState('');
  const [selectedImage, setselectImage] = useState('')
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { email: idOwner, address: address, image: selectedImage };
    navigate('spaces', { state: dataToSend });
  };

  return (
    <div className="">
      <nav className="mb-4">
        <Link to="/h/inventory">Inventarios</Link> &gt; <span>Crear Inventario</span>
      </nav>
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold">Inventario <FolderPlus className="inline-block" /></h2>
        <h2 className='border-b border-black pb-4 mb-10'></h2>

        <div className="flex-1 mb-6 px-40 ">
          <div className='flex mt-8 mb-6 items-center'>
            <div className="flex space-x-8 content-center h-full bg-white">
                <Link to="/h/access" className='flex justify-center items-center size-10 rounded-full border border-gray-400'>
                  <UserPlusIcon className='size-6' />
                </Link>

            </div>

            <label className="ml-3 text-gray-700 font-light">
              Gestiona las personas que tienen acceso a este inventario
            </label>
            
          </div>
          <div className='bg-gray-100 p-4 flex flex-col items-center'>
            <h4 className="block text-gray-700 font-bold w-full mb-4">Información del propietario</h4>
            <div className="flex justify-between w-3/5">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  Nombre <User className="inline-block" />
                </label>
                <label>
                  {inventory.owner.nombre}
                </label>
              </div>
              <div>
                <label htmlFor="idOwner" className="block text-gray-700 font-semibold mb-2">
                  Correo electrónico<Mail className="inline-block" />
                </label>
                <label>
                  {inventory.owner.correo}
                </label>
              </div>
            </div>
          </div>

          <div className="ml-14">
            <div className="mt-8">
              <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">
                Dirección del propietario <Waypoints className="inline-block" />
              </label>
              <label>
                {inventory.property.direccion}
              </label>
            </div>
            <div className="mt-8">
              <label className="block text-gray-700 font-bold mb-2">
                Fotografía de la vivienda <BookImage className="inline-block" />
              </label>
              <img className=" size-48" src={`${imageUrlApi}/${inventory.property.imagen}`} />
            </div>
          </div>

          
        </div>

        <div className="flex-1 px-40 mt-8 flex justify-end">
          <button className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors" type="submit">
            Continuar a los espacios
          </button>
        </div>
      </form>
    </div>
  );
};
