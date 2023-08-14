import {useContext, useState, useEffect} from 'react'
import CartContext from "../context/CartProvider";
import ReactWhatsapp from 'react-whatsapp';

function Cart() {
    const { cart, setCart } = useContext(CartContext);
    console.log(cart)

    const [count, setCount] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {

      setTotal(cart.reduce((totalSum, sum) => totalSum = totalSum + sum.precio, 0).toFixed(2))
    }, [cart])

    function handlePlus (){
      setCount(prev => prev + 1)
    }

    function handleLess (){
      setCount(prev => prev - 1)
    }

    const handleQuantityChange = (productCode, size, colorIndex, quantity) => {
        const updatedResults = cart.map((product) => {
          if (product.codigo === productCode) {
            if (!product.tallas[size]) {
              product.tallas[size] = [];
            }
            if (!product.tallas[size][colorIndex]) {
              product.tallas[size][colorIndex] = { color: '', quantity: 0, _id: '' };
            }
            product.tallas[size][colorIndex].quantity = quantity;
          }
          return product;
        });
        setCart(updatedResults);
      };
    
  return (
    <div>
      <div className='cart-icon-container'>
        <img src='shopping.png'/>

      </div>
        {cart?.length
                ? (
                  <div className="productos">
                    {cart?.map((product) => (
                      <div key={product.codigo} className="lista-productos-cart">
                        <img src={product.imagen}/>
                        <div>
                          <h2 style={{textAlign: 'right'}}>{product.titulo}</h2>
                          {/* <article className='count'>
                            <p onClick={handlePlus}>-</p>
                            <h6>{count}</h6>
                            <p onClick={handleLess}>+</p>
                          </article> */}
                          <p style={{textAlign: 'right'}}>{`${product.precio}$`}</p>
                          <ReactWhatsapp style={{width:'100%', padding: '3px 10px'}}
      class="buy-button-products"
      number="+58 4121940547" 
      message={`¡Hola! 👋 ¡Bienvenido a Surtymas! Agradecemos tu interés en nuestro producto "${product.titulo}". Precio:$${product.precio}. Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}
    >
      Comprar
    </ReactWhatsapp>
                        </div>
                        
                      </div>
                    ))}
                    <div className='total'>
                          <div className='subtotal'>
                            <div className='result-total'>
                              <h2>Subtotal:</h2>
                              <h1>{total}$</h1>
                            </div>
                            <ReactWhatsapp 
                            className='buy-total' 
                            number='+58 4121940547'
                            message={`¡Hola! 👋 ¡Bienvenido a Surtymas! Agradecemos tu interés en nuestros productos. Aquí está la lista de lo que pediste:
${cart.map(product => (
  `"${product.titulo}". Precio: $${product.precio}\n`
))}
Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}

                            >Comprar</ReactWhatsapp>
                          </div>
                          </div>
                  </div>
                ) : <p>No hay productos</p>
            }
    </div>
  )
}

export default Cart