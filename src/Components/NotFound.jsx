import { ChevronLeftIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


export default function NotFound() {
    return(
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-white via-teal-50 via-70% to-teal-100">
            <div className="flex">
                <XCircleIcon className="size-16"/>
                <div className="ms-5">
                    <h2 className=" text-3xl font-bold">404 Página no encontrada</h2>
                    <Link to="/h" className="flex items-center mt-4">
                        <ChevronLeftIcon className="size-4"/>
                        <p className="text-gray-600 ms-2">Volver</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}