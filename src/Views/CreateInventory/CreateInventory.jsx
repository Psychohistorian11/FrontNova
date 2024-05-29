import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FolderPlus, Mail, Waypoints, BookImage } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { createProperty } from '../../api/queries';
import Loading from '../../Components/Loading';
import { getOwner } from '../../api/queries';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { ArrowsRightLeftIcon, HomeModernIcon } from '@heroicons/react/24/outline';

export const CreateInventory = () => {
  const authUser = useAuthUser();
  const [idOwner, setIdOwner] = useState('');
  const [apiIdOwner, setApiIdOwner] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState("");

  const [tipoVia, setTipoVia] = useState('');
  const [numeroVivienda, setNumeroVivienda] = useState('');
  const [complementoDireccion, setComplementoDireccion] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { mutate: getOwnerId, isPending: isPendingOwner } = useMutation({
    mutationKey: ['getOwner'],
    mutationFn: () => getOwner(idOwner),
    onSuccess: (data) => setApiIdOwner(data.idPropietario),
  });

  const { mutate: create, isPending } = useMutation({
    mutationKey: ['createProperty'],
    mutationFn: () => createProperty(apiIdOwner, authUser.id, address, file),
    onSuccess: (data) => handleSuccess(data),
  });

  useEffect(() => {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regex.test(idOwner)) {
      getOwnerId();
    }
  }, [idOwner]);

  useEffect(() => {
    const address = `${tipoVia}  ${numeroVivienda}  ${complementoDireccion}`;
    console.log(address)
    setAddress(address);
  }, [tipoVia, numeroVivienda, complementoDireccion]);

  function handleSuccess(data) {
    navigate(`/h/inventory/${data.idPropiedad}/spaces`);
  }

  const handleIdOwnerChange = (e) => {
    setIdOwner(e.target.value);
  };

  const handleTipoViaChange = (e) => {
    setTipoVia(e.target.value);
  };


  const handleNumeroViviendaChange = (e) => {
    setNumeroVivienda(e.target.value);
  };


  const handleComplementoDireccionChange = (e) => {
    setComplementoDireccion(e.target.value);
  };

  const handleAddImage = () => fileInputRef.current.click();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFile(file);
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

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="pl-10">
      <nav className="mb-4">
        <Link to="/h/inventory">Inmuebles</Link> &gt;
        <span>Crear Inmueble</span>
      </nav>
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl mb-6 font-bold">
          Generar Inventario <FolderPlus className="inline-block" />
        </h2>
        <h2 className="border-b border-black pb-5 mb-10">
          Registra a un nuevo propietario y comienza a gestionar sus propiedades de manera eficiente
        </h2>
  
        <div className="flex flex-col space-y-6">
          <div className="w-full max-w-lg">
            <label htmlFor="idOwner" className="block text-gray-700 font-bold mb-2">
              Correo electrónico del propietario <Mail className="inline-block" />
            </label>
            <input
              type="text"
              id="idOwner"
              className="px-4 py-2 border border-gray-300 rounded w-full"
              placeholder="Correo electrónico"
              value={idOwner}
              onChange={handleIdOwnerChange}
              required
            />
          </div>
  
          <div className="w-auto">
            <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">
              Dirección de la vivienda <HomeModernIcon className="size-8 mr-3 inline-block"/>
            </label>
            <div className="flex flex-wrap space-x-2 p-6">
              <div className="flex flex-col w-1/6">
                <span className="text-gray-700 font-bold">Tipo Vía</span>
                <select
                  id="tipoVia"
                  className="px-2 py-2 border border-gray-300 rounded"
                  value={tipoVia}
                  onChange={handleTipoViaChange}
                  required
                >
                  <option value="Calle">Calle</option>
                  <option value="Carrera">Carrera</option>
                  <option value="Avenida">Avenida</option>
                  <option value="Camino">Camino</option>
                  <option value="Pasaje">Pasaje</option>
                  <option value="Sendero">Sendero</option>
                </select>
              </div>
              <div className="flex flex-col w-1/12">
                <span className="text-gray-700 font-bold">#</span>
                <input
                  type="text"
                  id="numeroVivienda"
                  className="px-2 py-2 border border-gray-300 rounded"
                  value={numeroVivienda}
                  onChange={handleNumeroViviendaChange}
                  required
                />
              </div>
              <div className="flex flex-col w-1/6">
                <span className="text-gray-700 font-bold">Complemento</span>
                <input
                  type="text"
                  id="complementoDireccion"
                  className="px-2 py-2 border border-gray-300 rounded"
                  value={complementoDireccion}
                  onChange={handleComplementoDireccionChange}
                />
              </div>
            </div>
          </div>
  
          <div className="w-full max-w-lg">
            <label className="block text-gray-700 font-bold mb-2">
              Fotografía de la vivienda <BookImage className="inline-block" />
            </label>
            <div className="flex justify-start items-center mb-2">
              <button
                type="button"
                onClick={handleAddImage}
                className="flex items-center px-4 py-2 bg-white text-firstColor shadow transition-colors border border-firstColor border-dashed w-full"
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
                <img src={selectedImage} alt="Selected" className="w-96 h-80 object-cover rounded" />
              </div>
            )}
  
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
  
        <div className="flex justify-start mt-10">
          <button
            disabled={isPendingOwner}
            className="px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors"
            type="submit"
          >
            Continuar a los espacios
          </button>
        </div>
      </form>
  
      <div className="mt-6">
        <a href="#" className="text-firstColor hover:text-secondColor" onClick={(e) => { e.preventDefault(); handleRegisterOwner(); }}>
          ¿Debes registrar al propietario?
        </a>
      </div>
    </div>
  );
  
              };
              
