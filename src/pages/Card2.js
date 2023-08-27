import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import { add } from 'date-fns';
import { Link } from 'react-router-dom';
import ReactWhatsapp from 'react-whatsapp';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

function Card2 (props) {

  const { cart, addProductToResults, removeFromCart, handleCart } = useContext(CartContext);
  const {auth} = useAuth()

  const precio_mayor = 0

  const navigate = useNavigate()
  const location = useLocation()

  function login(){
    navigate("/sesion", { state: {from: location}, replace: true });
  }

//   function cartIcon() {
//     const alreadyInCart = cart?.cartProducts.some(item => item._id === props.id)
//     console.log(alreadyInCart)
//     if(!auth.user){
//       return <IoCartOutline style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={login}/>
//     }
//     if(alreadyInCart) {
//         return <IoCartSharp style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={() => removeFromCart(props.id)}/>
//     } else {
//         // return <IoCartOutline className='cart' fontSize={20} onClick={() => addProductToResults(props.product)}/>
//         return <IoCartOutline style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={() => handleCart(auth?.user, props.titulo, props.precio, precio_mayor, props.img, props.id)}/>
//     }
// }

function cartIcon() {
    
  if(!auth.user){
    return <IoCartOutline style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={login}/>
  }

  const alreadyInCart = cart?.cartProducts?.some(item => item.product === props.id)
  console.log(alreadyInCart)
  

  if(alreadyInCart) {
      return <IoCartSharp style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={() => removeFromCart(props.id)}/>
  } else {
      // return <IoCartOutline className='cart' fontSize={20} onClick={() => addProductToResults(props.product)}/>
      return <IoCartOutline style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={() => handleCart(auth?.user, props.titulo, props.precio, precio_mayor, props.img, props.id)}/>
  }
}

  



  return (
    <div class="product-card">
      <Link to={`/productos/${props.id}`} class="product-image-link">
        <img loading='lazy' src={props.img} alt="Product Image" class="product-image" >
          
        </img>

      </Link>
      {cartIcon()}
    <div class="product-details">
      <h2 class="product-title">{props.titulo}</h2>
      <p class="product-price price-absolute">{props.precio}<small style={{color: 'black'}}>$</small></p>
      
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

export default Card2