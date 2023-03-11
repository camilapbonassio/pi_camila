import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {  savePaymentMethod } from '../features/cartSlice';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';



    
const Payment = () => {
  const cart = useSelector(state => state.cart);
  console.log(cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  if(!shippingAddress) {
    navigate("/shipping")
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  
  
  const dispatch = useDispatch()
 
  const submitHandler =(e) => {
    e.preventDefault ()
    //console.log('submit')
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  



  return (
    <div>
        <Row>
            <Col md={12} className="login-form-container">
              <CheckOutSteps step1 step2 step3 />
                <h1 className='mb-4 mt-4'>Forma de pagamento </h1>
                
                <Form onSubmit={submitHandler}>
                <Form.Group >
                    <Form.Label as = 'legend'> Selecione a forma de pagamento</Form.Label> 
                    <Col>
                    <Row>
                        <Form.Check
                        type ='radio'
                        label='PayPal'
                        id ='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                      </Row>
                      <Row>

                         <Form.Check
                        type ='radio'
                        label='Pix'
                        id ='Pix'
                        name='paymentMethod'
                        value='Pix'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        </Row>

                      </Col>
                   
                    
                      
                    </Form.Group>
                    <Row>
                    <Button type="submit" class="btn btn-primary" variant="primary">
                        Continuar
                      </Button>
                    </Row>

                    
               
                </Form>
                
            </Col>

        </Row>
    </div>
  )
}

export default Payment 

