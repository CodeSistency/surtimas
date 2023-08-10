
import Nav from "../pages/Nav";
import Products from "../pages/Products";

const Home = () => {
    

   

    return (
        <div>
            <Nav />
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
                <button className="content">Botón</button>
            </div>
            <Products />
            
        </div>
    )
}

export default Home
