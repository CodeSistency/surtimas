import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import { add } from 'date-fns';

function Card2 (props) {

  const { cart, addProductToResults, removeFromCart } = useContext(CartContext);

  function cartIcon() {
    const alreadyInCart = cart.some(item => item.id === props.product.id)
    if(alreadyInCart) {
        return <IoCartSharp className="ri-shopping-cart-fill cart right" onClick={() => removeFromCart(props.product.id)}/>
    } else {
        return <IoCartOutline className="cart" onClick={() => addProductToResults(props.product)}/>
    }
}

  

  function iconCart(){
    if(cart){
      <div className="cart" onClick={addProductToResults(props.product)}>
        <IoCartOutline  />
      </div>
      
    }else{
      <div className="cart" onClick={addProductToResults(props.product)}>
        <IoCartSharp />
      </div>
      
    }
  }

  return (
    <div class="product-card">
    <img src={props.img} alt="Product Image" class="product-image" />
    <div class="product-details">
      <h2 class="product-title">{props.titulo}</h2>
      <p class="product-price">{props.precio}</p>
    </div>
    <button class="buy-button">Buy</button>
  </div>
  )
}

export default Card2