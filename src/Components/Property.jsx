import { TrashIcon } from "@heroicons/react/16/solid"
import Swal from "sweetalert2"
import { Link } from "react-router-dom";
import { imageUrlApi } from "../api/axiosConfig";
import { PencilIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function Property(params){
    const { address, image, isSigned, handleDelete, linkToDetail } = params

    function confirmationDeleteAlert(){
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0E9594",
            cancelButtonColor: "#562C2C",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              handleDelete();
            }
        });
    }   


    return (
        <div className="flex flex-col bg-gray-50 p-3 rounded-lg content-center border-gray-700 border shadow-md ">
            <div className="flex justify-center relative">
              <img src={`${imageUrlApi}/${image}`} className="h-40 w-56 object-cover rounded-md"/>
              <div onClick={confirmationDeleteAlert} className="absolute flex justify-center items-center hover:bg-firstColor cursor-pointer bg-white size-6 rounded-full top-1 left-1">
              <TrashIcon className="size-4"/>
              </div>
            </div>
            <div className="max-h-full mt-1">
                    {isSigned ? 
                        <div className="flex items-center mt-1">
                            <PencilIcon className="size-5 " />
                            <span className='pl-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Firmado </span>
                        </div>
                        :
                        <div className="flex items-center mt-1">
                            <XCircleIcon className="size-5" />
                            <span className='pl-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>No firmado </span>
                        </div>
                    }
                
                <div className="mt-1 h-20 overflow-hidden mb-5">
                    <span className='pr-2 text-left text-xs font-medium text-firstColor uppercase tracking-wider'>Dirección: </span>
                    <h2 className="text-sm">{address}</h2>
                </div>
                
                <div className="flex justify-center mt-auto">
                    <Link to={linkToDetail} className="hover:bg-firstColor text-firstColor text-sm rounded hover:text-white px-4 py-1 border border-firstColor">
                      Ver inventario
                    </Link>
                </div>
            </div>
        </div>
    )
}
