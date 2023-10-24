import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BarCodeGen from "./BarCodeGen";
import QRcode from "./QRcode";
import ReactToPrint from "react-to-print";
import AdminNav from "./AdminNav";
import axios from "../api/axios";
import Webcam from "react-webcam";
import exportAsImage from "../utils/exportAsImage";
import { useReactToPrint } from 'react-to-print';

const QRcodes = () => {
    const [products, setProducts] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const pageStyle =`
  @page {
      size: 30mm 20mm
  };
      
  @media all {
      .pageBreak {
          display: none
      }
  };
  
  @media print{
      .pageBreak {
          page-break-before: always;
      }
  
  }
  
  `

    const ref = useRef()
    
    const handlePrint = useReactToPrint({
      content: () => ref.current,
      pageStyle: pageStyle
    });

    const getProducts = async (pageNumber) => {
        try {
            // const response = await axios.get(`/limited?pageNumber=${pageNumber}&search=${searchQuery}`);
            // const response = await axios.get(`productos/qr?pageNumber=${pageNumber}`);
            const response = await axios.get(`productos`);
            // console.log(props.mujer)
            console.log(response.data);
            setProducts(response.data);
            console.log(totalPages)
            
            setCurrentPage(pageNumber);
        } catch (err) {
            console.error(err);
            // navigate('/login', { state: { from: location }, replace: true });
        }
    }

    useEffect(() => {
      const fetchTotalPages = async () => {
        try {
          const response = await axios.get('/productos');
          const totalProducts = response.data.length;
          const pages = Math.ceil(totalProducts / 30);
          setTotalPages(pages);
          
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchTotalPages();
      getProducts(currentPage);
    }, [currentPage]);


  // useEffect(() => {
  //   getProducts(currentPage);
  // }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    getProducts(pageNumber);
  };


    
    const handleDelete = async (id) => {

        let isMounted2 = true;
        const controller = new AbortController();
        console.log(id)
        
        
        try {
            const response = await axiosPrivate.delete(`products/${id}`,
            
        
        {
                signal: controller.signal
            });
            console.log(JSON.stringify(response?.data));
            
            navigate("/admin", { state: {from: location}, replace: true });
            navigate(-1);
        } catch (err) {
            console.error(err);
            // navigate('/login', { state: { from: location }, replace: true });
            
        }
    
        return () => {
            isMounted2 = false;
            controller.abort();
        }
    }

    const exportRef = useRef();



    return (
        
        <article className='dashboard admin-container' >
            <AdminNav />
            {products?.length
                ? (
                   <div className='qr' ref={ref}>
                    <ul className="qr-list">
                        
                    {products.map((product, i) =>
  Object.entries(product?.tallas).map(([size, colors]) =>
    colors.map((color, j) => 
    color.quantity > 0 && 
    <li>
           <QRcode id={product?.codigo} />
           <p style={{ marginTop: '-5px', fontSize: '8px', maxWidth: '130px'}}>{`${product.titulo}-${size}-${color.color_seleccionado}-${product.codigo}`}
           </p>              
         </li>
      
    )
  )
)}
                        </ul>
                        
                    </div> 
                ) : 
                
                <div className="load">
                  <p>Cargando</p>
                </div>
            }
        </article>
    );
};

export default QRcodes;