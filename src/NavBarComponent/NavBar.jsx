import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <div className="flex items-center justify-start p-2 bg-skinColor text-black">
      {/* Logo */}
      <div className="flex items-center">
        <img src="" alt="Logo" className="h-10 mr-6" />
        <span className="font-montserrat text-xl font-bold">Nova</span>
      </div>
      
      <div className="flex mr-10 ">
        <button onClick={() => handleNavigate('/Inventory')} className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors font-montserrat">Inventario</button>
        <button onClick={() => handleNavigate('/Owners')} className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors font-montserrat">Propietario</button>
        <button onClick={() => handleNavigate('/Update')} className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors font-montserrat">Actualización</button>
      </div>

      <div className="flex items-center  justify-end text-black p-2 font-montserrat ml-auto mr-4">
        <span className="mr-2 font-bold">User</span>
        <span className="text-2xl">👤</span>
      </div>
    </div>
  );
};
