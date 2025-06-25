import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AppContextProvider from './context/AppContext.jsx';
import { BrowserRouter } from 'react-router-dom'; // Add this
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter> {/* Add this */}
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </BrowserRouter> {/* Add this */}
    </React.StrictMode>
);