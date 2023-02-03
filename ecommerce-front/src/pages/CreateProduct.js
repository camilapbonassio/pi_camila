import React from 'react';
import styled from "styled-components";
import { useState } from 'react';
//import { useDispatch } from 'react-redux';
import { PrimaryButton } from "./CommonStyled";
//import { productsCreate } from '../features/productSlice';
import axios from 'axios';
import { url } from '../features/registerApi';


const CreateProduct = () => {
    //const dispatch = useDispatch();


    const[filename, setFileName] = useState("")
        //console.log(productImg)
    const [item, setItem] = useState("");
    const [desc, setDesc] = useState("");
    const [valor, setValor ] = useState("");
    const [categoria, setCategoria ] = useState("")
    const [produtor, setProdutor ] = useState("")

    const handleProductImageUpload = (e) => {
       setFileName(e.target.files[0])
    };
/*
    
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
formData.append("categoria", categoria)
formData.append("produtor", produtor)

console.log(formData)

axios
.post(`${url}/produtos`, formData)
.then((res) => console.log("requisicao",res.data))
.catch((err) => {
  console.log(err)
})


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

            <select onChange={(e) => setProdutor(e.target.value)} required>
                <option value=""> Selecionar produtor</option>
                <option value = "Valéria">Valéria</option>
                <option value="Tomie">Tomie</option>
                <option value="Edson">Edson</option>
                <option value="Ana do Mel"> Ana do Mel</option>
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

            <input 
            type="text" 
            placeholder='Categoria'
            required
            onChange={(e) => setCategoria(e.target.value)}/>

            <PrimaryButton type ="submit">Submit</PrimaryButton>

            <ImagePreview>
                    {filename? (
                        <img src={""} alt="img"/>
                        ): (
                            <p> Image preview will appear here!</p>
                        )}

            </ImagePreview>

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