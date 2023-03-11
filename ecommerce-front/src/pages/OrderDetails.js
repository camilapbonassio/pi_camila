
import React, { useState } from 'react'
import {useParams} from "react-router-dom"
import styled from 'styled-components';
import { useEffect } from 'react';
import { url, setHeaders } from '../features/registerApi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Alert, Button, Col, Container, Form, Row, Card, ListGroup, Image, ListGroupItem} from "react-bootstrap";




const OrderDetails = () => {
  const params = useParams();
  console.log(params)

  const [orders, setOrders] = useState('')
  const [loading, setLoading] = useState(false);

  

  //// recebe o params.id e manda request para o servidor. A resposta é armazanada na varipavel order. 
  useEffect(() =>{
    axios.get(`${url}/orders/find/${params.id}`)
    .then(res=>{
      console.log(res)
      setOrders(res.data)
      console.log(orders)
    })
    .catch(err => {
      console.log(err)
    })
    }, [])
    //console.log(data)
    //setOrders(data)
    //console.log(orders)
    //const {subTotal, orderItems, userId, shippingAddress} = data
    //console.log(subTotal, orderItems, userId, shippingAddress)
    //setOrders(subTotal, orderItems, userId, shippingAddress)
    return (


      
    
      <Container>

      <Row>
     
      <Col md={3}></Col>
      <Col md={6} className="login-form-container">
      <h1 className='mb-4 mt-4'>Confirmação do pedido</h1>
        <ListGroup as="ol" variant='flush'>

        <ListGroup.Item as="li" >
          <div className="ms-2 me-auto ">
          <div className='d-flex justify-content-between align-items-start'>
            <strong>Dados de contato </strong> 
          </div>
          <div className='d-flex justify-content-between align-items-start'>
          <div className='d-flex justify-content-between align-items-start'>
              {orders?.userId?.name}, 
              {orders?.userId?.email}
            </div>
          
          </div>
          </div>
          </ListGroup.Item>
         
          <ListGroup.Item as="li" >
          <div className="ms-2 me-auto ">
          <div className='d-flex justify-content-between align-items-start'>
            <strong>Endereço </strong> 
          </div>
          <div className='d-flex justify-content-between align-items-start'>
          <div className='d-flex justify-content-between align-items-start'>
              {orders?.shippingAddress?.address}, 
              {orders?.shippingAddress?.city},
              {orders?.shippingAddress?.postalCode},
              {orders?.shippingAddress?.country}
            </div>
          
          </div>
          </div>
          </ListGroup.Item>

          <ListGroup.Item as="li">
          <div className="ms-2 me-auto ">
          <div className='d-flex justify-content-between align-items-start'>
          <strong>Método de pagamento </strong> 
          </div>
          <div className='d-flex justify-content-between align-items-start'>
              {orders.paymentMethod}
            </div>
            </div>
          </ListGroup.Item>
          

          <ListGroup.Item>
          <div className="ms-2 me-auto ">
          <div className='d-flex justify-content-between align-items-start'>
            <strong>Seu pedido</strong>
            </div>
            {orders?.orderItems?.length === 0 ? 
            <p> Your cart is empty </p>:
            (
              
              <ListGroup variant="flush">


                {orders?.orderItems?.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                    
                      <Col md={2}></Col>
                      <Col>Item</Col>
                      <Col> Quantidade</Col>
                      <Col>Valor</Col>
                      

                    </Row>
                    <Row>
                      <Col md={2}>
                        <Image src={`http://localhost:5000/images/${item?.img}`} alt={item.item} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>{item.item}</Link>
                      </Col>
                      <Col >
                        {item.cartQuantity} 
                      </Col>
                      <Col>
                      R$ {item.cartQuantity * item.valor}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            </div>
          </ListGroup.Item>

         


        </ListGroup>
      </Col>
      
    </Row>

    </Container>





    
  
    )}
   
  

export default OrderDetails;
