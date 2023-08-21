import {useContext, useState, useEffect} from 'react'
import CartContext from "../context/CartProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from 'react-router-dom';
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import Nav from './Nav';
import ReactWhatsapp from 'react-whatsapp';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';


function ProductDetail() {
  const { cart, addProductToResults, removeFromCart, handleCart } = useContext(CartContext);
    const [product, setProduct] = useState()
    const [products, setProducts] = useState()
    const [text, setText] = useState('')
    const [comentario, setComentario] = useState('')
    const [comentarios, setComentarios] = useState()

    const {auth} = useAuth()
    
    const handleTextChange = (event) => {
      setText(event.target.value);
    };

    const handleDelete = async (id) => {

      let isMounted2 = true;
      const controller = new AbortController();
      console.log(id)
      
      
      try {
          const response = await axios.delete(`cart/${auth.user}/${id}`,
          
      
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
  

  const precio_mayor = 0

    const axiosPrivate = useAxiosPrivate();

    const {id} = useParams()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
    
        const getProduct = async () => {
            try {
                const response = await axios.get(`productos/${id}`, {
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

    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

      console.log(auth.username)

      const getCartProducts = async () => {
          try {
              const response = await axios.get(`/cart/${auth.username}`, {
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

      getCartProducts();

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
      
      function cartIcon() {
        const alreadyInCart = cart.some(item => item._id === product._id)
        if(alreadyInCart) {
            return <button className='addCart'>
            <p>Agregar</p>
            <IoCartSharp fontSize={20} onClick={() => handleDelete(product._id)}/>
          </button>
        } else {
            // return <IoCartOutline className='cart' fontSize={20} onClick={() => addProductToResults(props.product)}/>
            return <button onClick={() => handleCart(auth?.user, product.titulo, product.precio, precio_mayor, product.img, product.id)} className='addCart'>
            <p>Agregar</p>
            <IoCartOutline fontSize={20} onClick={() => handleCart(auth?.user, product.titulo, product.precio, precio_mayor, product.img, product.id)}/>
          </button>
        }
       }

       const handleSubmit = async (e) => {

        e.preventDefault()
    
        let isMounted = true;
        const controller = new AbortController();

        try {
            // setError(false)
            // setIsLoadingCreate(true)
            const response = await axiosPrivate.put(`productos/comentario`, {comentario: text, username: auth?.user, id},
            
        
        {
                signal: controller.signal
            });
            console.log(JSON.stringify(response?.data));
            isMounted && setComentario(response.data);
            // console.log(urls)
            // navigate("/admin", { state: {from: location}, replace: true });
            // navigate("/admin", { state: {from: location}, replace: true });
            // navigate(-1);
        } catch (err) {
            console.error(err);
            // setErrMsg(err)
            // setError(true)
            // navigate('/login', { state: { from: location }, replace: true });
            
        }
    
        return () => {
            isMounted = false;
            controller.abort();
        }
    }

    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
  
      const getComentarios = async () => {
          try {
              const response = await axios.get(`productos`, {
                  signal: controller.signal
              });
              console.log(response.data);
              isMounted && setComentarios(response.data);
          } catch (err) {
              console.error(err);
              // navigate('/login', { state: { from: location }, replace: true });
          }
      }
  
      getComentarios();
  
      
  
      return () => {
          isMounted = false;
          controller.abort();
      }
  }, [])

  return (
    <div >
      <Nav className='nav-detail'/>
      <div className='product-detail-container' >

        <div className='product-detail'>
            <img src={product?.imagenes[0]} alt='' className='image-detail'/>
            {product && 
            <div key={product?.codigo} className="producto-info">
              <h2 className="producto titulo">{product?.titulo}</h2>
              <hr />
              {/* <p className="producto">{product.codigo}</p> */}
              <div className='precios'>
              <p className="producto precio dollars">{`${product?.precio}`}<span className='dolar'>$</span></p>
              <p className="producto precio-mayor dollars"><strong>Mayor</strong> {`${product?.precio_mayor}`} <span className='dolar'>$</span></p>
              </div>
              <h4>Tallas disponibles:</h4>
              <section className='lista-colores'>
                {Object.entries(product?.tallas).map(([size, colors]) => {
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

              <h4>Colores disponibles:</h4>
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
                
                
                  {cartIcon()}

              
                  
               
                
                
              
              </article>
                <hr style={{margin:'30px 0 20px'}}/>
              <p><strong>Descripcion</strong>: {product.descripcion}</p>
            </div>}
        </div>
      </div>
      <section className='section-comments'>

      <div className='comentarios'>
        <form style={{paddingTop: '1rem'}} onSubmit={handleSubmit}>
          <textarea value={text} onChange={handleTextChange} />
          <button className='comment-button'>Comentar</button>
        </form>
      </div>
      <div>
      {product
                ? (
                    <div className='comments'>
                        {product.comentarios.map((comentario, i) =>

                          
                            <div className='comment-container'>
                              <div className='comment-user'>
                                <p><small>{comentario.usuario}</small></p>
                                <p className='fecha'><small>{comentario.fecha}</small></p>
                              </div>
                              <p className='comment'>{comentario.comentario}</p>
                              
                            </div>
                            
                            )}
                    </div>
                ) : <p>No hay productos</p>
            }
      </div>
      </section>
    </div>
  )
}

export default ProductDetail