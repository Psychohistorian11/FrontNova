import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import './index.css';
import { RouterProvider } from 'react-router-dom/dist';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'; 
import { LogIn } from './LogInComponent/LogIn';
import { Home } from './Views/Home/Home';
import { Inventory } from './Views/Inventory/Inventory';
import { Owners, loader as ownersLoader } from './Views/Owners/Owners';
import { Update } from './Views/Update/Update';
import { Spaces } from './Views/Inventory/Spaces';
import { Components } from './Views/Inventory/Components';
import { Layout } from './Components/Layout'
import { Access } from './Views/Access/Access';
import { OwnersProperties, loader as ownersPropertiesLoader} from './Views/Owners/OwnersProperty';


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/login" element={<LogIn />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path="inventory" element={<Inventory />}/>
      <Route path="owners" element={<Owners />} loader={ownersLoader}/>
      <Route path="owners/:id" element={<OwnersProperties />} loader={ownersPropertiesLoader}/>
      <Route path="update" element={<Update />}/>
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
