import React from 'react';
import { Col, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import { Link } from 'react-router-dom';
import "./Home.css"
import { useEffect } from 'react';
import { url } from '../features/registerApi';
import axios from 'axios';
import { useState } from 'react';

function Home() {


    const[records, setRecords] = useState([])

    useEffect(() =>{
        axios.get(`${url}/imagens`)
        .then(res => {
          //return res.data
          console.log(res)
          setRecords(
           res.data
          )
          console.log(records)
        })
        .catch(err => {
          console.log(err)
        })
       
      }, [])

      

//



  return (
    <div>
        
        <div className='home-banner'>
        {records?.map( r => (
            <img src={`http://localhost:5000/images/${r?.banner}`} alt=""/>
            ))}
        </div>
        
        <div className='featured-products-container mt-4'>
            <h2>Conheça nossos produtos</h2>
            
        </div>
        
        <div className='sale-banner-container mt-4'>
        {records?.map( r => (
            <img src={`http://localhost:5000/images/${r?.produtos}`} alt="uma imagem" />
            ))}
        </div>
        
        <div className='recent-products-container container mt-4'>
            <h2>Categorias</h2>
                <Row>
                    
                            <Col md={4}>
                            {records?.map( r => (
                                <div style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://localhost:5000/images/${r?.categoria1})`, gap: "10px"}} className="category-tile">
                                    Vegetais
                                </div>
                                ))}
                            </Col>
                        

                        
                            <Col md={4}>
                                {records?.map( r => (
                                <div style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://localhost:5000/images/${r?.categoria2})`, gap: "10px"}} className="category-tile">
                                    Mel
                                </div>
                                ))}
                            </Col>
                       
                       
                            <Col md={4}>
                                {records?.map( r => (
                                <div style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://localhost:5000/images/${r?.categoria3})`, gap: "10px"}} className="category-tile">
                                    Frutas
                                </div>
                                ))}
                            </Col>
                       
                    
                </Row>
        </div>
    
    </div>
    
  )
}

export default Home;