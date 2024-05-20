import api from "./axiosConfig";

const urlImages = "/static/images/"

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
    console.log(api)
    try{
        const response = await api.get(`/owner/owners_of_agent/${idAgent}`)
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
        return []
    }
}

// Crear propietarios
export async function createOwner(){

}

// Obtener todos los agentes de mantenimiento con atributo bool de si tienen acceso a una propiedad
// PENDIENTE
export async function getAllMaintainceAgentWithAccessAtribute(idProperty, idAgent){
    try{
        const response = await api.get(`/access/${idProperty}/${idAgent}`)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}
