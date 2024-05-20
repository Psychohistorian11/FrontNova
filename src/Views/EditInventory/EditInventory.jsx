import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, UserPlusIcon } from 'lucide-react';
import { FolderPlus, Mail, Waypoints, BookImage } from 'lucide-react';


export const EditInventory = () => {
  const [idOwner, setIdOwner] = useState('');
  const [address, setAddress] = useState('');
  const [selectedImage, setselectImage] = useState('')
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { email: idOwner, address: address, image: selectedImage };
    navigate('/h/editSpaces', { state: dataToSend });
  };

  return (
    <div className="">
      <nav className="mb-4">
        <Link to="/h/inventory">Inventarios</Link> &gt; <span>Crear Inventario</span>
      </nav>
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl mb-6 font-bold">Inventario <FolderPlus className="inline-block" /></h2>
        <h2 className='border-b border-black pb-5 mb-10'></h2>

        <div className="flex-1 mb-6 px-40">
          <label htmlFor="idOwner" className="block text-gray-700 font-bold mb-2">
            Correo electronico del propietario <Mail className="inline-block" />
          </label>
          <label>
            {idOwner}
          </label>

          <div className="mt-8">
            <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">
              Dirección del propietario <Waypoints className="inline-block" />
            </label>
            <label>
              {address}
            </label>
          </div>

          <div className="mt-8">
            <label className="block text-gray-700 font-bold mb-2">
              Fotografía de la vivienda <BookImage className="inline-block" />
            </label>
            <label>
              {selectedImage}
            </label>
          </div>

          <div>

          <label className="block text-gray-700 font-bold mb-2 mt-8">
              Configuración de Agentes <User className="inline-block" />
            </label>
            <div className="grow flex  space-x-8 content-center h-full bg-white">
            <Link to="/h/access" className='flex justify-center items-center size-10 rounded-full border border-gray-400'>
                  <UserPlusIcon className='size-6' />
                </Link>

            </div>
          </div>
        </div>

        <div className="flex-1">

          <div className="px-40">
            <button className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors" type="submit">
              Continuar a los espacios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
