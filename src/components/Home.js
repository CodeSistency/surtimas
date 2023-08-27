
import { Link } from "react-router-dom";
import Gallery from "../pages/Gallery";
import GalleryCategory from "../pages/GalleryCategory";
import CartContext from "../context/CartProvider";
import Menu from "../pages/Menu";
import Nav from "../pages/Nav";
import Products from "../pages/Products";
import Login from "./Login";
import Login2 from "./Login2";
import useEmblaCarousel from 'embla-carousel-react'
import GalleryCategory2 from "../pages/GalleryCategory2";
import Search from "../pages/Search";
import { useContext } from "react";

const Home = () => {
    
    const [emblaRef] = useEmblaCarousel()

    const { cart, setCart, searchQuery } = useContext(CartContext);
   

    return (
        <div>
            <Nav />
            {/* <Menu /> */}
            {searchQuery && <h4 style={{marginTop: '90px', marginLeft: '35px'}}>Busqueda: '{searchQuery}'</h4>}
            {searchQuery ? <Search/> :
            <div>



            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide image-container">
                        <img src="/bg.jpg" className="hero"/>
                            <h1>Bienvenido</h1>
                            <Link to={'/productos'} className="content">Productos</Link>
                        
                    </div>
                    <div className="embla__slide image-container-2">
                        <img src="/model.jpg" className="hero"/>
                            <div>

                                <h1>Compra desde 12 piezas</h1>
                                <h4>Y llevate lo mejor de lo mejor</h4>
                            </div>
                            <Link to={'/productos'} className="content2">Compra ya</Link>
                        
                    </div>
                    <div className="embla__slide image-container-3">
                        <img src="/discounts.jpg" className="hero"/>
                            <div>

                                <h3>Los mejores descuentos los encuentras en</h3>
                                <h1>Surtymas</h1>
                            </div>
                            <Link to={'/productos'} className="content3">Empieza ya</Link>
                        
                    </div>
                </div>
             </div>
            <Products />
            {/* <GalleryCategory /> */}
            <GalleryCategory2/>
            <Gallery api='limited'/>
            <div className="login-container">

                <Login2 />
                <div>
                    <h3>¡Únete a la Fiesta de Descuentos al Por Mayor!</h3>
                    <br></br>
                    <p>¡Hola a todos los amantes de las compras inteligentes!</p>
                    <br></br>
                    <p>¿Quieres descuentos increíbles y la emoción de comprar al por mayor? ¡Entonces, este es tu momento! Al registrarte en nuestra web, obtendrás acceso exclusivo a ofertas que te dejarán boquiabierto. Desde productos de alta calidad hasta las últimas tendencias, tendrás todo a tu alcance.</p>
                </div>
            </div>
            </div>
            }
            

            
        </div>
    )
}

export default Home
