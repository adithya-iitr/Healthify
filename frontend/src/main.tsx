import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = '812340884128-posbk0pqdrklv3qp1tbrnve1avnf4lmt.apps.googleusercontent.com';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
        <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
