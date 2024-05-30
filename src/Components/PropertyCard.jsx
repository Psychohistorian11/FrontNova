import { Link } from "react-router-dom";
import { imageUrlApi } from "../api/axiosConfig";
import { XCircleIcon, PencilIcon } from "@heroicons/react/24/outline";


export default function PropertyCard(params) {
    const { image, isSigned, address, linkToDetail } = params;

    return (
        // <div className="bg-firstColor/10 p-3 rounded-lg content-center border-firstColor border-2 shadow-md ">
        //     <div className="flex items-center">
        //         <span className='pr-2 text-left text-xs font-medium text-firstColor uppercase tracking-wider'>Propiedad de: </span>
        //         <h2 className="text-sm truncate">{owner}</h2>
        //     </div>
            
        //     <div className="flex mt-2 px-3">
        //         <img src={image} className="size-20 rounded object-cover"/>
        //         <div className="pl-3 overflow-hidden flex flex-col content-start">
        //             <span className='pr-2 text-left text-xs font-medium text-firstColor uppercase tracking-wider'>Dirección: </span>
        //             <h2 className="text-sm line-clamp-3">{address}</h2>
        //         </div>
                
        //         {/* <div className="flex justify-center mt-auto">
        //             <Link to={linkToDetail} className="hover:bg-firstColor text-firstColor text-sm rounded hover:text-white px-4 py-1 border border-firstColor">
        //               Ver inventario
        //             </Link>
        //         </div> */}
        //     </div>
        // </div>

        <div className=" p-2 rounded-lg content-center border-firstColor border-2 shadow-md ">
            <Link to={linkToDetail}>
                <div className="flex items-center mt-2 px-3">
                    <img src={`${imageUrlApi}/${image}`} className="size-20 rounded object-cover"/>
                    <div className="pl-3 overflow-hidden flex flex-col content-start h-24">
                        {isSigned ? 
                            <div className="flex items-center">
                                <PencilIcon className="size-5 " />
                                <span className='pl-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Firmado </span>
                            </div>
                            :
                            <div className="flex items-center">
                                <XCircleIcon className="size-5" />
                                <span className='pl-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>No firmado </span>
                            </div>
                        }
                        <h2 className="mt-2 text-sm line-clamp-3 font-medium">{address}</h2>

                        
                    </div>
                </div>
            </Link>
        </div>
    )
}