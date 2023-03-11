import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios"
import {setHeaders, url} from "./registerApi"

///fetch data from backend
export const productsFetch = createAsyncThunk(
    "products/productsFetch", () => {
        //const promise = axios.get('http://localhost:5000/products')  //json
        const promise = axios.get(`${url}/produtos`) 
        const dataPromise = promise.then((response) => response.data)
        console.log(dataPromise)
        return dataPromise


        //const response = await axios.get('http://localhost:5000/products')
        //return response?.data
    }
)


///delete data in db
export const productsDelete = createAsyncThunk(
    "products/productsDelete", 
    async (id) => {
        try {
            const response = await axios.delete(
                `${url}/produtos/${id}`, 
                setHeaders()
            );
            return response.data
            
        } catch (error) {
            console.log(error);
        }    
    }
);


const initialState = {
    items: [],
    status: null,
    createStatus: null,
    deleteStatus: null,
    editStatus: null, 
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = "pending"
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = "success"
            state.items = action.payload
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = "rejected"
        },
        /////
        /*
        [productsCreate.pending]: (state, action) => {
            state.createStatus = "pending"
        },
        [productsCreate.fulfilled]: (state, action) => {
            state.createStatus = "success"
            state.items.push(action.payload)// push the product from api to array
        },
        [productsCreate.rejected]: (state, action) => {
            state.createStatus = "rejected"
        },
        */
        /////
        [productsDelete.pending]: (state, action) => {
            state.deleteStatus = "pending"
        },
        [productsDelete.fulfilled]: (state, action) => {
            state.deleteStatus = "success"
            const newList = state.items.filter((item) => item._id !== action.payload._id)
            state.items = newList   
            
        },
        [productsDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected"
        },
        ///
        /*
        [productsEdit.pending]: (state, action) => {
            state.editStatus = "pending"
        },
        [productsEdit.fulfilled]: (state, action) => {
            state.editStatus = "success"
            const updatedProducts = state.items.map((product) => 
            product._id === action.payload._id ? action.payload : product)
            state.items = updatedProducts;   
            
        },
        [productsEdit.rejected]: (state, action) => {
            state.editStatus = "rejected"
     
           },
        */}
    
})


export default productSlice.reducer;

