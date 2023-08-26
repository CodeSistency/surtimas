import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import BarCodeGen from "./BarCodeGen";
import QRcode from "./QRcode";
import ReactToPrint from "react-to-print";
import AdminNav from "./AdminNav";

const QRcodes = () => {
    const [products, setProducts] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const ref = useRef()
    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProducts = async () => {
            try {
                const response = await axiosPrivate.get('/products', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProducts(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getProducts();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    // const handleDelete = async (id) => {
    //     let isMounted2 = true;
    //     const controller = new AbortController();
    //     console.log(id)

    //     try {
    //          const response = await axiosPrivate.delete(`products/${id}`,
    //          {
    //             signal: controller.signal
    //          }
                
    //         );
    //         console.log(response.data);
            
    //     } catch (err) {
    //         console.error(err);
    //         // navigate('/login', { state: { from: location }, replace: true });
    //     }

    //     return () => {
    //         isMounted2 = false;
    //         controller.abort();
    //     }
    // }
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

    return (
        
        <article className='dashboard admin-container' ref={ref}>
            <AdminNav />
            {products?.length
                ? (
                   <div className='qr'>
                    <ul className="qr-list">
                        {products.map((product, i) => 
                             {Object.entries(product?.tallas).map(([size, colors]) => {
                                console.log(colors)
                                colors.map((color) => {
                                    return (
                                        <li  key={i}>
                                    
                                            <QRcode 
                                                
                                                id={product?.codigo} 
                                            />
                                            <p style={{marginTop: '-5px', fontSize: '10px'}}>{product.titulo}{product.size}{color.color}</p>
                                    
                                        </li>
                                      );
                                })
                                
                                  
                                
                                
                              })}
                            // <li  key={i}>
                                
                            //     <QRcode 
                                    
                            //         id={product?.codigo} 
                            //     />
                            //     <p style={{marginTop: '-5px', fontSize: '10px'}}>{product.titulo}</p>
                                
                            // </li>
                            
                            )}
                    </ul>
                    <ReactToPrint
                        trigger={() => <button>Print</button>}
                        content={() => ref.current}
                        pageStyle={pageStyle}
                        
                    /> 
                    </div> 
                ) : <p>No hay QR</p>
            }
        </article>
    );
};

export default QRcodes;