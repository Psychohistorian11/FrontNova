import { BounceLoader } from "react-spinners";

export default function Loading(){
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <BounceLoader color='#6EBDD1' size={100}/>
        </div>
    )
}
