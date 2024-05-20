import { KeyIcon } from "@heroicons/react/24/outline"
import Agent from "../../Components/Agent"

export const CurrentAccess = () => {

  var agents = [
    {
      id: 1,
      name: "Chris Paul",
      photo: "https://static01.nyt.com/images/2023/07/06/multimedia/06Insidethelist-Paul-kzgh/06Insidethelist-Paul-kzgh-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
    },
    {
      id: 2,
      name: "Chris Pratt",
      photo: "https://media.revistavanityfair.es/photos/60e83fb2e3e0ae04802dd852/master/w_1600%2Cc_limit/148288.jpg"
    },
    {
      id: 3,
      name: "Chris Hemsworth",
      photo: "https://media.gq.com.mx/photos/66410dd4ea83e06b06e158fc/1:1/w_2000,h_2000,c_limit/Chris%20Hemsworth.jpg"
    }
  ]

  // TEST!!!! 
  agents = []

  function handleRemove(idAgent){
    return null
  }

  const agentElements = agents.map(agent => (
    <Agent 
      key={agent.id} 
      name={agent.name} 
      hasAccess={true} 
      photo={agent.photo} 
      handleEvent={() => handleRemove(agent.id)}
    />
  ))

  return (
    <>
    {
      agents.length === 0 ?
        <div className='absolute inset-x-0 mt-20  flex flex-col items-center justify-center'>
          <KeyIcon className='size-24' color='#0E9594'/>
          <p className='mt-2 italic text-firstColor'>Ninguna otra persona tiene acceso a este inventario</p>
        </div>
        :
        <div className="divide-y divide-y-solid">
          {agentElements}
        </div>
    }
    </>
    
    
  )
}
