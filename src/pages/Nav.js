import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"

function Nav() {

  const { cart, setCart } = useContext(CartContext);

    const {logout} = useLogout()
    const navigate = useNavigate()

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    function iconCart(){
      if(cart){
        <Link to={"/carrito"}><IoCartOutline/></Link>
      }else{
        <Link to={"/carrito"}><IoCartSharp /></Link>
      }
    }

    const {auth} = useAuth()
    console.log(auth)
  return (
    <nav className='nav'>
        <img src="surtimas.png" alt='logo'/>
        <ul className="navbar">
          
            <li><Link to={"/admin"}>Admin</Link></li>
            <li><Link to={"/admin/reader"}>Ventas</Link></li>
            <li><Link to={"/carrito"}>Carrito</Link></li>
            {/* {auth 
            ? <li onClick={signOut}>Cerrar sesión</li>
            : <Link>Login</Link>
            } */}
            <li>
              <div className="search">
          <form style={{paddingBottom: '0'}} name="search search-relative" className=" search-relative">
              <input type="text" className="input-search " style={{width: '100%'}} name="txt" onmouseout="this.value = ''; this.blur();" />
              <IoCartOutline style={{top:'50%'}}className="search-button" />
          </form>
          
          </div>

          </li>
        </ul>
    </nav>
  )
}

export default Nav