import React, {useState} from 'react'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import { add } from 'date-fns';
import { Link } from 'react-router-dom';
import ReactWhatsapp from 'react-whatsapp';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalBuy from './ModalBuy';
import Checkout from '../components/checkout/Checkout';
import CartCheckout from '../components/cart/Checkout';

function Card2 (props) {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const openModal2 = () => {
    setModalOpen2(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalOpen2(false);
  };

  const {buyProduct, setBuyProduct, cart, addProductToResults, removeFromCart, handleCart } = useContext(CartContext);
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
  

  // if(alreadyInCart) {
  //     return <IoCartSharp style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={() => removeFromCart(props.id)}/>
  // } else {
  //     // return <IoCartOutline className='cart' fontSize={20} onClick={() => addProductToResults(props.product)}/>
  //     return <IoCartOutline style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={() => handleCart(auth?.user, props.titulo, props.precio, precio_mayor, props.img, props.id, props.codigo, props.product.tallas, props.product.tallas_zapatos)}/>
  // }

  if(alreadyInCart) {
    return <IoCartSharp style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={openModal2}/>
} else {
    // return <IoCartOutline className='cart' fontSize={20} onClick={() => addProductToResults(props.product)}/>
    return <IoCartOutline style={{cursor: 'pointer'}} className='cart' fontSize={20} onClick={openModal2}/>
}
}

  



  return (
    <div class="product-card">
      <Link to={`productos/${props.id}`} class="product-image-link">
        <img loading='lazy' src={props.img} alt="Product Image" class="product-image" >
          
        </img>

      </Link>
      {cartIcon()}
    <div class="product-details">
      <h2 class="product-title">{props.titulo}</h2>
      <p class="product-price price-absolute">{props.precio}<small style={{color: 'black'}}>$</small></p>
      
    </div>
    {auth?.user ? <button className="buy-button-products" onClick={openModal}>
        Comprar
      </button>: <Link to={'/sesion'}><button  className="buy-button-products">Comprar</button></Link>}
      {modalOpen && (
        <div className='modal-overlay'> 
        <div className='modal-content'>
        <Checkout closeModal={closeModal} product={props.product} user={auth?.user}/>
        </div>
        </div>
      )}

{modalOpen2 && (
        // <ModalBuy closeModal={closeModal} product={props.product} user={auth?.user}/>
        <div className='modal-overlay'> 
        <div className='modal-content'>
        <CartCheckout  closeModal={closeModal} product={props.product} user={auth?.user}/>
        </div>
        </div>
      )}
  </div>
  )
}

export default Card2