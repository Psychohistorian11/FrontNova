import { PlusCircleIcon, TrashIcon } from "@heroicons/react/16/solid"

export default function Agent(params){
    const {name, photo, id, hasAccess } = params

    return(
        <div className="relative">
            <div className="flex bg-white w-80 mx-10 h-12 items-center rounded-xl border border-gray-300 pr-6">
                <img className="absolute left-0 rounded-full size-16 object-cover z-10" src={photo}></img>
                <p className="flex ml-14 items-center text-lg">{name}</p>

                <div className="ml-auto ">
                    {hasAccess ?
                        <TrashIcon className="size-6"/>
                        :
                        <PlusCircleIcon className="size-6"/>
                    }
                </div>
            </div>
        </div>
    )
}