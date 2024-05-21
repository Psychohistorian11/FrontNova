import React from "react";
import { Form } from "react-router-dom";
import { Mail, User } from 'lucide-react';
import { createOwner } from "../../api/queries";

export default function CreateOwner() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");

        try {
            await createOwner(name, email);
        } catch (error) {
            console.error('Error registrando el propietario:', error);
        }
    };

    return (
        <div>
            <Form method="post" className="flex flex-col " onSubmit={handleSubmit}>
                <h2 className="text-3xl mb-6 font-bold">
                    Registrar Propietario
                </h2>
                <h2 className='border-b border-black pb-5 mb-10'>
                    Registra a un nuevo propietario y comienza a gestionar sus propiedades de manera eficiente
                </h2>

                <div className="flex-1 mb-6 px-40">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Nombre del propietario <User className="inline-block"/>
                    </label>
                    <input
                        id="name"
                        className="px-16 py-2 border border-gray-300 rounded"
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        required
                    />
                </div>

                <div className="flex-1 mb-6 px-40">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Correo electrónico del propietario <Mail className="inline-block" />
                    </label>
                    <input
                        id="email"
                        className="px-16 py-2 border border-gray-300 rounded"
                        name="email"
                        type="email"
                        placeholder="Correo"
                        required
                    />
                </div>

                <div className="px-40">
                    <button className="mx-2 px-4 py-2 bg-firstColor text-white rounded-md shadow hover:bg-teal-600 transition-colors" type="submit">
                        Registrar
                    </button>
                </div>
            </Form>
        </div>
    );
}
