import React, { useState } from 'react'
import {useParams} from "react-router-dom"
import styled from 'styled-components';
import { useEffect } from 'react';
import { url, setHeaders } from '../features/registerApi';
import axios from 'axios';

const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("product", product)

  //// recebe o params.id e manda request para o servidor. A resposta é armazanada na varipavel produtos. 
useEffect(() => {
  setLoading(true);
  async function fetchData() {
    try {

      const res = await axios.get( `${url}/produtos/find/${params.id}`, setHeaders());
      setProduct(res.data);
      
    } catch (error) {
      console.log(error)
      
    }
    setLoading(false)
}

fetchData();

}, []);

///renderiza os produtos usando componentes

return (
<StyledProduct>
  <ProductContainer>
    {loading? (
      <p>Loading...</p>
    ) : (
      <>
        <ImageContainer>
          <img src={product.img?.url} alt="product" />
        </ImageContainer>

        <ProductDetailsz>

          <h3>{product.name}</h3>
          <p><span>Produto:</span>{product.item}</p>
          <p><span>Descrição:</span>{product.desc}</p>
          <Price>R${product.valor}</Price>

        </ProductDetailsz>
        </>
    )}
    </ProductContainer>
  </StyledProduct>
  );

 // return <> Product: {params.id} </>;
}

export default ProductDetails;

//////
const StyledProduct = styled.div`
margin: 3rem;
display: flex;
justify-content: center
`;


const ProductContainer = styled.div`
max-width: 500px;
width: 100%;
height: auto;
display: flex;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
border-radius: 5px;
padding: 2rem;
`;

const ImageContainer = styled.div`
flex: 1;
img{
  width: 100%;
}`;

const ProductDetailsz = styled.div`
flex: 2;
margin-left: 2rem;
h3{
  font-size: 35px
}
p span {
  font-weight: bold;
}
`;

const Price = styled.div`
margin: 1rem 0;
font-weight: bold;
font-size: 25px`;

