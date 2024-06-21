import React, { useEffect } from 'react';
import './App.css';
import './responsive.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from './redux/actions/ProductActions';
import { listOrders } from './redux/actions/OrderActions';
import PrivateRouter from './PrivateRouter';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import CategoriesEditScreen from './screens/CategoriesEditScreen';
import OrderScreen from './screens/OrderScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import AddProduct from './screens/AddProduct';
import UserScreen from './screens/UserScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import LoginScreen from './screens/LoginScreen';
import NotFound from './screens/NotFound';
import DiscountsScreen from './screens/DiscountsScreen';
import DiscountsEditScreen from './screens/DiscountsEditScreen';
import MainProducts from './components/products/MainProducts';


function App() {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
      dispatch(listOrders())
    }
  }, [dispatch, userInfo])
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<PrivateRouter><HomeScreen /></PrivateRouter>} />
        <Route path="/search/:keyword" element={<PrivateRouter><ProductScreen /></PrivateRouter>} />
        <Route path="/products" element={<PrivateRouter><ProductScreen /></PrivateRouter>} />
        <Route path="/categories" element={<PrivateRouter><CategoriesScreen /></PrivateRouter>} />
        <Route path="/category/:categoryId/edit" element={<PrivateRouter><CategoriesEditScreen /></PrivateRouter>} />
        <Route path="/discounts" element={<PrivateRouter><DiscountsScreen /></PrivateRouter>} />
        <Route path="/discount/:id/edit" element={<PrivateRouter><DiscountsEditScreen /></PrivateRouter>} />
        <Route path="/orders" element={<PrivateRouter><OrderScreen /></PrivateRouter>} />
        <Route path="/order/:orderId" element={<PrivateRouter><OrderDetailScreen /></PrivateRouter>} />
        <Route path="/addproduct" element={<PrivateRouter><AddProduct /></PrivateRouter>} />
        <Route path="/users" element={<PrivateRouter><UserScreen /></PrivateRouter>} />
        <Route path="/product/:productId/edit" element={<PrivateRouter><ProductEditScreen /></PrivateRouter>} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
