import {createSlice} from "@reduxjs/toolkit"
//import{toast} from "react-toastify"

const initialState = {
    cartItems: sessionStorage.getItem("cartItems")
    ? JSON.parse(sessionStorage.getItem("cartItems")):[],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                //toast.info(`increased ${state.cartItems[itemIndex].item} quantity`, {
                //    position: "bottom-left",
                //});
            } else{
                const tempProduct = { ...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProduct);
                //toast.success(`${action.payload.item}added a new product`, {
                //    position: "bottom-left"
            //});
            
        }
            sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id
            );
            state.cartItems =nextCartItems;
            sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload._id);

            if (state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1;

            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem._id !== action.payload._id
            );
            
            state.cartItems =nextCartItems;
            sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            }
        },

        clearCart(state, action){
            state.cartItems = [];
            sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        getTotals(state, action){
            let {total, quantity} = state.cartItems.reduce (
                (cartTotal, cartItem) =>{
                    const { valor, cartQuantity} = cartItem;
                    const itemTotal = valor * cartQuantity;

                    cartTotal.total += itemTotal
                    cartTotal.quantity += cartQuantity

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );

            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total 
            
        }
        
    }
})



    

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals} =cartSlice.actions;
export default cartSlice.reducer;