import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { getAllMaintainceAgentWithAccessAtribute } from "../api/queries";
import Loading from "./Loading";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function LayoutAccess() {
    const [inventory, setInventory] = useOutletContext();
    const [ agents, setAgents ] = useState([]);
    const queryClient = useQueryClient();
    
    const { data: agentsQuery, isLoading } = useQuery({
        queryKey: ['maintainceAgents'],
        queryFn: () => getAllMaintainceAgentWithAccessAtribute(inventory.property.idPropiedad),
        enabled: inventory.property.idPropiedad != undefined
    })

    useEffect(() => {
        queryClient.invalidateQueries('maintainceAgents');
    }, [])

    useEffect(() => {
        if (agentsQuery != undefined){
            setAgents(agentsQuery)
            console.log(agentsQuery)
        }
    }, [agentsQuery])

    const basicNavStyle = "text-gray-600 "
    const selectedNav = "font-bold cursor-default"
    const nonSelectedNav = "hover:underline hover:underline-offset-2"

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Link className="flex items-center mb-3">
                <ArrowLeftIcon className="size-4 mr-2" color="gray" />
                <p className="text-gray-500">Volver</p>
            </Link>
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
                    <Outlet context={[agents, setAgents, inventory]} />
                </div>
            </div>
        </>

    )
}  