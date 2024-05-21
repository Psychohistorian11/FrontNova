import React, { useState, useEffect } from 'react';
import MaintenanceCard from "../../Components/MaintenanceCard";
import { getAllMaintenancesForAgent } from '../../api/queries';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export default function Maintenances() {
    const authUser = useAuthUser();
    const id = authUser.id;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const maintenances = await getAllMaintenancesForAgent(id);
                console.log(maintenances)
                setData(maintenances);
            } catch (err) {
                console.error(`Error: ${err.message}`);
            }
        };

        fetchData();
    }, [id]);

    const maintenancesElements = data.map((maintenance, index) => (
        <MaintenanceCard
            key={index}
            text={maintenance.text}
            address={maintenance.address}
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
