import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOwner, getOwners } from "../api/queries";

export default function TestRequest() {
    const queryClient = useQueryClient();
    
    const { data, mutate, isLoading, isError, error } = useMutation({
        mutationFn: () => createOwner("cristian", "cristiang@gmail.com"),
        onSuccess: () => {
            // Invalidar o actualizar datos cacheados si es necesario
            queryClient.invalidateQueries('owners');
        }
    });
    
    return (
        <>
            <button onClick={() => mutate()} disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Probar petición'}
            </button>
            {isError && <div>Error: {error.message}</div>}
            {data && <div>{JSON.stringify(data, null, 2)}</div>}
        </>
    );
}