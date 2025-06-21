import { createRoot } from 'react-dom/client'
import { AppContextProvider } from './context/AddContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
   </BrowserRouter>
   </StrictMode>
  
)
