import React from 'react'
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import "./Navigation.css"
import { logoutUser } from '../features/authSlice';





const Navigation = () => {
  const dispatch = useDispatch();
  const{cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth)
  
  return (

    <nav>
    <div className='div-header-logo'>
      <h2 className="div-header-titulo">Cooperativa de Parelheiros</h2>
    </div>

    <div className='div-header-menu'>
      <Link to="/">
        <span>Home</span>
      </Link>

      <Link to= "/products">
        <span>Produtos</span>
      </Link>

      {auth._id ? ( 
        <Link to = "/admin/productsdash">
        {auth.isAdmin ? 
        <span className='admin'>Admin</span> : null}
        
      
        <span 
          onClick={()=>{
            dispatch(logoutUser(null));
          }}>Sair</span>
          </Link>)
        :
        (<div>
          <Link to="/login"><span>Entrar</span></Link>
          <Link to="/register"><span>Login</span></Link>
        </div>)
      }

      

      <Link to="/cart">
        <div className='nav-bag'>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="currentColor" 
        class="bi bi-cart2" 
        viewBox="0 0 16 16">
        
        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
        </svg>
        </div>
        <span className='bag-quantity'>
          <span>{cartTotalQuantity}</span>
        </span>
      </Link>

     
      
    </div>
  </nav>

    )
  
}

export default Navigation