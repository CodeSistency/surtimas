import { createContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    function addProductToResults(product) {
        console.log(product)
        setCart((prevResults) => [...prevResults, product]);
      }
      
      function removeFromCart(id) {
        console.log(id)
        setCart(prevItems => prevItems.filter(item => item._id !== id))
        
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addProductToResults, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;