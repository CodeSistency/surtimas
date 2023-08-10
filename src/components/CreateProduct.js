import React, { useEffect, useState } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import {BsFillPlusCircleFill} from "react-icons/bs"
import {SketchPicker} from "react-color"
import AdminNav from './AdminNav';
import ColorPicker from './ColorPicker';

const CreateProduct = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

  const [data, setData] = useState({})
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [precioAlMayor, setPrecioAlMayor] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [tipo, setTipo] = useState('camisa')
 
  const [imagen, setImage] = useState("")
  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
  

  const [quantity, setQuantity] = useState({
    S: [{ color: "#fff", quantity: 0 }],
    M: [{ color: "#fff", quantity: 0 }],
    L: [{ color: "#fff", quantity: 0 }],
    XL: [{ color: "#fff", quantity: 0 }],
    '0XL': [{ color: "#fff", quantity: 0 }],
    '2XL': [{ color: "#fff", quantity: 0 }],
    '3XL': [{ color: "#fff", quantity: 0 }],
    '4XL': [{ color: "#fff", quantity: 0 }],
    '5XL': [{ color: "#fff", quantity: 0 }],
    FIT: [{ color: "#fff", quantity: 0 }],
  });

  const [quantityShoe, setQuantityShoe] = useState({
    '25': [{ color: "#fff", quantity: 0 }],
    '26': [{ color: "#fff", quantity: 0 }],
    '27': [{ color: "#fff", quantity: 0 }],
    '28': [{ color: "#fff", quantity: 0 }],
    '29': [{ color: "#fff", quantity: 0 }],
    '30': [{ color: "#fff", quantity: 0 }],
    '31': [{ color: "#fff", quantity: 0 }],
    '32': [{ color: "#fff", quantity: 0 }],
    '33': [{ color: "#fff", quantity: 0 }],
    '34': [{ color: "#fff", quantity: 0 }],
    '35': [{ color: "#fff", quantity: 0 }],
    '36': [{ color: "#fff", quantity: 0 }],
    '37': [{ color: "#fff", quantity: 0 }],
    '38': [{ color: "#fff", quantity: 0 }],
    '39': [{ color: "#fff", quantity: 0 }],
    '40': [{ color: "#fff", quantity: 0 }],
    '42': [{ color: "#fff", quantity: 0 }],
    '43': [{ color: "#fff", quantity: 0 }],
    '44': [{ color: "#fff", quantity: 0 }],
    
  });

  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedSizeShoe, setSelectedSizeShoe] = useState("30");
  const [sexo, setSexo] = useState('mujer')

  function convertToBase64(e) {
    console.log(e)
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      console.log(reader.result)
      setImage(reader.result)
      console.log(imagen)
      // const newImage = { src: reader.result, alt: { descripcion } };
      // const updatedImages = [...images, newImage];
      // setImages(updatedImages); // Actualiza el estado de las imágenes
      // console.log(updatedImages);
    };
    reader.onerror = error => {
      console.log("Error: ", error)
    }
  }

  const [file, setFile] = useState()

  

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
  };

  const handlePrecioAlMayorChange = (e) => {
    setPrecioAlMayor(e.target.value);
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

const handleColorChangeShoe = (sizeIndex, colorIndex, selectedColor) => {
  setQuantityShoe((prevQuantity) => {
    const updatedQuantity = { ...prevQuantity };
    updatedQuantity[sizeIndex][colorIndex].color = selectedColor;
    return updatedQuantity;
  });
};

const handleQuantityChangeShoe = (sizeIndex, colorIndex, event) => {
  const { name, value } = event.target;
  setQuantityShoe((prevQuantity) => {
    const updatedQuantity = { ...prevQuantity };
    updatedQuantity[sizeIndex][colorIndex].quantity = parseInt(value);
    return updatedQuantity;
  });

  console.log(quantityShoe)
};

const handleAddColorShoe = () => {
  setQuantityShoe((prevQuantity) => {
    const updatedQuantity = { ...prevQuantity };
    updatedQuantity[selectedSize] = [
      ...updatedQuantity[selectedSize],
      { color: "#fff", quantity: 0 },
    ];
    return updatedQuantity;
  });
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImage(file);
};

 // State for storing selected image files

 const handleImagesChange = (event) => {
  // Get the selected files from the input element
  const files = event.target.files;
  
  // Convert the FileList to an array and update the state
  setSelectedImages(Array.from(files));
  console.log(selectedImages)
  console.log(files)
};

useEffect(() => {
  console.log('Selected images:', selectedImages);
}, [selectedImages]);

    // formData.set("tallas", JSON.stringify(quantity));

    useEffect(() => {
      
      console.log(imagen)
    }, [imagen])

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isMounted = true;
    const controller = new AbortController();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('precio_mayor', precioAlMayor);
    formData.append('codigo', codigo);
    formData.append('tipo', tipo);
    formData.append('sexo', sexo);
    formData.append('tallas', JSON.stringify(quantity));
    formData.append('tallas_zapatos', JSON.stringify(quantityShoe));

    
    for (const imageFile of selectedImages) {
      formData.append('imagenes', imageFile);
    }

    
      // console.log(formData.getAll("tallas"))
      // console.log(formData.getAll("file"))
      // console.log(formData.getAll("titulo"))
      // console.log(formData.getAll("precio"))
      // console.log(formData.getAll("descripcion"))
   
    

    try {
        const response = await axiosPrivate.post('products', formData,
        // JSON.stringify({titulo, descripcion, precio, codigo, tallas: quantity, imagen}),
    
        { 
            signal: controller.signal,
            
            
        });
        console.log(JSON.stringify(response?.data));
        isMounted && setData(response.data);
        // navigate("/admin", { state: {from: location}, replace: true });
        // navigate(-1);
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
    <main className='dashboard admin-container'>
    <AdminNav/>
    <div className='create-container'>
    <form onSubmit={handleSubmit} className="mi-formulario" encType='multipart/form-data'>
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
        <p>Descripción</p>
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
        <p>Precio al detal:</p>
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
        <p>Precio al Mayor:</p>
        <label htmlFor="precio"></label>
        <input
          type="number"
          id="precio"
          value={precioAlMayor}
          onChange={handlePrecioAlMayorChange}
          className="input-precio"
        />
      </div>
      
      <div className="input-container">
        <p>Codigo:</p>
        <label htmlFor="codigo"></label>
        <input
          type="text"
          id="codigo"
          value={codigo}
          onChange={handleCodigoChange}
          className="input-descripcion"
        />
      </div>
      {/* <div className="input-container">
        <p>Foto Primaria</p>
        <label htmlFor="imagen"></label>
        <input
          type="file"
          id="imagen"
          onChange={handleImageChange}
          className="input-imagen"
          accept='image/*'
          
        />
        {
          imagen == "" || imagen == null ? "" : <img src={imagen} width={100} height={100}/>
        }
        
      </div> */}

      <div className="input-container">
        <p>Imagenes:</p>
        <label htmlFor="imagen" className='custom-file-input'>
        <input
          type="file"
          id="imagen"
          multiple="multiple"
          onChange={handleImagesChange}
          className="input-imagen"
          accept='image/*'
          
        />
        </label>
        
        
      </div>

      

      <div className='select'>
        <label className='prenda' style={{display: 'flex'}}>
          Tipo de prenda:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="camisa">Camisa</option>
            <option value="pantalon">Pantalon</option>
            <option value="body">Body</option>
            <option value="mono">Mono</option>
            <option value="zapato">Zapato</option>
            
            
          </select>
        </label>
        </div>

        <div>
        <label style={{display: 'flex'}}>
          Sexo:
          <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
            
            
          </select>
        </label>
        </div>


      {/* <div className="input-container">
        <p>Fotos Secundarias</p>
        <label htmlFor="imagen"></label>
        <input
          type="file"
          id="imagen"
          onChange={convertToBase64}
          className="input-imagen"
          accept='image/*'
        />
        <label htmlFor="imagen2"></label>
        <input
          type="file"
          id="imagen2"
          onChange={convertToBase64}
          className="input-imagen"
          accept='image/*'
        />
        <label htmlFor="imagen3"></label>
        <input
          type="file"
          id="imagen3"
          onChange={convertToBase64}
          className="input-imagen"
          accept='image/*'
        />
        <label htmlFor="imagen4"></label>
        <input
          type="file"
          id="imagen4"
          onChange={convertToBase64}
          className="input-imagen"
          accept='image/*'
        />
        
      </div> */}
      
      {tipo === 'zapato' ? null :
      <div className='select'>
        
        <label style={{display: 'flex'}}>
          Talla:
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="U">U</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="0XL">0XL</option>
            <option value="1XL">1XL</option>
            <option value="2XL">2XL</option>
            <option value="3XL">3XL</option>
            <option value="4XL">4XL</option>
            <option value="5XL">5XL</option>
            <option value="FIT">FIT</option>
            
          </select>
        </label>
        <div className='list-products'>
          {quantity[selectedSize].map((item, colorIndex) => (
            <div key={colorIndex}>
              <ColorPicker className='color'
                color={item.color}
                onChange={(selectedColor) =>
                  handleColorChange(selectedSize, colorIndex, selectedColor)
                }
              />
              <label style={{display: 'flex', alignItems: 'center'}}>
                Cantidad:
                <input
                  type="number"
                  name={`quantity-${selectedSize}-${colorIndex}`}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(selectedSize, colorIndex, e)}
                  className='input-cantidad'
                />
              </label>
            </div>
          ))}
        </div>
        <button className='btn-color' type="button" onClick={() => handleAddColor(selectedSize)}>Agregar Color</button>
        </div>}

        {tipo === 'zapato' &&<div>
        <label>
          Talla:
          <select value={selectedSizeShoe} onChange={(e) => setSelectedSizeShoe(e.target.value)}>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
            <option value="33">33</option>
            <option value="34">34</option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            
          </select>
        </label>
        <div>
          {quantityShoe[selectedSizeShoe].map((item, colorIndex) => (
            <div key={colorIndex}>
              <ColorPicker
                color={item.color}
                onChange={(selectedColor) =>
                  handleColorChangeShoe(selectedSizeShoe, colorIndex, selectedColor)
                }
              />
              <label>
                Cantidad:
                <input
                  type="number"
                  name={`quantity-${selectedSizeShoe}-${colorIndex}`}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChangeShoe(selectedSizeShoe, colorIndex, e)}
                  className='input-cantidad'
                />
              </label>
            </div>
          ))}
          <div className='divider'></div>
        </div>
        
        {/* <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
          <p>Agregar color</p>
          <BsFillPlusCircleFill onClick={() => handleAddColorShoe(selectedSizeShoe)}/>
        </div> */}
        
        <button className='btn-color' type="button" onClick={() => handleAddColorShoe(selectedSizeShoe)}>Agregar</button>
        </div>}
      
      <button className='btn'>Crear producto</button>
    </form>
    </div>
    </main>
  );
};

export default CreateProduct;