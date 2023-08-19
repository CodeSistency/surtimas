
import { Link } from "react-router-dom";
import Gallery from "../pages/Gallery";
import GalleryCategory from "../pages/GalleryCategory";
import Menu from "../pages/Menu";
import Nav from "../pages/Nav";
import Products from "../pages/Products";
import Login from "./Login";
import Login2 from "./Login2";

const Home = () => {
    

   

    return (
        <div>
            <Nav />
            <Menu />
            {/* <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link> */}
            <div className="image-container">
                <h1>Bienvenido</h1>
                <Link to={'/productos'} className="content">Productos</Link>
            </div>
            <Products />
            <GalleryCategory />
            <Gallery />
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
    )
}

export default Home
