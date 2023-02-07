import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productsDelete } from '../features/productSlice';
import EditProduct from './EditProduct';



export default function ProductsList() {

const navigate = useNavigate()
const dispatch = useDispatch()
const {items} = useSelector((state) => state.products)

const rows = items && items.map(
 
  item => {
    return{
      id: item._id,
      produtor: item.produtor,
      item: item.item,
      desc: item.desc,
      valor: item.valor,
      categoria: item.categoria,
      img: item.img
    }
  })


console.log(items)

const columns = [
  { field: 'id', headerName: 'ID', width: 220 },
  
  { field: 'item', headerName: 'Nome', width: 130 },
  {
    field: 'desc',
    headerName: 'Descrição',
    width: 130,
  },
  {
    field: 'valor',
    headerName: 'Valor',

    width: 130,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 170,
    renderCell: (params) => {
      //console.log(params)
      console.log(params.row.id)
      return (
        <ImageContainer>
          <Actions>

            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <EditProduct prodId = {params.row.id}/>
           
          </Actions>
        </ImageContainer>
      )
    } },

  ];

  const handleDelete = (id) => {
    console.log(id)
    dispatch(productsDelete(id))
  }

 
      


  return (

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}






/////////
const ImageContainer = styled.div`
img{
    height: 40px
}
`;


const Actions = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
button{
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
}
`;

const Delete = styled.button`
background-color: rgb(255, 77, 73);
`;

const View = styled.button`
background-color: rgb(114, 225, 40);
`;

