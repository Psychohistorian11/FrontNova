import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'; 
import { LogIn } from './LogInComponent/LogIn';
import { Home } from './Views/Home/Home';
import { Inventory } from './Views/Inventory/Inventory';
import { Owners } from './Views/Owners/Owners';
import { Update } from './Views/Update/Update';
import { Spaces } from './Views/Inventory/Spaces';
import { Components } from './Views/Inventory/Components';
import { Layout } from './Components/Layout'

import './index.css';
import { RouterProvider } from 'react-router-dom/dist';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/login" element={<LogIn />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path="inventory" element={<Inventory />}/>
      <Route path="owners" element={<Owners />}/>
      <Route path="update" element={<Update />}/>
      <Route path="spaces" element={<Spaces />}/>
      <Route path="components" element={<Components />}/>
    </Route>
  </>
))


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
