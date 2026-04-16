import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';           // default CRA CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import App from './App';        // your main App component
import reportWebVitals from './reportWebVitals'; // performance monitoring

// Import Bootstrap JS after React
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// Create root and render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: start measuring performance
// Pass a function to log results or send to analytics
reportWebVitals();
