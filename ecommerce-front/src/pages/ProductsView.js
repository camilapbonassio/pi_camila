import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';

import { url } from '../features/registerApi'
import styled from "styled-components";
import axios from 'axios';
import { setHeaders } from '../features/registerApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { useState } from 'react';



function ProductsView () {
  let {id} = useParams()
  const[records, setRecords] = useState([])

  
  
  
  
 useEffect(() =>{
  axios.get(`${url}/produtos/find/${id}`)
  .then(response => {
    const { _id, img, item, desc, valor} = response.data
    //return res.data
    setRecords({
      _id,
      img,
      item,
      desc,
      valor
    })
  })
  .catch(err => {
    console.log(err)
  })
 
}, [])



//setRecords(data)
console.log(records.img)

  return(
    
    <div className='products'>
      <div key={records._id} className = "product">
        <h3>{records.item}</h3>
        <img src = {`http://localhost:5000/images/${records?.img}`}  alt ={records.item}/>
        <div className="detalhes">
         
          <span>{records.desc}</span>
          <span className='price'>{records.valor}</span>    
        </div>
      </div>
    </div>

            
  )
}


export default ProductsView;
    



  