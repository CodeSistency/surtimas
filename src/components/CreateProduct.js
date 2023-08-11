import React, { useEffect, useState } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import {BsFillPlusCircleFill} from "react-icons/bs"
import {SketchPicker} from "react-color"
import AdminNav from './AdminNav';
import ColorPicker from './ColorPicker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, updateMetadata  } from "firebase/storage";
import { Link } from 'react-router-dom';
import app from '../firebase';

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
  const [url, setUrl] = useState('')
  const [url2, setUrl2] = useState('')
  const [url3, setUrl3] = useState('')
  const [url4, setUrl4] = useState('')
  const [url5, setUrl5] = useState('')
  const [urls, setUrls] = useState([])
 
  const [imagen, setImage] = useState("")
  const [imagen2, setImage2] = useState("")
  const [imagen3, setImage3] = useState("")
  const [imagen4, setImage4] = useState("")
  const [imagen5, setImage5] = useState("")
  const [images, setImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);

  const [success, setSuccess] = useState(false)
  const [next, setNext] = useState(false)
  

  const [quantity, setQuantity] = useState({
    'U': [{ color: "#fff", quantity: 0 }],
    'XS': [{ color: "#fff", quantity: 0 }],
    'S': [{ color: "#fff", quantity: 0 }],
    'M': [{ color: "#fff", quantity: 0 }],
    'L': [{ color: "#fff", quantity: 0 }],
    'XL': [{ color: "#fff", quantity: 0 }],
    '0XL': [{ color: "#fff", quantity: 0 }],
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
    updatedQuantity[selectedSizeShoe] = [
      ...updatedQuantity[selectedSizeShoe],
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
      
      console.log(imagen, imagen2, imagen3, imagen4, imagen5)
    }, [imagen, imagen2, imagen3, imagen4, imagen5])

async function uploadImage(){
 
   try{
     const fileName = new Date().getTime() + imagen.name;
const fileName2 = new Date().getTime() + imagen2.name;
const fileName3 = new Date().getTime() + imagen3.name;
const fileName4 = new Date().getTime() + imagen4.name;
const fileName5 = new Date().getTime() + imagen5.name;

const storage = getStorage(app);
const storageRef = ref(storage, fileName);
const storageRef2 = ref(storage, fileName2);
const storageRef3 = ref(storage, fileName3);
const storageRef4 = ref(storage, fileName4);
const storageRef5 = ref(storage, fileName5);

const metadata = {
 cacheControl: 'public,max-age=300',
 contentType: imagen.type
};


const uploadTask = uploadBytesResumable(storageRef, imagen);
const uploadTask2 = uploadBytesResumable(storageRef2, imagen2);
const uploadTask3 = uploadBytesResumable(storageRef3, imagen3);
const uploadTask4 = uploadBytesResumable(storageRef4, imagen4);
const uploadTask5 = uploadBytesResumable(storageRef5, imagen5);

if(imagen != ''){

  uploadTask.on('state_changed', 
  (snapshot) => {
   
   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   console.log('Upload is ' + progress + '% done');
   switch (snapshot.state) {
     case 'paused':
       console.log('Upload is paused');
       break;
     case 'running':
       console.log('Upload is running');
       break;
   }
  }, 
  (error) => {
   // Handle unsuccessful uploads
  }, 
  () => {
   // Handle successful uploads on complete
   // For instance, get the download URL: https://firebasestorage.googleapis.com/...
   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     console.log('File available at', downloadURL);
     setUrl(downloadURL);
     setUrls(prev => [...prev, downloadURL])
     setNext(true)
    //  console.log(urls)
     
   });
  }
  );
}

if(imagen2 != ''){

  uploadTask2.on('state_changed', 
   (snapshot) => {
     
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
     switch (snapshot.state) {
       case 'paused':
         console.log('Upload is paused');
         break;
       case 'running':
         console.log('Upload is running');
         break;
     }
   }, 
   (error) => {
     // Handle unsuccessful uploads
   }, 
   () => {
     // Handle successful uploads on complete
     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
     getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
       console.log('File available at', downloadURL);
       setUrl2(downloadURL);
       setUrls(prev => [...prev, downloadURL])
       setNext(true)
      //  console.log(urls)
       
     });
   }
  );
} else{
  console.log('no image')
}

if( imagen3 != '') {

  uploadTask3.on('state_changed', 
   (snapshot) => {
     
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
     switch (snapshot.state) {
       case 'paused':
         console.log('Upload is paused');
         break;
       case 'running':
         console.log('Upload is running');
         break;
     }
   }, 
   (error) => {
     // Handle unsuccessful uploads
   }, 
   () => {
     // Handle successful uploads on complete
     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
     getDownloadURL(uploadTask3.snapshot.ref).then((downloadURL) => {
       console.log('File available at', downloadURL);
       setUrl3(downloadURL);
       setUrls(prev => [...prev, downloadURL])
       setNext(true)
      //  console.log(urls)
       
     });
   }
  );
}

