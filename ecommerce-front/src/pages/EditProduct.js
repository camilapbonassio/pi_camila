import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
//import { productsEdit } from '../features/productSlice';
import { PrimaryButton } from './CommonStyled';
import axios from 'axios';
import { setHeaders, url } from '../features/registerApi';


export default function EditProduct({prodId}) { ///alterar nome da função //recebe req.id de ProductsList
  const [open, setOpen] = React.useState(false);

////
//const dispatch = useDispatch();
const {items, editStatus} = useSelector(state => state.products)


    const [image, setImage] = useState("")
    const [currentProd, setCurrentProd] = useState({});
    const [previewImg, setPreviewImg] = useState("");
        //console.log(productImg)
    const [item, setItem] = useState("");
    const [desc, setDesc] = useState("");
    const [valor, setValor ] = useState("");
    const [categoria, setCategoria ] = useState("")
    const [produtor, setProdutor ] = useState("")
    

    const handleProductImageUpload = (e) => {
      setImage(e.target.files[0])
       
    };


          const changeOnClick = (e) =>{
            e.preventDefault();

            const formData = new FormData()
            
            formData.append("image", image) //mesmo nome
            formData.append("item", item)
            formData.append("desc", desc)
            formData.append("valor", valor)
            formData.append("categoria", categoria)
            formData.append("produtor", produtor)
         
            
            console.log(formData)
            
            axios
            .put(`${url}/produtos/${prodId}`, formData, setHeaders())
            .then((res) => res.data)
            .catch((err) => {
              console.log(err)
            })
            
            
      }
          
                


  const handleClickOpen = () => {

    console.log(prodId)
    
    setOpen(true);
    let selectedProd = items.filter(item => item._id === prodId)
    selectedProd = selectedProd[0]
    console.log("produtos",selectedProd)
    
    //console.log(selectedProd)
    setCurrentProd(selectedProd)
    setPreviewImg(selectedProd.img)
    setImage("")
    setItem(selectedProd.item)
    setDesc(selectedProd.desc)
    setValor(selectedProd.valor)        
    setCategoria(selectedProd.categoria)       
    setProdutor(selectedProd.produtor)
    
            

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit variant="outlined" onClick={handleClickOpen}>
        Edit
      </Edit>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          
        <styledCreateProduct>
        <StyledForm onSubmit={changeOnClick} encType="multipart/form-data">
            <h3>Editar um Produto</h3>

            <input 
            type="file" 
            name="image" 
            onChange= {handleProductImageUpload}
            required/>

            <select onChange={(e) => setProdutor(e.target.value)} value={produtor} required>
                <option value=""> Selecionar produtor</option>
                <option value = "Valéria">Valéria</option>
                <option value="Tomie">Tomie</option>
                <option value="Edson">Edson</option>
                <option value="Ana do Mel"> Ana do Mel</option>
            </select>

            <input 
            type="text" 
            placeholder='nome'
            value = {item}
            required
            onChange={(e) => setItem(e.target.value)}/>

            <input 
            type="text" 
            placeholder='Curta decrição'
            value = {desc}
            required
            onChange={(e) => setDesc(e.target.value)}/>

            <input 
            type="text" 
            placeholder='Valor'
            value = {valor}
            required
            onChange={(e) => setValor(e.target.value)}/>

            <input 
            type="text" 
            placeholder='Categoria'
            value = {categoria}
            required
            onChange={(e) => setCategoria(e.target.value)}/>

            <PrimaryButton type ="submit">
                {editStatus === "pending" ? "Submitting" : "Submit"}
            </PrimaryButton>

            <ImagePreview>
                    {previewImg? (
                        <img src={previewImg} alt="img"/>
                        ): (
                            <p> Image preview will appear here!</p>
                        )}

            </ImagePreview>

            </StyledForm>


           
            
    </styledCreateProduct>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

///styled components

const Edit = styled.button`
border: none;
outline: none;
padding: 3px 5px;
color: white;
border-radius: 3px;
cursor: pointer;
background-color: purple;
`;

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