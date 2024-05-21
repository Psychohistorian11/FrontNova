import { useQueries } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProperty, getPropertyOwner } from "../api/queries";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";

export default function InventoryContext() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [inventory, setInventory] = useState({
        property: {},
        owner: {},
        spaces: [],
        components: []
    });

    const results = useQueries({
        queries: [
            {
              queryKey: ['getPropertyInfo', id],
              queryFn: () => getProperty(id),
              enabled: !!id && Object.keys(inventory.property) == 0
            },
            {
              queryKey: ["getOwner", id],
              queryFn: () => getPropertyOwner(id),
              enabled: !!id && Object.keys(inventory.property) == 0
            }
        ],
    });

    const isLoading = results.some(result => result.isLoading);
    const isError = results.some(result => result.isError);

    useEffect(() => {
        console.log("INFOO", id)
        console.log(Object.keys(inventory.property))
        if (results.every(result => result.isSuccess)) {
            setInventory(inventory => ({
                ...inventory,
                property: results[0].data,
                owner: results[1].data
            }));
        }
    }, [results[0].data, results[1].data]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        navigate("/notfound");
    }

    return (
        <Outlet context={[inventory, setInventory]} />
    );
}
