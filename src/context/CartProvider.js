import { createContext, useState } from "react";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/axios";

const CartContext = createContext({});



export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [data, setData] = useState()

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
              isMounted && setData(response.data);
              
          } catch (err) {
              console.error(err);

          }
      
          return () => {
              isMounted = false;
              controller.abort();
          }
    
        
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addProductToResults, removeFromCart, handleCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;