
import './App.css';
//import 'react-toastify/dist/ReactTostify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from "./pages/Cart"
import Register  from './pages/Register';
import CheckOutSuccess from './pages/CheckOutSuccess';
import Dashboard from './pages/Dashboard';
import ProductsDashboard from './pages/ProductsDashboard';
import Summary from './pages/Summary'
import CreateProduct from './pages/CreateProduct';
import ProductsList from './pages/ProductsList';
import Users from './pages/Users';
import Orders from './pages/Orders';
import ProductDetails from './pages/productDetails';
import OrderDetails from './pages/OrderDetails';
import UserProfile from './pages/UserProfile';
import ProductsView from "./pages/ProductsView"
//import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       
      <Navigation />
      <Routes>
        <Route index element = {<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} /> 
        <Route path="/order/:id" element={<OrderDetails />} /> 
        <Route path="/user/:id" element={<UserProfile />} /> 

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        
        
        <Route path="/products" element={<Products />} />

        <Route path = "/product-view/:id" element={<ProductsView />} />
        
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
        
        <Route path="/admin" element={<Dashboard  />}>
          
          <Route path="productsdash" element = {<ProductsDashboard />}>
            <Route index element= {<ProductsList  />} />
            <Route path="create-product" element = {<CreateProduct  />} />
          </Route>
          
          <Route path="summary" element = {<Summary />} />
          
          <Route path="users" element = {<Users />} />
          
          <Route path="orders" element = {<Orders />} />
        
        </Route>
        
        <Route path="*" element = {<Home />}/>
        
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
