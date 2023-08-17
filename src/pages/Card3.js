import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import { add } from 'date-fns';
import { Link } from 'react-router-dom';
import ReactWhatsapp from 'react-whatsapp';
import useAuth from '../hooks/useAuth';

function Card3 (props) {

  const { cart, addProductToResults, removeFromCart, handleCart } = useContext(CartContext);
  const {auth} = useAuth()
  const precio_mayor = 0
  function cartIcon() {
    const alreadyInCart = cart.some(item => item._id === props.id)
    if(alreadyInCart) {
        return <IoCartSharp className='cart' fontSize={20} onClick={() => removeFromCart(props.id)}/>
    } else {
        // return <IoCartOutline className='cart' fontSize={20} onClick={() => addProductToResults(props.product)}/>
        return <IoCartOutline className='cart' fontSize={20} onClick={() => handleCart(auth?.user, props.titulo, props.precio, precio_mayor, props.img, props.id)}/>
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
      <p class="product-price">{props.precio}<small style={{color: 'black'}}>$</small></p>
      {cartIcon()}
    </div>
    <ReactWhatsapp 
      class="buy-button-products"
      number="+58 4249670445" 
      message={`¡Hola! 👋 ¡Bienvenido a Surtymas! Agradecemos tu interés en nuestro producto "${props.titulo}". Precio:$${props.precio}. Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}
    >
      Comprar
    </ReactWhatsapp>
  </div>
  )
}

export default Card3