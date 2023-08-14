import {useState, useEffect}  from 'react'
import { useNavigate, Link } from "react-router-dom";
import useAuth from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'
import {useContext} from 'react'
import CartContext from "../context/CartProvider";
import {IoCartOutline, IoCartSharp} from "react-icons/io5"
import {BiMenu} from 'react-icons/bi'
import {LiaSearchSolid} from 'react-icons/lia'
// import rr from '../../public/logo3.svg'
 
function GalleryCategory() {

 return(

    <div className="grid-container-gallery">
            <div className="grid-item">
            <div className="text-container">
                <h2>Mujer</h2>
                {/* <p>Some description text here.</p> */}
            </div>
        </div>
        <div className="grid-item"><div className="text-container">
                <h2>Hombre</h2>
                {/* <p>Some description text here.</p> */}
            </div></div>
        <div className="grid-item"><div className="text-container">
                <h2>Zapatos</h2>
                {/* <p>Some description text here.</p> */}
            </div></div>
        <div className="grid-item"><div className="text-container">
                <h2>Juguetes</h2>
                {/* <p>Some description text here.</p> */}
            </div></div>
    </div>
 )
   
  
}

export default GalleryCategory