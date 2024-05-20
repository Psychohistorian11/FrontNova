

export default function MaintenanceCard(params){
    const { text, address } = params;

    return (
        <div className="bg-secondColor/5 p-2 rounded-lg content-center border-secondColor border-2 shadow-md ">
            <div className="p-3 overflow-hidden flex flex-col content-start h-24">
                <div className="flex items-center">
                    <span className='pr-2 text-left text-xs font-medium text-secondColor uppercase'>Dirección: </span>
                    <h2 className="text-sm truncate font-light italic">{address}</h2>
                </div>
                <h2 className="mt-2 text-sm line-clamp-8">{text}</h2>

            </div>
        </div>  
    )
}