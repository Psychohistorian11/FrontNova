import React from 'react';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom/dist';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'; 
import { LogIn } from './Components/LogIn';
import { Home } from './Views/Home/Home';
import { Inventory } from './Views/Inventory/Inventory';
import { Owners } from './Views/Owners/Owners';
import { Spaces } from './Views/CreateInventory/Spaces';
import { Components } from './Views/CreateInventory/Components';
import { CreateInventory } from './Views/CreateInventory/CreateInventory';
import Layout from './Components/Layout'
import { CurrentAccess } from './Views/Access/CurrentAccess';
import { OwnersProperties, loader as ownersPropertiesLoader} from './Views/Owners/OwnersProperty';
import LayoutAccess from './Components/LayoutAccess';
import AddAccess from './Views/Access/AddAccess';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import BoxLayout from './Components/BoxLayout';
import Landing from './Views/Landing/Landing';
import { NavbarHome } from './Components/NavbarHome';
import NotFound from './Components/NotFound';
import CreateOwner from './Views/Owners/CreateOwner';
import Maintenances from './Views/Maintenance/Maintenances';
import { EditInventory } from './Views/EditInventory/EditInventory';
import { EditSpaces } from './Views/EditInventory/EditSpaces';
import TestRequest from './Views/TestRequest';
import InventoryContext from './Components/InventoryContext';


export default function App(){
    // Router managment
    const router = createBrowserRouter(createRoutesFromElements(
        <>
            <Route path="/" element={<NavbarHome />} >
                <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<LogIn />} />
            <Route element={<AuthOutlet fallbackPath='/login' />}>
                <Route path="/h" element={<Layout />}>
                    <Route index element={<Landing />}/>
                    <Route element={<BoxLayout />}>
                        <Route path="test" element={<TestRequest />}/>
                        <Route path="inventory" element={<Inventory />}/>
                        <Route path="inventory/:id" element={<EditInventory />}/>
                        <Route path="spaces/:id" element={<EditSpaces/>}/>
                        <Route path="createInventory" element={<CreateInventory />}/>
                        <Route path="owners" element={<Owners />} />
                        <Route path="owners/create" element={<CreateOwner />} />
                        <Route path="owners/:id" element={<OwnersProperties />} loader={ownersPropertiesLoader}/>
                        <Route path="spaces" element={<Spaces />}/>
                        <Route path="components" element={<Components />}/>
                        <Route path="maintenances" element={<Maintenances />} />
                        <Route path="access" element={<LayoutAccess />}>
                            <Route index element={<CurrentAccess/>}/>
                            <Route path="add" element={<AddAccess/>}/>
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </>
    ))

    const queryClient = new QueryClient()

    const store = createStore({
        authName:'_auth',
        authType:'cookie',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'https:'
    })

    return(
        <QueryClientProvider client={queryClient}>
            <AuthProvider store={store}>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    )
}