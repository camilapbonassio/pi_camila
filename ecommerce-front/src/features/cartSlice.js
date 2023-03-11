import {createSlice} from "@reduxjs/toolkit"
//import{toast} from "react-toastify"

const initialState = {
    cartItems: sessionStorage.getItem("cartItems")
    ? JSON.parse(sessionStorage.getItem("cartItems")):[],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    shippingAddress: sessionStorage.getItem("shippingAddress")
    ? JSON.parse(sessionStorage.getItem("shippingAddress")):[],
    paymentMethod: sessionStorage.getItem("paymentMethod")
    ? JSON.parse(sessionStorage.getItem("paymentMethod")):[],
    
   
    
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
            
        },

        saveShippingAddress(state, action){
            //console.log(action.payload)
            const data = action.payload
            console.log(data)
            state.shippingAddress = data;
            sessionStorage.setItem("shippingAddress", JSON.stringify(state.shippingAddress))
        },
        savePaymentMethod(state, action){
            //console.log(action.payload)
            const data = action.payload
            console.log(data)
            state.paymentMethod = data;
            sessionStorage.setItem("paymentMethod", JSON.stringify(state.paymentMethod))
        },
        
      
        
    }
})



    

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals, saveShippingAddress, savePaymentMethod} =cartSlice.actions;
export default cartSlice.reducer;