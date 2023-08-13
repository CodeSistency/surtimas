import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import {BiMenu} from 'react-icons/bi'
import {LiaSearchSolid} from 'react-icons/lia'
// import rr from '../../public/logo3.svg'
 
function Nav() {

  const { cart, setCart } = useContext(CartContext);

    const {logout} = useLogout()
    const navigate = useNavigate()

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    function cartIcon() {
      
      if(cart.length) {
          return <Link className='cart-icon' to={'/carrito'}><IoCartSharp fontSize={40} /></Link>
      } else {
          return <Link className='cart-icon' to={'/carrito'}><IoCartOutline fontSize={40} /></Link>
      }
  }

    const {auth} = useAuth()
    console.log(auth)
  return (
    <nav className='nav'>
      <div>
        
      </div>
        <Link to={'/'}><img src="logo3.svg" alt='logo'/></Link>
        <ul className="navbar">
          
            <li className='nav-admin'><Link to={"/admin"}>Admin</Link></li>
            <li className='nav-produts'><Link to={"/productos"}>Productos</Link></li>
            
            <li><Link className='login-button' to={"/login"}>Login</Link></li>
            <li><Link className='login-button' to={"/registro"}>Registro</Link></li>
            
            {/* {auth 
            ? <li onClick={signOut}>Cerrar sesión</li>
            : <Link>Login</Link>
            } */}
            <li className='nav-link-search'>
              <div className="search-nav">
                <form style={{paddingBottom: '0'}} name="search search-relative" className=" search-relative-nav">
                    <input type="text" className="input-search-nav "  name="txt" onmouseout="this.value = ''; this.blur();" />
                    <LiaSearchSolid style={{top:'50%'}}className="search-button-nav" />
                </form>
                
                </div>

          </li>
          <li className='cart-icon'>{cartIcon()}</li>
          <BiMenu className='menu' color='white'  fontSize={45} />
        </ul>
    </nav>
  )
}

export default Nav