import { useMutation } from "@tanstack/react-query"


export default function TestRequest(){
    const { data, mutate } = useMutation({
        mutationFn: getOw
    })
    return(
        <>
            <button onClick={mutate}>Probar petición</button>
            { data && <div>{data}</div>}
        </>
    )
}