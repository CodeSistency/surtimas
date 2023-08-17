import {useContext, useState, useEffect} from 'react'
import CartContext from "../context/CartProvider";
import ReactWhatsapp from 'react-whatsapp';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { MdDeleteForever } from 'react-icons/md';

function Cart() {
    const { cart, setCart } = useContext(CartContext);
    console.log(cart)

    const {auth} = useAuth()

    const [products, setProducts] = useState()

    const {username} = useParams()


    const [count, setCount] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      console.log(username)

      const getProducts = async () => {
          try {
              const response = await axios.get(`/cart/${username}`, {
                  signal: controller.signal
              });
              console.log(response.data);
              isMounted && setProducts(response.data);
              console.log(products)
              // console.log(products[2].imagenes)
          } catch (err) {
              console.error(err);
              // navigate('/login', { state: { from: location }, replace: true });
          }
      }

      getProducts();

      return () => {
          isMounted = false;
          controller.abort();
      }
  }, [])

  const handleDelete = async (id) => {

    let isMounted2 = true;
    const controller = new AbortController();
    console.log(id)
    
    
    try {
        const response = await axios.delete(`cart/${username}/${id}`,
        
    
    {
            signal: controller.signal
        });
        console.log(JSON.stringify(response?.data));
        
        
        
        
    } catch (err) {
        console.error(err);
        console.log(JSON.stringify(err));
        
        
    }

    return () => {
        isMounted2 = false;
        controller.abort();
    }
}

    useEffect(() => {

      setTotal(products?.cartProducts?.reduce((totalSum, sum) => totalSum = totalSum + sum.precio, 0).toFixed(2))
    }, [products])

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
        {products
                ? (
                  <div className="cart-products">
                    {products?.cartProducts.map((product) => (
                      <div key={product.producto} className="lista-productos-cart">
                        <img src={product.imagen}/>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        <div>
                          <h2 style={{textAlign: 'right'}}>{product.nombre}</h2>
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
                        <MdDeleteForever fontSize={30} style={{marginTop:'4px', cursor: 'pointer', alignSelf: 'flex-start', color: '#7e7979'}} onClick={() => handleDelete(product.product)}/>
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