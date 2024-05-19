import api from "./axiosConfig";

// Iniciar sesión
export async function logIn(mail, password){
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
        return []
    }
}

// Obtener propiedades de agente
export async function getProperties(idAgent){
    try{
        const response = await api.get(`/property/agentProperties?agent_id=${idAgent}`)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
    }
}

// Crear propietarios
export async function createOwner(){

}
