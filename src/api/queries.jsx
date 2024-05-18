import api from "./axiosConfig";

// Iniciar sesión
export async function logIn(mail, password){
    const data = { 'mail': mail, 'password': password }
    try{
        const response = await api.post(`/agent/login?mail=${mail}&password=${password}`);
        return response.data
    }
    catch (err) {
        throw new Error('Usuario o contraseña incorrectos')
    }
}

// Obtener propietarios de agente
export async function getOwners(idAgent){
    try{
        const response = await api.get(`/owner/owners_of_agent/${idAgent}`);
        return response.data
    }
    catch (err) {
        console.log(`Error: ${err.message}`)
    }
}

// Obtener propietarios de agente
export async function getOwnersProperties(idAgent){

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
