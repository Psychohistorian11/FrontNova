import { NavLink, Outlet } from "react-router-dom";


export default function LayoutAccess() {
    const basicNavStyle = "text-gray-600 hover:underline hover:underline-offset-2 "
    const selectedNav = "underline underline-offset-2 font-bold cursor-default"

    return (
        <div className="p-12">
            <nav className="flex space-x-5 mb-8 justify-center border-b border-b-gray-300 pb-3">
                <NavLink to="."  end className={({isActive}) => (basicNavStyle + (isActive && selectedNav))} >Accesos actuales</NavLink>
                <NavLink to="add" className={({isActive}) => (basicNavStyle + (isActive && selectedNav))} >Agregar Acceso</NavLink>
            </nav>
            <div className="flex flex-col items-center">
                <Outlet />
            </div>
        </div>
    )
}  