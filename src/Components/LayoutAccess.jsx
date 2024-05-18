import { NavLink, Outlet } from "react-router-dom";


export default function LayoutAccess() {
    const basicNavStyle = "text-gray-600 hover:underline hover:underline-offset-2 "
    const selectedNav = "underline underline-offset-2 font-bold cursor-default"

    return (
        <div className="p-12">
            <nav className="space-x-5 mb-8">
                <NavLink to="."  end className={({isActive}) => (basicNavStyle + (isActive && selectedNav))} >Accesos actuales</NavLink>
                <NavLink to="add" className={({isActive}) => (basicNavStyle + (isActive && selectedNav))} >Agregar Acceso</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}   