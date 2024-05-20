import api from "./axiosConfig";

const urlImages = "/static/images/"

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

// * PROPIETARIO

// Eliminar propietario
export async function deleteOwner(mailOwner){
    try{
        const response = await api.delete(`/owner/${mailOwner}`)
        return response.data
    }
    catch (err) {
        console.log(`Error: ${err.message}`)
        return []
    }
}

// Obtener propietarios de agente
export async function getOwners(idAgent){
    try{
        const response = await api.get(`/owner/owners_of_agent/${idAgent}`)
        return response.data
    }
    catch (err) {
        console.log(`Error: ${err.message}`)
        return []
    }
}

// Crear propietario
export async function createOwner(name, email){
    data = {
        idPropietario: 0,
        nombre: name,
        correo: email,
        contrasennia: "."
    }
    try{
        const response = await api.post(`/owner/`, data)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}


// * AGENT

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

// Enviar OTP
export async function sendOTP(idAgent){
    try{
        const response = await api.post(`/agent/sendOTP?id_agent=${idAgent}`);
        return response.data
    }
    catch (err) {
        throw new Error('Usuario o contraseña incorrectos')
    }
}

// Obtener agentes de mantenimiento ???

// Firmar inventario
export async function signingInventory(idAgent, numInput, idProperty){
    const params = {
        id_agent: idAgent,
        num: numInput,
        id_Propiedad: idProperty
    }
    try{
        const response = await api.post(`/agent/signingInventory`, config={
            params: params
        });
        return response.data
    }
    catch (err) {
        throw new Error('Usuario o contraseña incorrectos')
    }
}


// * PROPIEDADES

// Obtener info de propiedad
export async function getProperty(idProperty){
    try{
        const response = await api.get(`/property/`, `id=${idProperty}`)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Crear propiedad
export async function createProperty(idProperty, direction, image){
    params = { 
        Propietario_idPropietario: idProperty,
        direccion: direction
    }
    data = {
        image: image
    }
    try{
        const response = await api.post(`/property/`, data, config= {
            params: params
        })
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Obtener propiedades de propietario
export async function getOwnerProperties(idOwner){
    try{
        const response = await api.get(`/property/ownerProperties?owner_id=${idOwner}`)
        return response.data
    }
    catch (err) {
        console.log(`Error: ${err.message}`)
        return []
    }
}

// Obtener propiedades de agente
export async function getAgentProperties(idAgent){
    try{
        const response = await api.get(`/property/agentProperties?agent_id=${idAgent}`)
        return response.data
    }
    catch (err) {
        console.log(`Error: ${err.message}`)
        return []
    }
}

// Eliminar propiedad
export async function deleteProperty(idProperty){
    try{
        const response = await api.delete(`/property/${idProperty}`)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}


// * ACCESOS

// Eliminar acceso
export async function deleteAccess(idProperty, idAgent){
    try{
        const response = await api.delete(`/access/${idProperty}/${idAgent}`);
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Crear acceso
export async function createAccess(idProperty, idAgent){
    data = {
        Propiedad_idPropiedad: idProperty,
        Agente_idAgente: idAgent
    }
    try{
        const response = await api.post(`/forniture/`, data)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}



// * MUEBLES

// Elimiar mueble
export async function deleteForniture(idForniture){
    try{
        const response = await api.delete(`/forniture/${idForniture}`)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Obtener muebles de mueble
export async function getRoomFornitures(forniture_id){
    try{
        const response = await api.get(`/furniture/room_furnitures/${forniture_id}`)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Crear mueble
export async function createForniture(idRoom, name, description, image, state="0"){
    params = { 
        Habitacion_idHabitacion: idRoom,
        estado: state,
        nombre: name,
        descripcion: description
    }
    data = {
        image: image
    }
    try{
        const response = await api.post(`/forniture/`, data, config= {
            params: params
        })
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Actualizar mueble
export async function updateForniture(idRoom, name, description, image, state){
    var request = {}
    if (name && image){
        request = await Promise.all([updateRoomInfo(), updateRoomImage()]);

    } else if (name) {
        request = await updateRoomInfo(idRoom, name, description, state);
    } else if (image) {
        request = await updateRoomImage(idRoom, image);
    } else {
        throw new Error("Parámetros indeinidos en el llamado a la api")
    }
    return request
}

// Actualizar info de mueble
export async function upadteFornitureInfo(idRoom, name, description, state){
    params = { 
        id: idRoom,
        estado: state,
        nombre: name,
        descripcion: description
    }
    try{
        const response = await api.put(`/forniture/update_string`, config= {
            params: params
        })
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Actualizar foto de mueble
export async function updateFornitureImage(idRoom, image){
    params = { 
        id: idRoom
    }
    data = {
        image: image
    }
    try{
        const response = await api.put(`/forniture/`, data, config= {
            params: params
        })
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}


// * HABITACIÓN [ TERMINADO ]

// Elimiar habitación
export async function deleteRoom(idRoom){
    try{
        const response = await api.delete(`/room/${idRoom}`)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Obtener habitaciones de propiedad
export async function getPropertyRooms(property_id){
    try{
        const response = await api.get(`/room/property_rooms/${property_id}`)
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}


// Crear habitación
export async function createRoom(idRoom, name, description, image){
    params = { 
        Habitacion_idHabitacion: idRoom,
        nombre: name,
        descripcion: description
    }
    data = {
        image: image
    }
    try{
        const response = await api.post(`/room/`, data, config= {
            params: params
        })
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Actualizar habitación
export async function updateRoom(idRoom, name, description, image){
    var request = {}
    if (name && image){
        request = await Promise.all([updateRoomInfo(), updateRoomImage()]);

    } else if (name) {
        request = await updateRoomInfo(idRoom, name, description);
    } else if (image) {
        request = await updateRoomImage(idRoom, image);
    } else {
        throw new Error("Parámetros indeinidos en el llamado a la api")
    }
    return request
}

// Actualizar info de habitacón
export async function updateRoomInfo(idRoom, name, description){
    params = { 
        id: idRoom,
        nombre: name,
        descripcion: description
    }
    try{
        const response = await api.put(`/room/update_string`, config= {
            params: params
        })
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}

// Actualizar foto de habitacón
export async function updateRoomImage(idRoom, image){
    params = { 
        id: idRoom
    }
    data = {
        image: image
    }
    try{
        const response = await api.put(`/room/`, data, config= {
            params: params
        })
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return []
    }
}