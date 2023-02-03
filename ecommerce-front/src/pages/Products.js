import React from 'react';
import "./Products.css"
import { useSelector } from 'react-redux';
//import { useGetAllProductsQuery } from '../features/productsApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';
import {useParams} from "react-router-dom"
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

function Products () {

  const params = useParams();
 
 const {items: data, status} = useSelector( state => state.products)
  //const {data, error, isLoading} = useGetAllProductsQuery();  // endpoint para json 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    navigate("/cart")

  }
  
    return (
    <div className='products-container'>
        {status === "success" ? (
            <>
                
            <h2>Nossos Produtos</h2>
            <div className='products'>
                {data?.map((product) => (
                    <div key={product._id} className = "product">
                        
                        <h3>{product.item}</h3>
                        <img src = {`http://localhost:5000/images/${product?.img}`} alt ={product.item}/>
                        <div className="detalhes">
                            <span>{product.desc}</span>
                            <span className='price'>{product.valor}</span>    
                        </div>
                        
                        <button onClick = {() => navigate(`/product-view/${product._id}`)}>View</button> 
                        <button onClick = {()=> handleAddToCart(product)}>Adicionar ao carrinho</button>
                    </div>
                ))}
            </div>
            </>
             ) : status === "pending" ? (
                <p>Loading...</p>
              ) : (
                <p>Unexpected error occured...</p>
              )}
            </div>
          );
        };
        
                
  

export default Products;

const View = styled.button`
background-color: rgb(114, 225, 40);
`;