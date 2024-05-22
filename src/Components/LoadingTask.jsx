import { HashLoader } from "react-spinners";

export function LoadingTask(){
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <HashLoader color='#6EBDD1' size={100}/>
        </div>
    )
}
