import React from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import { add } from 'date-fns';

function Card(props) {

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
    <div className="card">
      {cartIcon()}
    

    <div className="imgBox">
        <img src={props.img}  alt="mouse corsair" className="mouse" />
    </div>

    <div className="contentBox">
        <h3>{props.titulo}</h3>
        <h2 className="price">{props.precio} $</h2>
        <button href="#" className="buy">Comprar</button>
    </div>

    </div>
  )
}

export default Card