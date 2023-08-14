import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import { add } from 'date-fns';
import { Link } from 'react-router-dom';
import ReactWhatsapp from 'react-whatsapp';

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

  



  return (
    <div class="product-card">
      <Link to={`/productos/${props.id}`} class="product-image-link">
        <img src={props.img} alt="Product Image" class="product-image" >
          
        </img>

      </Link>
    <div class="product-details">
      <h2 class="product-title">{props.titulo}</h2>
      <p class="product-price">{props.precio}<small style={{color: 'black'}}>$</small></p>
      {cartIcon()}
    </div>
    <ReactWhatsapp 
      class="buy-button-products"
      number="+58 4121940547" 
      message={`¡Hola! 👋 ¡Bienvenido a Surtymas! Agradecemos tu interés en nuestro producto "${props.titulo}". Precio:$${props.precio}. Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}
    >
      Comprar
    </ReactWhatsapp>
  </div>
  )
}

export default Card2