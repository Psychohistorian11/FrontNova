import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { LogIn } from './LogInComponent/LogIn';
import { Home } from './Views/Home/Home';
import { Inventory } from './Views/Inventory/Inventory';
import { Owners } from './Views/Owners/Owners';
import { Update } from './Views/Update/Update';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/Home" element={<Home />}/>
        <Route path="Inventory" element={<Inventory />}/>
        <Route path="/Owners" element={<Owners />}/>
        <Route path="/Update" element={<Update />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
