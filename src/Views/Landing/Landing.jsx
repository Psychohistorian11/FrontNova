import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import PropertyCard from "../../Components/PropertyCard"
import MaintenanceCard from "../../Components/MaintenanceCard"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { getAgentProperties } from "../../api/queries"

export default function Landing() {
    const authUser = useAuthUser();
    const id = authUser.id;
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        async function fetchProperties() {
            const fetchedProperties = await getAgentProperties(id);
            const formattedProperties = fetchedProperties.map(property => ({
                id: property.idPropiedad,
                owner: `Propietario ${property.Propietario_idPropietario}`, // Puedes cambiar esto según el formato adecuado para 'owner'
                image: property.imagen,
                address: property.direccion
            }));
            setProperties(formattedProperties);
        }
        
        fetchProperties();
    }, [id]);

    const handleDelete = (propertyId) => {
        // Aquí iría tu lógica de eliminación de propiedades
        console.log(`Eliminar propiedad con ID: ${propertyId}`);
    };
    const propertiesElements = properties.slice(0, 3).map(property => (
        <PropertyCard
            key={property.id}
            owner={property.owner}
            image={property.image}
            address={property.address}
            handleDelete={() => handleDelete(property.id)}
            linkToDetail={`inventory/${property.id}`}
        />
    ));
    

    const maintenanceElements = properties.slice(0,3).map(property => (
        <MaintenanceCard
            key={property.id}
            owner={property.owner}
            image={property.image}
            address={property.address}
            handleDelete={() => handleDelete(property.id)}
            linkToDetail={`inventory/${property.id}`}
        />
    ));

    return (
        <div className="relative flex-grow w-full flex flex-col">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
        
            {/* Gradiente de transparencia */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-stone-700 bg-fixed"></div>

            {/* Contenido del Landing */}
            <div className="relative flex-grow mx-40 m-10 p-10 bg-white rounded-xl border border-gray-300 shadow-lg overflow-hidden">
                <div className="text-center mt-5">
                    <h1 className="text-4xl font-bold pb-4">¡Bienvenido a <p className="inline text-firstColor">Nova</p>, {authUser.name}!</h1>
                    <p>¿Qué quieres hacer hoy?</p>
                </div>
                <div className="flex justify-center space-x-16 my-16 w-full">
                    <Link to="CreateInventory" className="rounded-lg font-medium px-4 py-3 text-white bg-firstColor shadow-lg shadow-firstColor/50">
                        Crear nuevo inventario
                    </Link>
                    <Link to="owners/create" className="rounded-lg font-medium px-4 py-3 text-white bg-firstColor shadow-lg shadow-firstColor/50">
                        Agregar propietario
                    </Link>
                </div>

                {/* Tarjetas */}
                <div className="py-10 space-y-8">
                    <div>
                        <h4 className="text-xl font-bold text-neutral-700">Gestiona tus inventarios</h4>
                        <div className="my-5 grid grid-cols-3 gap-x-5">
                            {propertiesElements}
                        </div>
                        <div className="flex justify-end">
                            <Link to="inventory" className="text-firstColor font-semibold text-right">Ver todos...</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-neutral-700">Reportes de mantenimiento</h4>
                        <div className="my-5 grid grid-cols-3 gap-x-5">
                            {maintenanceElements}
                        </div>
                        <div className="flex justify-end">
                            <Link to="maintenances" className="text-secondColor font-semibold text-right">Ver más...</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-neutral-700">Inventarios sin firmar</h4>
                        <div className="my-5 grid grid-cols-3 gap-x-5">
                            {propertiesElements}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
