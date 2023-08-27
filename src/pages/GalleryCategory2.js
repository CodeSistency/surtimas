import React from 'react'
import { Link } from 'react-router-dom'

function GalleryCategory2() {
  return (
    <div>
        <h1 style={{textAlign: 'center'}}>Categorias</h1>
    <div className='categories-container'>
        <div className='category-foto-container'>
            <Link to={'/tipo/pantalon'} className='foto-category'>
                <img src='pantalon.jpg'/>
                <p>Pantalon</p>
            </Link>
            <Link to={'/tipo/crop top'} className='foto-category'>
                <img src='crop-top.jpg'/>
                <p>Crop Top</p>
            </Link>
            <Link to={'/tipo/pijama'} className='foto-category'>
                <img src='pijama.jpg'/>
                <p>Pijama</p>
            </Link>
            <Link to={'/tipo/falda'} className='foto-category'>
                <img src='falda.jpg'/>
                <p>Falda</p>
            </Link>
            <Link to={'/tipo/vestido'} className='foto-category'>
                <img src='vestido.jpg'/>
                <p>Vestido</p>
            </Link>
        </div>
        <div className='category-foto-container'>
        <Link to={'/tipo/playa'} className='foto-category'>
                <img src='playa.jpg'/>
                <p>Playa</p>
            </Link>
            <Link to={'/tipo/sueter'} className='foto-category'>
                <img src='sueter.jpg'/>
                <p>Sueters</p>
            </Link>
            <Link to={'/tipo/short'} className='foto-category'>
                <img src='short-mujer.jpg'/>
                <p>Shorts</p>
            </Link>
            <Link to={'/tipo/mono'} className='foto-category'>
                <img src='mono-mujer.jpg'/>
                <p>Monos</p>
            </Link>
            <Link to={'/tipo/liquidacion'} className='foto-category'>
                <img src='model.jpg'/>
                <p>Liquidacion</p>
            </Link>
        </div>
    </div>
    </div>
  )
}

export default GalleryCategory2