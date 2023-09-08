import {useState, useEffect}  from 'react'
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import {AiOutlineMan, AiOutlineWoman} from 'react-icons/ai'
import {BiMenu, BiUser} from 'react-icons/bi'
import {LiaSearchSolid} from 'react-icons/lia'
import {BsInstagram} from 'react-icons/bs'
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

  const location = useLocation()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

 
  useEffect(() => {
    console.log(auth)
  }, [])

  const { cart, setCart, setSearchQuery } = useContext(CartContext);

  function login(){
    navigate("/sesion", { state: {from: location}, replace: true });
  }

  // setSearchQuery(searchInput)
    const {logout} = useLogout()
    const navigate = useNavigate()

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    

    function cartIcon() {
      
      if(!auth.user) {
          return <IoCartOutline fontSize={40} onClick={login}/>
      } else {
        return <Link  to={`/home/carrito/${auth.user}`}><IoCartOutline fontSize={40} /></Link>
      }
      // if(cart) {
      //   return  <Link  to={`/home/carrito/${auth.user}`}><IoCartSharp fontSize={40} /></Link>
      // } else{
      //   <Link  to={`/home/carrito/${auth.user}`}><IoCartOutline fontSize={40} /></Link>
      // }
  }

    // const {auth} = useAuth()
    // console.log(auth)
  return (
   
     <div>
     
        <nav className='nav'>
          <section className='nav-top'>
            <div className='nav-top-left'>
              <Menu toggleMenu={toggleMenu} onClick={toggleMenu} isOpen={menuVisible}></Menu>
              {/* {auth?.user ? <Link to={'home/genero/hombre'}><AiOutlineMan className='gender-icon' color='#0d3f71' fontSize={35}/></Link> : <Link to={'genero/hombre'}><AiOutlineMan className='gender-icon' color='#0d3f71' fontSize={35}/></Link>}
              {auth?.user ? <Link to={'home/genero/mujer'}><AiOutlineWoman className='gender-icon' color='pink' fontSize={35}/></Link> : <Link to={'genero/mujer'}><AiOutlineWoman className='gender-icon' color='pink' fontSize={35}/></Link>} */}
            </div>
            {auth?.user ? <Link to={'/home'}><img src="/logo3.svg" className='logo' alt='logo'/></Link> : <Link to={'/'}><img src="/logo3.svg" className='logo' alt='logo'/></Link>}
            <div className='nav-top-right'>
            {/* <Link to={'/sesion'}><BsInstagram className='user-icon' fontSize={30}/></Link> */}
              <div className='cart-icon'>{cartIcon()}</div>
              {/* <Link to={'/Login2'}><BiUser className='user-icon' fontSize={35}/></Link> */}
            </div>
          </section>

          <section className='nav-bottom'>

            <ul className="navbar">
              
                <li className='nav-admins'><Link to={"/admin"}>Admin</Link></li>

                <li className='nav-mujer'><Link to={"/genero/mujer"}>Mujer</Link></li>
                <li className='nav-hombre'><Link to={"/genero/hombre"}>Hombre</Link></li>
                <li className='nav-admin'><Link to={"/tipo/faldas"}>Faldas</Link></li>
                <li className='nav-admin'><Link to={"/tipo/pantalon"}>Pantalones</Link></li>
                <li className='nav-admin'><Link to={"/tipo/franela"}>Franelas</Link></li>
                
                {/* {auth.user ? <button className='logout' onClick={signOut}>Salir de sesion</button> : <li><Link className='login-button' to={"/inicio"}>Login</Link></li>}
                {!auth.user && <li><Link className='login-button' to={"/register"}>Registro</Link></li>} */}

            </ul>

            <div className='nav-link-search'>
                  <div className="search-nav">
                    <form style={{paddingBottom: '0'}} name="search search-relative" className=" search-relative-nav">
                        <input type="text" className="input-search-nav " onChange={(e) => setSearchQuery(e.target.value)} name="txt"  />
                        <LiaSearchSolid fontSize={25} style={{top:'50%'}}className="search-button-nav" />
                    </form>
                  </div>
              </div>
          </section>
        

        </nav>
      
      </div>
  )
}

export default Nav