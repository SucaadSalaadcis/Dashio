import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'jquery';

import "./reusible/i18n.js"; // Import your i18n configuration here

import { BrowserRouter } from 'react-router-dom';

// console.log = console.warn = console.error = () => {}; joogo all the error and warning 

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />

  </BrowserRouter>,
)