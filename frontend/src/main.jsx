import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ToastContainer/>
    <RouterProvider router={router}/>

    </AuthProvider>
  </StrictMode>,
)
