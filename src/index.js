import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import 'leaflet/dist/leaflet.css';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: measure performance
// reportWebVitals();
