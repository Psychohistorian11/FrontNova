

export default function MaintenanceCard(params){
    const { image, owner, address, linkToDetail } = params;

    return (
        <div className="bg-secondColor/5 p-2 rounded-lg content-center border-secondColor border-2 shadow-md ">
            <div className="flex items-center mt-2 px-3">
                <img src={image} className="size-20 rounded object-cover"/>
                <div className="pl-3 overflow-hidden flex flex-col content-start h-24">
                    <div className="flex items-center">
                        <span className='pr-2 text-left text-xs font-medium text-secondColor uppercase'>Propiedad de: </span>
                        <h2 className="text-sm truncate font-light italic">{owner}</h2>
                    </div>
                    <h2 className="mt-2 text-sm line-clamp-3 font-medium">{address}</h2>

                </div>
            </div>
        </div>
    )
}