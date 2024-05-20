import { Link, Outlet } from 'react-router-dom';
import logo from '../Assets/logo.png'

export const NavbarHome = () => {

  return (
    <>
        <div className="flex items-center justify-start p-1 h-16 bg-white text-black border-b border-b-gray-300 shadow">
            <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 ms-6" />
                <span className="ms-3 font-montserrat text-xl font-bold">Nova</span>
            </Link>

            <div className="flex items-center relative justify-end text-black font-montserrat ml-auto mr-4">
            <Link to="/login" className="hover:bg-firstColor text-firstColor rounded hover:text-white px-8 py-2 border border-firstColor">
                Iniciar sesión
            </Link>
            </div>
        </div>
        <Outlet />
    </>
  );
};
