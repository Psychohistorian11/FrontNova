import { useQueries } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { getProperty, getPropertyOwner, getPropertyRooms } from "../api/queries";
import Loading from "./Loading";

export default function InventoryContext() {
    const { id, idSpace } = useParams();
    const navigate = useNavigate();

    const [inventory, setInventory] = useState({
        property: {},
        owner: {},
        spaces: []
    });

    const results = useQueries({
        queries: [
            {
                queryKey: ['getPropertyInfo', id],
                queryFn: () => getProperty(id),
                enabled: !!id && Object.keys(inventory.property).length === 0
            },
            {
                queryKey: ["getOwner", id],
                queryFn: () => getPropertyOwner(id),
                enabled: !!id && Object.keys(inventory.property).length === 0
            },
            {
                queryKey: ['getRooms', id],
                queryFn: () => getPropertyRooms(id),
                enabled: !!id && Object.keys(inventory.property).length === 0
            }
        ],
    });

    const isLoading = results.some(result => result.isLoading);
    const isError = results.some(result => result.isError);

    useEffect(() => {
        if (results.every(result => result.isSuccess)) {
            setInventory(inventory => ({
                ...inventory,
                property: results[0].data,
                owner: results[1].data,
                spaces: results[2].data
            }));
        }
    }, [results[0].data, results[1].data, results[2].data]);

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
