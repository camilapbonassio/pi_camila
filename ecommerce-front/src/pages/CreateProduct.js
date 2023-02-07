import React from 'react';
import styled from "styled-components";
import { useState } from 'react';
//import { useDispatch } from 'react-redux';
import { PrimaryButton } from "./CommonStyled";
//import { productsCreate } from '../features/productSlice';
import axios from 'axios';
import { url } from '../features/registerApi';
//import { CategoriesDropDown } from '../components/CategoriesDropDown';
import { useEffect } from 'react';


const CreateProduct = () => {
    //const dispatch = useDispatch();
  

//multer
    const[filename, setFileName] = useState("")
///produto      
    const [item, setItem] = useState("");
    const [desc, setDesc] = useState("");
    const [valor, setValor ] = useState("");
///categories
    const [cat, setCat ] = useState([{'id': '', 'name': ''}])
    const [categorias, setCategorias ] = useState("")
    

    const handleProductImageUpload = (e) => {
       setFileName(e.target.files[0])
    };

///get categories
useEffect(() =>{
  axios
  .get(`${url}/categories`)
    .then(res => {
      console.log(res)
    //const [cat1, cat2, cat3, cat4]= res.data
      setCat(
        res.data
      )
    }) 
  .catch(err => {
      console.log(err)
    })
   
  }, [])



/*
    ///valida a categoria
const category = await Categorias.findById(req.body.categorias)
if(!category) return res.status(400).send("Invalid Category")
    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(
          productsCreate({
            item,
            desc,
            valor,
            produtor,
            categoria,

          })
          )
    }

      e.preventDefault();
              dispatch(
                  productsEdit({
                      img: filename,
                      product: {
                          ...currentProd,
                          item: item,
                          valor: valor,
                          desc: desc,
                          categoria: categoria,
                          produtor: produtor,
                    },
                  })    
                )}

    
    
  */ 

const changeOnClick = (e) =>{
  e.preventDefault();


const formData = new FormData()

formData.append("image", filename) //mesmo nome
formData.append("item", item)
formData.append("desc", desc)
formData.append("valor", valor)
formData.append("categorias", categorias) //categories

console.log(formData)

axios
.post(`${url}/produtos`, formData)
.then((res) => console.log("requisicao",res.data))
.catch((err) => {
  console.log(err)
})

console.log(categorias)
};

  return (
    <styledCreateProduct>
        <StyledForm onSubmit = {changeOnClick} encType="multipart/form-data">
            <h3>Crie um Produto</h3>
            <input 
            type="file" 
            name = "image"
            //accept="image/" 
            onChange= {handleProductImageUpload}
            required/>

          <select value={categorias} onChange={(e) => setCategorias(e.target.value)} required>
              <option value=""> Selecionar</option>
              {cat.map(c =>(
              <option  value = {c._id}>{c.name}</option>
              ))}
              
          </select>
            
            <input 
            type="text" 
            placeholder='nome'
            required
            onChange={(e) => setItem(e.target.value)}/>

            <input 
            type="text" 
            placeholder='Curta decrição'
            required
            onChange={(e) => setDesc(e.target.value)}/>

            <input 
            type="text" 
            placeholder='Valor'
            required
            onChange={(e) => setValor(e.target.value)}/>


            <PrimaryButton type ="submit">Submit</PrimaryButton>

            

            </StyledForm>


           
            
    </styledCreateProduct>
     
  )
}

export default CreateProduct;


//// styler components

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 0 0;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;