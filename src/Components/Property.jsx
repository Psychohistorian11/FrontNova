


export default function Property(params){
    const { address, image, owner } = params

    return (
        <div className="flex bg-white p-3 rounded-lg content-center border-gray-700 border shadow-md">
            <img src={image} className="h-40 w-40 object-cover" />
            <div className="flex flex-col ms-4 min-h-full">
                <div className="flex items-center">
                    <span className='pr-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Propiedad de: </span>
                    <h2 className="text-sm">{owner}</h2>
                </div>
                
                <div className="flex items-center mt-4">
                    <span className='pr-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Dirección: </span>
                    <h2 className="text-sm">{address}</h2>
                </div>
                
                <div className="flex justify-center mt-auto">
                    <button className="hover:bg-firstColor text-firstColor text-sm rounded hover:text-white px-4 py-1 border border-firstColor">Ver inventario</button>
                </div>
                
            </div>
        </div>
    )
}
