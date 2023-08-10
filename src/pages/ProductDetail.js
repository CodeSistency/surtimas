import {useContext, useState, useEffect} from 'react'
import CartContext from "../context/CartProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from 'react-router-dom';


function ProductDetail() {
  const { cart, addProductToResults, removeFromCart } = useContext(CartContext);
    const [product, setProduct] = useState()

    

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
      <div className='product-detail'>
          <img src='../../public/model.jpg' alt='' className='image-detail'/>
          {product && 
          <div key={product.codigo} className="producto-info">
            <h2 className="producto titulo">{product.titulo}</h2>
            <p className="producto">{product.codigo}</p>
            <p className="producto precio">{`${product.precio}`}<strong> $</strong></p>
            {Object.entries(product.tallas).map(([size, colors]) => (
              <div className="" key={size}>
                <h4 className="product">Talla {size}</h4>
                {colors.map((color, index) => (
                  <div className="lista-productos" key={color._id}>
                    <div className="producto" style={{backgroundColor: color.color, borderRadius: "50%", border: "1px solid black", height: "5", width: "5"}}></div>
                    <input
                      style={{width: "10"}}
                      className="producto"
                      type="number"
                      value={color.quantity}
                      onChange={(e) =>
                        handleQuantityChange(product.codigo, size, index, e.target.valueAsNumber)
                      }
                    />
                  </div>
                ))}
              </div>
              
            ))}
            <article className='ctas'>
            
              <button >Agregar al carrito</button>
              <button onClick={()=>addProductToResults()}>Agregar al carrito</button>
            
            </article>
          </div>}
      </div>
    </div>
  )
}

export default ProductDetail