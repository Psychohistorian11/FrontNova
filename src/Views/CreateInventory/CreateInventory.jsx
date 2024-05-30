import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FolderPlus, Mail, Waypoints, BookImage } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { createProperty } from '../../api/queries';
import Loading from '../../Components/Loading';
import { getOwner } from '../../api/queries';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { ArrowsRightLeftIcon, HomeModernIcon } from '@heroicons/react/24/outline';
import { IdentificationIcon } from '@heroicons/react/24/outline';

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
  const id = authUser.id
  const { mutate: create, isPending } = useMutation({
    mutationKey: ['createProperty'],
    mutationFn: () => createProperty(apiIdOwner, id, address, file),
    onSuccess: (data) => handleSuccess(data),
  });

  useEffect(() => {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regex.test(idOwner)) {
      getOwnerId();
    }
  }, [idOwner]);

  useEffect(() => {
    const address = `${tipoVia} ${numeroVivienda} ${complementoDireccion}`;
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
    if (!apiIdOwner) {
      setError('Por favor, asegúrate de que el propietario esté registrado.');
      return;
    }
    if (!authUser || !authUser.id) {
      setError('No se pudo obtener el ID del usuario autenticado.');
      return;
    }
    create();
  };

  const handleRegisterOwner = () => navigate('/h/CreateOwner');

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="pl-10 p-10">
      <nav className="mb-4">
        <Link to="/h/inventory">Inmuebles</Link> &gt;
        <span>Crear Inmueble</span>
      </nav>
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl mb-6 font-bold">
          <FolderPlus className="size-8 inline-block mr-4" />
              Genera un nuevo Inmueble
        </h2>
        <h2 className="border-b border-black pb-5 mb-10">
          Registra a un nuevo propietario y comienza a gestionar sus propiedades de manera eficiente
        </h2>
  
        <div className="flex flex-col space-y-6 p-10">
          <div className="w-full max-w-lg">
            <div className="flex mb-6 w-full">
              <label className="relative w-full">
                <input
                  required
                  type="text"
                  className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-full"
                  id="idOwner"
                  name="idOwner"
                  value={idOwner}
                  onChange={handleIdOwnerChange}
                  placeholder=" "
                />
                <span className="absolute left-0 top-2 px-1 text-lg tracking-wide peer-focus:text-firstColor pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-valid:text-sm bg-white ml-2 text-gray-500">
                  <Mail className="inline-block size-7" /> Correo electrónico del propietario
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <a href="#" className="text-firstColor hover:text-secondColor" onClick={(e) => { e.preventDefault(); handleRegisterOwner(); }}>
              ¿Debes registrar al propietario?
            </a>
          </div>

          <div className="w-auto">
            <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2 text-xl">
              <HomeModernIcon className="size-8 mr-3 inline-block"/> Dirección de la vivienda 
            </label>
            <div className="flex flex-wrap space-x-2 p-6">
              <div className="flex flex-col w-1/6">
                <div className="flex mb-6 w-full">
                  <label className="relative w-full">
                    <select
                      id="tipoVia"
                      className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-full"
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
                    <span className="absolute left-0 top-2 px-1 text-lg tracking-wide peer-focus:text-firstColor pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-valid:text-sm bg-white ml-2 text-gray-500">
                      Tipo Vía
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-1/12">
                <div className="flex mb-6 w-full">
                  <label className="relative w-full">
                    <input
                      type="text"
                      id="numeroVivienda"
                      className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-full"
                      value={numeroVivienda}
                      onChange={handleNumeroViviendaChange}
                      required
                      placeholder=" "
                    />
                    <span className="absolute left-0 top-2 px-1 text-lg tracking-wide peer-focus:text-firstColor pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-valid:text-sm bg-white ml-2 text-gray-500">
                      #
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-1/6">
                <div className="flex mb-6 w-full">
                  <label className="relative w-full">
                    <input
                      type="text"
                      id="complementoDireccion"
                      className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-44"
                      value={complementoDireccion}
                      onChange={handleComplementoDireccionChange}
                      placeholder=" "
                    />
                    <span className="absolute left-0 top-2 px-1 text-lg tracking-wide
                     peer-focus:text-firstColor pointer-events-none duration-200
                      peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 
                      peer-valid:text-sm bg-white ml-2 text-gray-500">
                      Complemento
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg">
            <label className="block text-gray-700 font-bold mb-2 text-xl">
              <BookImage className="inline-block" /> Fotografía de la vivienda 
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
    </div>
  );
};

