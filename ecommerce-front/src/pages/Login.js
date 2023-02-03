import React from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import "./Login.css";
import { useDispatch, useSelector } from 'react-redux';
import { loginState } from '../features/authSlice';
import { useNavigate } from "react-router-dom";



function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const auth = useSelector((state)=> state.auth)
    
    console.log(auth)

    ///redireciona usuário para carrinho quando muda o state de auth
    useEffect(()=>{
        if(auth._id){
            console.log(auth._id)
            navigate("/cart")
        }
    }, [auth._id, navigate])


    const[user, setUser] = useState({
        email: "",
        password: "",
    })

    console.log(user)


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loginState(user))
       
    }


    


  return (
    <Container>
        <Row>
            <Col md = {6} className="login-form-container">
                <Form onSubmit={handleSubmit}>
                
                <h1 className='mb-4 mt-4'>Entre na sua conta</h1>
                    
                    <Form.Group className='mb-4'>
                        <Form.Label >E-mail</Form.Label>
                        <Form.Control type="email" placeholder = "Enter email"  required onChange={(e) => setUser({...user, email: e.target.value})}/>
                    </Form.Group>
                
        
                    <Form.Group className='mb-4'>
                        <Form.Label >Senha</Form.Label>
                        <Form.Control type="password" placeholder = "Enter password" required onChange={(e) => setUser({...user, password: e.target.value})}/>
                    </Form.Group>

                    <Form.Group className='mb-4'>
                    <Button type="submit" >
                            {auth.loginStatus === "pending"? "Submitting": "Login"}
                        </Button>

                        
                    {auth.loginStatus === "rejected"? 
                    (<p>{auth.loginError}</p>): null}
                    
                    </Form.Group>
                    
                    <p>
                        Ainda não tem uma conta? <Link to="/register">Crie uma conta</Link>{" "}
                    </p>
                
                </Form>
            </Col>
            <Col md = {6} className="login-image-container">

            </Col>
        </Row>
    </Container>
  )
}


export default Login