import {useContext} from 'react'
import CartContext from "../context/CartProvider";

function Cart() {
    const { cart, setCart } = useContext(CartContext);
    console.log(cart)

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
        {cart?.length
                ? (
                    <div className="productos">
                    {cart?.map((product) => (
                      <div key={product.codigo} className="lista-productos">
                        <h2 className="producto">{product.titulo}</h2>
                        <p className="producto">{product.codigo}</p>
                        <p className="producto">{`${product.precio}$`}</p>
                        {Object.entries(product.tallas).map(([size, colors]) => (
                          <div className="lista-productos" key={size}>
                            <h4 className="producto"> {size}</h4>
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
                      </div>
                    ))}
                  </div>
                ) : <p>No hay productos</p>
            }
    </div>
  )
}

export default Cart