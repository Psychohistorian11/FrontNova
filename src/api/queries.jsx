import api from "./axiosConfig";

const urlImages = `${api}/static/images/`;


// Obtener todos los agentes de mantenimiento con atributo bool de si tienen acceso a una propiedad
export async function getAllMaintainceAgentWithAccessAtribute(idProperty, idAgent){
    try{
        const response = await api.get(`/access/${idProperty}/${idAgent}`);
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Obtener mantenimientos de agente comercial
export async function getAllMaintenancesForAgent(idAgent) {
    try {
        const response = await api.get(`/maintenance/agentIdCommercial?id=${idAgent}`);
        return response.data;
    } catch (err) {
        console.log(`Error: ${err.message}`);
        return [];
    }
}


// * PROPIETARIO

// Obtener propietario
export async function getOwner(mail){
    try{
        const response = await api.get(`/owner/${mail}`);
        return response.data;
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
        return {};
    }
}


// Eliminar propietario
export async function deleteOwner(mailOwner){
    try{
        const response = await api.delete(`/owner/${mailOwner}`);
        return response.data;
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
        return [];
    }
}

// Obtener propietarios de agente
export async function getOwners(idAgent){
    try{
        const response = await api.get(`/owner/owners_of_agent/${idAgent}?idProperty=${idAgent}`);
        return response.data;
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
        return [];
    }
}

// Propietario de propiedad
export async function getPropertyOwner(idProperty){
    try{
        const response = await api.get(`/owner/ownerOfProperty/${idProperty}`);
        return response.data;
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
        return [];
    }
}

// Crear propietario
export async function createOwner(name, email) {
    const data = {
        idPropietario: 0,
        nombre: name,
        correo: email,
        genero: "masculino",
        contrasennia: ".",
    };
    try {
        const response = await api.post(`/owner/`, data);
        return response.status === 200;
    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return false;
    }
}


// * AGENT

// Iniciar sesión
export async function logIn(mail, password){
    try{
        const response = await api.post(`/agent/login?mail=${mail}&password=${password}`);
        return response.data;
    }
    catch (err) {
        throw new Error('Usuario o contraseña incorrectos');
    }
}

// Enviar OTP
export async function sendOTP(idAgent){
    try{
        const response = await api.post(`/agent/sendOTP`, null, {
            params: { id_agent: idAgent }
        });
        return response.data;
    }
    catch (err) {
        throw new Error('Usuario o contraseña incorrectos');
    }
}

// Obtener agentes de mantenimiento ???
// Implementación pendiente

// Firmar inventario
export async function signingInventory(idAgent, numInput, idProperty){
    const params = {
        id_agent: idAgent,
        num: numInput,
        id_Propiedad: idProperty
    };
    try{
        const response = await api.post(`/agent/signingInventory`, null, {
            params: params
        });
        return response.data;
    }
    catch (err) {
        throw new Error('Usuario o contraseña incorrectos');
    }
}


// * PROPIEDADES

// Obtener info de propiedad
export async function getProperty(idProperty){
    try{
        const response = await api.get(`/property`, {
            params: { id: idProperty }
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error);
    }
}

// Crear propiedad
export async function createProperty(idOwner, idAgent, address, image){
    const formData = new FormData();
    formData.append('image', image);
    const params = { 
        idAgente: idAgent,
        Propietario_idPropietario: idOwner,
        direccion: address
    };
    try{
        // const response = await api.post(`/property/`, data, {
        //     params: params
        // });
        const response = await api.post('/property/', formData, {
            params: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Obtener propiedades de propietario
export async function getOwnerProperties(idOwner){
    try{
        const response = await api.get(`/property/ownerProperties`, {
            params: { owner_id: idOwner }
        });
        return response.data;
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
        return [];
    }
}

// Obtener propiedades de agente
export async function getAgentProperties(idAgent){
    try{
        const response = await api.get(`/property/agentProperties`, {
            params: { agent_id: idAgent }
        });
        return response.data;
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
        return [];
    }
}

// Eliminar propiedad
export async function deleteProperty(idProperty) {
    try {
      const response = await api.delete(`/property/${idProperty}`);
      return response.data;
    } catch (error) {
      console.error('Hubo un problema con la solicitud fetch:', error);
      throw error; // Lanza el error para que la mutación lo maneje
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
        return [];
    }
}

// Crear acceso
export async function createAccess(idProperty, idAgent){
    const data = {
        Propiedad_idPropiedad: idProperty,
        Agente_idAgente: idAgent
    };
    try{
        const response = await api.post(`/access/`, data);
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}


// * MUEBLES

// Elimiar mueble
export async function deleteForniture(idForniture){
    try{
        const response = await api.delete(`/forniture/${idForniture}`);
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Obtener muebles de mueble
export async function getRoomFornitures(forniture_id){
    try{
        const response = await api.get(`/furniture/room_furnitures/${forniture_id}`);
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Crear mueble
export async function createForniture(idRoom, name, description, image, state="0"){
    const params = { 
        Habitacion_idHabitacion: idRoom,
        estado: state,
        nombre: name,
        descripcion: description
    };
    const data = {
        image: image
    };
    try{
        const response = await api.post(`/forniture/`, data, {
            params: params
        });
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Actualizar mueble
export async function updateForniture(idRoom, name, description, image, state){
    let request = {};
    if (name && image){
        request = await Promise.all([
            updateFornitureInfo(idRoom, name, description, state),
            updateFornitureImage(idRoom, image)
        ]);
    } else if (name) {
        request = await updateFornitureInfo(idRoom, name, description, state);
    } else if (image) {
        request = await updateFornitureImage(idRoom, image);
    } else {
        throw new Error("Parámetros indefinidos en el llamado a la API");
    }
    return request;
}

// Actualizar info de mueble
export async function updateFornitureInfo(idRoom, name, description, state){
    const params = { 
        id: idRoom,
        estado: state,
        nombre: name,
        descripcion: description
    };
    try{
        const response = await api.put(`/forniture/update_string`, null, {
            params: params
        });
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Actualizar foto de mueble
export async function updateFornitureImage(idRoom, image){
    const params = { 
        id: idRoom
    };
    const data = {
        image: image
    };
    try{
        const response = await api.put(`/forniture/`, data, {
            params: params
        });
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}


// * HABITACIÓN [ TERMINADO ]

// Elimiar habitación
export async function deleteRoom(idRoom){
    try{
        const response = await api.delete(`/room/${idRoom}`);
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Obtener habitaciones de propiedad
export async function getPropertyRooms(property_id){
    try{
        const response = await api.get(`/room/property_rooms/${property_id}`);
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Crear habitación
export async function createRoom(idProperty, name, description, image){
    const params = { 
        Propiedad_idPropiedad: idProperty,
        nombre: name,
        descripcion: description
    };
    const data = {
        image: image
    };
    try{
        const response = await api.post(`/room/`, data, {
            params: params
        });
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Actualizar habitación
export async function updateRoom(idRoom, name, description, image){
    let request = {};
    if (!!name && !!image){
        request = await Promise.all([
            updateRoomInfo(idRoom, name, description),
            updateRoomImage(idRoom, image)
        ]);
    } else if (name) {
        request = await updateRoomInfo(idRoom, name, description);
    } else if (image) {
        request = await updateRoomImage(idRoom, image);
    } else {
        throw new Error("Parámetros indefinidos en el llamado a la API");
    }
    return request;
}

// Actualizar info de habitacón
export async function updateRoomInfo(idRoom, name, description){
    const params = { 
        id: idRoom,
        nombre: name,
        descripcion: description
    };
    try{
        const response = await api.put(`/room/update_string`, null, {
            params: params
        });
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}

// Actualizar foto de habitacón
export async function updateRoomImage(idRoom, image){
    const params = { 
        id: idRoom
    };
    const formData = new FormData();
    formData.append('image', image);
    try{
        const response = await api.put(`/room/`, formData, {
            params: params
        });
        return response.data;
    }
    catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error);
        return [];
    }
}
