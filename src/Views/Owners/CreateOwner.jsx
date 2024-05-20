import React from "react"
import { Form } from "react-router-dom"


export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const name = formData.get("name")
    // llamado a la api
    // const data = await loginUser({ email, password })
    console.log(data)

    return null
}

export default function CreateOwner(){
    return (
        <div>
            <h1 className='text-3xl font-bold border-b border-black pb-4'>Crear propietario</h1>
            <div>
                <Form method="post" className="flex flex-col items-center my-16 mx-36">
                    <div className="inline-block mb-8">
                        <label for="name" className=" text-lg font-bold mr-5">Nombre</label>
                        <input
                            id="name"
                            className="h-10 pl-5 border border-gray-300 rounded-lg placeholder:italic"
                            name="name"
                            type="name"
                            placeholder="Nombre"
                        />
                    </div>
                    <div className="inline-block mb-8">
                        <label for="name" className=" text-lg font-bold mr-5">Correo</label>
                        <input
                            id="email"
                            className="h-10 pl-5 border border-gray-300 rounded-lg placeholder:italic"
                            name="email"
                            type="email"
                            placeholder="Correo"
                        />
                    </div>
                    <button
                        disabled={status === "submitting"}
                        className="mt-10 py-2 px-3 text-white bg-firstColor rounded flex justify-center w-1/6"
                    >
                        {status === "submitting"
                            ? "Logging in..."
                            : "Crear"
                        }
                    </button>
                </Form>
            </div>
        </div>
    )
}
