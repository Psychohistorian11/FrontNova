
// export const apiUrl = "https://keynovaapi.onrender.com";
export const apiUrl = "http://127.0.0.1:8000"

// Iniciar sesión
export async function logIn(mail, password){

    try{
        const response = await fetch(`${apiUrl}/agent/${mail}/${password}`)
    
        if (!response.ok) {
            console.log(response)
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    }
    catch (error) {
        console.log(error)
        throw new Error('Usuario o contraseña incorrectos')
    }
}

// Obtener propiedades de un propietario
export async function getOwnerProperties(idPropietario){
    const parametros = new URLSearchParams({ owner_id: idPropietario });

    try{
        const response = await fetch(`${apiUrl}?${parametros}`)
    
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
    }
}

// Obtener propietarios de agente
export async function getOwners(idAgent){

    try{
        const response = await fetch(apiUrl + "/owner/owners_of_agent/" + idAgent)
    
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
    }
}

// Crear propietarios
export async function createOwner(){

}
