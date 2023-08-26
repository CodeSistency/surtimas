import axios from 'axios';
// const BASE_URL = 'http://localhost:3500';
const BASE_URL = 'https://backend-5m1g.onrender.com';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

{/* <div className="productos">
            {results?.map((product) => (
              <div key={product.codigo} className="lista-productos">
                <h2 className="producto">{product.titulo}</h2>
                <p className="producto">{product.codigo}</p>
                <p className="producto">{`${product.precio}$`}</p>
                {Object.entries(product.tallas).map(([size, colors]) => (
                  <div className="lista-productos" key={`${product.codigo}-${size}`}>
                    <h4 className="producto"> {size}</h4>
                    {colors.map((color, index) => (
                      <div className="lista-productos" key={color._id}>
                        <div className="producto" style={{backgroundColor: color.color, borderRadius: "50%", border: "1px solid black", height: "5", width: "5"}}></div>
                        <p className="producto">
                          Quantity: {color.quantity - (parseInt(quantityChanges[`${product.codigo}-${size}-${index}`], 10) || 0)}
                        
                        </p>
                        <input
                          style={{ width: "10", padding: ".9em" }}
                          className="producto"
                          type="number"
                          value={color.sold || 0}
                          onChange={(e) =>
                            onChange(product.codigo, size, index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                ))}
                {/* <MdDeleteForever color="black" style={{padding: "0 5px", color: "black"}} onClick={() => removeItem(product.codigo)}/> */}
                // <p onClick={() => removeItem(product.codigo)}>Borrar</p>
            //   </div>
            // ))}
            
        //   </div> */}