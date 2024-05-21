import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, } from 'react-router-dom';
import ShowMap from '../../Components/ShowMap';
import { FolderPlus, Mail, Waypoints, BookImage } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { createProperty } from '../../api/queries';
import Loading from '../../Components/Loading';
import { getOwner } from '../../api/queries';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export const CreateInventory = () => {
  const authUser = useAuthUser();

  const [idOwner, setIdOwner] = useState('');
  const [apiIdOwner, setApiIdOwner ] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null)

  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { mutate: getOwnerId, isPending: isPendingOwner } = useMutation({
    mutationKey: ['getOwner'],
    mutationFn: () => getOwner(idOwner),
    onSuccess: (data) => setApiIdOwner(data.idPropietario)
  });

  const { mutate: create, isPending } = useMutation({
    mutationKey: ['createProperty'],
    mutationFn: () => createProperty(apiIdOwner, authUser.id, address, file),
    onSuccess: (data) => handleSuccess(data)
  });

  useEffect(() => {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regex.test(idOwner)){
      getOwnerId();
    }
  }, [idOwner])

  function handleSuccess(data){
    navigate(`/h/inventory/${data.idPropiedad}/spaces`)
  }

  const handleIdOwnerChange = (e) => {
    setIdOwner(e.target.value);
    // if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(idOwner)){
    //   getOwnerId();
    // }
  }
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setShowMap(true);
  };

  const handleAddImage = () => fileInputRef.current.click();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFile(file)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setError('Por favor, selecciona una imagen.');
      return;
    }
    create();
  };

  const handleRegisterOwner = () => navigate('/Owners');

  const confirmAddress = () => {
    setShowMap(false);
  };

  if (isPending){
    return <Loading />
  }

  return (
    <div className="">
      <nav className="mb-4">
        <Link to="/h/inventory">Inventarios</Link> &gt; <span>Crear Inventario</span>
      </nav>
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl mb-6 font-bold">Generar Inventario <FolderPlus className="inline-block" /></h2>
        <h2 className='border-b border-black pb-5 mb-10'>Registra a un nuevo propietario y comienza a gestionar sus propiedades de manera eficiente</h2>

        <div className="flex-1 mb-6 px-40">
          <label htmlFor="idOwner" className="block text-gray-700 font-bold mb-2">
            Correo electrónico del propietario <Mail className="inline-block" />
          </label>
          <input
            type="text"
            id="idOwner"
            className="px-16 py-2 border border-gray-300 rounded"
            value={idOwner}
            onChange={handleIdOwnerChange}
            required
          />

          <div className="mt-8">
            <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">
              Dirección del propietario <Waypoints className="inline-block" />
            </label>
            <input
              type="text"
              id="direccion"
              className="px-16 py-2 border border-gray-300 rounded"
              value={address}
              onChange={handleAddressChange}
              required
            />

            {showMap && <ShowMap address={address} onConfirm={confirmAddress} />}
          </div>

          <div className="mt-8">
            <label className="block text-gray-700 font-bold mb-2">
              Fotografía de la vivienda <BookImage className="inline-block" />
            </label>
            <div className="flex justify-start items-center mb-2">
              <button
                type="button"
                onClick={handleAddImage}
                className="flex items-center px-4 py-2 bg-white text-firstColor shadow transition-colors border border-firstColor border-dashed w-80 h-10"
              >
                <span className="text-firstColor mr-2">+</span>
                <span className="text-firstColor">Añadir</span>
              </button>
              <input
                type="file"
                id="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>

            {selectedImage && (
              <div className="mt-4">
                <img src={selectedImage} alt="Selected" className="w-40 h-40 object-cover rounded" />
              </div>
            )}

            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>

        <div className="flex-1">
          <form onChange={handleRegisterOwner}>
            <div className="mb-6 px-40">
              <legend className="text-gray-700 mb-6">
                <a href="#" className="text-firstColor hover:text-secondColor" onClick={(e) => { e.preventDefault(); handleRegisterOwner(); }}>
                  ¿Debes registrar al propietario?
                </a>
              </legend>
            </div>
          </form>

          <div className="px-40">
            <button disabled={isPendingOwner} className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors" type="submit">
              Continuar a los espacios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
