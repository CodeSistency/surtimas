import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AdminNav from './AdminNav';
import ColorPicker from './ColorPicker';

const UpdateProduct = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const {id} = useParams()
   

    const [data, setData] = useState({})
    const [products, setProducts] = useState()
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImage] = useState("")
  const [images, setImages] = useState([])
  const [codigo, setCodigo] = useState('');
  

  const [quantity, setQuantity] = useState({
    S: [{ color: "#fff", quantity: 0 }],
    M: [{ color: "#fff", quantity: 0 }],
    L: [{ color: "#fff", quantity: 0 }],
    XL: [{ color: "#fff", quantity: 0 }],
  });

  const [selectedSize, setSelectedSize] = useState("S");

  function convertToBase64(e) {
    console.log(e)
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      console.log(reader.result)
      setImage(reader.result)
      const newImage = { src: reader.result, alt: { descripcion } };
      const updatedImages = [...images, newImage];
      setImages(updatedImages); // Actualiza el estado de las imágenes
      console.log(updatedImages);
    };
    reader.onerror = error => {
      console.log("Error: ", error)
    }
  }

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
  };

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };
  
  const handleColorChange = (sizeIndex, colorIndex, selectedColor) => {
    setQuantity((prevQuantity) => {
      const updatedQuantity = { ...prevQuantity };
      updatedQuantity[sizeIndex][colorIndex].color = selectedColor;
      return updatedQuantity;
    });
  };
  
  const handleQuantityChange = (sizeIndex, colorIndex, event) => {
    const { name, value } = event.target;
    setQuantity((prevQuantity) => {
      const updatedQuantity = { ...prevQuantity };
      updatedQuantity[sizeIndex][colorIndex].quantity = parseInt(value);
      return updatedQuantity;
    });
  
    console.log(quantity)
  };
  
  const handleAddColor = () => {
    setQuantity((prevQuantity) => {
      const updatedQuantity = { ...prevQuantity };
      updatedQuantity[selectedSize] = [
        ...updatedQuantity[selectedSize],
        { color: "#fff", quantity: 0 },
      ];
      return updatedQuantity;
    });
  };
useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProduct = async () => {
        try {
            const response = await axiosPrivate.get(`products/${id}`, {
                signal: controller.signal
            });
            console.log(response.data);
            isMounted && setProducts(response.data);
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
    setTitulo(products?.titulo)
    setDescripcion(products?.descripcion)
    setPrecio(products?.precio)
    setCodigo(products?.codigo)
    setQuantity(products?.tallas)
    
}, [products])

  const handleSubmit = async () => {

    let isMounted = true;
    const controller = new AbortController();

    try {
        const response = await axiosPrivate.put(`products/${id}`,
        JSON.stringify({ titulo, descripcion, precio, codigo, tallas: quantity}),
    
    {
            signal: controller.signal
        });
        console.log(JSON.stringify(response?.data));
        isMounted && setData(response.data);
        // navigate("/admin", { state: {from: location}, replace: true });
        navigate(-1);
    } catch (err) {
        console.error(err);
        // navigate('/login', { state: { from: location }, replace: true });
        
    }

    return () => {
        isMounted = false;
        controller.abort();
    }
}


  return (
    <main className='dashboard'>
    <AdminNav/>
    <form onSubmit={handleSubmit} className="mi-formulario">
      <h2>Actualizar Producto</h2>
      <div className="input-container">
        <p>Titulo</p>
        <label htmlFor="titulo"></label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={handleTituloChange}
          className="input-titulo"
        />
      </div>
      <div className="input-container">
        <p>Descripcion</p>
        <label htmlFor="descripcion"></label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={handleDescripcionChange}
          className="input-descripcion"
        />
      </div>
      <div className="input-container">
        <p>Precio</p>
        <label htmlFor="precio"></label>
        <input
          type="number"
          id="precio"
          value={precio}
          onChange={handlePrecioChange}
          className="input-precio"
        />
      </div>
      <div className="input-container">
        <p>Codigo</p>
        <label htmlFor="codigo"></label>
        <input
          type="text"
          id="codigo"
          value={codigo}
          onChange={handleCodigoChange}
          className="input-descripcion"
        />
      </div>
      <div className="input-container">
        <p>Foto Primaria</p>
        <label htmlFor="imagen"></label>
        <input
          type="file"
          id="imagen"
          onChange={convertToBase64}
          className="input-imagen"
          accept='image/*'
        />
        {
          imagen == "" || imagen == null ? "" : <img src={imagen} width={100} height={100}/>
        }
        
      </div>

      
      <div>
        <label>
          Talla:
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </label>
{products &&<div>
          {quantity[selectedSize].map((item, colorIndex) => (
            <div key={colorIndex}>
              <ColorPicker
                color={item.color}
                onChange={(selectedColor) =>
                  handleColorChange(selectedSize, colorIndex, selectedColor)
                }
              />
              <label>
                Cantidad:
                <input
                  type="number"
                  name={`quantity-${selectedSize}-${colorIndex}`}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(selectedSize, colorIndex, e)}
                />
              </label>
            </div>
        ))}
        </div>}
        <button type="button" onClick={() => handleAddColor(selectedSize)}>Agregar Color</button>
        </div>
      
      <button>Actualizar Producto</button>
    </form>
    </main>
  );
};

export default UpdateProduct;