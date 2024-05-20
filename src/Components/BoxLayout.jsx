import { Outlet } from "react-router-dom";

export default function BoxLayout(){
    return(
        <div className="relative mx-60 m-10 p-10 flex-grow bg-white rounded-xl border border-gray-300 shadow-lg overflow-hidden">
            <Outlet />
        </div>
    )
}
