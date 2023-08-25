import {useState, useEffect}  from 'react'
import { useNavigate, Link } from "react-router-dom";
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import {BiMenu} from 'react-icons/bi'
import {LiaSearchSolid} from 'react-icons/lia'
import Menu from './Menu';
// import rr from '../../public/logo3.svg'
 
function Nav() {

  const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
  }

  const [searchInput, setSearchInput] = useState('');

  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 4; // Replace with the actual number of images
  const [menuVisible, setMenuVisible] = useState(false);

  const {auth} = useAuth()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // useEffect(() => {
  //   const handleImageLoad = () => {
  //     setImagesLoaded((prevLoaded) => prevLoaded + 1);
  //   };

  //   const images = document.querySelectorAll('img');
  //   images.forEach((img) => {
  //     img.addEventListener('load', handleImageLoad);
  //   });

  //   window.addEventListener('load', () => {
  //     setLoading(false);
  //   });

  //   return () => {
  //     images.forEach((img) => {
  //       img.removeEventListener('load', handleImageLoad);
  //     });
  //   };

    
  // }, []);

  useEffect(() => {
    console.log(auth)
  }, [])

  const { cart, setCart, setSearchQuery } = useContext(CartContext);


  // setSearchQuery(searchInput)
    const {logout} = useLogout()
    const navigate = useNavigate()

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    

    function cartIcon() {
      
      if(auth.user) {
          return <Link className='cart-icon' to={`home/carrito/${auth.user}`}><IoCartSharp fontSize={40} /></Link>
      } else {
          return <Link className='cart-icon' to={`home/carrito/${auth.user}`}><IoCartOutline fontSize={40} /></Link>
      }
  }

    // const {auth} = useAuth()
    // console.log(auth)
  return (
   
     <div>
     
        <nav className='nav'>
        {auth.user ? <Link to={'/home'}><img src="logo3.svg" alt='logo'/></Link> : <Link to={'/'}><img src="logo3.svg" alt='logo'/></Link>}
        <ul className="navbar">
          
            <li className='nav-admin'><Link to={"/admin"}>Admin</Link></li>
            <li className='nav-admin'><Link to={"/productos"}>Productos</Link></li>
            
            {auth.user ? <button className='logout' onClick={signOut}>Salir de sesion</button> : <li><Link className='login-button' to={"/inicio"}>Login</Link></li>}
            {!auth.user && <li><Link className='login-button' to={"/register"}>Registro</Link></li>}
            
            
            <li className='nav-link-search'>
              <div className="search-nav">
                <form style={{paddingBottom: '0'}} name="search search-relative" className=" search-relative-nav">
                    <input type="text" className="input-search-nav " onChange={(e) => setSearchQuery(e.target.value)} name="txt"  />
                    <LiaSearchSolid style={{top:'50%'}}className="search-button-nav" />
                </form>
                
                </div>

          </li>
          <li className='cart-icon'>{cartIcon()}</li>
          
          <Menu toggleMenu={toggleMenu} onClick={toggleMenu} isOpen={menuVisible}></Menu>
        </ul>

        </nav>
      
      </div>
  )
}

export default Nav