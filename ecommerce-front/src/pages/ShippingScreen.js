import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {  saveShippingAddress } from '../features/cartSlice';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { setHeaders, url } from '../features/registerApi';

const ShippingScreen = () => {
  const cart = useSelector(state => state.cart);
  console.log(cart)
  const { shippingAddress } = cart
  console.log(shippingAddress)


  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  console.log( address, city, postalCode, country)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  

  const submitHandler =(e) => {
    e.preventDefault ()
    //console.log('submit')
    dispatch(saveShippingAddress({ address, city, postalCode, country}))
    navigate('/payment')
  }
  



  return (
    <Container>
        <Row>
            <Col md={12} className="login-form-container">
              <CheckOutSteps step1 step2 />
                <h1 className='mb-4 mt-4'>Endereço de entrega</h1>
                <Form onSubmit={submitHandler}>

                <Form.Group className='mb-4' controlId='address'>
                    <Form.Label>Dados de Entrega</Form.Label> 
                    <Form.Control 
                    type="text" 
                    placeholder = "Address"
                    value = {address}  
                    required
                    onChange={(e) => setAddress(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-4' controlId='city'>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder = "City"
                    value = {city}  
                    required
                    onChange={(e) => setCity(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-4' controlId='postalCode'>
                    <Form.Label>CEP</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder = "Postal Code"
                    value = {postalCode}  
                    required
                    onChange={(e) => setPostalCode(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-4' controlId='country'>
                    <Form.Label>País</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder = "Country"
                    value = {country}  
                    required
                    onChange={(e) => setCountry(e.target.value)}/> 
                </Form.Group>

                <Row>
                  <Button type="submit" variant="primary">
                    Continuar
                  </Button>
               </Row>
                </Form>
                
            
            
            
            </Col>

        </Row>
    </Container>
  )
}

export default ShippingScreen 



