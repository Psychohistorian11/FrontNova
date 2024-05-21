import React from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
import { EllipsisVerticalIcon, ChevronDoubleLeftIcon } from '@heroicons/react/16/solid';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { ArrowRightEndOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { FolderKanban, Settings, Users } from 'lucide-react';


export const Navbar = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const authUser = useAuthUser();

  function logout() {
    signOut();
    navigate("/");
  }

  return (
    <>
        <div className="flex items-center justify-start p-1 h-16 bg-white text-black border-b border-b-gray-300 shadow">
            <Link to="/h" className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 ms-6" />
                <span className="ms-3 font-montserrat text-xl font-bold">Nova</span>
            </Link>

            <div className="grow flex justify-center space-x-8 content-center h-full bg-white">
          
          <NavLink 
            to="inventory" 
            className={({isActive}) => 
              "flex items-center font-poppins max-h-max content-center my-2 px-4 rounded-2xl " + 
              (isActive ? "font-bold cursor-default" : "hover:bg-gray-200")
            }
          >
            Inventarios <FolderKanban className="ml-2" />
          </NavLink>
          <NavLink 
            to="owners" 
            className={({isActive}) => 
              "flex items-center font-poppins max-h-max content-center my-2 px-4 rounded-2xl " + 
              (isActive ? "font-bold cursor-default" : "hover:bg-gray-200")
            }
          >
            Propietarios <Users className='ml-2'/>
          </NavLink>
          <NavLink 
            to="maintenances" 
            className={({isActive}) => 
              " flex items-center font-poppins max-h-max content-center my-2 px-4 rounded-2xl " + 
              (isActive ? "font-bold cursor-default" : "hover:bg-gray-200")
            }
          >
            Mantenimiento <Settings className='ml-2'/>
          </NavLink>
        </div>

            <div className="flex items-center relative justify-end text-black p-2 font-montserrat ml-auto mr-4">
              {/* Reemplazar con authUser.image */}
              <img src="https://variety.com/wp-content/uploads/2023/09/GettyImages-1402938975.jpg?w=1024" className='size-8 mr-3 rounded-full object-cover' />
              <span className="mr-2 font-bold">{authUser.name}</span>
              <ArrowRightEndOnRectangleIcon className='size-6 ms-4 cursor-pointer' onClick={logout}/>

              {/* <div className="absolute right-0 w-48 bg-white border rounded-md shadow-lg opacity-0 hover:opacity-100 transition duration-300">
                <div className='cursor-pointer flex px-4 py-2 text-gray-800 hover:bg-gray-200' onClick={logout}>
                  <ChevronDoubleLeftIcon className='size-6 mr-4'/>
                  <span> Cerrar sesión</span>
                  
                </ div>
              </div> */}
            </div>
        </div>
    </>
  );
};
