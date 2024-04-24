import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-white text-black shadow-md">
      {/* Logo y nombre de la aplicación */}
      <div className="flex items-center">
        <img src="/path-to-your-logo.png" alt="Logo" className="h-8 mr-2" />
        <span className="font-semibold text-xl">Nova</span>
      </div>
      
      {/* Enlaces de navegación */}
      <div className="flex">
        <button onClick={() => handleNavigate('/Inventory')} className="mx-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition-colors">Inventario</button>
        <button onClick={() => handleNavigate('/Owners')} className="mx-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition-colors">Propietario</button>
        <button onClick={() => handleNavigate('/Update')} className="mx-2 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition-colors">Actualización</button>
      </div>
      
      {/* Usuario y loguito */}
      <div className="flex items-center bg-teal-500 text-white p-2 rounded-full">
        <span className="mr-2">UserName</span>
        <span className="text-2xl">👤</span>
      </div>
    </nav>
  );
};
