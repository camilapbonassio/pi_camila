import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Alert, Button, Col, Container, Form, Row, Card, ListGroup, Image, ListGroupItem} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { setHeaders, url } from '../features/registerApi';
import OrderDetails from './OrderDetails';



const PlaceOrder = () => {
  const cart = useSelector(state => state.cart);
  const auth = useSelector((state) => state.auth)
  console.log(cart)
  const userId = auth._id
  
  // Calculate
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  let shippingPriceCalc = addDecimals(cart.cartTotalAmount > 100? 50 : 0)
  let taxPriceCalc = addDecimals(Number((0.15 * cart.cartTotalAmount ).toFixed(2)))
  let totalPriceCalc = (Number(cart.cartTotalAmount ) + Number(shippingPriceCalc) + Number(taxPriceCalc)).toFixed(2)


  const navigate = useNavigate()
  

  const placeOrderHandler = async(e) => {
    e.preventDefault()
    try {
      const resp = await axios.post(`${url}/orders`, 
        {
          userId,
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          cartTotalAmount: cart.cartTotalAmount,
          shippingPrice: shippingPriceCalc,
          taxPrice: taxPriceCalc,
          totalPrice: totalPriceCalc

        },
        //setHeaders()
        
        );
      console.log(resp.data)
      const {_id} = resp.data
      console.log(_id)

      navigate(`/order/${_id}`)
      
    } catch (error) {
      console.log(error.response)
      console.log(auth._id)
      
    }
   }
    
  
  
  
  return (
    <>
   
    <CheckOutSteps step1 step2 step3 step4 />
    <Row>
      <Col md={2}></Col>
      <Col md={4} >
        <ListGroup as="ol" variant='flush'>
         
          <ListGroup.Item as="li" >
          <div className="ms-2 me-auto ">
          <div className='d-flex justify-content-between align-items-start'>
            <strong>Endereço </strong> 
          </div>
          <div className='d-flex justify-content-between align-items-start'>
              {cart.shippingAddress.address}, 
              {cart.shippingAddress.city},
              {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </div>
            </div>
          </ListGroup.Item>

          <ListGroup.Item as="li">
          <div className="ms-2 me-auto ">
          <div className='d-flex justify-content-between align-items-start'>
          <strong>Método de pagamento </strong> 
          </div>
          <div className='d-flex justify-content-between align-items-start'>
              {cart.paymentMethod}
            </div>
            </div>
          </ListGroup.Item>
          

          <ListGroup.Item>
          <div className="ms-2 me-auto ">
          <div className='d-flex justify-content-between align-items-start'>
            <strong>Seu pedido</strong>
            </div>
            {cart.cartItems.length === 0 ? 
            <p> Your cart is empty </p>:
            (
              
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
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
      
      <Col md={4}>
        <Card>
          <ListGroup >
            <ListGroup.Item>
              <h2>Resumo</h2>
            </ListGroup.Item>
            
            <ListGroup.Item>
              <Row>
                <Col>Sub-total</Col>
                <Col>R${cart.cartTotalAmount}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Taxa de entrega</Col>
                <Col>R${shippingPriceCalc}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Outras taxas</Col>
                <Col>R${taxPriceCalc}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>R${totalPriceCalc}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button 
              type='button' 
              className='btn-block' 
              disabled={cart.cartItens === 0}
              onClick = {placeOrderHandler}>
                Fazer pedido
              </Button>
            </ListGroup.Item>

          </ListGroup>
        </Card>
      </Col>
    </Row>
    

    
      
      
      
    
    </>
  )
}

export default PlaceOrder;