// import { useContext, useEffect } from 'react'
// import LoginFromPage from './Pages/Form/LoginFormPage.jsx/LoginFromPage'
// import SignupFromPage from './Pages/Form/SignupFromPage/SignupFromPage'
// import NotFoundPage from './Pages/NotFoundPage/NotFoundPage'
// import { Route, Routes, useNavigate } from 'react-router-dom'
// import ProductListPage from './Pages/Produts/ProductListPage'
// import ProductDetailPage from './Pages/Produts/ProductDetailPage'
// import AdminDashboard from './Components/AdminPanel/adminDrawer'
// import { AuthContext } from './context/AuthContext'



// const nav = useNavigate()

// function App() {
//   const { user } = useContext(AuthContext)
//   useEffect(() => {
//     if (user?.role === "admin") nav("/admin")
//   }, [user])


//   return (
//     <>

//       <Routes>
//         <Route path='/productListpage' element={<ProductListPage />} />
//         <Route path='/signup' element={<SignupFromPage />} />
//         <Route path='/login' element={<LoginFromPage />} />
//         <Route path='/admin' element={<AdminDashboard />} />
//         {/* <Route path='/admin/products' element={<Raf />} /> */}
//         <Route path='/productDetail/:id' element={<ProductDetailPage />} />
//         <Route path='*' element={<NotFoundPage />} />
//       </Routes>
//     </>
//   )
// }

// export default App


import { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LoginFromPage from './Pages/Form/LoginFormPage.jsx/LoginFromPage';
import SignupFromPage from './Pages/Form/SignupFromPage/SignupFromPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import ProductListPage from './Pages/Produts/ProductListPage';
import ProductDetailPage from './Pages/Produts/ProductDetailPage';
import AdminDashboard from './Components/AdminPanel/adminDrawer';
import CheckoutPage from './Components/checkout/checkoutComp';

function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user]);

  return (
    <Routes>
      <Route path='/home' element={<ProductListPage />} />
      <Route path='/signup' element={<SignupFromPage />} />
      <Route path='/login' element={<LoginFromPage />} />
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/adminPage' element={<CheckoutPage />} />
      <Route path='/productDetail/:id' element={<ProductDetailPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