if(imagen4 != '') {

  uploadTask4.on('state_changed', 
   (snapshot) => {
     
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
     switch (snapshot.state) {
       case 'paused':
         console.log('Upload is paused');
         break;
       case 'running':
         console.log('Upload is running');
         break;
     }
   }, 
   (error) => {
     // Handle unsuccessful uploads
   }, 
   () => {
     // Handle successful uploads on complete
     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
     getDownloadURL(uploadTask4.snapshot.ref).then((downloadURL) => {
       console.log('File available at', downloadURL);
       setUrl4(downloadURL);
       setUrls(prev => [...prev, downloadURL])
       setNext(true)
      //  console.log(urls)
       
     });
   }
  );
}

if(imagen5 != ''){

  uploadTask5.on('state_changed', 
   (snapshot) => {
     
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
     switch (snapshot.state) {
       case 'paused':
         console.log('Upload is paused');
         break;
       case 'running':
         console.log('Upload is running');
         break;
     }
   }, 
   (error) => {
     // Handle unsuccessful uploads
   }, 
   () => {
     // Handle successful uploads on complete
     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
     getDownloadURL(uploadTask5.snapshot.ref).then((downloadURL) => {
       console.log('File available at', downloadURL);
       setUrl5(downloadURL);
       setUrls(prev => [...prev, downloadURL])
       setNext(true)
      //  console.log(urls)
       
     });
   }
  );
}

// await Promise.all([
//   uploadTask,
//   uploadTask2,
//   uploadTask3,
//   uploadTask4,
//   uploadTask5,
// ]);

// // Get and set download URLs
// const downloadURLs = await Promise.all([
//   getDownloadURL(uploadTask.snapshot.ref),
//   getDownloadURL(uploadTask2.snapshot.ref),
//   getDownloadURL(uploadTask3.snapshot.ref),
//   getDownloadURL(uploadTask4.snapshot.ref),
//   getDownloadURL(uploadTask5.snapshot.ref),
// ]);

// // Set the URLs in the state
// setUrl(downloadURLs[0]);
// setUrl2(downloadURLs[1]);
// setUrl3(downloadURLs[2]);
// setUrl4(downloadURLs[3]);
// setUrl5(downloadURLs[4]);

// // Combine all URLs into a single array and set it in the state
// setUrls(downloadURLs);


   } catch (err) {
     console.error(err)
   }
   finally{
    
    //  setUrls([url, url2, url3, url4, url5])
   }
   
 }

  const handleSubmit = async (e) => {
    e.preventDefault()

    
    
    
    // for (const imageFile of selectedImages) {
    //   formData.append('imagenes', imageFile);
    // }
//   try{
//       const fileName = new Date().getTime() + imagen.name;
// const fileName2 = new Date().getTime() + imagen2.name;
// const fileName3 = new Date().getTime() + imagen3.name;
// const fileName4 = new Date().getTime() + imagen4.name;
// const fileName5 = new Date().getTime() + imagen5.name;

// const storage = getStorage(app);
// const storageRef = ref(storage, fileName);
// const storageRef2 = ref(storage, fileName2);
// const storageRef3 = ref(storage, fileName3);
// const storageRef4 = ref(storage, fileName4);
// const storageRef5 = ref(storage, fileName5);

// const metadata = {
//   cacheControl: 'public,max-age=300',
//   contentType: imagen.type
// };


// const uploadTask = uploadBytesResumable(storageRef, imagen);
// const uploadTask2 = uploadBytesResumable(storageRef2, imagen2);
// const uploadTask3 = uploadBytesResumable(storageRef3, imagen3);
// const uploadTask4 = uploadBytesResumable(storageRef4, imagen4);
// const uploadTask5 = uploadBytesResumable(storageRef5, imagen5);


// uploadTask.on('state_changed', 
//   (snapshot) => {
    
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//       setUrl(downloadURL);
//       setUrls(prev => [...prev, downloadURL])
//       console.log(urls)
      
//     });
//   }
// );

// uploadTask2.on('state_changed', 
//   (snapshot) => {
    
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//       setUrl2(downloadURL);
//       setUrls(prev => [...prev, downloadURL])
//       console.log(urls)
      
//     });
//   }
// );

// uploadTask3.on('state_changed', 
//   (snapshot) => {
    
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask3.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//       setUrl3(downloadURL);
//       setUrls(prev => [...prev, downloadURL])
//       console.log(urls)
      
//     });
//   }
// );

// uploadTask4.on('state_changed', 
//   (snapshot) => {
    
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask4.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//       setUrl4(downloadURL);
//       setUrls(prev => [...prev, downloadURL])
//       console.log(urls)
      
//     });
//   }
// );

// uploadTask5.on('state_changed', 
//   (snapshot) => {
    
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error) => {
//     // Handle unsuccessful uploads
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask5.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//       setUrl5(downloadURL);
//       setUrls(prev => [...prev, downloadURL])
//       console.log(urls)
      
//     });
//   }
// );


//     } catch (err) {
//       console.error(err)
//     }

let isMounted = true;
      const controller = new AbortController();




// setUrls([url, url2, url3, url4, url5])


console.log(urls, url, url2, url3, url4, url5)

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
formData.append('imagen', url);
formData.append('imagenes', urls);
  
      
  
      try {
          const response = await axiosPrivate.post('products', formData,
          // JSON.stringify({titulo, descripcion, precio, codigo, tallas: quantity, imagen}),
      
          { 
              signal: controller.signal,
              
              
          });
          console.log(JSON.stringify(response?.data));
          isMounted && setData(response.data);
          setSuccess(true)
          console.log(success)
          navigate("/admin", { state: {from: location}, replace: true });
          
      } catch (err) {
          console.error(err);
          // navigate('/login', { state: { from: location }, replace: true });
          
      }
  
      return () => {
          isMounted = false;
          controller.abort();
      }

    
}


