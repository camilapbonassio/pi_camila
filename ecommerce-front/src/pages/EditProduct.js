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
import { useEffect } from 'react';


export default function EditProduct({prodId}) { ///alterar nome da função //recebe req.id de ProductsList
  const [open, setOpen] = React.useState(false);

////
//const dispatch = useDispatch();
const {items, editStatus} = useSelector(state => state.products)

   
    ///multer
    const [image, setImage] = useState("")

    const [currentProd, setCurrentProd] = useState({});
    const [previewImg, setPreviewImg] = useState("");
    const [item, setItem] = useState("");
    const [desc, setDesc] = useState("");
    const [valor, setValor ] = useState("");

     ///categories
      const [cat, setCat ] = useState([{'id': '', 'name': ''}])
      const [categorias, setCategorias ] = useState("")


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
            console.log(cat)
          }) 
        .catch(err => {
            console.log(err)
          })
        
        }, [])


      const handleProductImageUpload = (e) => {
        setImage(e.target.files[0])
        
      };


          const changeOnClick = (e) =>{
            e.preventDefault();

            const formData = new FormData()
            
            formData.append("image", image) //multer: image (mesmo nome)
            formData.append("item", item)
            formData.append("desc", desc)
            formData.append("valor", valor)
            formData.append("categorias", categorias) //categories
            
            console.log(categorias)
            
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
    //setCat("")       
   
    
            

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

          <select value={categorias} onChange={(e) => setCategorias(e.target.value)} required>
              <option value=""> Selecionar</option>
              {cat.map(c =>(
              <option  value = {c._id}>{c.name}</option>
              ))}
              
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

            

            <PrimaryButton type ="submit">
                {editStatus === "pending" ? "Submitting" : "Submit"}
            </PrimaryButton>

            <ImagePreview>
                    {previewImg? (
                        <img src={`http://localhost:5000/images/${previewImg}`} alt="img"/>
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