import MaintenanceCard from "../../Components/MaintenanceCard"


export default function Maintenances(){
    const data = [
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            address: "Cll 3 #23 - 34"
        },
        {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            address: "Cll 3 #23 - 34"
        }
    ]


    const maintenancesElements = data.map(maintenance => (
        <MaintenanceCard
            text={maintenance.text}
            address={maintenance.address}
        />
    ))


    return (
        <>
            <div className='flex pb-3 mb-5 border-b border-b-gray-300'>
                <h2 className='text-3xl font-bold '>Mantenimientos</h2>
            </div>
            
            <div className="flex flex-col mx-20 my-10 space-y-6">
                {maintenancesElements}
            </div>
        </>
    )
}