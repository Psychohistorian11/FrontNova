import Agent from "../../Components/Agent"
import { useOutletContext } from "react-router-dom";
import { createAccess } from "../../api/queries";
import { useMutation } from "@tanstack/react-query";
import { LoadingTask} from "../../Components/LoadingTask"

export default function AddAccess() {

  const [ agents, setAgents, inventory ] = useOutletContext();
  
  const { mutate: addAccess, isPending } = useMutation({
    mutationFn: (idAgent) => createAccess(inventory.property.idPropiedad, idAgent),
    onSuccess: (data, idAgent) => handleSuccessRemove(data, idAgent)
  });

  function handleSuccessRemove(data, idAgent) { // ! No usar push para inventory
    setAgents(prevAgents => prevAgents.map(agent => {
      if (agent.idAgente === idAgent){
        return {
          ...agent,
          tieneAcceso: true
        }
      } else {
        return agent
      }
    }))
  }

  const agentsWithoutAccess = agents.filter(agent => !agent.tieneAcceso)

  if (agents === undefined){
    return <Loading />
  }

  const agentElements = agentsWithoutAccess.map(agent => (
      <Agent
        key={agent.idAgente} 
        name={agent.nombre} 
        hasAccess={agent.tieneAcceso} 
        photo={agent.imagen} 
        handleEvent={() => addAccess(agent.idAgente)}
      />
    ))

  return(
    <>
      <div className="divide-y divide-y-solid">
          {agentElements}
      </div>
      {
        isPending &&
        <LoadingTask />
      }
    </>
  )
}