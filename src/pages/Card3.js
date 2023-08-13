import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import { add } from 'date-fns';
import { Link } from 'react-router-dom';

function Card3 (props) {

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
    <div class="product-card2">
      <Link to={`/productos/${props.id}`} class="product-image-link">
        <img src={props.img} alt="Product Image" class="product-image" >
          
        </img>

      </Link>
    <div class="product-details">
      <h2 class="product-title">{props.titulo}</h2>
      <p class="product-price">{props.precio}</p>
    </div>
    <button class="buy-button-products">Buy</button>
  </div>
  )
}

export default Card3