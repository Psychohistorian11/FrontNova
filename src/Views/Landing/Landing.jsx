import { Link } from "react-router-dom"
import PropertyCard from "../../Components/PropertyCard"
import MaintenanceCard from "../../Components/MaintenanceCard"

export default function Landing() {
    const properties = [
        {
        id: 1,
        owner: "Mary Jhonson",
        image: "https://hips.hearstapps.com/hmg-prod/images/casa-de-madera-de-diseno-moderno21-645b7b443ba61.jpg?resize=980:*",
        address: "Suite 448 5670 Margarette Curve, Wuckertmouth, FL 54961-596"
        },
        {
        id: 2,
        owner: "Samuel Wilson",
        image: "https://3dlancer.net/upload/galleries/891/4891/house-in-the-suburbs-of-st-petersburg-82446-xxl.jpg",
        address: "45 Shore St. Orange, NJ 07050"
        },
        {
            id: 1,
            owner: "Mary Jhonson",
            image: "https://hips.hearstapps.com/hmg-prod/images/casa-de-madera-de-diseno-moderno21-645b7b443ba61.jpg?resize=980:*",
            address: "Suite 448 5670 Margarette Curve, Wuckertmouth, FL 54961-596"
        },
    ]

    const propertiesElements = properties?.map(property => (
        <PropertyCard
            key={property.id}
            owner={property.owner} 
            image={property.image}
            address={property.address} 
            handleDelete={() => handleDelete(property.id)}
            linkToDetail= {`inventory/${property.id}`}
        />
    ))

    const maintenanceElements = properties?.map(property => (
        <MaintenanceCard
            key={property.id}
            owner={property.owner} 
            image={property.image}
            address={property.address} 
            handleDelete={() => handleDelete(property.id)}
            linkToDetail= {`inventory/${property.id}`}
        />
    ))

    return (
        <div className="relative flex-grow w-full flex flex-col">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523978591478-c753949ff840?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
        
            {/* Gradiente de transparencia */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white bg-fixed"></div>

            {/* Contenido del Landing */}
            <div className="relative flex-grow mx-40 m-10 p-10 bg-white rounded-xl border border-gray-300 shadow-lg overflow-hidden">
                <div className="text-center mt-5">
                    <h1 className="text-4xl font-bold pb-4">¡Bienvenido a <p className="inline text-firstColor">Nova</p>, Wilson!</h1>
                    <p>¿Qué quieres hacer hoy?</p>
                </div>
                <div className="flex justify-center space-x-16 my-16 w-full">
                    <Link to="" className="rounded-lg font-medium px-4 py-3 text-white bg-gradient-to-l from-firstColor to-neutral-800">
                        Crear nuevo inventario
                    </Link>
                    <Link to="" className="rounded-lg font-medium px-4 py-3 text-white bg-gradient-to-r from-firstColor to-neutral-800">
                        Agregar propietario
                    </Link>
                </div>

                {/* Tarjetas */}
                <div className="space-y-5">
                    <div>
                        <h4 className="text-xl font-bold text-neutral-700">Gestiona tus inventarios</h4>
                        <div className="my-5 grid grid-cols-3 gap-x-5">
                            {propertiesElements}
                        </div>
                        <div className="flex justify-end">
                            <Link className="text-firstColor font-semibold text-right">Ver todos...</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-neutral-700">Reportes de mantenimiento</h4>
                        <div className="my-5 grid grid-cols-3 gap-x-5">
                            {maintenanceElements}
                        </div>
                        <div className="flex justify-end">
                            <Link className="text-firstColor font-semibold text-right">Ver todos...</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-neutral-700">Invetarios sin firmar</h4>
                        <div className="my-5 grid grid-cols-3 gap-x-5">
                            {propertiesElements}
                        </div>
                        <div className="flex justify-end">
                            <Link className="text-firstColor font-semibold text-right">Ver todos...</Link>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    )
}