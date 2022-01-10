import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from './components/navBar';
import HomeScreen from './screens/homeScreen';
import ProductDetail from './screens/productDetailScreen'
import SearchScreen from './screens/searchScreen';
import LoginScreen from './screens/loginScreen'
import RegisterScreen from './screens/registerScreen'
import BackOfficeScreen from './screens/backOficeScreen'
import { rootState } from './store';
import { AdminProducts } from './screens/adminProductsScreen';

function App() {

  const User = useSelector((state:rootState) => state.User.value)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar/>}>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="products" element={<SearchScreen/>}/>
          <Route path="detail" element={<ProductDetail/>}/>
          <Route path="*" element={<HomeScreen/>}/>
        </Route>
        <Route path="/login" element={<LoginScreen/>}/>
        <Route path="/register" element={<RegisterScreen/>}/>
        {(User.logged && User.role === 'admin') &&
          <Route path="/backoffice/" element={<BackOfficeScreen/> }>
            <Route path="admin-products" element={<AdminProducts/>}/>
            <Route path="admin-users" element={<><h1>Usuarios</h1></>}/>
            <Route path="admin-orders" element={<><h1>Pedidos</h1></>}/>
            <Route path="*"element={<><h1>Resumen</h1></>}/>
          </Route>
        }
        <Route path="*" element={<HomeScreen/>}/>
      </Routes>      
    </div>
  );
}

export default App;