import { KeyIcon } from "@heroicons/react/24/outline"
import Agent from "../../Components/Agent"
import { useOutletContext } from "react-router-dom"
import { useMutation } from "@tanstack/react-query";
import { deleteAccess } from "../../api/queries";
import { LoadingTask} from "../../Components/LoadingTask"

export const CurrentAccess = () => {
  const [ agents, setAgents, inventory ] = useOutletContext();
  
  const { mutate: removeAccess, isPending } = useMutation({
    mutationFn: (idAgent) => deleteAccess(inventory.property.idPropiedad, idAgent),
    onSuccess: (data, variables) => handleSuccessRemove(data, variables)
  });

  function handleSuccessRemove(data, idAgent) {
    setAgents(prevAgents => prevAgents.map(agent => {
      if (agent.idAgente === idAgent){
        return {
          ...agent,
          tieneAcceso: false
        }
      } else {
        return agent
      }
    }))
  }

  const agentsWithAccess = agents.filter(agent => agent.tieneAcceso)

  const agentElements = agentsWithAccess.map(agent => (
    <Agent
      key={agent.idAgente} 
      name={agent.nombre} 
      hasAccess={agent.tieneAcceso} 
      photo={agent.imagen} 
      handleEvent={() => removeAccess(agent.idAgente)}
    />
  ))

  return (
    <>
    {
      agentsWithAccess.length === 0 ?
        <div className='absolute inset-x-0 mt-20  flex flex-col items-center justify-center'>
          <KeyIcon className='size-24' color='#0E9594'/>
          <p className='mt-2 italic text-firstColor'>Ninguna otra persona tiene acceso a este inventario</p>
        </div>
        :
        <div className="divide-y divide-y-solid">
          {agentElements}
        </div>
    }
    {
      isPending &&
      <LoadingTask />
    }
    </>
    
    
  )
}
