import React from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import "./Register.css";
import { useDispatch, useSelector } from 'react-redux';
import { registerState } from '../features/authSlice';
import { useNavigate } from "react-router-dom";



function Register() {
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
        name: "",
        email: "",
        password: "",
    })

    console.log(user)

    

    
    ///
    

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(registerState(user))
       
    }

    return (

    <Container>
        <Row>
            <Col md = {12} className="signup-form-container">
                
                <Form onSubmit={handleSubmit}>
                
                <h1>Cadastro de usuário</h1>
                

                <Form.Group className='mb-4' >
                    <div className='title'><Form.Label><span>Nome</span></Form.Label></div>
                    <Form.Control type="text" placeholder = "Enter name"  required onChange={(e) => setUser({...user, name: e.target.value})}/>
                    </Form.Group>
                    
                    <Form.Group className='mb-4'>
                    <div className='title'><Form.Label><span>E-mail</span></Form.Label></div>
                    <Form.Control type="email" placeholder = "Enter email"  required onChange={(e) => setUser({...user, email: e.target.value})}/>
                    </Form.Group>
                
        
                    <Form.Group className='mb-4'>
                    <div className='title'><Form.Label><span>Senha</span></Form.Label></div>
                    <Form.Control type="password" placeholder = "Enter password" required onChange={(e) => setUser({...user, password: e.target.value})}/>
                    </Form.Group>

                    <Form.Group className='mb-4'>
                    <Button type="submit" >
                            {auth.registerStatus === "pending"? "enviando": "Cadastrar"}                            
                    </Button>

                       
                    </Form.Group>
                   
                    {auth.registerStatus === "rejected"? "usuário já existe": null}
                    

                  

                   
                    
                    <p>
                        Já é cadastrado? <Link to="/login">Faça login</Link>{" "}
                    </p>

                    

                
                </Form>
            </Col>
            
        </Row>
    </Container>
  )
}

export default Register