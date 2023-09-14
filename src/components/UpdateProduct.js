import React, { useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AdminNav from './AdminNav';
import ColorPicker from './ColorPicker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, updateMetadata  } from "firebase/storage";
import { Link } from 'react-router-dom';
import app from '../firebase';

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
  const [precioAlMayor, setPrecioAlMayor] = useState(0);
  const [codigo, setCodigo] = useState('');
  const [tipo, setTipo] = useState('camisa')

  const [mainUrl, setMainUrl] = useState('')
  const [url, setUrl] = useState('')
  const [url2, setUrl2] = useState('')
  const [url3, setUrl3] = useState('')
  const [url4, setUrl4] = useState('')
  const [url5, setUrl5] = useState('')
  const [urls, setUrls] = useState([])
 
  const [imagenPrimaria, setImagenPrimaria] = useState()
  const [imagen, setImage] = useState("")
  const [imagen2, setImage2] = useState("")
  const [imagen3, setImage3] = useState("")
  const [imagen4, setImage4] = useState("")
  const [imagen5, setImage5] = useState("")
  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImage2, setCroppedImage2] = useState(null);
  const [croppedImage3, setCroppedImage3] = useState(null);
  const [croppedImage4, setCroppedImage4] = useState(null);
  const [croppedImage5, setCroppedImage5] = useState(null);
  const [imageFile, setImageFile] = useState()

  const [success, setSuccess] = useState(false)
  const [next, setNext] = useState(false)
  const [next2, setNext2] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [created, setCreated] = useState(false)
  const [isLoadingSingle, setIsLoadingSingle] = useState(false)
  const [isLoadingReset, setIsLoadingReset] = useState(false)

  const [loadingStates, setLoadingStates] = useState([true, true, true, true, true]);
  const [progress, setProgress] = useState([0, 0, 0, 0, 0]);
  const [uploadComplete, setUploadComplete] = useState(false);

  const [successUpload, setSuccessUpload] = useState(0)
  const [uploadStart, setUploadStart] = useState(false)

  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState()

  const [comparar, setComparar] = useState('');

  const [isChecked, setIsChecked] = useState(false);
  const [descuento, setDescuento] = useState(0);
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setPictures(imageList);
  };
  

  const [quantity, setQuantity] = useState({
    'U': [{ color: "#fff", quantity: 0 }],
    'XS': [{ color: "#fff", quantity: 0 }],
    'S': [{ color: "#fff", quantity: 0 }],
    'M': [{ color: "#fff", quantity: 0 }],
    'L': [{ color: "#fff", quantity: 0 }],
    'XL': [{ color: "#fff", quantity: 0 }],
    '0XL': [{ color: "#fff", quantity: 0 }],
    '1XL': [{ color: "#fff", quantity: 0 }],
    '2XL': [{ color: "#fff", quantity: 0 }],
    '3XL': [{ color: "#fff", quantity: 0 }],
    '4XL': [{ color: "#fff", quantity: 0 }],
    '5XL': [{ color: "#fff", quantity: 0 }],
    'FIT': [{ color: "#fff", quantity: 0 }],
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

  const handlePrecioAlMayorChange = (e) => {
    setPrecioAlMayor(e.target.value);
  };

  const handleDescuentoChange = (e) => {
    setDescuento(e.target.value);
  };

  const handleCompararChange = (e) => {
    setComparar(e.target.value);
  };

  const restart = () => {
    setUrls([])
    setMainUrl(null)
    setUploadStart(false)
    setSelectedImages([])
    setSuccessUpload(0)
    setIsLoading(false)
    setIsLoadingSingle(false)
    setNext(false)
    setImagenPrimaria(null)
    setImage(null)
    setImage2(null)
    setImage3(null)
    setImage4(null)
    setImage5(null)
    setNext2(false)
  }
  
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
      updatedQuantity[selectedSizeShoe] = [
        ...updatedQuantity[selectedSizeShoe],
        { color: "#fff", quantity: 0 },
      ];
      return updatedQuantity;
    });
  };

  const handleImagenPrimariaChange = (e) => {
    const file = e.target.files[0];
    // setImage(URL.createObjectURL(file));
    setImagenPrimaria(file);
    setCroppedImage(null)
    
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    setImage(file);
    
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    // setImage2(URL.createObjectURL(file));
    setImage2(file);
    setCroppedImage2(null)
    
  };
  
  const handleImageChange3 = (e) => {
    const file = e.target.files[0];
    // setImage3(URL.createObjectURL(file));
    setImage3(file);
    setCroppedImage3(null)
    
  };
  
  const handleImageChange4 = (e) => {
    const file = e.target.files[0];
    // setImage4(URL.createObjectURL(file));
    setImage4(file);
    setCroppedImage4(null)
    
  };
  
  const handleImageChange5 = (e) => {
    const file = e.target.files[0];
    // setImage5(URL.createObjectURL(file));
    setImage5(file);
    setCroppedImage5(null)
    
  };
  

  useEffect(() => {
    console.log('Selected images:', selectedImages);
  }, [selectedImages]);
  
      // formData.set("tallas", JSON.stringify(quantity));
  
      useEffect(() => {
        
        console.log(imagen, imagen2, imagen3, imagen4, imagen5, urls)
      }, [imagen, imagen2, imagen3, imagen4, imagen5])
  

      async function uploadSingleImage(image) {
        setIsLoadingSingle(true)
        
        if (!imagenPrimaria) {
          console.log(`No image`);
          return;
        }
      
        const fileName = new Date().getTime() + imagenPrimaria.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
      
        const uploadTask = uploadBytesResumable(storageRef, imagenPrimaria);
      
        uploadTask.on('state_changed', 
          (snapshot) => {
            
            const newProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(newProgress);
            console.log(`Uploadis ${newProgress}% done`);
            switch (snapshot.state) {
              case 'paused':
                console.log(`Upload is paused`);
                break;
              case 'running':
                console.log(`Upload is running`);
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log(`File available at`, downloadURL);
              setMainUrl(downloadURL)
              setUrls(prev => [...prev, downloadURL])
              console.log(urls)
              setNext2(true)
              console.log(urls.length)
              console.log(successUpload)
              
              
              // Handle the download URL as needed (e.g., set it in the state)
            } catch (err) {
              console.error(err);
            }
          }
        );
      }


      async function uploadImage(image, index) {
        setUploadStart(true)
        setLoadingStates(prevLoadingStates => {
          const newLoadingStates = [...prevLoadingStates];
          newLoadingStates[index] = true;
          return newLoadingStates;
        });
        if (!image) {
          console.log(`No image at index ${index}`);
          return;
        }
      
        const fileName = new Date().getTime() + image.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
      
        const uploadTask = uploadBytesResumable(storageRef, image);
      
        uploadTask.on('state_changed', 
          (snapshot) => {
            const newProgress = [...progress];
          newProgress[index] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(newProgress);
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload at index ${index} is ${newProgress}% done`);
            switch (snapshot.state) {
              case 'paused':
                console.log(`Upload at index ${index} is paused`);
                break;
              case 'running':
                console.log(`Upload at index ${index} is running`);
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log(`File at index ${index} available at`, downloadURL);
              setUrl2(downloadURL);
              setSuccessUpload(prevCount => prevCount + 1)
              setUrls(prevUrls => [...prevUrls, downloadURL]);
              console.log(urls)
              setNext(true)
              setIsLoading(false)

              console.log(urls.length)
            console.log(successUpload + selectedImages.length)
            console.log(selectedImages)
          console.log(successUpload)
            
            setLoadingStates(prevLoadingStates => {
              const newLoadingStates = [...prevLoadingStates];
              newLoadingStates[index] = false;
              return newLoadingStates;
            });
              // Handle the download URL as needed (e.g., set it in the state)
            } catch (err) {
              console.error(err);
            }
          }
        );
      }
      
      async function uploadImages() {
        try {
          const images = [imagen, imagen2, imagen3, imagen4, imagen5];
          const filteredImages = images.filter(image => image !== '');
          console.log(filteredImages)
          setSelectedImages(filteredImages)

          
          
          for (let i = 0; i < images.length; i++) {
            await uploadImage(images[i], i + 1);
          }
          
          setIsLoading(true)
          console.log(urls)
          
          // Here you can do additional processing if needed
        } catch (err) {
          console.error(err);
        }
      }
      
      
      
  


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
    setPrecioAlMayor(products?.precio_mayor)
    setCodigo(products?.codigo)
    setTipo(products?.tipo)
    setSexo(products?.sexo)
    setIsChecked(products?.descuento)
    setDescuento(products?.descuento_cantidad)
    setComparar(products?.comparar)
    setQuantity(products?.tallas)
    setQuantityShoe(products?.tallas_zapatos)
    setMainUrl(products?.imagen)
    setUrls(products?.imagenes)
    setSuccessUpload(products?.imagenes.length)
    console.log(products?.tallas)
    console.log(quantity)
    console.log(products)
    console.log(urls)
    
}, [products])

useEffect(() =>{
  console.log(urls)
}, [urls])

  const handleSubmit = async (e) => {

    e.preventDefault()

    let isMounted = true;
    const controller = new AbortController();





    try {
        setError(false)
        setIsLoadingCreate(true)
        const response = await axiosPrivate.put(`products/${id}`,
        JSON.stringify({ titulo, descripcion, precio, precioAlMayor, tipo, sexo, comparar, descuento: isChecked, descuento_cantidad: descuento, codigo, tallas_zapatos: quantityShoe, tallas: quantity, imagen: mainUrl, imagenes: urls}),
    
    {
            signal: controller.signal
        });
        console.log(JSON.stringify(response?.data));
        isMounted && setData(response.data);
        console.log(urls)
        navigate("/admin", { state: {from: location}, replace: true });
        // navigate("/admin", { state: {from: location}, replace: true });
        // navigate(-1);
    } catch (err) {
        console.error(err);
        setErrMsg(err)
        setError(true)
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
        <p>Precio al Mayor:</p>
        <label htmlFor="precio"></label>
        <input
          type="number"
          id="precio"
          value={precioAlMayor}
          onChange={handlePrecioAlMayorChange}
          className="input-precio"
          required
        />
      </div>

      <div className="input-container">
        <p>Comparar:</p>
        <label htmlFor="codigo"></label>
        <input
          type="number"
          id="codigo"
          value={comparar}
          onChange={handleCompararChange}
          className="input-descripcion"
          required
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
          required
        />
      </div>
      <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Descuento
      </label>
      {isChecked && 
      
       <input
          type="number"
          id="codigo"
          value={descuento}
          onChange={handleDescuentoChange}
          className="input-descripcion"
          
        />
      }
      
    </div>
{urls &&   <div className="input-container" style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
      <p>Foto Primaria</p>
        <div style={{fontSize: '12px',  display: 'flex', alignItems: 'center', gap: '3px'}}>
        <input
          type="file"
          id="imagen"
          onChange={handleImagenPrimariaChange}
          className="input-imagen"
          accept='image/*'
          style={{fontSize: '12px'}}
          
          
        />
        {/* {products?.imagenes[0] && <p style={{fontSize:'15px'}}><strong>Guardado</strong></p>} */}
        {imagenPrimaria && <img style={{width: '80px'}} src={products?.imagen}/>}

        </div>
        {next2 ? (
          <div style={{ width: '140px', margin: '10px 0', padding: '5px 10px', border: '1px solid black', background: '#226e91', color: 'white', borderRadius: '10px' }}>Guardado</div>
        ) : (
          <div onClick={uploadSingleImage} style={{ padding: '5px 15px', border: '1px solid black', borderRadius: '10px', width: '150px', margin: '10px 0', cursor: 'pointer' }}>
            {isLoadingSingle ? 'Cargando...' : 'Guardar'}
          </div>
        )}
        <p>Fotos Secundarias</p>

     
        <div style={{fontSize: '12px',  display: 'flex', alignItems: 'center', gap: '3px'}}>

            <input
              type="file"
              id="imagen"
              onChange={handleImageChange}
              className="input-imagen"
              accept='image/*'
              style={{fontSize: '12px'}}
              
              
            />
            {loadingStates[1] && progress[1] > 0 && progress[1] < 100 && <p style={{fontSize:'15px'}}>{Math.round(progress[1])}%</p>}
            {/* {urls[0] && <p style={{fontSize:'15px'}}><strong>Guardado</strong></p>} */}
            {urls ? <img style={{width: '80px'}} src={urls[0]}/> : <p>Nada cargado</p>}
            {imagen && <img style={{width: '80px'}} src={URL.createObjectURL(imagen)}/>}
            </div>

            <div style={{fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px'}}>

            <input
              type="file"
              id="imagen"
              onChange={handleImageChange2}
              className="input-imagen"
              accept='image/*'
              style={{fontSize: '12px'}}
              
              
            />
            {loadingStates[2] && progress[2] > 0 && progress[2] < 100 && <p style={{fontSize:'15px'}}>{Math.round(progress[2])}%</p>}
            {/* {products?.imagenes[1]  && <p style={{fontSize:'15px'}}><strong>Guardado</strong></p>} */}
            {urls ? <img style={{width: '80px'}} src={urls[1]}/> : <p>Nada cargado</p>}
            {imagen2 && <img style={{width: '80px'}} src={URL.createObjectURL(imagen2)}/>}
            </div>
            <div style={{fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px'}}>

            <input
              type="file"
              id="imagen"
              onChange={handleImageChange3}
              className="input-imagen"
              accept='image/*'
              style={{fontSize: '12px'}}
              
              
            />
            {loadingStates[3] && progress[3] > 0 && progress[3] < 100 && <p style={{fontSize:'15px'}}>{Math.round(progress[3])}%</p>}
            {/* { products?.imagenes[2] &&  <p style={{fontSize:'15px'}}><strong>Guardado</strong></p>} */}
            {urls ? <img style={{width: '80px'}} src={urls[2]}/> : <p>Nada cargado</p>}
            {imagen3 && <img style={{width: '80px'}} src={URL.createObjectURL(imagen3)}/>}
            </div>
            <div style={{fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px'}}>

            <input
              type="file"
              id="imagen"
              onChange={handleImageChange4}
              className="input-imagen"
              accept='image/*'
              style={{fontSize: '12px'}}
              
              
            />
            {loadingStates[4] && progress[4] > 0 && progress[4] < 100 && <p style={{fontSize:'15px'}}>{Math.round(progress[4])}%</p>}
            {/* { products?.imagenes[3] && <p style={{fontSize:'15px'}}><strong>Guardado</strong></p>} */}
            {urls ? <img style={{width: '80px'}} src={urls[3]}/> : <p>Nada cargado</p>}
            {imagen4 && <img style={{width: '80px'}} src={URL.createObjectURL(imagen4)}/>}
            </div>
            <div style={{fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px'}}>

              <input
              style={{fontSize: '12px'}}
                type="file"
                id="imagen"
                onChange={handleImageChange5}
                className="input-imagen"
                accept='image/*'
                
                
              />
              {loadingStates[5] && progress[5] > 0 && progress[5] < 100 && <p style={{fontSize:'15px'}}>{Math.round(progress[5])}%</p>}
              {products?.imagenes[4] && <p style={{fontSize:'15px'}}><strong>Guardado</strong></p>}
              {urls ? <img style={{width: '80px'}} src={urls[4]}/> : <p>Nada cargado</p>}
            {imagen5 && <img style={{width: '80px'}} src={URL.createObjectURL(imagen5)}/>}
            </div>
        
      </div>}

      {next ? (
        <div style={{ width: '140px', margin: '10px 0', padding: '5px 10px', border: '1px solid black', background: '#226e91', color: 'white', borderRadius: '10px' }}>Guardado</div>
      ) : (
        <div onClick={uploadImages} style={{ padding: '5px 15px', border: '1px solid black', borderRadius: '10px', width: '150px', margin: '10px 0', cursor: 'pointer' }}>
          {isLoading ? 'Cargando...' : 'Guardar'}
        </div>
      )}
      <div onClick={restart} style={{backgroundColor: 'rgb(184, 11, 69)', padding: '5px 15px', border: '1px solid black', borderRadius: '10px', color: 'white', width: '150px', margin: '10px 0', cursor: 'pointer' }}>Reset</div>

{/* {uploadStart && products?.imagenes.length > products?.imagenes.length -1 && selectedImages.length == successUpload  ? (
  <div style={{ width: '140px', margin: '10px 0', padding: '5px 10px', border: '1px solid black', background: '#226e91', color: 'white', borderRadius: '10px' }}>Guardado</div>
) : (
  <div onClick={uploadImages} style={{ padding: '5px 15px', border: '1px solid black', borderRadius: '10px', width: '150px', margin: '10px 0', cursor: 'pointer' }}>
    {isLoading ? 'Cargando...' : 'Guardar'}
  </div>
)} */}
{/* {uploadStart && urls.length > 1 && selectedImages.length == successUpload  ? (
  <div style={{ width: '140px', margin: '10px 0', padding: '5px 10px', border: '1px solid black', background: '#226e91', color: 'white', borderRadius: '10px' }}>Guardado</div>
) : (
  <div onClick={uploadImages} style={{ padding: '5px 15px', border: '1px solid black', borderRadius: '10px', width: '150px', margin: '10px 0', cursor: 'pointer' }}>
    {isLoading ? 'Cargando...' : 'Guardar'}
  </div>
)} */}

      <div className='select'>
        <label  className='prenda label' style={{display: 'flex'}}>
          Categorias:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="camisa">Camisa</option>
            <option value="franela">Franela</option>
            <option value="blusa">Blusa</option>
            <option value="chaqueta">Chaqueta</option>
            <option value="blazer">Blazer</option>
            <option value="sueter">Sueter</option>
            <option value="camisa">Camisa</option>
            <option value="vestido">Vestido</option>
            <option value="conjuntos">Conjuntos</option>
            <option value="set">Set</option>
            <option value="body">Body</option>
            <option value="crop top">Crop top</option>
            <option value="pantalon">Pantalon</option>
            <option value="short">Short</option>
            <option value="falda">Falda</option>
            <option value="leggins">Leggins</option>
            <option value="pijama">Pijama</option>
            <option value="playa">Playa</option>
            <option value="mono">Mono</option>
            <option value="enterizo">Enterizo</option>
            <option value="zapato">Zapato</option>
            <option value="liquidacion">Liquidacion</option>
            <option value="sobretodo">Sobretodo</option>
            
            
          </select>
        </label>
        </div>

      <div>
        <label className='label' style={{display: 'flex'}}>
          Sexo:
          <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
            
            
          </select>
        </label>
        </div>

        <hr style={{marginTop: '20px'}} />

      
      <div className='select'>
      <label className='label' style={{display: 'flex'}}>
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
{products && quantity ? 
<div>

{tipo === 'zapato' ? null :
<div>
  {quantity[selectedSize].map((item, colorIndex) => (
            <div key={colorIndex}>
              <ColorPicker className='color'
                color={item.color}
                onChange={(selectedColor) =>
                  handleColorChange(selectedSize, colorIndex, selectedColor)
                }
              />
              <label className='label' style={{display: 'flex', alignItems: 'center'}}>
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
          }
      </div>  
        : <p>No</p>}
        <button type="button" className='btn-color' onClick={() => handleAddColor(selectedSize)}>Agregar Color</button>
        {tipo === 'zapato' &&<div>
        <label className='label'>
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
              <label className='label'>
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
          
        </div>
        
        {/* <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
          <p>Agregar color</p>
          <BsFillPlusCircleFill onClick={() => handleAddColorShoe(selectedSizeShoe)}/>
        </div> */}
        
        <button className='btn-color' type="button" onClick={() => handleAddColorShoe(selectedSizeShoe)}>Agregar</button>
        </div>}
        </div>
      
        <button className='btn'>
          {error ? 'Intentar de nuevo' : success ? 'Actualizado' : isLoadingCreate ? 'Cargando...' : 'Actualizar Producto'}
      </button>
      {errMsg && <p>{`${errMsg}`}</p>}
    </form>
    </div>

    </main>
  );
};

export default UpdateProduct;