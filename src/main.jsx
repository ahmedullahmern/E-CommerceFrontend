import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import LoaderContextProvider from './context/LoaderContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import { ToastContainer } from 'react-toastify'
import HeaderPage from './Pages/Header/HeaderPage.jsx'
import CartProvider from './context/AddCartContext.jsx'
import CartDrawerComp from './Components/Drawer/CartDrawerComp.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <LoaderContextProvider>
        <AuthContextProvider>
          <HeaderPage />
          <App />
          <ToastContainer />
        </AuthContextProvider>
      </LoaderContextProvider>
      <CartDrawerComp />
    </CartProvider>
  </BrowserRouter>
)
