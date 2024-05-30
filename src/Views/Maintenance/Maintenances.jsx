import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MaintenanceCard from "../../Components/MaintenanceCard";
import { getAllMaintenancesForAgent } from '../../api/queries';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Loading from '../../Components/Loading';

export default function Maintenances() {
    const authUser = useAuthUser();
    const id = authUser.id;

    const { data, isLoading, error } = useQuery({
        queryKey: ['maintenances', id],
        queryFn: () => getAllMaintenancesForAgent(id),
        staleTime: 60000, // Opcional: tiempo en milisegundos para considerar los datos frescos
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const maintenancesElements = data.map((maintenance, index) => (
        <MaintenanceCard
            key={index}
            text={maintenance.descripcion}
            date={maintenance.fecha}
            linkToDetail={`/h/inventory/${maintenance.Propiedad_idPropiedad}`}
        />
    ));

    return (
        <>
            <div className='flex pb-3 mb-5 border-b border-b-gray-300'>
                <h2 className='text-3xl font-bold'>Mantenimientos</h2>
            </div>
            
            <div className="flex flex-col mx-20 my-10 space-y-6">
                {maintenancesElements}
            </div>
        </>
    );
}