function reset (){
  setData({})
  setTipo('camisa')
  setCodigo('')
  setTitulo('')
  setDescripcion('')
  setPrecio(0)
  setPrecioAlMayor(0)
  setImage('')
  setSelectedImages([])
  setQuantityShoe({
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
    
  })

  setQuantity({
    'U': [{ color: "#fff", quantity: 0 }],
    'XS': [{ color: "#fff", quantity: 0 }],
    'S': [{ color: "#fff", quantity: 0 }],
    'M': [{ color: "#fff", quantity: 0 }],
    'L': [{ color: "#fff", quantity: 0 }],
    'XL': [{ color: "#fff", quantity: 0 }],
    '0XL': [{ color: "#fff", quantity: 0 }],
    '2XL': [{ color: "#fff", quantity: 0 }],
    '3XL': [{ color: "#fff", quantity: 0 }],
    '4XL': [{ color: "#fff", quantity: 0 }],
    '5XL': [{ color: "#fff", quantity: 0 }],
    'FIT': [{ color: "#fff", quantity: 0 }],
  })
  setSuccess(false)
  setNext(false)
}



  return (

    <>
    {success === true ? 
      <main className="App">
      <section className="login">
          <h1>Exito!</h1>
          <p>
              <button className='create' onClick={reset}>Crear producto</button>
          </p>
      </section>
  </main> 
  
  :
    <main className='dashboard admin-container'>
    <AdminNav/>
    <div className='create-container'>
    <form onSubmit={handleSubmit} className="mi-formulario" >
      <div className="input-container">
        <p>Titulo</p>
        <label htmlFor="titulo"></label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={handleTituloChange}
          className="input-titulo"
          required
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
          required
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
          required
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
      <div className="input-container" style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
        <p>Foto Primaria</p>
        {/* <label style={{marginTop:'0'}}htmlFor="imagen"></label> */}
        <input
          type="file"
          id="imagen"
          onChange={handleImageChange}
          className="input-imagen"
          accept='image/*'
          
          
        />
        <input
          type="file"
          id="imagen"
          onChange={e => setImage2(e.target.files[0])}
          className="input-imagen"
          accept='image/*'
          
          
        />
        <input
          type="file"
          id="imagen"
          onChange={e => setImage3(e.target.files[0])}
          className="input-imagen"
          accept='image/*'
          
          
        />
        <input
          type="file"
          id="imagen"
          onChange={e => setImage4(e.target.files[0])}
          className="input-imagen"
          accept='image/*'
          
          
        />
        <input
          type="file"
          id="imagen"
          onChange={e => setImage5(e.target.files[0])}
          className="input-imagen"
          accept='image/*'
          
          
        />
        
        
      </div>

      {next ? <div style={{width: '140px', margin: '10px 0', padding: '5px 10px', border: '1px solid black', background: '#226e91', color:'white', borderRadius:'10px'}}>Guardado</div> : <div onClick={uploadImage} style={{padding: '5px 10px', border: '1px solid black', borderRadius:'10px', width: '120px', margin: '10px 0', cursor:'pointer'}} >Guardar</div>}

      {/* <div className="input-container">
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
        
        
      </div> */}

      

      <div className='select'>
        <label className='prenda' style={{display: 'flex'}}>
          Categorias:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="camisa">Camisa</option>
            <option value="franela">Franela</option>
            <option value="blusa">Blusa</option>
            <option value="chaqueta">Chaqueta</option>
            <option value="blazer">Blazer</option>
            <option value="camisa">Camisa</option>
            <option value="body">Body</option>
            <option value="crop top">Crop top</option>
            <option value="pantalon">Pantalon</option>
            <option value="short">Short</option>
            <option value="leggins">Leggins</option>
            <option value="pijama">Pijama</option>
            <option value="playa">Playa</option>
            <option value="mono">Mono</option>
            <option value="zapato">Zapato</option>
            <option value="liquidacion">Liquidacion</option>
            
            
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

        <hr style={{marginTop: '20px'}} />


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
    </main>}
    </>
  );
};

export default CreateProduct;