import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import 'stream-chat-react/dist/css/v2/index.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = '812340884128-posbk0pqdrklv3qp1tbrnve1avnf4lmt.apps.googleusercontent.com';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
    {/* <GoogleOAuthProvider clientId={clientId}> */}
        <App />
    {/* </GoogleOAuthProvider> */}
    </AppProvider>
  </StrictMode>,
)
