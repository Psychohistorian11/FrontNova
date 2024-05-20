import { useMutation } from "@tanstack/react-query"


export default function TestRequest(){
    const { data, mutate } = useMutation({
        mutationFn: () => deleteForniture(1)
    })
    return(
        <>
            <button onClick={mutate}>Probar petición</button>
            { data && <div>{data}</div>}
        </>
    )
}