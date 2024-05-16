import React from 'react';
import { useNavigate, Outlet, NavLink, Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
import { UserCircleIcon, EllipsisVerticalIcon, ChevronDoubleLeftIcon } from '@heroicons/react/16/solid';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export const Layout = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();

  function logout() {
    signOut();
    navigate("/");
  }

  return (
    <>
        <div className="flex items-center justify-start p-1 h-16 bg-white text-black h-auto border-b border-b-gray-300 shadow">
            <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 ms-6" />
                <span className="ms-3 font-montserrat text-xl font-bold">Nova</span>
            </Link>
            
            <div className="grow flex justify-center space-x-8 content-center h-full bg-white">
                <NavLink to="inventory" className={({isActive}) => "font-poppins max-h-max content-center my-2 px-4 rounded-2xl " + (isActive? "font-bold cursor-default" : "hover:bg-gray-200")}>Crea Inventario</NavLink>
                <NavLink to="owners" className={({isActive}) => "font-poppins max-h-max content-center my-2 px-4 rounded-2xl " + (isActive? "font-bold cursor-default" : "hover:bg-gray-200")}>Propietarios</NavLink>
                <NavLink to="update" className={({isActive}) => "font-poppins max-h-max content-center my-2 px-4 rounded-2xl " + (isActive? "font-bold cursor-default" : "hover:bg-gray-200")}>Inventarios</NavLink>
                <NavLink to="update" className={({isActive}) => "font-poppins max-h-max content-center my-2 px-4 rounded-2xl " + (isActive? "font-bold cursor-default" : "hover:bg-gray-200")}>Accesos</NavLink>
            </div>

            <div className="flex items-center relative justify-end text-black p-2 font-montserrat ml-auto mr-4">
              <UserCircleIcon className='size-6 mr-2' />
              <span className="mr-2 font-bold">User</span>
              <EllipsisVerticalIcon className='size-4 ms-4' />
              <div className="absolute right-0 w-48 bg-white border rounded-md shadow-lg opacity-0 hover:opacity-100 transition duration-300">
                <div className='cursor-pointer flex block px-4 py-2 text-gray-800 hover:bg-gray-200' onClick={logout}>
                  <ChevronDoubleLeftIcon className='size-6 mr-4'/>
                  <span> Cerrar sesión</span>
                  
                </ div>
              </div>
            </div>
        </div>  

        <Outlet />
    </>
  );
};
