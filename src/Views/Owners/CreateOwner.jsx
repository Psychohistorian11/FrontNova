import React from "react";
import { Form, Link } from "react-router-dom";
import { Mail, User, Smartphone } from 'lucide-react';
import Swal from 'sweetalert2';
import { createOwner } from "../../api/queries";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';


export default function CreateOwner() {

    const authUser = useAuthUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const idNumber = formData.get("idNumber");
        const phone = formData.get("phone");

        try {
            const success = await createOwner(name, email, idNumber, phone, authUser.id);
            if (success) {
                Swal.fire({
                    title: "¡Propietario creado con éxito!",
                    text: "El propietario fue registrado con éxito",
                    icon: "success",
                    confirmButtonColor: "#0E9594"
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al registrar el propietario",
                    icon: "error",
                    confirmButtonColor: "#562C2C"
                });
            }
        } catch (error) {
            console.error('Error registrando el propietario:', error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al registrar el propietario",
                icon: "error",
                confirmButtonColor: "#562C2C"
            });
        }
    };

return (
    <>
    <nav className="mb-4">
        <Link to="/h/owners">Propietarios</Link> &gt;
        <span>  Crear un nuevo propietario</span>
      </nav>
    <div className="flex flex-col lg:flex-row mt-44">
        <div className="lg:w-1/2 w-full flex flex-col justify-center text-left p-6">
            <h2 className="text-6xl mb-6 font-bold">
                Crea un nuevo propietario
            </h2>
            <h2 className="pb-5 mb-10 text-slate-500 text-current">
                Registra a un nuevo propietario y comienza a gestionar sus propiedades de manera eficiente
            </h2>
        </div>

        <Form method="post" className="lg:w-1/2 w-full flex flex-col justify-center items-start p-10 mr-20  " onSubmit={handleSubmit}>
            <div className="flex mb-6 w-full p-2">
                <label className="relative w-full">
                    <input required type="text" className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-full"
                        id="name"
                        name="name"
                        placeholder=" "></input>
                    <span className="absolute left-0 top-2 px-1 text-lg tracking-wide peer-focus:text-firstColor pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-valid:text-sm bg-white ml-2 text-gray-500">
                        <User className="inline-block" /> Nombre del propietario
                    </span>
                </label>
            </div>

            <div className="flex mb-6 w-full p-2">
                <label className="relative w-full">
                    <input required type="email" className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-full"
                        id="email"
                        name="email"
                        placeholder=" "></input>
                    <span className="absolute left-0 top-2 px-1 text-lg tracking-wide peer-focus:text-firstColor pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-valid:text-sm bg-white ml-2 text-gray-500">
                        <Mail className="inline-block" /> Correo del propietario
                    </span>
                </label>
            </div>

            <div className="flex mb-6 w-full p-2">
                <label className="relative w-full">
                    <input required type="text" className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-full"
                        id="idNumber"
                        name="idNumber"
                        placeholder=" "></input>
                    <span className="absolute left-0 top-2 px-1 text-lg tracking-wide peer-focus:text-firstColor pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-valid:text-sm bg-white ml-2 text-gray-500">
                        <IdentificationIcon className="size-7 inline-block" /> Número de Identificación
                    </span>
                </label>
            </div>

            <div className="flex mb-6 w-full p-2">
                <label className="relative w-full">
                    <input required type="text" className="px-4 py-2 text-lg outline-none border-2 border-gray-400 rounded hover:border-gray-600 duration-200 peer focus:border-firstColor bg-inherit w-full"
                        id="phone"
                        name="phone"
                        placeholder=" "></input>
                    <span className="absolute left-0 top-2 px-1 text-lg tracking-wide peer-focus:text-firstColor pointer-events-none duration-200 peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-valid:text-sm bg-white ml-2 text-gray-500">
                        <Smartphone className="inline-block" /> Teléfono móvil
                    </span>
                </label>
            </div>

            <div className="w-full flex justify-end p-4">
                <button className="px-4 py-2 bg-firstColor 
                 text-white rounded-md shadow hover:bg-teal-60
                 0 transition-colors" 
                 type="submit">
                    Registrar
                </button>
            </div>
        </Form>

    </div>
    
    </>
);

}
