import {useContext, useState, useEffect} from 'react'
import CartContext from "../context/CartProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from 'react-router-dom';
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import Nav from './Nav';
import ReactWhatsapp from 'react-whatsapp';


function ProductDetail() {
  const { cart, addProductToResults, removeFromCart } = useContext(CartContext);
    const [product, setProduct] = useState()

    function cartIcon() {
      const alreadyInCart = cart.some(item => item._id === product._id)
      if(alreadyInCart) {
          return <IoCartSharp fontSize={20} onClick={() => removeFromCart(product._id)}/>
      } else {
          return <IoCartOutline fontSize={20} onClick={() => addProductToResults(product)}/>
      }
  }

    const axiosPrivate = useAxiosPrivate();

    const {id} = useParams()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    
        const getProduct = async () => {
            try {
                const response = await axiosPrivate.get(`products/${id}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProduct(response.data);
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }
    
        getProduct();
    
        
    
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleQuantityChange = (productCode, size, colorIndex, quantity) => {
        const updatedResults = product.map((product) => {
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
        setProduct(updatedResults);
      };
  return (
    <div >
      <Nav className='nav-detail'/>
      <div className='product-detail-container' >

        <div className='product-detail'>
            <img src={product?.imagenes[0]} alt='' className='image-detail'/>
            {product && 
            <div key={product.codigo} className="producto-info">
              <h2 className="producto titulo">{product.titulo}</h2>
              <hr />
              {/* <p className="producto">{product.codigo}</p> */}
              <div className='precios'>
              <p className="producto precio dollars">{`${product.precio}`}7<span className='dolar'>$</span></p>
              <p className="producto precio-mayor dollars"><strong>Mayor</strong> {`${product.precio_mayor}`} <span className='dolar'>$</span></p>
              </div>
              <h4>Tallas</h4>
              <section className='lista-colores'>
                {Object.entries(product.tallas).map(([size, colors]) => {
                  const totalQuantity = colors.reduce((total, color) => total + color.quantity, 0); // Calculate total quantity for the size
                  if (totalQuantity > 0) {
                    return (
                      <div key={size}>
                                {/* <h4 className="product">Talla {size}</h4> */}
                                
                                <div className="producto" style={{ border: "1px solid black", height: "5", width: "5", fontSize:'12px'}}>{size}</div>
                              </div>
                    );
                  }
                  return null; // Don't render if total quantity is 0
                })}


              </section>

              <h4>Colores</h4>
              <section className='lista-colores'>
                {(() => {
                  const allColors = [];

                  // Collect all colors from all sizes into a single array
                  Object.values(product.tallas).forEach(colors => {
                    colors.forEach(colorObj => {
                      if (!allColors.includes(colorObj.color)) {
                        allColors.push(colorObj.color);
                      }
                    });
                  });

                  // Render unique colors
                  return allColors.map((color, index) => (
                    <div key={index} className="producto" style={{ backgroundColor: color, borderRadius: "50%", border: "1px solid black", height: "5px", width: "5px" }}></div>
                  ));
                })()}
              </section>
              <article className='ctas'>
              
              <ReactWhatsapp 
      class="buy-button"
      number="+58 4249670445" 
      message={`¡Hola! 👋 ¡Bienvenido a Surtymas! Agradecemos tu interés en nuestro producto "${product.titulo}". Precio:$${product.precio}. Nuestro equipo te atenderá pronto. ¡Gracias! 🛍️`}
    >
      Comprar
    </ReactWhatsapp>
                <div className='addCart'>
                  <p>Agregar</p>
                  {cartIcon()}
                </div>
                
                
              
              </article>
                <hr style={{margin:'30px 0 20px'}}/>
              <p><strong>Descripcion</strong>: {product.descripcion}</p>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail