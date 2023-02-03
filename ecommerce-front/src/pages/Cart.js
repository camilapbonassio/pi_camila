import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Cart.css"
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import PayButton from './PayButton';


const Cart = ()=> {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getTotals());
    }, [cart]);
    
    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem))
    }

    const handleIncreaseCart = (cartItem) =>{
        dispatch(addToCart(cartItem))
    };

    const handleClearCart = () => {
        dispatch(clearCart())
    };

    return(
        <div className='cart-container'>

            <h2></h2>
            {cart.cartItems.length === 0 ? (
                <div className="cart-empty">
                <p>Seu carrinho está vazio</p>
                <Link to="/products"><span className='start-shopping'>Comece a comprar</span></Link>
                </div>) : (
                    <div>
                    <div className='titles'>
                        <h3 className='product-title'>Produto</h3>
                        <h3 className='price'>Preço</h3>
                        <h3 className='quantity'>Quantidade</h3>
                        <h3 className='total'>Total</h3>
                    </div>
                    
                    <div className='cart-items'>
                        {cart.cartItems?.map((cartItem) => (
                            <div className='cart-item' key={cartItem._id}>
                                <div className='cart-product'> 
                                    <img src={`http://localhost:5000/images/${cartItem?.img}`} alt={cartItem.item} />
                                    <div>
                                        <h3>{cartItem.item}</h3>
                                        <p></p>
                                        <button onClick= {() => handleRemoveFromCart(cartItem)}>Remover</button>
                                    </div>
                                </div>
                                
                                <div className='cart-product-price'>{cartItem.valor}</div>
                                
                                <div className='cart-product-quantity'>
                                    <button onClick = {() => handleDecreaseCart(cartItem)}>-</button>
                                    <div className ='count'>{cartItem.cartQuantity}</div>
                                    <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                                </div>
                                
                                <div className='cart-product-total-price'>
                                {cartItem.valor * cartItem.cartQuantity}
                                </div>

                            </div>
                        ))}
                    </div>
                    
                    <div className='cart-summary'>
                        <button className='clear-cart' onClick={() => handleClearCart()}>Esvaziar</button>
                        <div className='cart-checkout'>
                            <div className='subtotal'>
                                <span>Sub-total</span>
                                <span className='amount'>{cart.cartTotalAmount}</span>
                            </div>
                            
                            <div>
                                <p>Taxas de entrega serão calculadas no momento do pagamento</p>
                                {auth._id? ( 
                                <PayButton cartItems = {cart.cartItems} />)
                                 : 
                                (<button className='cart-login' onClick={()=> navigate("/login")}
                                >
                                    Login para finalizar a compra
                                    </button>
                                )}
                                
                            </div>

                            <div className='start-shopping'>
                                <Link to="/products">
                                <span className='continue-shopping'>Continue comprando</span>
                                </Link>
                                    
                            </div>
                                
                        </div>
                    </div>
                </div>
                   
                )}


        </div>

    )

}

export default Cart