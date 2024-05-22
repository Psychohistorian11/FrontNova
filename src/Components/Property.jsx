import { TrashIcon } from "@heroicons/react/16/solid"
import Swal from "sweetalert2"
import { Link } from "react-router-dom";
import { imageUrlApi } from "../api/axiosConfig";

export default function Property(params){
    const { address, image, owner, handleDelete, linkToDetail } = params

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
              Swal.fire({
                title: "¡Eliminado!",
                text: "El inventario ha sido eliminado.",
                icon: "success",
                confirmButtonColor: "#0E9594"
              });
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
                <div className="">
                    <span className='pr-1 text-left text-xs font-medium text-firstColor uppercase tracking-wider'>Propiedad de: </span>
                    <h2 className="text-sm truncate">{owner}</h2>
                </div>
                
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
