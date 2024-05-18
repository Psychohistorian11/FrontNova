import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import './index.css';
import { RouterProvider } from 'react-router-dom/dist';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'; 
import { LogIn } from './Components/LogIn';
import { Home } from './Views/Home/Home';
import { CreateInventory } from './Views/CreateInventory/CreateInventory';
import { Owners, loader as ownersLoader } from './Views/Owners/Owners';
import { Inventory } from './Views/Inventory/Inventory';
import { Spaces } from './Views/CreateInventory/Spaces';
import { Components } from './Views/CreateInventory/Components';
import { Layout } from './Components/Layout'
import { Access } from './Views/Access/Access';
import { OwnersProperties, loader as ownersPropertiesLoader} from './Views/Owners/OwnersProperty';


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/login" element={<LogIn />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path="CreateInventory" element={<CreateInventory/>}/>
      <Route path="owners" element={<Owners />} loader={ownersLoader}/>
      <Route path="owners/:id" element={<OwnersProperties />} loader={ownersPropertiesLoader}/>
      <Route path="Inventory" element={<Inventory />}/>
      <Route path="spaces" element={<Spaces />}/>
      <Route path="components" element={<Components />}/>
      <Route path="access" element={<Access />}/>
    </Route>
  </>
))

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>

  
);
