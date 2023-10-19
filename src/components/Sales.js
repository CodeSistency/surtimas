import React, { useEffect } from 'react'
import AdminNav from './AdminNav'
import axios, { axiosPrivate } from '../api/axios';
import { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {MdDeleteForever, MdOutlineModeEditOutline} from "react-icons/md"
import Loader from "../pages/Loader";
import ModalDelete from "../pages/ModalDelete";
import ModalSalesList from './ModalSalesList';

function Sales() {

    const [salesData, setSalesData] = useState()
    const [isDeleting, setIsDeleting] = useState()

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);

    
    const openModal = () => {
      setModalOpen(true);
    };

    const openModal2 = () => {
        setModalOpen2(true);
      };
  
    const closeModal = () => {
      setModalOpen(false);
      setModalOpen2(false);
    };


    const getProducts = async () => {

        let isMounted = true;
        const controller = new AbortController();
    
        try {
            const response = await axiosPrivate.get('/sales', {
                signal: controller.signal
            });
            console.log(response.data);
            isMounted && setSalesData(response.data);
            // calculateMonthlyRevenue(salesData);
        } catch (err) {
            console.error(err);
            console.log(JSON.stringify(err));
            // navigate('/login', { state: { from: location }, replace: true });
        }
    
        return () => {
          isMounted = false;
          controller.abort();
      }
    }

    const handleDelete = async (id) => {

        let isMounted2 = true;
        const controller = new AbortController();
        console.log(id)
        
        
        try {
            const response = await axios.delete(`sales/${id}`,
            
        
        {
                signal: controller.signal
            });
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response?.data[4].imagenes[0]));
            
            
          // closeModal()
          setIsDeleting(true)
          getProducts()
        } catch (err) {
            console.error(err);
            console.log(JSON.stringify(err));
            // navigate('/login', { state: { from: location }, replace: true });
            
        }
    
        return () => {
            isMounted2 = false;
            controller.abort();
        }
    }
    
    
      useEffect(() => {
        
    
       
    
        getProducts();
        
        
    }, [])

  return (
    <div className="dashboard admin-container">
        <AdminNav/>
        <div className="admin-products">
        <div className="crear-producto-container">
                <h2>Lista de Ventas</h2>
                

            </div>
            <div>
                <div className='table-container'>
                <table className="table">
                        <thead>
                        <tr>
                            <th>Nmro</th>
                            <th>Ref</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Ver</th>
                            <th>Borrar</th>
                        </tr>
                        </thead>
                        <tbody>
                            {salesData?.map((product, index) => (
                                <tr key={index}>
                                <td>{index}</td>
                                <td>{product.metodo}</td>
                                <td>${product.total}</td>
                                <td>{moment(product.date).format('YYYY-MM-DD')}</td>
                                <td>
                                {moment(product.date).format('HH:mm')}
                                </td>
                                <td>
                                <MdOutlineModeEditOutline onClick={openModal2} fontSize={27}  style={{marginTop:'7px', cursor: 'pointer'}}/>
                                </td>
                                <td>
                                <MdDeleteForever fontSize={27} style={{marginTop:'7px', cursor: 'pointer'}} onClick={openModal}/>
                                {/* <MdDeleteForever fontSize={27} style={{marginTop:'7px', cursor: 'pointer'}} onClick={() => handleDelete(product._id)}/> */}
                                {modalOpen && (
        <ModalDelete closeModal={closeModal} isDeleting={setIsDeleting} product={product}  handleDelete={handleDelete}/>
      )}

{modalOpen2 && (
        // <ModalBuy closeModal={closeModal} product={props.product} user={auth?.user}/>
        <div className='modal-overlay'> 
        <div className='modal-content'>
        <ModalSalesList closeModal={closeModal} productos={product.product} />
        </div>
        </div>
      )}
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sales