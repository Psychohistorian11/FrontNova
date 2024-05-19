import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";
import { getAllMaintainceAgentWithAccessAtribute } from "../api/queries";
import Loading from "./Loading";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";


export default function LayoutAccess() {
    const authUser = useAuthUser();

    const { data: agents, isLoading } = useQuery({
        queryKey: ['maintainceAgents'],
        queryFn: () => getAllMaintainceAgentWithAccessAtribute(1, authUser.id)
    })

    const basicNavStyle = "text-gray-600 "
    const selectedNav = "font-bold cursor-default"
    const nonSelectedNav = "hover:underline hover:underline-offset-2"

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className="border-b border-b-gray-300 pb-3">
                <h1 className='text-3xl font-bold pb-4'>Accesos</h1>
                <p>Gestiona quién tiene permitido hacer cambios en este inventario</p>
            </div>

            <div className="p-7">
                <nav className="flex space-x-10 mb-4 justify-center pb-3">
                    <NavLink to="."  end className={({isActive}) => (basicNavStyle + (isActive ? selectedNav: nonSelectedNav))} >Accesos actuales</NavLink>
                    <NavLink to="add" className={({isActive}) => (basicNavStyle + (isActive ? selectedNav: nonSelectedNav))} >Agregar Acceso</NavLink>
                </nav>
                <div className="flex flex-col items-center">
                    <Outlet />
                </div>
            </div>
        </>

    )
}  