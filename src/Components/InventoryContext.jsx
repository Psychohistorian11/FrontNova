import { useState } from "react"


export default function InventoryContext(){
    const [ inventory, setInventory ] = useState({})

    return(
        <Outlet context={[inventory, setInventory]}/>
    )
}