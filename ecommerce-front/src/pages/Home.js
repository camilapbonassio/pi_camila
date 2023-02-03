import React from 'react';
import { Col, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import { Link } from 'react-router-dom';
import categories from './categories';
import "./Home.css"

function Home() {
  return (
    <div>
        <div className='home-banner'>
            <img src={require("../images/img-6.jpg")} alt=""></img>
        </div>
        
        <div className='featured-products-container mt-4'>
            <h2>Conheça nossos produtos</h2>
            {/* last products here */}
       
            <div>
                <Link to="/category/all" style={{textAlign: "right", display: "block", textDecoration: "none"}}>Veja mais {">>"}</Link>

            </div>
        </div>
        
        <div className='sale-banner-container mt-4'>
            <img src={require ('../images/img-2.jpg')} alt="uma imagem" />
        </div>
        
        <div className='recent-products-container container mt-4'>
            <h2>Categorias</h2>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px"}} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
        </div>
    
    </div>
    
  )
}

export default Home;