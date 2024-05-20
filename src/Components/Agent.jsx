import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline"

export default function Agent(params){
    const {name, photo, hasAccess, handleEvent } = params

    return(
        <div className="relative py-4">
            <div className="flex bg-white w-80 ml-12 mr-8 h-12 items-center rounded-xl border border-gray-300 pr-6">
                <img className="absolute left-4 rounded-full size-16 object-cover z-10" src={photo}></img>
                <p className="flex ml-14 items-center text-lg truncate">{name}</p>

                <div className="ml-auto" onClick={handleEvent}>
                    {hasAccess ?
                        <XMarkIcon className="size-6"/>
                        :
                        <PlusIcon className="size-6"/>
                    }
                </div>
            </div>
        </div>
    )
}