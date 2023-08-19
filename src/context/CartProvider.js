import { createContext, useState } from "react";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/axios";

const CartContext = createContext({});



export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [data, setData] = useState()
    const [searchInput, setSearchInput] = useState(''); 
    const [products, setProducts] = useState()

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getProducts = async () => {
    //         try {
    //             const response = await axiosPrivate.get('/products', {
    //                 signal: controller.signal
    //             });
    //             console.log(response.data);
    //             isMounted && setProducts(response.data);
    //         } catch (err) {
    //             console.error(err);
    //             console.log(JSON.stringify(err));
    //             navigate('/login', { state: { from: location }, replace: true });
    //         }
    //     }

    //     getProducts();

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     }
    // }, [])

    function addProductToResults(product) {
        console.log(product)
        setCart((prevResults) => [...prevResults, product]);
      }
      
      function removeFromCart(id) {
        console.log(id)
        setCart(prevItems => prevItems.filter(item => item._id !== id))
        
    }

    const handleCart = async (username, nombre, precio, precio_mayor, imagen, id) => {

        console.log(username, nombre, precio, precio_mayor)
    let isMounted = true;
        const controller = new AbortController();
        const quantity = 0

        // const formData = new FormData();
        // formData.append('username', username);
        // formData.append('nombre', nombre);
        // formData.append('precio', precio);
        // formData.append('precio_mayor', precio_mayor);
        // formData.append('quantity', quantity);

        // console.log(formData.getAll())

        console.log(username, nombre, precio, precio_mayor)

      
          try {
              const response = await axios.put('cart', { username, nombre, precio, precio_mayor, quantity, imagen, id },
            //   JSON.stringify({username, nombre, precio, precio_mayor, quantity}),
              { 
                  signal: controller.signal,
                  
              });
              console.log(JSON.stringify(response?.data));
              isMounted && setCart(response.data);
              
          } catch (err) {
              console.error(err);

          }
      
          return () => {
              isMounted = false;
              controller.abort();
          }
    
        
    }

    function filterProductsByTitle() {
        if (!products || !searchInput) {
          return []; // Si no hay productos cargados o el input de búsqueda está vacío, devolvemos un array vacío
        }
    
        const filteredProducts = products.filter((product) => {
            const lowerSearchInput = searchInput.toLowerCase();
            const lowerProductTitle = product.titulo.toLowerCase();
            const productMatchesTitle = lowerProductTitle.includes(lowerSearchInput);
            const productMatchesId = product._id.toString().includes(searchInput);
      
            return productMatchesTitle || productMatchesId;
          });
      
          return filteredProducts;
      }

    return (
        <CartContext.Provider value={{searchInput, cart, filterProductsByTitle, setCart, addProductToResults, removeFromCart, handleCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;